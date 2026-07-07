import { Request, Response } from 'express';
import { prismaClient } from "@repo/db/client";
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
import { redisClient } from '../lib/redisClient';
import crypto from 'crypto';
import { sendEmail } from '../utils/email';

export const signup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = createJWT(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "Registered Successfully",
      success: true,
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during signup', error: error.message, stack: error.stack });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }


    const token = createJWT(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      userId: user.id,
      user: { id: user.id, name: user.name, email: user.email },
      token
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};


export const logOutUser = async (req: Request, res: Response) => {

  const token = req.cookies.token;

  if (token) {
    await redisClient.set(`blacklist:${token}`, 'true', 'EX', 24 * 60 * 60);
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });

};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await prismaClient.user.update({
      where: { email },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password to: \n${resetURL}\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });

      res.status(200).json({ success: true, message: 'Token sent to email!' });
    } catch (err) {
      await prismaClient.user.update({
        where: { email },
        data: {
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      });
      return res.status(500).json({ success: false, message: 'There was an error sending the email. Try again later!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during forgot password' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const tokenToHash = req.params.token || '';
    const hashedToken = crypto.createHash('sha256').update(tokenToHash).digest('hex');

    const user = await prismaClient.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Token is invalid or has expired' });
    }

    const { password } = req.body;
    const hashedPassword = await hashPassword(password);

    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    res.status(200).json({ success: true, message: 'Password reset successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during reset password' });
  }
};
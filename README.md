# Madhoor Pureline

Madhoor Pureline is a full-stack e-commerce platform built with **Next.js**, **Express**, and **Prisma**.
It follows a **Turborepo** monorepo structure and uses pnpm for package management.
---

## Project Structure

```bash
.
├── apps/
│   ├── web/           # Frontend (Next.js)
│   │   ├── app/       # Pages and routes
│   │   ├── components/ # Reusable React components
│   │   ├── ui/        # UI primitives and shared components
│   │   ├── lib/       # Utility functions
│   │   ├── fonts/     # Custom fonts
│   │   ├── assets/    # Static assets
│   │   └── public/assets/productImages/ # Product images
│   └── server/        # Backend (Express)
│       ├── src/
│       │   ├── controllers/ # API route logic
│       │   ├── routes/      # API endpoints
│       │   └── utils/       # Helper functions
├── packages/
│   ├── db/             # Prisma database setup
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   └── migrations/   # Migration history
│   ├── ui/             # Shared UI component library
│   ├── eslint-config/  # Shared ESLint rules
│   └── typescript-config/ # Shared TS configs
└── .vscode/            # Editor configs


---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Node.js, Express.js / Fastify  
- **Database:** Prisma ORM  
- **Shared Packages:** UI components, ESLint rules, TypeScript configs  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/CyberKaps/madhoor-pureline.git
cd madhoor-pureline


2. Install dependecies:
```bash
pnpm install



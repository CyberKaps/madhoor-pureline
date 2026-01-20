
import { prismaClient } from '../src/index.js';

async function main() {
    const email = "kalpeshb450@gmail.com";
    const user = await prismaClient.user.findUnique({
        where: { email }
    });
    console.log("User found:", user);
}

main().catch(console.error);

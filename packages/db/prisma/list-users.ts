
import { prismaClient } from '../src/index.js';

async function main() {
    const users = await prismaClient.user.findMany();
    console.log("All Users:", users);

    // Explicitly check the specific email
    const specific = await prismaClient.user.findUnique({
        where: { email: "kalpeshb450@gmail.com" }
    });
    console.log("Specific User Check (kalpeshb450@gmail.com):", specific);
}

main().catch(console.error);

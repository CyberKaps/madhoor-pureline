
import { prismaClient } from '../src/index';

async function main() {
    const email = "kalpeshb450@gmail.com";
    await prismaClient.user.delete({
        where: { email }
    });
    console.log("User deleted");
}

main().catch(console.error);

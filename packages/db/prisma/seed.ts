import { prismaClient as prisma } from '../src/index.js'

async function main() {
    const products = [
        {
            name: 'Pure Honey',
            description: '100% natural, unprocessed honey from wild hives.',
            price: 499,
            imageUrl: '/assets/productImages/product1.jpeg',
        },
        {
            name: 'Organic Ghee',
            description: 'Traditional A2 Gir Cow Ghee made from curd.',
            price: 1299,
            imageUrl: '/assets/productImages/product1.jpeg',
        },
        {
            name: 'Cold Pressed Coconut Oil',
            description: 'Virgin coconut oil extracted from fresh coconut milk.',
            price: 399,
            imageUrl: '/assets/productImages/product1.jpeg',
        },
        {
            name: 'Turmeric Powder',
            description: 'High curcumin Lakadong turmeric powder.',
            price: 249,
            imageUrl: '/assets/productImages/product1.jpeg',
        },
        {
            name: 'Wild Forest Honey',
            description: 'Dark, robust honey from deep forest blooms.',
            price: 650,
            imageUrl: '/assets/productImages/product1.jpeg',
        }
    ]

    console.log('Seeding products...')

    for (const product of products) {
        const p = await prisma.product.create({
            data: product,
        })
        console.log(`Created product with id: ${p.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

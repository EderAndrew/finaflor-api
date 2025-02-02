import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const name = process.env.NAME as string
    const user_name = process.env.USER_NAME as string
    const hash = hashSync(process.env.PASSWORD as string, 10);

    const haveUser = await prisma.user.findFirst({
        where: {
            user_name
        }
    })

    if(haveUser) {
        return console.log("Ja existe um usuario com este nome.")
    }

    await prisma.user.create({
        data: {
            name,
            user_name,
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    console.log("Usuário criado com sucesso.");
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
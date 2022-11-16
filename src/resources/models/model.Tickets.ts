// we import the contrainer.prisma to get access to the database
import { container } from "@sapphire/framework";

export async function getAllTickets() {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT * FROM ${process.env.WORLD_DATABASE}.gm_ticket WHERE completed = 0 LIMIT 10`);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getTicketById(id: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT * FROM ${process.env.WORLD_DATABASE}.gm_ticket WHERE id = ? && completed = 0`, [id]);
        return result;
    } catch (error) {
        return error;
    }
}
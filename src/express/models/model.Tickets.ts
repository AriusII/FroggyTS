// we import the contrainer.database to get access to the database
import { container } from "@sapphire/framework";

export async function getAllTickets() {
    try {
        const result: any = await container.database.query(`SELECT * FROM ${process.env.DB_CHAR}.gm_ticket WHERE completed = 0 LIMIT 10`);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getTicketById(id: number) {
    try {
        const result: any = await container.database.query(`SELECT * FROM ${process.env.DB_CHAR}.gm_ticket WHERE id = ? && completed = 0`, [id]);
        return result;
    } catch (error) {
        return error;
    }
}
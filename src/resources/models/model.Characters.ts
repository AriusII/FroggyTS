// we import the contrainer.prisma to get access to the database
import { container } from "@sapphire/framework";

export async function getCharactersByAccountId(id: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT guid, name, race, class, gender, online FROM ${process.env.CHAR_DATABASE}.characters WHERE account = ?`, id);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getCharacterByGuid(guid: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT name, race, class, gender, level, money, online, totaltime, logout_time, health, creation_date FROM ${process.env.CHARACTERS_DATABASE}.characters WHERE guid = ?`, guid);
        return result;
    } catch (error) {
        return error;
    }
}
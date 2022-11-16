// we import the contrainer.prisma to get access to the database
import { container } from "@sapphire/framework";

export async function accountCreate(username: string, email: string, salt: Buffer, verifier: any) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`INSERT INTO ${process.env.ACCOUNT_DATABASE}.account (username, email, salt, verifier) VALUES (?, ?, ?, ?)`, [username, email, salt, verifier]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function accountLogin(accountId: number, discordId: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`INSERT INTO ${process.env.ACCOUNT_DATABASE}.account_discord account_discord (accountId, discordId, verified) VALUES (?, ?, ?)`, [accountId, discordId, 1]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountByUsername(username: string) {
    try {
        const result: any = container.prisma.$queryRawUnsafe(`SELECT * FROM ${process.env.ACCOUNT_DATABASE}.account WHERE username = ?`, [username]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountByEmail(email: string) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT * FROM ${process.env.ACCOUNT_DATABASE}.account WHERE email = ?`, [email]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountVerifiedByDiscordId(discordId: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT * FROM ${process.env.ACCOUNT_DATABASE}.account_discord WHERE discordId = ?`, [discordId]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountAccessById(id: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT * FROM ${process.env.ACCOUNT_DATABASE}.account_access WHERE ${process.env.CORE === 'AC' ? 'id = ?' : process.env.CORE === 'TC' || process.env.CORE === 'SC' && 'AccountId = ?'}`, [id]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountIdByCharacterGuid(guid: number) {
    try {
        const result: any = await container.prisma.$queryRawUnsafe(`SELECT account.id FROM ${process.env.ACCOUNT_DATABASE}.account AS account INNER JOIN ${process.env.WORLD_DATABASE}.characters as characters WHERE characters.account = account.id && characters.guid = ?`, [guid]);
        return result;
    } catch (error) {
        return error;
    }
}
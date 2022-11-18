// we import the contrainer.database to get access to the database
import { container } from "@sapphire/framework";

export async function accountCreate(username: string, email: string, salt: Buffer, verifier: any) {
    try {
        const result: any = await container.database.query(`INSERT INTO ${process.env.DB_AUTH}.account (username, email, salt, verifier) VALUES (?, ?, ?, ?)`, [username, email, salt, verifier]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function accountLogin(accountId: number, discordid: number) {
    try {
        const result: any = await container.database.query(`INSERT INTO ${process.env.DB_AUTH}.account_discord (accountId, discordId, verified) VALUES (?, ?, ?)`, [accountId, discordid, 1]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountByUsername(username: string) {
    try {
        const result: any = container.database.query(`SELECT * FROM ${process.env.DB_AUTH}.account WHERE username = ?`, [username]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountByEmail(email: string) {
    try {
        const result: any = await container.database.query(`SELECT * FROM ${process.env.DB_AUTH}.account WHERE email = ?`, [email]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountVerifiedByDiscordId(discordid: number) {
    try {
        const result: any = await container.database.query(`SELECT * FROM ${process.env.DB_AUTH}.account_discord WHERE discordId = ?`, [discordid]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountAccessById(id: number) {
    try {
        const result: any = await container.database.query(`SELECT * FROM ${process.env.DB_AUTH}.account_access WHERE id = ?`, [id]);
        return result;
    } catch (error) {
        return error;
    }
}

export async function getAccountIdByCharacterGuid(guid: number) {
    try {
        const result: any = await container.database.query(`SELECT account.id FROM ${process.env.DB_AUTH}.account AS account INNER JOIN ${process.env.DB_CHAR}.characters as characters WHERE characters.account = account.id && characters.guid = ?`, guid);
        return result;
    } catch (error) {
        return error;
    }
}
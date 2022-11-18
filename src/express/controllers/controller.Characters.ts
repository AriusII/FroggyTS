// We import the express type and the model
import type { Request, Response, NextFunction } from 'express';
import * as modelCharacters from '../models/model.Characters';
import { getAccountVerifiedByDiscordId } from '../models/model.Account';

export async function getCharactersByAccountId(req: Request, res: Response, _next: NextFunction) {
    try {
        const accountid: number = parseInt(req.params.accountid);
        const result: any = await modelCharacters.getCharactersByAccountId(accountid);
        
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No characters found' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export async function getCharacterByGuid(req: Request, res: Response, _next: NextFunction) {
    try {
        const guid: number = parseInt(req.params.guid);
        const result: any = await modelCharacters.getCharacterByGuid(guid);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No character found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export async function getCharactersByDiscordId(req: Request, res: Response, _next: NextFunction) {
    try {
        const discordid: number = parseInt(req.params.discordid);
        const result1: any = await getAccountVerifiedByDiscordId(discordid);
        const result2: any = await modelCharacters.getCharactersByAccountId(result1[0].accountid);

        if (result2.length > 0) {
            return res.status(200).json(result2);
        } else {
            return res.status(404).json({ message: 'No character found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
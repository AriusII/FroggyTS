// We import the express type and the model
import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { createVerifier } from '../utils/SRP6';
import * as modelAccount from '../models/model.Account';

async function checkEmail(email: string) {
    return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export async function accountAdd(req: Request, res: Response, _next: NextFunction) {
    try {
        const account = await modelAccount.getAccountByUsername(req.body.username);
        const accountEmail = await modelAccount.getAccountByEmail(req.body.email);

        // we check if the username is valid
        if (account.length > 0) {
            return res.status(400).json({ error: 'Username already registered !' });
        }

        // we check the length of the username
        if (!req.body.username.match('^[a-z0-9A-Z]{3,16}$')) {
            return res.status(400).json({ error: 'Username require 3 min or 16 characters maximum and cannot contain special characters !' });
        }

        // we check if email already exist
        if (accountEmail.length > 0) {
            return res.status(400).json({ error: 'Email already registered !' });
        }

        // we check if the email is valid
        if (!checkEmail(req.body.email)) {
            return res.status(400).json({ error: 'Email is not valid !' });
        }

        // we check the length of the password
        if (req.body.password.length < 8 || req.body.password.length > 16) {
            return res.status(400).json({ error: 'Password require 8 min or 16 characters maximum !' });
        }

        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = req.body.password
        const salt: Buffer = crypto.randomBytes(32)
        const verifier: Buffer = await createVerifier(username.toUpperCase(), password, salt)
        const result = await modelAccount.accountCreate(username, email, salt, verifier);

        if (result) {
            return res.status(200).json({ success: 'Account created !' });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}

export async function accountLoginDiscord(req: Request, res: Response, _next: NextFunction) {
    try {
        const account = await modelAccount.getAccountByUsername(req.body.username);

        // we check if the username is valid (exist)
        if (account.length == 0) {
            return res.status(400).json({ error: 'Account not registered !' });
        }
    
        const verifier = await createVerifier(req.body.username.toUpperCase(), req.body.password, account[0].salt);
    
        // we check if the password is valid
        if (verifier.toString('hex') != account[0].verifier.toString('hex')) {
            return res.status(400).json({ error: 'Password is not valid !' });
        }
    
        const result = await modelAccount.accountLogin(account[0].id, req.body.discordid)
    
        if (result) {
            return res.status(200).json({ success: `Account ${req.body.username} login with success to discord !` });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}

export async function accountDiscord(req: Request, res: Response, _next: NextFunction) {
    try {
        const discordid: number = req.body.discordid
        const result: any = await modelAccount.getAccountVerifiedByDiscordId(discordid);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Account not registered !' });
        } else if (result.length === 1) {
            return res.status(200).json({ success: 'Account verified !' });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}

export async function accountAccess(req: Request, res: Response, _next: NextFunction) {
    try {
        const discordid: number = req.body.discordid
        const result: any = await modelAccount.getAccountAccessById(discordid);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Account not registered !' });
        } else if (result.length === 1) {
            return res.status(200).json({ success: 'Account verified !' });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}

export async function accountCharacter(req: Request, res: Response, _next: NextFunction) {
    try {
        const discordid: number = req.body.discordid
        const result: any = await modelAccount.getAccountIdByCharacterGuid(discordid);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Account not registered !' });
        } else if (result.length === 1) {
            return res.status(200).json({ success: 'Account verified !' });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}
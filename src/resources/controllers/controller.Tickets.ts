// We import the express type and the model
import type { Request, Response, NextFunction } from 'express';
import * as modelTickets from '../models/model.Tickets';

export async function ticketAll(_req: Request, res: Response, _next: NextFunction) {
    try {
        const result: any = await modelTickets.getAllTickets();
        if (result) {
            return res.status(200).json({ success: result });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}

export async function ticketById(req: Request, res: Response, _next: NextFunction) {
    try {
        const ticketid: number = +req.params.ticketid
        const result: any = await modelTickets.getTicketById(ticketid);
        if (result) {
            return res.status(200).json({ success: result });
        } else {
            return res.status(400).json({ error: 'An error occured !' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
}
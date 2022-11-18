import type { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../utils/exceptions.js';
/**
 * For all other undefined routes, we return a 404 error
 */
export function unknownRoutesHandler (_req: Request, _res: Response, next: NextFunction) {
    next(new NotFoundException('The requested resource does not exist.'))
}
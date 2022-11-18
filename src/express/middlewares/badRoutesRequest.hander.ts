import type { Request, Response, NextFunction } from 'express';
import { BadRequestException } from '../utils/exceptions.js';
/**
 * For all bad requests, we return a 400 error
 * (for example, if the user tries to access a route with a bad method)
 */
export function badRoutesRequestHandler (_req: Request, _res: Response, next: NextFunction) {
    next(new BadRequestException('The requested resource from those parameters does not exist.'))
}
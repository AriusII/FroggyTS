/**
 * An generic class to create HTTP errors
 * (here 400 and 404) 
 */
class ApiException extends Error {
    error: string | undefined;
    status: any;
    constructor(error: string | undefined, status: any) {
        super(error);
        this.error = error;
        this.status = status;
    }
}

/**
 * Creation of a 404 error
 */
export class NotFoundException extends ApiException {
    constructor(error: string) {
        super(error, 404);
    }
}

/**
 * Creation of a 400 error
 */
export class BadRequestException extends ApiException {
    constructor(error: string) {
        super(error, 400);
    }
}
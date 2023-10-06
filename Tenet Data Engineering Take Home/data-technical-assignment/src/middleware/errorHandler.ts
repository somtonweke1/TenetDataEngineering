import { Request, Response, NextFunction } from 'express';

class ErrorHandler {
  static handleError(err: any, req: Request, res: Response, next: NextFunction) {
   
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
  }
}

export default ErrorHandler;

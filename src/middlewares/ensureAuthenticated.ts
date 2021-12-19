import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' '); //na desestruturação, se deixo a primeira posição vazia ele anula a informação"

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as tokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err: any) {
    throw new Error('Invalid JWT token');
  }
}

import { Injectable, NestMiddleware, TooManyRequestsException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestCounts = new Map<string, { count: number; resetTime: number }>();
  private readonly maxRequests = 100;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.ip;
    const now = Date.now();

    if (!this.requestCounts.has(clientIp)) {
      this.requestCounts.set(clientIp, { count: 1, resetTime: now + this.windowMs });
      next();
      return;
    }

    const record = this.requestCounts.get(clientIp);

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      next();
      return;
    }

    record.count++;

    if (record.count > this.maxRequests) {
      throw new TooManyRequestsException(
        'عدد الطلبات كثير جداً، يرجى المحاولة لاحقاً',
      );
    }

    next();
  }
}

import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: any; // You can define a specific type instead of `any`
}

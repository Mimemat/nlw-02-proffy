import { Request, Response } from 'express';

import { db } from '../db/connection';

export class ConnectionsController {
  constructor(private database: typeof db) {}

  async index(request: Request, response: Response): Promise<Response> {}

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const newConnection = await this.database('connections').insert({
      user_id: userId,
    });

    return response.status(201).json(newConnection);
  }
}

import { Request, Response } from 'express';

import { db } from '../db/connection';

export class ConnectionsController {
  constructor(private database: typeof db) {}

  async index(request: Request, response: Response): Promise<Response> {
    const { total } = await this.database('connections')
      .count('* as total')
      .first();

    return response.status(200).json({ total });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const newConnection = await this.database('connections').insert({
      user_id: userId,
    });

    return response.status(201).json(newConnection);
  }
}

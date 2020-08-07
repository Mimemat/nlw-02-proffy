import { Request, Response } from 'express';

import { db } from '../db/connection';
import { convertHourToMinutes } from '../utils/convertHourToMinutes';

interface IScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export class ClassesController {
  constructor(private database: typeof db) {}

  async index(request: Request, response: Response): Promise<Response> {
    const { subject, week_day, time } = request.query;

    if (!week_day || !subject || !time) {
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    }

    const timeInMinutes = convertHourToMinutes(String(time));

    if (!timeInMinutes)
      return response.status(400).json({ error: 'Invalid filters' });

    const classes = await this.database('classes')
      .whereExists((query) => {
        query
          .select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', String(subject))
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await this.database.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const userId = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id: userId,
      });

      const classId = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
        return {
          class_id: classId,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response
        .status(201)
        .json({ class: classId, schedule: classSchedule });
    } catch (err) {
      await trx.rollback();

      console.error(err);

      return response.status(400).json({
        erro: 'Unexpected error while creating new class',
      });
    }
  }
}

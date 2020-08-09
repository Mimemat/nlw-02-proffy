import { Router } from 'express';

import { ClassesController } from './controllers/ClassesController';
import { ConnectionsController } from './controllers/ConnectionsController';
import { db } from './db/connection';

const classesController = new ClassesController(db);

const connectionsController = new ConnectionsController(db);

const router = Router();

router.post('/classes', (req, res) => classesController.create(req, res));

router.get('/classes', (req, res) => classesController.index(req, res));

router.get('/allClasses', (req, res) => classesController.show(req, res));

router.post('/connections', (req, res) =>
  connectionsController.create(req, res)
);

router.get('/connections', (req, res) => connectionsController.index(req, res));

export { router };

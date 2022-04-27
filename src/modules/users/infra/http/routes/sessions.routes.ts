import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsCrontroller = new SessionsController();

sessionsRouter.post('/', sessionsCrontroller.create);

export default sessionsRouter;

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppoitmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appiontmentsController = new AppoitmentsController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appiontmentsController.create);

export default appointmentsRouter;

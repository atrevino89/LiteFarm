import rolesController from '../controllers/rolesController.js';

import { Router as ExpressRouter } from 'express';
import { Route } from './routes.interfaces.js';

export default (router: ExpressRouter): Route => ({
  path: '/roles',
  loader: (): ExpressRouter => {
    router.get('/', rolesController.getRoles());

    return router;
  },
});

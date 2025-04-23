import loginController from '../controllers/loginController.js';
import checkGoogleJwt from '../middleware/acl/checkGoogleJwt.js';

import { Router as ExpressRouter } from 'express';
import { Route } from './routes.interfaces.js';

export default (router: ExpressRouter): Route => ({
  path: '/login',
  loader: (): ExpressRouter => {
    router.post('/google', checkGoogleJwt, loginController.loginWithGoogle());
    router.post('/', loginController.authenticateUser());
    router.get('/user/:email', loginController.getUserNameByUserEmail());

    return router;
  },
});

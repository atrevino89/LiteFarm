/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (userRoute.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import passwordResetController from '../controllers/passwordResetController.js';
import checkResetPasswordJwt from '../middleware/acl/checkResetPasswordJwt.js';
import checkResetPasswordTokenContent from '../middleware/acl/checkResetPasswordTokenContent.js';

import { Router as ExpressRouter } from 'express';
import { Route } from './routes.interfaces.js';

export default (router: ExpressRouter): Route => ({
  path: '/password_reset',
  loader: (): ExpressRouter => {
    router.post('/send_email', passwordResetController.sendResetEmail());

    router.get(
      '/validate',
      checkResetPasswordJwt,
      checkResetPasswordTokenContent,
      passwordResetController.validateToken(),
    );

    router.put(
      '/',
      checkResetPasswordJwt,
      checkResetPasswordTokenContent,
      passwordResetController.resetPassword(),
    );

    return router;
  },
});

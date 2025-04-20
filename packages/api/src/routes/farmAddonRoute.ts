/*
 *  Copyright 2025 LiteFarm.org
 *  This file is part of LiteFarm.
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

import checkScope from '../middleware/acl/checkScope.js';
import { checkFarmAddon } from '../middleware/validation/checkFarmAddon.js';
import FarmAddonController from '../controllers/farmAddonController.js';
import hasFarmAccess from '../middleware/acl/hasFarmAccess.js';

import { Router as ExpressRouter} from 'express';
import { Route } from './routes.interfaces.js';

export default (router: ExpressRouter): Route => ({
  path: '/farm_addon',
  loader: (): ExpressRouter => {
    router.post(
      '/',
      checkScope(['add:farm_addon']),
      checkFarmAddon(),
      FarmAddonController.addFarmAddon(),
    );

    router.get('/', checkScope(['get:farm_addon']), FarmAddonController.getFarmAddon());

    router.delete(
      '/:id',
      hasFarmAccess({ tableName: 'farm_addon' }),
      checkScope(['delete:farm_addon']),
      FarmAddonController.deleteFarmAddon(),
    );

    return router;
  }
});

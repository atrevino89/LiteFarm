/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (productRoute.js) is part of LiteFarm.
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
import productController from './../controllers/productController.js';
import hasFarmAccess from '../middleware/acl/hasFarmAccess.js';
import { checkProductValidity } from '../middleware/validation/checkProductValidity.js';

import { Router as ExpressRouter } from 'express';
import { Route } from './routes.interfaces.js';

export default (router: ExpressRouter): Route => ({
  path: '/product',
  loader: (): ExpressRouter => {
    // Get the crop on a bed
    router.get(
      '/farm/:farm_id',
      hasFarmAccess({ params: 'farm_id' }),
      productController.getProductsByFarm(),
    );

    router.post(
      '/',
      checkScope(['add:product']),
      checkProductValidity(),
      productController.addProduct(),
    );

    router.patch(
      '/:product_id',
      hasFarmAccess({ params: 'product_id' }),
      checkScope(['edit:product']),
      checkProductValidity(),
      productController.updateProduct(),
    );

    return router;
  },
});

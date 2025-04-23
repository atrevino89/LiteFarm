/*
 *  Copyright 2024 LiteFarm.org
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
import CustomAnimalBreedController from '../controllers/customAnimalBreedController.js';
import checkScope from '../middleware/acl/checkScope.js';
import { Router as ExpressRouter } from 'express';
import { Route } from './routes.interfaces.js';

export default (router: ExpressRouter): Route => ({
  path: '/custom_animal_breeds',
  loader: (): ExpressRouter => {
   router.get(
     '/',
     checkScope(['get:animal_breeds']),
     CustomAnimalBreedController.getCustomAnimalBreeds(),
   );

   router.post(
     '/',
     checkScope(['add:animal_breeds']),
     CustomAnimalBreedController.addCustomAnimalBreed(),
   );
   return router;
  },
});

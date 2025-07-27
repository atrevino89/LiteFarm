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
import IrrigationPrescriptionRequestController from '../controllers/irrigationPrescriptionRequestController.js';
import checkSchedulerJwt from '../middleware/acl/checkSchedulerJwt.js';
import checkSchedulerPermission from '../middleware/acl/checkSchedulerPermission.js';


export default (router) => ({
  path: '', // TODO: this route didn't state any path, might be a placedholder route
  loader: () => {
    router.post(
      '/',
      checkScope(['get:smart_irrigation']),
      IrrigationPrescriptionRequestController.initiateFarmIrrigationPrescription(),
    );

    router.post(
      '/scheduler',
      checkSchedulerJwt,
      checkSchedulerPermission('requestScheduledEndpoint'),
      IrrigationPrescriptionRequestController.initiateFarmIrrigationPrescription(true),
    );

    return router;
  },
});

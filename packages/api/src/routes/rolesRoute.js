import rolesController from '../controllers/rolesController.js';


export default (router) => ({
  path: '/roles',
  loader: () => {
    router.get('/', rolesController.getRoles());

    return router;
  },
});

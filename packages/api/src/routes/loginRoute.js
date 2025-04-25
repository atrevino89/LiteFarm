import loginController from '../controllers/loginController.js';
import checkGoogleJwt from '../middleware/acl/checkGoogleJwt.js';


export default (router) => ({
  path: '/login',
  loader: () => {
    router.post('/google', checkGoogleJwt, loginController.loginWithGoogle());
    router.post('/', loginController.authenticateUser());
    router.get('/user/:email', loginController.getUserNameByUserEmail());

    return router;
  },
});

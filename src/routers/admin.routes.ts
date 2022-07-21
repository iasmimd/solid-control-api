import { Router } from 'express';
import AdminController from '../controller/userAdmin.controller';

const routes = Router();

export const adminRoutes = () => {
  routes.post('/register', AdminController.createAdmin);
  routes.post('/login', AdminController.login);
  routes.get('', AdminController.listUsers);
  routes.get('/:id', AdminController.listOneUser);
  routes.patch('/:id', AdminController.update);
  routes.delete('/:id', AdminController.delete);

  return routes;
};

import { Router as ExpressRouter} from 'express';

export interface Route {
  path: string;
  loader: () => ExpressRouter;
}

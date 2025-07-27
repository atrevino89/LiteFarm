
export interface Route {
  path: string;
  loader: () => ExpressRouter;
}

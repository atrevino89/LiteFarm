import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import {Router as ExpressRouter} from 'express';
import { Route } from './routes.interfaces.js';

export const getRouteFiles = (): string[] => {
  // get the dir name from the actual index.ts file
  // that hosts the many different routes
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const routesPath = path.join(__dirname);
  return fs.readdirSync(routesPath)
          .map((f) => path.join(routesPath, f))
          .filter(i => i.includes('Route'))
}

export const loadRouteFromFile = async (file: string, expressRouter: ExpressRouter) => {
    // skip already loaded routes or identify
    // files that are being deprecated for
    // the api in an upcoming release
    const skipRoutes = [
      'loginRoute.ts',
      'passwordResetRoute.ts',
      'animalGroupRoute.ts', // TODO: this one wasn't included in the original server.ts 
    ];

    if (!skipRoutes.includes(file)) {
      try {
        const routerModule = await import(file);
        const routerInstance:Route = routerModule.default(expressRouter);

        return routerInstance;
      } catch (error) {
        console.log(`Error while loading the route from ${file}`);
        console.log(error);
      }
    }
  }

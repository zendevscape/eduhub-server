import 'reflect-metadata';
import config from './core/config';
import { loadExpress, loadTypeorm } from './core/loaders';

async function main() {
  await loadTypeorm();
  const app = loadExpress();
  app.listen(config.port);
}

main();

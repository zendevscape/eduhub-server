import 'reflect-metadata';
import config from './core/config';
import { loadExpress, loadTypeOrm } from './core/loaders';

async function main() {
  await loadTypeOrm();
  const app = loadExpress();
  app.listen(config.port);
}

main();

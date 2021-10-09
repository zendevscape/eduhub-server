import 'reflect-metadata';
import config from './core/config';
import { loadExpress, loadTypeorm } from './core/loaders';
async function main() {
  try {
    await loadTypeorm();
    const app = loadExpress();
    app.listen(config.port, () => {
      console.log(`Now running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    console.log('Unable to connect to port', config.port);
  }
}

main();

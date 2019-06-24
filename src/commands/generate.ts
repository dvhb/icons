import { Base } from '../base';
import { runCommand } from '../utils';

export default class Generate extends Base {
  static description = 'generate react components from svg icons';

  static examples = [`$ dvhb-icons generate`];

  static flags = {
    ...Base.flags,
  };

  async run() {
    runCommand('npx', [
      '@svgr/cli',
      '--icon',
      '--template',
      'src/svgrTemplate.js',
      '--ext',
      'tsx',
      '-d',
      'components/',
      'icons/',
    ]);
  }
}

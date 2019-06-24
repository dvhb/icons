import { flags } from '@oclif/command';
import { Base } from '../base';
import { runCommand } from '../utils';

export default class Generate extends Base {
  static description = 'generate react components from svg icons';

  static examples = [`$ dvhb-icons generate`];

  static flags = {
    ...Base.flags,
    components: flags.string({ char: 'c', description: 'components folder', required: true, default: 'components' }),
  };

  async run() {
    const { flags } = this.parse(Generate);
    const { icons, components } = flags;
    runCommand('npx', [
      '@svgr/cli',
      '--icon',
      '--template',
      'src/svgrTemplate.js',
      '--ext',
      'tsx',
      '-d',
      components,
      icons,
    ]);
  }
}

import { Command, flags } from '@oclif/command';
import { runCommand } from '../utils';

export default class Generate extends Command {
  static description = 'generate react components from svg icons';

  static examples = [`$ dvhb-icons generate`];

  static flags = {
    help: flags.help({ char: 'h' }),
    dest: flags.string({ char: 'd', description: 'icons folder', required: true, default: 'icons' }),
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

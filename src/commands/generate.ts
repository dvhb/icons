import { flags } from '@oclif/command';
import { Base } from '../base';
import { runCommand } from '../utils';

export default class Generate extends Base {
  static description = 'generate react components from svg icons';

  static examples = [`$ dvhb-icons generate`];

  static flags = {
    ...Base.flags,
    components: flags.string({ char: 'c', description: 'components folder', required: true, default: 'components' }),
    template: flags.string({ char: 't', description: 'template for icon files', required: true, default: 'template' }),
    native: flags.boolean({ char: 'n', description: 'generate icons for react-native', default: false }),
  };

  flags = this.parse(Generate).flags;

  async generateIcons() {
    const { components, icons, template, native } = this.flags;
    return runCommand('npx', [
      '@svgr/cli',
      '--icon',
      '--template',
      template,
      '--ext',
      'tsx',
      '-d',
      components,
      icons,
      native ? '--native' : '',
    ]);
  }

  async run() {
    await this.generateIcons();
  }
}

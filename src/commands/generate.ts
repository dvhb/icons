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
  };

  flags = this.parse(Generate).flags;

  async generateIcons() {
    const { components, icons, template } = this.flags;
    return runCommand('npx', ['@svgr/cli', '--icon', '--template', template, '--ext', 'tsx', '-d', components, icons]);
  }

  async generateIndex() {
    const { components } = this.flags;
    return runCommand('npx', ['create-index', components, '--extensions', 'tsx']);
  }

  async run() {
    await this.generateIcons();
    await this.generateIndex();
  }
}

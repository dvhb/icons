import { flags, Command } from '@oclif/command';

export abstract class Base extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    icons: flags.string({ char: 'i', description: 'icons folder', required: true, default: 'icons' }),
  };
}

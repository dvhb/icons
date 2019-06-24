import { flags, Command } from '@oclif/command';

export abstract class Base extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    dest: flags.string({ char: 'd', description: 'icons folder', required: true, default: 'icons' }),
  };
}

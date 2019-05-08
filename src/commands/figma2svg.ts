import { Command, flags } from '@oclif/command';
import { Client, Document } from 'figma-js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as pascalcase from 'pascalcase';
import { resolve } from 'path';
import { fetchSvg } from '../utils';

export default class Figma2svg extends Command {
  static description = 'extract svg icons from figma';

  static examples = [`$ dvhb-icons figma2svg`];

  static flags = {
    help: flags.help({ char: 'h' }),
    token: flags.string({ char: 't', description: 'figma token', required: true, env: 'FIGMA_TOKEN' }),
    fileId: flags.string({ char: 'f', description: 'figma fileId', required: true, env: 'FIGMA_FILE_ID' }),
    page: flags.string({ char: 'p', description: 'figma page', required: true, default: 'Icons', env: 'FIGMA_PAGE' }),
    dest: flags.string({ char: 'd', description: 'icons folder', required: true, default: 'icons' }),
  };

  parserOutput = this.parse(Figma2svg);

  client = Client({ personalAccessToken: this.parserOutput.flags.token });

  async getDocument() {
    try {
      const { data } = await this.client.file(this.parserOutput.flags.fileId);
      return data.document;
    } catch (e) {
      this.error(e);
    }
  }

  async getImageUrls(ids: string[]) {
    try {
      const { data } = await this.client.fileImages(this.parserOutput.flags.fileId, {
        ids,
        scale: 1,
        format: 'svg',
      });
      return data.images;
    } catch (e) {
      this.error(e);
    }
  }

  async findComponents(document: Document) {
    const { flags } = this.parserOutput;
    const pageWithSvg = document.children.find(child => child.type === 'CANVAS' && child.name === flags.page);
    if (!pageWithSvg || !('children' in pageWithSvg)) return {};
    return pageWithSvg.children.reduce<{ [id: string]: string }>((acc, { id, type, name }) => {
      if (type === 'COMPONENT') {
        acc[id] = name;
      }
      return acc;
    }, {});
  }

  async run() {
    const { flags } = this.parserOutput;

    if (!existsSync(flags.dest)) mkdirSync(flags.dest);

    const document = await this.getDocument();
    if (!document) return;

    const components = await this.findComponents(document);

    const urls = await this.getImageUrls(Object.keys(components));
    if (!urls) return;

    Object.keys(urls).forEach(async key => {
      writeFileSync(resolve(flags.dest, `${pascalcase(components[key])}.svg`), await fetchSvg(urls[key]));
    });
  }
}

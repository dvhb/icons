import { flags } from '@oclif/command';
import { Client, Document } from 'figma-js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as pascalcase from 'pascalcase';
import { resolve } from 'path';
import { Base } from '../base';
import { fetchSvg, showError, showInfo } from '../utils';

export default class Figma2svg extends Base {
  static description = 'extract svg icons from figma';

  static examples = [`$ dvhb-icons figma2svg`];

  static flags = {
    ...Base.flags,
    token: flags.string({ char: 't', description: 'figma token', required: true, env: 'FIGMA_TOKEN' }),
    fileId: flags.string({ char: 'f', description: 'figma fileId', required: true, env: 'FIGMA_FILE_ID' }),
    page: flags.string({ char: 'p', description: 'figma page', required: true, default: 'Icons', env: 'FIGMA_PAGE' }),
  };

  flags = this.parse(Figma2svg).flags;

  client = Client({ personalAccessToken: this.flags.token });

  async getDocument() {
    try {
      const { data } = await this.client.file(this.flags.fileId);
      return data.document;
    } catch (e) {
      this.error(e);
    }
  }

  async getImageUrls(ids: string[]) {
    try {
      const { data } = await this.client.fileImages(this.flags.fileId, {
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
    const pageWithSvg = document.children.find(child => child.type === 'CANVAS' && child.name === this.flags.page);
    if (!pageWithSvg || !('children' in pageWithSvg)) return {};
    return pageWithSvg.children.reduce<{ [id: string]: string }>((acc, { id, type, name }) => {
      if (type === 'COMPONENT') {
        acc[id] = name;
      }
      return acc;
    }, {});
  }

  async run() {
    showInfo('Starting export');
    if (!existsSync(this.flags.dest)) {
      showInfo(`Creating folder "${this.flags.dest}"`);
      mkdirSync(this.flags.dest);
    }

    showInfo('Fetching document');
    const document = await this.getDocument();
    if (!document) {
      showError('No document found');
      return;
    }

    const components = await this.findComponents(document);

    showInfo(`Found ${Object.keys(components).length} icons`);

    showInfo('Fetching icons');
    const urls = await this.getImageUrls(Object.keys(components));
    if (!urls) {
      showError('No icons found');
      return;
    }

    showInfo('Writing icons to files');
    Object.keys(urls).forEach(async key => {
      writeFileSync(resolve(this.flags.dest, `${pascalcase(components[key])}.svg`), await fetchSvg(urls[key]));
    });

    showInfo('Finish export');
  }
}

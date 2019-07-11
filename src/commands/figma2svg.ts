import { flags } from '@oclif/command';
import { Client, Document, Node } from 'figma-js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Base } from '../base';
import { fetchSvg, isNumber, last, showError, showInfo, toCamelCase } from '../utils';

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

  iconNamesRepetitionRate: { [key: string]: number | undefined } = {};

  createUniqueIconName(name: string) {
    const rate = this.iconNamesRepetitionRate[name];
    if (isNumber(rate)) {
      this.iconNamesRepetitionRate[name] = rate + 1;
      return `${name}${rate + 1}`;
    }
    this.iconNamesRepetitionRate[name] = 0;
    return name;
  }

  extractIcons(node?: Node): { [id: string]: string } {
    if (!node || !('children' in node)) return {};
    return node.children.reduce((acc, child) => {
      const { id, type, name } = child;
      if (type === 'COMPONENT' || type === 'INSTANCE') {
        return { ...acc, [id]: this.createUniqueIconName(name) };
      }
      if (type === 'FRAME') {
        return { ...acc, ...this.extractIcons(child) };
      }
      return acc;
    }, {});
  }

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
    const canvas = document.children.find(child => child.type === 'CANVAS' && child.name === this.flags.page);
    return this.extractIcons(canvas);
  }

  formatIconName = (component: string) => {
    const name = last(component.split('/'));
    const isValidName = /^\w+$/.test(name);
    if (!isValidName) {
      showError(`Icon name "${name}" contains non-english letters`);
    }
    return `${toCamelCase(name)}.svg`;
  };

  async run() {
    showInfo('Starting export');
    if (!existsSync(this.flags.icons)) {
      showInfo(`Creating folder "${this.flags.icons}"`);
      mkdirSync(this.flags.icons);
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
      writeFileSync(resolve(this.flags.icons, this.formatIconName(components[key])), await fetchSvg(urls[key]));
    });

    showInfo('Finish export');
  }
}

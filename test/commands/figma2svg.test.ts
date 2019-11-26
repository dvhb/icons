import { expect, test } from '@oclif/test';

describe('figma2svg', () => {
  test
    .stdout()
    .command(['figma2svg'])
    .it('runs figma2svg', ctx => {
      expect(ctx.stdout).to.contain('Finish export');
    });
});

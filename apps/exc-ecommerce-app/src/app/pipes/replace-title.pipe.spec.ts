import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { ReplaceTitlePipe } from './replace-title.pipe';

describe('ReplaceTitlePipe ', () => {
  let spectator: SpectatorPipe<ReplaceTitlePipe>;
  const createPipe = createPipeFactory(ReplaceTitlePipe);

  it('should change the background color', () => {
    spectator = createPipe(`<div>{{ 'Testing' | replaceTitle }}</div>`);

    expect(spectator.element).toHaveText('Testing');
  });
});

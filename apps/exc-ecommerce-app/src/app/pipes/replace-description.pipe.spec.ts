import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { ReplaceDescriptionPipe } from './replace-description.pipe';

describe('ReplaceDescriptionPipe ', () => {
  let spectator: SpectatorPipe<ReplaceDescriptionPipe>;
  const createPipe = createPipeFactory(ReplaceDescriptionPipe);

  it('should change the background color', () => {
    spectator = createPipe(`<div>{{ 'Testing' | replaceDescription }}</div>`);

    expect(spectator.element).toHaveText('Testing');
  });
});

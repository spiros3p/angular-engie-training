import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { UnitPipe } from './unit.pipe';

describe('UnitPipe ', () => {
  let spectator: SpectatorPipe<UnitPipe>;
  const createPipe = createPipeFactory(UnitPipe);

  it('should append units', () => {
    spectator = createPipe(`<div>{{ '0' | unit }}</div>`);

    expect(spectator.element).toContainText('0 units');
  });
});

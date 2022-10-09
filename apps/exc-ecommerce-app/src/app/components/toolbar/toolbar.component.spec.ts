import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let spectator: Spectator<ToolbarComponent>;
  const createComponent = createComponentFactory(ToolbarComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

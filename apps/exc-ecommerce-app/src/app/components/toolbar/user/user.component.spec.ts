import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let spectator: Spectator<UserComponent>;
  const createComponent = createComponentFactory(UserComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

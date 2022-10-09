import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let spectator: Spectator<CartComponent>;
  const createComponent = createComponentFactory(CartComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

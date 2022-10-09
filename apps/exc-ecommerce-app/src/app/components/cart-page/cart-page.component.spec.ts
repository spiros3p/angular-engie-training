import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { CartPageComponent } from './cart-page.component';

describe('CartPageComponent', () => {
  let spectator: Spectator<CartPageComponent>;
  const createComponent = createComponentFactory(CartPageComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

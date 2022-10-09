import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ItemFormModalComponent } from './item-form-modal.component';

describe('AddItemComponent', () => {
  let spectator: Spectator<ItemFormModalComponent>;
  const createComponent = createComponentFactory(ItemFormModalComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

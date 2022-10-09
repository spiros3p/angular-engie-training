import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { EditQuantityFormComponent } from './edit-quantity-form.component';

describe('EditQuantityFormComponent', () => {
  let spectator: Spectator<EditQuantityFormComponent>;
  const createComponent = createComponentFactory(EditQuantityFormComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

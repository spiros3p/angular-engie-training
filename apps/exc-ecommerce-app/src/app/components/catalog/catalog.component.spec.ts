import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let spectator: Spectator<CatalogComponent>;
  const createComponent = createComponentFactory(CatalogComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

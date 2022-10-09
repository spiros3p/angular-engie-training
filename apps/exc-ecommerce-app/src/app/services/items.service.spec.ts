import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let spectator: SpectatorService<ItemsService>;
  const createService = createServiceFactory(ItemsService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
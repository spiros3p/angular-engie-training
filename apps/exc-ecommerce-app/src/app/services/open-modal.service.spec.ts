import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { OpenModalService } from './open-modal.service';

describe('OpenModalService', () => {
  let spectator: SpectatorService<OpenModalService>;
  const createService = createServiceFactory(OpenModalService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});
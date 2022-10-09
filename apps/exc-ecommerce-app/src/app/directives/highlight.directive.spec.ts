import {
  createDirectiveFactory,
  SpectatorDirective,
} from '@ngneat/spectator/jest';

import { DirectivesModule } from './directives.module';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let spectator: SpectatorDirective<HighlightDirective>;
  const createDirective = createDirectiveFactory({
    imports: [DirectivesModule],
    directive: HighlightDirective,
    declareDirective: false,
  });

  it('should change the background color', () => {
    spectator = createDirective(
      `<div highlight>Testing HighlightDirective</div>`
    );

    spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    expect(spectator.element).toHaveStyle({
      backgroundColor: 'lightgray',
    });

    spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    expect(spectator.element).toHaveStyle({
      backgroundColor: 'white',
    });
  });
});

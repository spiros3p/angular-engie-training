import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';

import { Item } from '../../../models/item.model';
import { ItemCatalogComponent } from './item-catalog.component';

describe('ItemCatalogComponent', () => {
  let spectator: Spectator<ItemCatalogComponent>;
  const createComponent = createComponentFactory(ItemCatalogComponent);

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('Should display a catalog item', () => {
    spectator = createComponent();

    const item: Item = {
      id: '21',
      name: 'Nutella',
      description: 'A 350g jar of hazelnut spread',
      quantity: 10,
      pictureUrl:
        'https://vicofoodbox.com/wp-content/uploads/2021/06/BL077.jpg',
      dateAdded: '2022-09-24T16:10:18.053Z',
      dateUpdated: '',
      price: 7,
    };

    spectator.setInput('item', item);

    const itemSingle = spectator.query(byTestId('item'));
    expect(itemSingle).toContainText(item.name);
    expect(itemSingle).toContainText(item.description + '');
    expect(itemSingle).toContainText(item.quantity + '');
    expect(itemSingle).toContainText(item.pictureUrl + '');
    expect(itemSingle).toContainText(item.dateAdded + '');
    expect(itemSingle).toContainText(item.dateUpdated + '');
    expect(itemSingle).toContainText(item.price + '');
  });
});

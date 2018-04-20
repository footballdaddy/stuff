import React from 'react';

/*Components*/
import SellPanel from './SellPanel';
import BuyPanel from './BuyPanel';
import DialogBox from './DialogBox';

/*Data array*/
import { weapons } from '../data/weapons.js';
import { armory } from '../data/armory.js';

const Shop = () => (
  <div>
    <SellPanel gamelocation="blacksmith" />
    <div className="location-box">
      <div className="blacksmith" />
      <DialogBox gamelocation="blacksmith" />
    </div>
    <BuyPanel items={[...weapons, ...armory]} gamelocation="blacksmith" />
  </div>
);

export default Shop;

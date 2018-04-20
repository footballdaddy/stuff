const initialState = {
  inventory: [],
};

export const upgradeItem = item => ({
  type: 'UPGRADE_ITEM',
  item,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BUY_ITEM':
    case 'UNEQUIP_ITEM':
      const addedItem = state.inventory.filter(
        item => item.id === action.item.id,
      );

      const addedIndex = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);

      return addedItem.length === 0
        ? Object.assign({}, state, {
            inventory: [...state.inventory, { ...action.item, quantity: 1 }],
          })
        : Object.assign({}, state, {
            inventory: Object.assign([...state.inventory], {
              [addedIndex]: {
                ...action.item,
                quantity: ++addedItem[0].quantity,
              },
            }),
          });
    case 'UPGRADE_ITEM':
      let addedItem1 = state.inventory.filter(
        item => item.id === action.item.id,
      );

      let addedIndex1 = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);

      return Object.assign({}, state, {
        inventory: Object.assign([...state.inventory], {
          [addedIndex1]: {
            ...action.item,
            upgradeTimes: ++addedItem1[0].upgradeTimes,
          },
        }),
      });
    case 'SELL_ITEM':
    case 'EQUIP_ITEM':
      const removedIndex = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);
      return action.item.quantity > 1
        ? Object.assign({}, state, {
            inventory: Object.assign([...state.inventory], {
              [removedIndex]: {
                ...action.item,
                quantity: --action.item.quantity,
              },
            }),
          })
        : {
            ...state,
            inventory: [
              ...state.inventory.slice(0, removedIndex),
              ...state.inventory.slice(removedIndex + 1),
            ],
          };
    case 'END_GAME':
      return state;

    default:
      return state;
  }
};

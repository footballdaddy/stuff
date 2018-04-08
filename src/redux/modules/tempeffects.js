const initialState = {
  temporaryEffects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EFFECT':
      return {
        ...state,
        temporaryEffects: [...state.temporaryEffects, action.item.effect],
      };
    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        temporaryEffects: [],
      };

    default:
      return state;
  }
};

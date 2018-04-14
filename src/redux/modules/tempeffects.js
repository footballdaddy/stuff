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
    case 'REMOVE_SKILL_EFFECTS':
      console.log('Hi');
      const arraybox = state.temporaryEffects.filter(
        skill => skill.statIncrease != action.key,
      );
      return {
        ...state,
        temporaryEffects: arraybox,
      };
    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return state;

    default:
      return state;
  }
};

const initialState = {
  strength: {
    name: 'strength',
    rate: 1,
    currentCoolDown: 0,
    baseCoolDown: 4,
    activeCoolDown: 0,
    baseActiveCoolDown: 2,
    effect: {
      statIncrease: 'strength',
      value: 500,
    },
    isActive: 'false',
  },
  agility: {
    name: 'agility',
    rate: 1,
    currentCoolDown: 0,
    baseCoolDown: 8,
    activeCoolDown: 0,
    baseActiveCoolDown: 3,
    effect: {
      statIncrease: 'agility',
      value: 5,
    },
    isActive: 'false',
  },
  defense: {
    name: 'defense',
    rate: 1,
    currentCoolDown: 0,
    baseCoolDown: 6,
    activeCoolDown: 0,
    baseActiveCoolDown: 3,
    effect: {
      statIncrease: 'defense',
      value: 500,
    },
    isActive: 'false',
  },
  heal: {
    name: 'heal',
    rate: 1,
    currentCoolDown: 0,
    baseCoolDown: 45,
    activeCoolDown: 0,
    baseActiveCoolDown: 0,
    restore: 50,
    isActive: 'false',
  },
};
// to fix
export const calculateActiveCoolDown = key => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.skills[key].activeCoolDown > 0) {
      // console.log('billy');
      dispatch({ type: 'DECREMENT_ACTIVE_COOLDOWN', key });
    } else {
      dispatch({ type: 'REMOVE_SKILL_EFFECTS', key });
      dispatch({ type: 'CALCULATE_ATTRIBUTE_BONUS' });
    }
  };
};

export const decrementCoolDown = (key, changeTime) => ({
  type: 'DECREMENT_COOLDOWN',
  key,
  changeTime,
});
export const decrementActiveCoolDown = key => ({
  type: 'DECREMENT_ACTIVE_COOLDOWN',
  key,
});

export const startSkill = key => ({
  type: 'START_SKILL',
  key,
});
export const stopSkill = key => ({
  type: 'STOP_SKILL',
  key,
});

export const removeSkillEffects = key => ({
  type: 'REMOVE_SKILL_EFFECTS',
  key,
});

export const calculateChangeTime = changeTime => ({
  type: 'CALCULATE_CHANGE_TIME',
  changeTime,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_SKILL':
      if (state[action.key].currentCoolDown <= 0) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            currentCoolDown: state[action.key].baseCoolDown,
            activeCoolDown: state[action.key].baseActiveCoolDown,
            isActive: 'true',
          },
        };
      } else {
        return state;
      }
    case 'REMOVE_EFFECT':
    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return state;
    case 'DECREMENT_COOLDOWN':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          currentCoolDown:
            state[action.key].currentCoolDown - action.changeTime,
        },
      };
    case 'DECREMENT_ACTIVE_COOLDOWN':
      if (state[action.key].activeCoolDown > 0) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            activeCoolDown: state[action.key].activeCoolDown - 1,
          },
        };
      } else {
        return state;
      }

    case 'STOP_SKILL':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          isActive: '',
        },
      };
    // case 'START_SKILL':
    //   return {
    //     ...state,
    //     [action.key]: {
    //       ...state[action.key],
    //       isActive: 'true',
    //     },
    //   };
    default:
      return state;
  }
};

const initialState = {
  punch: {
    name: 'punch',
    rate: 1,
    currentCoolDown: 0,
    baseCoolDown: 5,
    activeCoolDown: 0,
  },
  kick: {
    name: 'kick',
    rate: 1,
    currentCoolDown: 0,
    baseCoolDown: 45,
    activeCoolDown: 0,
  },
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

export const calculateChangeTime = changeTime => ({
  type: 'CALCULATE_CHANGE_TIME',
  changeTime,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EFFECT':
      if (state[action.key].currentCoolDown <= 0) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            currentCoolDown: state[action.key].baseCoolDown,
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
      if (state[action.key].activeCoolDown >= 0) {
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

    case 'START_SKILL':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          currentCooldown: state[action.key].baseCoolDown,
        },
      };
    default:
      return state;
  }
};

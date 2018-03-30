// Imports ---------------------------------------------------------------------

// Type Constants --------------------------------------------------------------
const INCREMENT_STAT = 'gotg/stat/INCREMENT_STAT';
const DECREMENT_STAT = 'gotg/stat/DECREMENT_STAT';
const INCREMENT_VALUE = 'gotg/stat/INCREMENT_VALUE';
const START_GAME = 'gotg/stat/START_GAME';
const CALCULATE_ATTACK = 'gotg/stat/CALCULATE_ATTACK';

// Actions ---------------------------------------------------------------------

export const incrementStat = (stat, rate) => ({
  type: INCREMENT_STAT,
  stat,
  rate,
});
export const decrementStat = (stat, rate) => ({
  type: DECREMENT_STAT,
  stat,
  rate,
});
export const incrementValue = (key, value) => ({
  type: INCREMENT_VALUE,
  key,
  value,
});
export const startGame = () => ({
  type: START_GAME,
});

export const calculateAttack = value => ({
  type: CALCULATE_ATTACK,
  value,
});
// Reducer ---------------------------------------------------------------------
const initialState = {
  energy: {
    rate: 0,
    value: 10,
    maxValue: 10,
  },
  attack: {
    stat: 0,
  },
  defense: {
    stat: 0,
  },
  regularstrength: {
    rate: 0,
    level: 1,
    value: 1,
  },
  lesserstrength: {
    rate: 0,
    level: 1,
    value: 1000,
  },
  greaterstrength: {
    rate: 0,
    level: 1,
    value: 2000,
  },
  ultimatestrength: {
    rate: 0,
    level: 1,
    value: 10000,
  },
};

export default function statReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_VALUE:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          level: action.value + state[action.key].level,
        },
      };

    case INCREMENT_STAT:
      if (state.energy.value <= 0) {
        return state;
      } else {
        return {
          ...state,
          [action.stat]: {
            ...state[action.stat],
            rate: state[action.stat].rate + action.rate,
          },
          energy: {
            ...state.energy,
            value: state.energy.value - action.rate,
          },
        };
      }

    case DECREMENT_STAT:
      if (state[action.stat].rate <= 0) {
        return state;
      } else {
        return {
          ...state,
          [action.stat]: {
            ...state[action.stat],
            rate: state[action.stat].rate - action.rate,
          },
          energy: {
            ...state.energy,
            value: state.energy.value + action.rate,
          },
        };
      }
    case CALCULATE_ATTACK:
      return {
        ...state,
        attack: { ...state.attack, stat: action.value },
      };
    default:
      return state;
  }
}

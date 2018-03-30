// Imports ---------------------------------------------------------------------

// Type Constants --------------------------------------------------------------
const INCREMENT_STAT = 'gotg/stat/INCREMENT_STAT';
const DECREMENT_STAT = 'gotg/stat/DECREMENT_STAT';
const INCREMENT_VALUE = 'gotg/stat/INCREMENT_VALUE';
const CALCULATE_ATTACK = 'gotg/stat/CALCULATE_ATTACK';
const CALCULATE_DEFENSE = 'gotg/stat/CALCULATE_DEFENSE';

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

export const calculateAttack = value => ({
  type: CALCULATE_ATTACK,
  value,
});
export const calculateDefense = value => ({
  type: CALCULATE_DEFENSE,
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
  health: {
    stat: 0,
  },
  healthregen: {
    stat: 0,
  },
  regularstrength: {
    rate: 0,
    level: 1,
    value: 1,
    stattype: 'strength',
  },
  lesserstrength: {
    rate: 0,
    level: 1,
    value: 1000,
    stattype: 'strength',
  },
  greaterstrength: {
    rate: 0,
    level: 1,
    value: 2000,
    stattype: 'strength',
  },
  ultimatestrength: {
    rate: 0,
    level: 1,
    value: 10000,
    stattype: 'strength',
  },
  regulardefense: {
    rate: 0,
    level: 1,
    value: 1,
    stattype: 'defense',
  },
  lesserdefense: {
    rate: 0,
    level: 1,
    value: 1000,
    stattype: 'defense',
  },
  greaterdefense: {
    rate: 0,
    level: 1,
    value: 2000,
    stattype: 'defense',
  },
  ultimatedefense: {
    rate: 0,
    level: 1,
    value: 10000,
    stattype: 'defense',
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
    case CALCULATE_DEFENSE:
      return {
        ...state,
        defense: { ...state.defense, stat: action.value },
      };
    default:
      return state;
  }
}

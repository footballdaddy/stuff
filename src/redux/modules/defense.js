// Imports ---------------------------------------------------------------------
import * as common from './common';
// Type Constants --------------------------------------------------------------

export const CALCULATE_DEFENSE = 'gotg/defense/CALCULATE_DEFENSE';

// Reducer ---------------------------------------------------------------------
const initialState = {
  defense: {
    stat: 0,
  },
  regulardefense: {
    rate: 0,
    level: 1,
    value: 1,
  },
  lesserdefense: {
    rate: 0,
    level: 1,
    value: 1000,
  },
  greaterdefense: {
    rate: 0,
    level: 1,
    value: 2000,
  },
  ultimatedefense: {
    rate: 0,
    level: 1,
    value: 10000,
  },
};

export default function defenseReducer(state = initialState, action) {
  switch (action.type) {
    case common.INCREMENT_VALUE:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          level: action.value + state[action.key].level,
        },
      };

    case common.INCREMENT_STAT:
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

    case common.DECREMENT_STAT:
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

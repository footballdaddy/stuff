// Imports ---------------------------------------------------------------------

// Type Constants --------------------------------------------------------------
const INCREMENT_STAT = 'gotg/stat/INCREMENT_STAT';
const DECREMENT_STAT = 'gotg/stat/DECREMENT_STAT';
const INCREMENT_VALUE = 'gotg/stat/INCREMENT_VALUE';
const START_GAME = 'gotg/stat/START_GAME';

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

// Reducer ---------------------------------------------------------------------
const initialState = {
  maxHP: 110,
  attack: 100,
  defense: 100,
  hpregen: 100,
};

export default function statReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_VALUE:
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          value: action.value + state[action.key].value,
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
    default:
      return state;
  }
}

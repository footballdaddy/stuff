// Imports ---------------------------------------------------------------------

// Type Constants --------------------------------------------------------------
const INCREMENT_STAT = 'gotg/stat/INCREMENT_STAT';
const DECREMENT_STAT = 'gotg/stat/DECREMENT_STAT';
const INCREMENT_VALUE = 'gotg/stat/INCREMENT_VALUE';
const INCREMENT_ENERGY_VALUE = 'gotg/stat/INCREMENT_ENERGY_VALUE';
const CALCULATE_ATTACK = 'gotg/stat/CALCULATE_ATTACK';
const CALCULATE_DEFENSE = 'gotg/stat/CALCULATE_DEFENSE';
const CALCULATE_SPIRIT = 'gotg/stat/CALCULATE_SPIRIT';
const CALCULATE_SPIRIT_LEVEL = 'gotg/stat/CALCULATE_SPIRIT_LEVEL';
const CALCULATE_HEALTH = 'gotg/stat/CALCULATE_HEALTH';
const CALCULATE_HEALTH_REGEN = 'gotg/stat/CALCULATE_HEALTH_REGEN';
const CALCULATE_HEALTH_LEVEL = 'gotg/stat/CALCULATE_HEALTH_LEVEL';
const CALCULATE_CAP_TRAIN = 'gotg/stat/CALCULATE_CAP_TRAIN';
const CALCULATE_REBIRTH = 'gotg/stat/CALCULATE_REBIRTH';

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
export const incrementEnergyValue = (key, value) => ({
  type: INCREMENT_ENERGY_VALUE,
  key,
  value,
});
export const calculateSpirit = value => ({
  type: CALCULATE_SPIRIT,
  value,
});
export const calculateSpiritLevel = value => ({
  type: CALCULATE_SPIRIT_LEVEL,
  value,
});
export const calculateHealth = value => ({
  type: CALCULATE_HEALTH,
  value,
});
export const calculateHealthRegen = value => ({
  type: CALCULATE_HEALTH_REGEN,
  value,
});
export const calculateHealthLevel = value => ({
  type: CALCULATE_HEALTH_LEVEL,
  value,
});
export const calculateCapTrain = (key, value) => ({
  type: CALCULATE_CAP_TRAIN,
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
export const calculateRebirth = key => ({
  type: CALCULATE_REBIRTH,
  key,
});
// Reducer ---------------------------------------------------------------------
const initialState = {
  energy: {
    rateSpirit: 1,
    value: 10,
    level: 10,
    cap: 100,
    stattype: 'energy',
  },
  rebirth: false,
  attack: {
    stat: 0,
  },
  defense: {
    stat: 0,
  },
  health: {
    stat: 100,
    currenthealth: 10,
    healthregen: 0,
  },
  healthregen: {
    stat: 0,
    level: 0,
  },
  regularstrength: {
    rate: 0,
    level: 1,
    value: 150,
    cap: 2500,
    capexp: 0,
    exp: 0,
    stattype: 'strength',
  },
  lesserstrength: {
    rate: 0,
    level: 1,
    value: 1000,
    cap: 15000,
    capexp: 0,

    exp: 0,
    stattype: 'strength',
  },
  greaterstrength: {
    rate: 0,
    level: 1,
    value: 2000,
    cap: 30000,
    capexp: 0,

    exp: 0,
    stattype: 'strength',
  },
  ultimatestrength: {
    rate: 0,
    level: 1,
    value: 10000,
    cap: 50000,
    capexp: 0,

    exp: 0,
    stattype: 'strength',
  },
  regulardefense: {
    rate: 0,
    level: 1,
    value: 1,
    exp: 0,
    cap: 2500,
    capexp: 0,

    stattype: 'defense',
  },
  lesserdefense: {
    rate: 0,
    level: 1,
    value: 1000,
    exp: 0,
    cap: 2500,
    capexp: 0,

    stattype: 'defense',
  },
  greaterdefense: {
    rate: 0,
    level: 1,
    value: 2000,
    exp: 0,
    cap: 2500,
    capexp: 0,

    stattype: 'defense',
  },
  ultimatedefense: {
    rate: 0,
    level: 1,
    value: 10000,
    exp: 0,
    cap: 2500,
    capexp: 0,

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
          exp: action.value + state[action.key].exp,
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
    case CALCULATE_HEALTH_REGEN:
      return {
        ...state,
        health: { ...state.health, healthregen: action.value / 20 },
      };
    case CALCULATE_HEALTH:
      if (state.health.currenthealth + action.value <= state.health.stat) {
        return {
          ...state,
          health: {
            ...state.health,
            currenthealth: state.health.currenthealth + action.value,
          },
        };
      } else {
        return {
          ...state,
          health: { ...state.health, currenthealth: state.health.stat },
        };
      }

    case CALCULATE_SPIRIT:
      if (state.energy.value + action.value <= state.energy.level) {
        return {
          ...state,
          energy: {
            ...state.energy,
            value: state.energy.value + action.value,
          },
        };
      } else {
        return state;
      }

    case CALCULATE_SPIRIT_LEVEL:
      if (state.energy.level + action.value <= state.energy.cap) {
        return {
          ...state,
          energy: {
            ...state.energy,
            level: state.energy.level + action.value,
            value: state.energy.value + action.value,
          },
        };
      } else {
        // console.log(state.energy.level + action.value);
        return state;
      }
    case INCREMENT_ENERGY_VALUE:
      return state;
    // case CALCULATE_REBIRTH:
    //   return {
    //     ...state,
    //     [action.stat]: {
    //       ...state[action.stat],
    //       cap: state[action.stat].cap * 0.2 *
    //       (stats[action.stat].exp /
    //         stats[strengthStat + 'strength'].cap)
    //     },
    //     energy: {
    //       ...state.energy,
    //       value: state.energy.value - action.rate,
    //     },
    //   };
    case CALCULATE_REBIRTH:
      let capLvlRate = state[action.key].exp / state[action.key].cap;
      if (0.2 * capLvlRate <= state[action.key].cap * 0.1) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            cap: state[action.key].cap - 0.2 * capLvlRate,
            exp: 0,
          },
        };
      } else {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            cap: state[action.key].cap - state[action.key].cap * 0.1,
            exp: 0,
          },
        };
      }
    default:
      return state;
  }
}

case CALCULATE_REBIRTH:
console.log('hi');
if (
  0.2 * (state[action.key].exp / state[action.key].cap) <=
  state[action.key].cap * 0.1
) {
  return {
    ...state,
    [action.key]: {
      ...state[action.key],
      exp: 0,
      cap:
        state[action.key].cap -
        state[action.key].cap *
          (0.2 * state[action.key].exp / state[action.key].cap),
    },
  };
} else {
  return {
    ...state,
    [action.key]: {
      ...state[action.key],
      exp: 0,
      cap: state[action.key].cap - state[action.key].cap * 0.1,
    },
  };
}


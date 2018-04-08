const initialState = {
  logs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_MESSAGE':
      return {
        ...state,
        logs: [...state.logs, action.message],
      };

    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        logs: [],
      };

    default:
      return state;
  }
};

const initialState = {
  exp: 0,
  level: 1,
  nextLevel: 100,
  isVictoryScreenOpen: false,
  isDefeatScreenOpen: false,
};

const levelThresholds = {
  1: 100,
  2: 200,
  3: 350,
  4: 500,
  5: 700,
  6: 1000,
  7: 1500,
  8: 2100,
  9: 3000,
  10: 4000,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'END_BATTLE_VICTORY':
      const isLevelGained =
        state.exp + action.reward.XP >= levelThresholds[state.level];

      return {
        ...state,
        level: isLevelGained ? state.level + 1 : state.level,
        exp: isLevelGained
          ? state.exp + action.reward.XP - levelThresholds[state.level]
          : state.exp + action.reward.XP,
        nextLevel: isLevelGained
          ? levelThresholds[state.level + 1]
          : state.nextLevel,
        isVictoryScreenOpen: isLevelGained ? 'with-level-up' : 'no-level-up',
        lastReward: action.reward,
      };
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        isDefeatScreenOpen: true,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        isDefeatScreenOpen: false,
        isVictoryScreenOpen: false,
      };

    case 'END_GAME':
      return {
        ...state,
        isDefeatScreenOpen: false,
        isVictoryScreenOpen: false,
      };

    default:
      return state;
  }
};

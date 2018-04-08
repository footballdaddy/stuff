export const sellItem = item => ({
  type: 'SELL_ITEM',
  item,
});

export const buyItem = item => ({
  type: 'BUY_ITEM',
  item,
});

export const equipItem = item => ({
  type: 'EQUIP_ITEM',
  item,
});

export const unequipItem = item => ({
  type: 'UNEQUIP_ITEM',
  item,
});

export const incrementAttribute = attribute => ({
  type: 'INCREMENT_ATTRIBUTE',
  attribute,
});

export const restoreHP = item => ({
  type: 'HEAL',
  item,
});
export const hpRegen = regen => ({
  type: 'HP_REGEN_BATTLE',
  regen,
});

export const calculateAttributeBonus = () => ({
  type: 'CALCULATE_ATTRIBUTE_BONUS',
});

export const dealDamage = damage => ({
  type: 'DEAL_DAMAGE',
  damage,
});

export const sufferDamage = damage => ({
  type: 'SUFFER_DAMAGE',
  damage,
});

export const innBuy = item => ({
  type: 'INN_BUY',
  item,
});

export const addEffect = item => ({
  type: 'ADD_EFFECT',
  item,
});

export const logMessage = message => ({
  type: 'LOG_MESSAGE',
  message,
});

export const addOpponentEffect = effect => ({
  type: 'ADD_OPPONENT_EFFECT',
  effect,
});

export const removeItem = item => ({
  type: 'REMOVE_ITEM',
  item,
});

export const drainLife = payload => ({
  type: 'DRAIN_LIFE',
  payload,
});

export const effectCooldown = effect => ({
  type: 'EFFECT_COOLDOWN',
  effect,
});

export const endBattleVictory = (reward, result) => ({
  type: 'END_BATTLE_VICTORY',
  reward,
  result,
});
export const endBattleDefeat = () => ({
  type: 'END_BATTLE_DEFEAT',
});

export const showDescription = item => ({
  type: 'SHOW_DESCRIPTION',
  item,
});

export const addAttributePoints = () => ({
  type: 'NEW_LEVEL_POINTS',
});

export const closeModal = result => ({
  type: 'CLOSE_MODAL',
  result,
});

export const resetValues = () => ({
  type: 'END_GAME',
});

export const progressNextEnemy = () => ({
  type: 'PROGRESS_NEXT_ENEMY',
});
export const addTrainingLevel = () => ({
  type: 'ADD_TRAINING_LEVEL',
});

export const chooseOpponent = opponent => ({
  type: 'CHOOSE_OPPONENT',
  opponent,
});

// export const chooseOpponent1 = (opponent, result) => {
//   return dispatch => {
//     if (result === 'success') {
//       dispatch(endBattleVictory(reward, result));
//     } else {
//       dispatch(endBattleDefeat());
//     }
//   };
// };

export const gameOver = () => {
  return dispatch => {
    dispatch(resetValues());
    dispatch(chooseOpponent());
  };
};

export const endBattle = (reward, result) => {
  return dispatch => {
    if (result === 'success') {
      dispatch(endBattleVictory(reward, result));
      dispatch(progressNextEnemy());
      dispatch(addTrainingLevel());
    } else {
      dispatch(endBattleDefeat());
    }
  };
};

export const updateEquip = item => ({
  type: 'UPDATE_EQUIPPED',
  item,
});

export const updateEquipped = equipped => {
  return dispatch => {
    for (var value of equipped) {
      dispatch(updateEquip(value));
    }
  };
};

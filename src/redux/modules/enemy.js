const data = require('../../data/enemyData.json');

const initialEnemy = data[0];
initialEnemy.health = initialEnemy.stats.maxHealth;
initialEnemy.isAttacking = false;
initialEnemy.isSpecialing = false;
initialEnemy.counter = 0;

export const nextEnemy = level => ({
  type: 'NEXT_ENEMY',
});

export const increaseEnemyCounter = () => ({
  type: 'INCREASE_ENEMY_COUNTER',
});

export const playerAttacks = (playerattack, enemydefense) => ({
  type: 'PLAYER_ATTACKS',
  damage: playerattack - enemydefense,
});

export const calculateEnemyHealth = value => ({
  type: 'CALCULATE_ENEMY_HEALTH',
  value,
});
const enemy = (state = initialEnemy, action) => {
  switch (action.type) {
    case 'INCREASE_ENEMY_COUNTER':
      return {
        ...state,
        counter: ++state.counter,
      };
    case 'PLAYER_ATTACKS':
      return {
        ...state,
        health: action.damage < 0 ? state.health : state.health - action.damage,
      };
    case 'CALCULATE_ENEMY_HEALTH':
      if (state.health + action.value <= state.stats.maxHealth) {
        return {
          ...state,
          health: state.health + action.value,
        };
      } else {
        return {
          ...state,
          health: state.stats.maxHealth,
        };
      }
    case 'PLAYER_SPECIALS':
      if (state.health >= 0) {
        return {
          ...state,
          health: state.health - action.damage,
        };
      } else {
        return state;
      }
    case 'PLAYER_VICTORY':
      if (data[state.counter]) {
        return Object.assign({}, data[state.counter], {
          health: data[state.counter].stats.maxHealth,
          isAttacking: false,
          isSpecialing: false,
          counter: state.counter,
        });
      } else {
        return state;
      }
    case 'ENEMY_START_ATTACK_PHASE':
      return {
        ...state,
        isAttacking: true,
      };
    case 'ENEMY_END_ATTACK_PHASE':
      return {
        ...state,
        isAttacking: false,
      };
    case 'ENEMY_START_SPECIAL_PHASE':
      return {
        ...state,
        isSpecialing: true,
      };
    case 'ENEMY_END_SPECIAL_PHASE':
      return {
        ...state,
        isSpecialing: false,
      };
    default:
      return state;
  }
};

export default enemy;

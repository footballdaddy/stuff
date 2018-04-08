const FighterTypes = ['Knight', 'Fencer', 'Paladin', 'Assassain'];
const enemyTemplate = {
  name: 'rusalka',
  engTranslation: 'Fighter',
  maxHP: 1000,
  currentHP: 1000,
  hitChance: 0.75,
  damage: [8, 10],
  armor: 0,
  baseBlockChance: 0.05,
  baseDamage: [2, 4],
  baseHitChance: 0.5,
  blockChance: 0.1,
  attributes: {
    strength: 10,
    defense: 10,
    agility: 10,
    vitality: 10,
  },
  reward: {
    gold: 20,
    XP: 15,
  },
  effects: [],
  boostedAttributes: [],
  source: {
    author: 'Dominika Sikora',
    link:
      'http://www.makota.pl/images/Galeria/Portfolio/Digital_painting/pelne_wersje/RUSALKA_ostatwczna.jpg',
  },
};

const initialState = {
  progress: 0,
  trainingLv: 1,
  opponent: enemyTemplate,
};

const rewards = level => scaleValue(level, 50);

const scaleValue = (level, base) => Math.round(Math.pow(1.35, level) * base);
// case 'INCREMENT_ATTRIBUTE':
// return action.attribute === 'vitality'
//   ? {
//       ...state,
//       maxHP: state.maxHP + 5,
//       currentHP: state.currentHP + 5,
//     }
//   : state;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHOOSE_OPPONENT':
      return {
        ...state,
        opponent: {
          ...state.opponent,
          level: state.trainingLv,
          dodgeChance:
            state.opponent.baseBlockChance *
            (1 + state.opponent.attributes.defense * 0.005),
          hitChance:
            state.opponent.baseHitChance *
            (1 + state.opponent.attributes.agility * 0.005),
          damage: [
            state.opponent.baseDamage[0] *
              (1 + state.opponent.attributes.strength * 0.01),
            state.opponent.baseDamage[1] *
              (1 + state.opponent.attributes.strength * 0.01),
          ],
          effects: [],
        },
      };
    case 'DEAL_DAMAGE':
      return {
        ...state,
        opponent: {
          ...state.opponent,
          currentHP: state.opponent.currentHP - action.damage,
        },
      };

    case 'ADD_OPPONENT_EFFECT':
      return {
        ...state,
        opponent: {
          ...state.opponent,
          effects: [...state.opponent.effects, action.effect],
        },
      };

    case 'ADD_PLUS_EFFECT':
      const increasedStat = action.item.effect.statIncrease;
      if (Object.keys(state.attributes).includes(increasedStat)) {
        return {
          ...state,
          attributes: {
            ...state.attributes,
            [increasedStat]: state.attributes[increasedStat] + 10,
          },
          boostedAttributes: [...state.boostedAttributes, increasedStat],
        };
      }

    case 'CALCULATE_ATTRIBUTE_BONUS_OPPONENT':
      return {
        ...state,
        dodgeChance:
          state.baseBlockChance * (1 + state.attributes.defense * 0.005),
        hitChance: state.baseHitChance * (1 + state.attributes.agility * 0.005),
        damage: [
          state.baseDamage[0] * (1 + state.attributes.strength * 0.01),
          state.baseDamage[1] * (1 + state.attributes.strength * 0.01),
        ],
      };

    case 'EFFECT_COOLDOWN':
      const effectIndex = state.opponent.effects
        .map(effect => effect.name)
        .indexOf(action.effect.name);

      return action.effect.duration > 1
        ? Object.assign({}, state, {
            opponent: Object.assign(
              { ...state.opponent },
              {
                effects: Object.assign([...state.opponent.effects], {
                  [effectIndex]: {
                    ...state.opponent.effects[effectIndex],
                    duration: action.effect.duration - 1,
                  },
                }),
              },
            ),
          })
        : {
            ...state,
            opponent: {
              ...state.opponent,
              effects: [
                ...state.opponent.effects.slice(0, effectIndex),
                ...state.opponent.effects.slice(effectIndex + 1),
              ],
            },
          };

    case 'DRAIN_LIFE':
      return action.payload.character === 'opponent'
        ? {
            ...state,
            opponent: {
              ...state.opponent,
              currentHP:
                state.opponent.currentHP + action.payload.value <=
                state.opponent.maxHP
                  ? state.opponent.currentHP + action.payload.value
                  : state.opponent.maxHP,
            },
          }
        : state;
    case 'PROGRESS_NEXT_ENEMY':
      return { ...state, progress: state.progress + 1 };

    case 'ADD_TRAINING_LEVEL':
      if (state.progress % 10 == 0) {
        return { ...state, trainingLv: state.trainingLv + 1 };
      } else {
        return state;
      }
    case 'END_BATTLE_VICTORY':
      return {
        ...state,
        opponent: enemyTemplate,
      };
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        opponent: 'none',
      };

    // case 'END_GAME':
    //   return {
    //     ...state,
    //     opponent: {
    //       ...opponentList[0],
    //       effects: [],
    //     },
    //   };

    default:
      return state;
  }
};

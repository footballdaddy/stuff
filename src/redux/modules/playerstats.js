//base statisicts - without bonus from attributes

const initialState = {
  attributes: {
    strength: 10,
    defense: 10,
    agility: 10,
    vitality: 10,
  },
  boostedStats: { blockChance: 0, damage: 0, hitChance: 0, armor: 0 },
  attributePoints: 20,
  armor: 0,
  baseBlockChance: 0.05,
  baseDamage: [2, 4],
  baseHitChance: 0.5,
  blockChance: 0.1,
  damage: [2, 4],
  hitChance: 0.55,
  lifeDrain: 0,
};

// Upgrade
// Dagger
// cost: action.item.buyValue ^ action.item.upgradeTimes

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EQUIPPED':
    case 'EQUIP_ITEM':
      switch (action.item.category) {
        case 'helmets':
        case 'armors':
        case 'boots':
        case 'gloves':
          return {
            ...state,
            armor: state.armor + action.item.armor,
            baseHitChance: state.baseHitChance - action.item.hitChancePenalty,
          };

        case 'weapons':
          let weapon = action.item.dmgRange.map(
            dmg => dmg + dmg * 0.2 * action.item.upgradeTimes,
          );

          return {
            ...state,
            baseDamage: weapon,
            baseHitChance: action.item.hitChance,
          };

        case 'shields':
          return {
            ...state,
            baseBlockChance:
              state.baseBlockChance + action.item.blockChanceBonus,
          };

        case 'rings':
        case 'necklaces':
          const skill = Object.keys(action.item.skillIncrease)[0];

          if (skill === 'all') {
            return {
              ...state,
              attributes: {
                strength:
                  state.attributes.strength + action.item.skillIncrease[skill],
                defense:
                  state.attributes.defense + action.item.skillIncrease[skill],
                agility:
                  state.attributes.agility + action.item.skillIncrease[skill],
                vitality:
                  state.attributes.vitality + action.item.skillIncrease[skill],
              },
            };
          }

          return Object.keys(state.attributes).includes(skill)
            ? {
                ...state,
                attributes: {
                  ...state.attributes,
                  [skill]:
                    state.attributes[skill] + action.item.skillIncrease[skill],
                },
              }
            : {
                ...state,
                [skill]: state[skill] + action.item.skillIncrease[skill],
              };

        default:
          return state;
      }

    case 'UNEQUIP_ITEM':
      switch (action.item.category) {
        case 'helmets':
        case 'armors':
        case 'boots':
        case 'gloves':
          return {
            ...state,
            armor: state.armor - action.item.armor,
            baseHitChance: state.baseHitChance + action.item.hitChancePenalty,
          };
        case 'weapons':
          return {
            ...state,
            baseDamage: [2, 4],
            baseHitChance: state.baseHitChance - action.item.hitChance + 0.5,
          };
        case 'shields':
          return {
            ...state,
            baseBlockChance:
              state.baseBlockChance - action.item.blockChanceBonus,
          };
        case 'rings':
        case 'necklaces':
          const skill = Object.keys(action.item.skillIncrease)[0];
          if (skill === 'all') {
            return {
              ...state,
              attributes: {
                strength:
                  state.attributes.strength - action.item.skillIncrease[skill],
                defense:
                  state.attributes.defense - action.item.skillIncrease[skill],
                agility:
                  state.attributes.agility - action.item.skillIncrease[skill],
                vitality:
                  state.attributes.vitality - action.item.skillIncrease[skill],
              },
            };
          }
          return Object.keys(state.attributes).includes(skill)
            ? {
                ...state,
                attributes: {
                  ...state.attributes,
                  [skill]:
                    state.attributes[skill] - action.item.skillIncrease[skill],
                },
              }
            : {
                ...state,
                [skill]: state[skill] - action.item.skillIncrease[skill],
              };
        default:
          return state;
      }
    // remove
    case 'INCREMENT_ATTRIBUTE':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.attribute]: state.attributes[action.attribute] + 1,
        },
        attributePoints: state.attributePoints - 1,
      };

    case 'CALCULATE_ATTRIBUTE_BONUS':
      return {
        ...state,
        blockChance: state.baseBlockChance + state.boostedStats.blockChance,
        hitChance: state.baseHitChance + state.boostedStats.hitChance,
        damage: [state.baseDamage[0], state.baseDamage[1]],
      };
    case 'NEW_LEVEL_POINTS':
      return {
        ...state,
        attributePoints: state.attributePoints + 20,
      };

    case 'ADD_EFFECT':
      const increasedStat = action.item.effect.statIncrease;
      if (Object.keys(state).includes(increasedStat)) {
        return {
          ...state,
          boostedAttributes: {
            ...state.boostedAttributes,
            [increasedStat]: action.item.effect.value,
          },
        };
      }

      return state;
    // case 'ADD_EFFECT_PLAYER':
    //   const increasedStat = action.item.effect.statIncrease;
    //   if (Object.keys(state.attributes).includes(increasedStat)) {
    //     return {
    //       ...state,
    //       attributes: {
    //         ...state.attributes,
    //         [increasedStat]: state.attributes[increasedStat] + 10,
    //       },
    //       boostedAttributes: [...state.boostedAttributes, increasedStat],
    //     };
    //   }
    //   return state;

    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return state;
    case 'REMOVE_SKILL_EFFECTS':
      return {
        ...state,
        [action.key]: state[action.key] - state.boostedAttributes[action.key],
        boostedAttributes: {
          ...state.boostedAttributes,
          [action.key]: 0,
        },
      };

    // const effectIndex = state.boostedAttributes
    // .map(skill => skill.statIncrease)
    // .indexOf(action.key.name);

    //   return {
    //     ...state,
    //     attributes: {
    //       strength: state.boostedAttributes.includes('strength')
    //         ? state.attributes.strength - 10
    //         : state.attributes.strength,
    //       defense: state.boostedAttributes.includes('defense')
    //         ? state.attributes.defense - 10
    //         : state.attributes.defense,
    //       agility: state.boostedAttributes.includes('agility')
    //         ? state.attributes.agility - 10
    //         : state.attributes.agility,
    //       vitality: state.boostedAttributes.includes('vitality')
    //         ? state.attributes.vitality - 10
    //         : state.attributes.vitality,
    //     },
    //     boostedAttributes: [],
    //   };

    case 'END_GAME':
      return state;

    default:
      return state;
  }
};

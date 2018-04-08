export const statsInitialState = {
  energy: {
    rateSpirit: 1,
    exp: 0,
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
    rateGrowth: 0.2,
    stattype: 'strength',
  },
  lesserstrength: {
    rate: 0,
    level: 1,
    value: 1000,
    cap: 15000,
    capexp: 0,
    rateGrowth: 0.18,

    exp: 0,
    stattype: 'strength',
  },
  greaterstrength: {
    rate: 0,
    level: 1,
    value: 2000,
    cap: 30000,
    capexp: 0,
    rateGrowth: 0.16,

    exp: 0,
    stattype: 'strength',
  },
  ultimatestrength: {
    rate: 0,
    level: 1,
    value: 10000,
    cap: 50000,
    capexp: 0,
    rateGrowth: 0.14,

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
    rateGrowth: 0.2,

    stattype: 'defense',
  },
  lesserdefense: {
    rate: 0,
    level: 1,
    value: 1000,
    exp: 0,
    cap: 2500,
    capexp: 0,
    rateGrowth: 0.18,

    stattype: 'defense',
  },
  greaterdefense: {
    rate: 0,
    level: 1,
    value: 2000,
    exp: 0,
    cap: 2500,
    capexp: 0,
    rateGrowth: 0.16,

    stattype: 'defense',
  },
  ultimatedefense: {
    rate: 0,
    level: 1,
    value: 10000,
    exp: 0,
    cap: 2500,
    capexp: 0,
    rateGrowth: 0.14,

    stattype: 'defense',
  },
};

// Type Constants --------------------------------------------------------------
export const INCREMENT_STAT = 'gotg/stat/INCREMENT_STAT';
export const DECREMENT_STAT = 'gotg/stat/DECREMENT_STAT';
export const INCREMENT_VALUE = 'gotg/stat/INCREMENT_VALUE';

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

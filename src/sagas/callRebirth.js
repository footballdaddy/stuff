import { call, put } from 'redux-saga/effects';
import { calculateRebirth } from '../redux/modules/stats';
export const getStatData = state => state.stats;

function* callRebirth() {
  console.log('hi');

  for (let key in getStatData) {
    if (
      getStatData[key].stattype === 'defense' ||
      getStatData[key].stattype === 'strength'
    ) {
      yield put(calculateRebirth(key));
    }
  }
}

export { callRebirth };

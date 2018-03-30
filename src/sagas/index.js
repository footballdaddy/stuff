import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getStatData } from '../selectors';
import {
  incrementValue,
  calculateAttack,
  calculateDefense,
} from '../redux/modules/stats';

export default function* gameLoop() {
  const frameRate = 50;
  let lastUpdateTime = Date.now();
  let currentTime;
  let deltaTime;
  let statData = yield select(getStatData);
  // let valuePerSecond = yield select(getValuePerSecond);
  // let lootSpeed = yield select(getLootSpeed);
  // let loot = yield select(getLoot);
  // let count = yield select(getCount);
  // let islandNumber = yield select(getIslandProgress);
  // let islandLives = islandData.islands[islandNumber - 1].lives;
  // let damageUpdated = false;
  // let islandSearchingStatus = yield select(getIslandSearchingStatus);

  // Game Loop runs at 60 fps (may be an option set by the user later)

  function* update() {
    while (true) {
      let attackStat = 0;
      let defenselevel = 0;
      statData = yield select(getStatData);
      currentTime = Date.now();
      deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      for (let key in statData) {
        if (statData[key].stattype === 'strength' && statData[key].level > 1)
          attackStat = attackStat + statData[key].level * statData[key].value;
        if (statData[key].stattype === 'defense' && statData[key].level > 1)
          defenselevel = attackStat + statData[key].level * statData[key].value;

        if (statData[key].rate > 0) {
          yield put(
            incrementValue(key, statData[key].rate * 50 * deltaTime / 1000),
          );
        }
      }
      yield put(calculateAttack(attackStat));
      yield put(calculateDefense(defenselevel));
      yield delay(1000 / frameRate);
    }
  }
  yield call(update);
}

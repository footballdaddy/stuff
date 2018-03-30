import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getStatData } from '../selectors';
import { incrementValue, startGame } from '../redux/modules/stats';

export default function* gameLoop() {
  const frameRate = 50;
  let lastUpdateTime = Date.now();
  let currentTime;
  let deltaTime;
  let statData;
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
      statData = yield select(getStatData);

      for (let key in statData) {
        if (statData[key].rate > 0) {
          yield put(incrementValue(key));
        }
      }
      yield delay(1000 / frameRate);
    }
  }
  yield call(update);
}

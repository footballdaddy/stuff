import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getStatData } from '../selectors';
import { incrementValue, startGame } from '../redux/modules/stats';

// export function* incrementAsync() {
//   yield call(delay, 1000)
//   yield put(increment())
// }
// export default function* rootSaga() {
//   yield* takeEvery(INCREMENT_ASYNC, incrementAsync)
// }

export default function* gameLoop() {
  const frameRate = 60;
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
  console.log('update');

  function* update() {
    while (true) {
      // Update kill counter every frame based on calculated kills per second
      yield call(example);
      yield delay(1000 / frameRate);
    }
  }
  yield call(update);
}

function* example() {
  let statData = yield select(getStatData); // Check to see if the player is currently searching the island
  for (let key in statData) {
    yield console.log(statData[key]);

    if (statData[key].rate > 0) {
      yield put(incrementValue(key));
    }
  }
}

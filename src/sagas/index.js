import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getStatData } from '../selectors';
import {
  incrementValue,
  calculateAttack,
  calculateHealth,
  calculateDefense,
  calculateHealthRegen,
  calculateSpirit,
  calculateSpiritLevel,
} from '../redux/modules/stats';

export default function* gameLoop() {
  const frameRate = 50;
  const calcWSecFrame = frameRate / 1000;
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
      let defenseStat = 0;
      statData = yield select(getStatData);
      currentTime = Date.now();
      deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      for (let key in statData) {
        if (statData[key].stattype === 'strength' && statData[key].level > 1)
          attackStat = attackStat + statData[key].level * statData[key].value;
        if (statData[key].stattype === 'defense' && statData[key].level > 1)
          defenseStat = attackStat + statData[key].level * statData[key].value;

        if (statData[key].rate > 0) {
          yield put(
            incrementValue(
              key,
              statData[key].rate * frameRate * deltaTime / 1000,
            ),
          );
        }
      }
      attackStat = attackStat + 100;
      defenseStat = defenseStat + 100;
      yield put(calculateAttack(attackStat));
      yield put(calculateDefense(defenseStat));
      yield put(calculateSpiritLevel(statData.energy.rateSpirit / frameRate));
      // if (
      //   statData.energy.level + statData.energy.rateSpirit <=
      //   statData.energy.cap
      // )
      //   yield put(calculateSpiritLevel(statData.energy.rateSpirit / frameRate));
      yield put(calculateHealth(defenseStat / 20 * calcWSecFrame));
      // console.log(defenseStat);
      yield delay(1000 / frameRate);
    }
  }
  yield call(update);
}

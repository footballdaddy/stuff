import { combineReducers } from 'redux';
import stats from './modules/stats';
import game from './modules/game';
import enemy from './modules/enemy';
import exp from './modules/exp';
import gold from './modules/gold';
import hp from './modules/hp';
import inventory from './modules/inventory';
import logs from './modules/logs';
import tempeffects from './modules/tempeffects';
import equip from './modules/equip';
import description from './modules/description';
import playerstats from './modules/playerstats';
import handleOpponent from './modules/handleOpponent';
export default combineReducers({
  stats,
  game,
  enemy,
  exp,
  gold,
  hp,
  inventory,
  logs,
  tempeffects,
  equip,
  description,
  playerstats,
  handleOpponent,
});

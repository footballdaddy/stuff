import { combineReducers } from 'redux';
import stats from './modules/stats';
import game from './modules/game';
import enemy from './modules/enemy';
export default combineReducers({ stats, game, enemy });

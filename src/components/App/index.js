import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Strength from '../Strength';
import Defense from '../Defense';
import Rebirth from '../Rebirth';
import BattleContainer from '../../containers/BattleContainer';
import InventoryPanel from '../../containers/InventoryPanel';
import EquipmentPanel from '../../containers/EquipmentPanel';
import StatsPanel from '../../containers/StatsPanel';
import Arena from '../../containers/Arena';
import Shop from '../../containers/Shop';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }

  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };

  // rebirthStats = () => {
  //   callRebirth();
  // };

  render() {
    const { stats } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>
            Energy: {Math.ceil(stats.energy.value)}/
            {Math.ceil(stats.energy.level)}
          </h1>
        </div>
        <div>
          <Strength {...this.props} />
        </div>
        <div>
          <Defense {...this.props} />
        </div>
        <div>
          <h1>Attack: {stats.attack.stat}</h1>
        </div>
        <div>
          <h1>Defense: {stats.defense.stat}</h1>
        </div>
        <div>
          <h1>
            Health: {stats.health.currenthealth} / {stats.health.stat}
          </h1>
        </div>
        <div>
          <h1>Health Regen: {stats.defense.stat / 20}</h1>
        </div>
        <div>
          <Rebirth {...this.props} />
        </div>
        <div>
          <BattleContainer />
        </div>
        <div>
          <InventoryPanel />
        </div>
        <div>
          <EquipmentPanel />
        </div>
        <div>
          <StatsPanel />
        </div>
        <div>
          <Arena />
        </div>
        <div>
          <Shop />
        </div>
      </div>
    );
  }
}

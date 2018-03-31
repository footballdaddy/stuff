import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Strength from '../Strength';
import Defense from '../Defense';
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
          <h1>Health Regen: {stats.health.healthregen}</h1>
        </div>
      </div>
    );
  }
}

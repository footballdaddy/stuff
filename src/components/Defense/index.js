import React, { Component } from 'react';
import PropTypes from 'prop-types';
const defenseList = ['regular', 'lesser', 'greater', 'ultimate'];

export default class defense extends Component {
  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };
  render() {
    const { stats } = this.props;
    return (
      <div>
        {defenseList.map((defenseStat, i) => (
          <div key={i}>
            <label id="value">
              {defenseStat} defense{' '}
              {stats[defenseStat + 'defense'].exp /
                stats[defenseStat + 'defense'].cap}. Rate Value:{' '}
              {stats[defenseStat + 'defense'].rate}
            </label>
            <button
              onClick={() =>
                this.props.incrementStat(defenseStat + 'defense', 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(defenseStat + 'defense', 1)
              }
            >
              -
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(
                  defenseStat + 'defense',
                  stats[defenseStat + 'defense'].rate,
                )
              }
            >
              Reset
            </button>
            <button
              onClick={() =>
                this.props.incrementStat(
                  defenseStat + 'defense',
                  stats.energy.value,
                )
              }
            >
              Cap
            </button>
          </div>
        ))}
      </div>
    );
  }
}

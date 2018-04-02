import React, { Component } from 'react';
import PropTypes from 'prop-types';
const strengthList = ['regular', 'lesser', 'greater', 'ultimate'];

export default class Strength extends Component {
  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };
  render() {
    const { stats } = this.props;
    return (
      <div>
        {strengthList.map((strengthStat, i) => (
          <div key={i}>
            <label id="value">
              {strengthStat} Strength Current Cap:{' '}
              {stats[strengthStat + 'strength'].cap} Reduce Gain:{' '}
              {0.2 *
                (stats[strengthStat + 'strength'].exp /
                  stats[strengthStat + 'strength'].cap) <=
              250
                ? 0.2 *
                  (stats[strengthStat + 'strength'].exp /
                    stats[strengthStat + 'strength'].cap)
                : stats[strengthStat + 'strength'].cap}
              <br />
              Current Level:
              {stats[strengthStat + 'strength'].exp /
                stats[strengthStat + 'strength'].cap}{' '}
              Rate Value: {stats[strengthStat + 'strength'].rate}
            </label>
            <button
              onClick={() =>
                this.props.incrementStat(strengthStat + 'strength', 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(strengthStat + 'strength', 1)
              }
            >
              -
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(
                  strengthStat + 'strength',
                  stats[strengthStat + 'strength'].rate,
                )
              }
            >
              Reset
            </button>
            <button
              onClick={() =>
                this.props.incrementStat(
                  strengthStat + 'strength',
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

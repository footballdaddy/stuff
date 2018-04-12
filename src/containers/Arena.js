import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// Copmponents
import HeroBattleScreen from './HeroBattleScreen';
import Console from './Console';
import OpponentScreen from './OpponentScreen';

// Actions
import {
  chooseOpponent,
  calculateAttributeBonus,
  updateEquipped,
} from '../redux/modules/actions';

class Arena extends React.Component {
  componentDidMount = () => {
    const { equipped } = this.props;
    const battleGear = equipped.filter(
      item => item.category !== 'potions' && item.category !== 'oils',
    );
    // console.log(battleGear);
    this.props.updateEquipped(battleGear);
    this.props.calculateAttributeBonus();
    this.props.chooseOpponent('opponentList');
  };

  handleClick = opponent => {
    this.props.chooseOpponent(opponent);
  };

  render() {
    const { opponent, logs } = this.props;
    return (
      <div>
        <Fragment>
          <HeroBattleScreen />
          <div className="vertical-layout">
            <Console logs={logs} />
            <OpponentScreen opponent={opponent} />
          </div>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.handleOpponent.opponent,
  logs: state.logs.logs,
  equipped: state.equip.equipped,
});

export default connect(mapStateToProps, {
  chooseOpponent,
  calculateAttributeBonus,
  updateEquipped,
})(Arena);

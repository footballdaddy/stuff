import React from 'react';
import { connect } from 'react-redux';

import {
  unequipItem,
  calculateAttributeBonus,
  addEffect,
  restoreHP,
  showDescription,
} from '../redux/modules/actions';
import { startSkill, removeSkillEffects } from '../redux/modules/skills';
const el = {
  id: 6,
  category: 'potions',
  name: 'Potion of strength',
  buyValue: 200,
  sellValue: 100,
  effect: {
    statIncrease: 'strength',
  },
  useLocation: 'exploration',
  description: 'Increases strength by 10 during next battle.',
};

class AttackButtons extends React.Component {
  useItem = (elx, key) => {
    this.props.startSkill(key);
    if (typeof elx.restore !== 'undefined') {
      this.props.restoreHP(elx);
    }

    if (typeof elx.effect !== 'undefined') {
      // console.log('hi');
      this.props.addEffect(elx, key);
    }
    this.props.calculateAttributeBonus();
  };

  // calculateToCoolDown = skill => {
  //   if (this.props.skills[skill].currentCoolDown >= 0) {
  //     return (
  //       <button className="use-btn" onClick={() => this.useItem(el, skill)}>
  //         {this.props.skills[skill]}
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button className="use-btn">
  //         {this.props.skills[skill]} {this.props.skills[skill].currentCoolDown}
  //       </button>
  //     );
  //   }
  // };

  render() {
    return (
      <div>
        {Object.keys(this.props.skills).map((skill, i) => (
          <div key={i}>
            <div>
              Skill: {this.props.skills[skill].name}
              Current Time left: {this.props.skills[skill].currentCoolDown}
              ActiveCoolDown Time left:{' '}
              {this.props.skills[skill].activeCoolDown}
              Base Cooldown: {this.props.skills[skill].baseCoolDown}
              {this.props.skills[skill].currentCoolDown <= 0 &&
              this.props.opponnent != 'none' ? (
                <button
                  className="use-btn"
                  onClick={() => this.useItem(this.props.skills[skill], skill)}
                >
                  {this.props.skills[skill].name}
                </button>
              ) : (
                <button className="use-btn">
                  {this.props.skills[skill].name}
                  {this.props.skills[skill].currentCoolDown}
                </button>
              )}
            </div>
          </div>
        ))}
        <button className="flex-row btn-attack" onClick={() => this.attack()}>
          <div className="btn-attack-img normal" />
          <p>Attack</p>
        </button>
        <button
          className="flex-row btn-attack"
          onClick={() => this.useItem(el, 'punch')}
        >
          <div className="btn-attack-img strong" />
          <p>Strength +10</p>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  equipped: state.equip.equipped,
  temporaryEffects: state.tempeffects.temporaryEffects,
  hoveredItem: state.description.hoveredItem,
  skills: state.skills,
  opponnent: state.handleOpponent.opponnent,
});

export default connect(mapStateToProps, {
  unequipItem,
  addEffect,
  calculateAttributeBonus,
  restoreHP,
  showDescription,
  removeSkillEffects,
  startSkill,
})(AttackButtons);

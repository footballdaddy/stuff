import React from 'react';
import { connect } from 'react-redux';
import {
  incrementAttribute,
  calculateAttributeBonus,
} from '../redux/modules/actions';
import EffectList from './EffectList';

class StatsPanel extends React.Component {
  handleClick = attr => {
    this.props.incrementAttribute(attr);
    this.props.calculateAttributeBonus();
  };

  render() {
    const {
      attributes,
      armor,
      blockChance,
      damage,
      hitChance,
      lifeDrain,
      attributePoints,
      incrementAttribute,
      calculateAttributeBonus,
      exp,
      level,
      nextLevel,
      maxHP,
      currentHP,
      temporaryEffects,
    } = this.props;

    return (
      <div className="flex-row">
        <div className="hero-attributes">
          {Object.keys(attributes).map((key, i) => (
            <div key={i} className="attribute">
              <div className={`panel-${key} attr-pic`} />
              <p>
                {`${key}:`}
                <br />
                {`${attributes[key]}`}
              </p>
              <button
                className={`${
                  attributePoints > 0 ? 'enabled' : 'disabled'
                } increment-button`}
                onClick={
                  attributePoints > 0 ? () => this.handleClick(key) : () => ''
                }
              >
                +
              </button>
            </div>
          ))}

          <div className="attr-pts">
            <p>Attribute Points: {attributePoints}</p>
          </div>

          <div className="flex-row">
            <div className="panel-damage attr-pic" />
            <p>
              Damage:<br />{' '}
              {`${Math.round(damage[0])} - ${Math.round(damage[1])}`}
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-hit-chance attr-pic" />
            <p>
              Hit chance:<br /> {Math.round(hitChance * 100)}%
            </p>
          </div>

          <div className="flex-row">
            <div className="panel-armor attr-pic" />
            <p>
              Armor:<br /> {armor}
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-block-chance attr-pic" />
            <p>
              Block chance:<br /> {Math.round(blockChance * 100)}%
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-life-drain attr-pic" />
            <p>
              Life drain:<br /> {Math.round(lifeDrain * 100)}%
            </p>
          </div>
        </div>
        <div className="hero-right-panel">
          <p className="player-name">Player</p>
          <p>Level: {level}</p>
          <div className="panel-bar exp-bar">
            <p>EXP: {`${exp} / ${nextLevel}`}</p>
            <div
              style={{ width: `${Math.floor(exp / nextLevel * 100)}%` }}
              className="exp"
            />
          </div>

          <div className="hero-pic" />
          <div className="panel-bar health-bar">
            <p>HP: {`${currentHP} / ${maxHP}`}</p>
            <div
              style={{ width: `${Math.floor(100 - currentHP / maxHP * 100)}%` }}
              className="damage"
            />
          </div>

          <EffectList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attributes: state.playerstats.attributes,
  attributePoints: state.playerstats.attributePoints,
  damage: state.playerstats.damage,
  armor: state.playerstats.armor,
  hitChance: state.playerstats.hitChance,
  blockChance: state.playerstats.blockChance,
  lifeDrain: state.playerstats.lifeDrain,
  equipped: state.equip.equipped,
  exp: state.exp.exp,
  level: state.exp.level,
  nextLevel: state.exp.nextLevel,
  maxHP: state.hp.maxHP,
  currentHP: state.hp.currentHP,
  temporaryEffects: state.tempeffects.temporaryEffects,
});

export default connect(mapStateToProps, {
  incrementAttribute,
  calculateAttributeBonus,
})(StatsPanel);

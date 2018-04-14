import React from 'react';
import { connect } from 'react-redux';

import {
  dealDamage,
  sufferDamage,
  drainLife,
  logMessage,
  effectCooldown,
  endBattle,
  hpRegen,
  calculateAttributeBonus,
} from '../redux/modules/actions';

import {
  decrementActiveCoolDown,
  calculateActiveCoolDown,
} from '../redux/modules/skills';
import AttackButtons from './AttackButtons';
class HeroBattleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidMount() {
    this.start();
  }

  stop = () => {
    clearInterval(this.timerId);
  };
  start = () => {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.autorun();
      }, 1000 / 1);
    }
  };

  autorun = () => {
    if (this.props.currentHP <= this.props.maxHP) {
      this.props.hpRegen(0.01);
    }
    if (this.props.opponent != 'none') {
      this.attack();
    }
  };
  getRandomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  checkHP = (health, damage, result) => {
    if (health - damage <= 0) {
      this.props.endBattle(this.props.opponent.reward, result);
      return;
    }
  };

  opponentsTurn = (isStrong = false, opponent = this.props.opponent) => {
    const {
      currentHP,
      blockChance,
      armor,
      temporaryEffects,
      dealDamage,
      sufferDamage,
      drainLife,
      logMessage,
      effectCooldown,
      endBattle,
    } = this.props;

    if (opponent.effects.length > 0) {
      opponent.effects.map(effect => {
        logMessage([
          'player',
          `${effect.name} deals ${effect.dmgPerTurn} damage to Your opponent.`,
        ]);
        dealDamage(effect.dmgPerTurn);
        this.checkHP(opponent.currentHP, effect.dmgPerTurn, 'success');
        effectCooldown(effect);
      });
    }

    let minDamage = opponent.damage[0];
    let maxDamage = opponent.damage[1];

    let hitChance =
      opponent.effects.filter(effect => effect.name === 'Ice').length > 0
        ? opponent.hitChance
        : opponent.hitChance * 0.85;

    if (isStrong) {
      hitChance *= 0.7;
      minDamage *= 1.5;
      maxDamage *= 1.5;
    }

    minDamage = Math.round(minDamage);
    maxDamage = Math.round(maxDamage);
    const inflictedDamage = this.getRandomInteger(minDamage, maxDamage);

    let opponentHit = Math.random();
    let message = `Opponent performs ${
      isStrong ? 'a strong attack' : 'an attack'
    }`;

    if (opponentHit > hitChance) {
      message += ' and misses.';
      logMessage(['opponent', message]);
    }

    if (opponentHit < hitChance) {
      if (Math.random() < blockChance) {
        message += ', but Your hero blocks successfuly.';
        logMessage(['opponent', message]);
      } else {
        message += ` and deals ${inflictedDamage} damage!`;
        logMessage(['opponent', message]);
        sufferDamage(inflictedDamage);

        this.checkHP(currentHP, inflictedDamage, 'defeat');

        if (opponent.lifeDrain > 0) {
          let drainedValue = Math.round(opponent.lifeDrain * inflictedDamage);
          logMessage([
            'opponent',
            `Opponent drains ${drainedValue} life from You.`,
          ]);
          drainLife({
            character: 'opponent',
            value: drainedValue,
          });
        }
      }
    }
  };

  attack = (isStrong = false) => {
    const {
      opponent,
      temporaryEffects,
      dealDamage,
      lifeDrain,
      logMessage,
      addOpponentEffect,
      drainLife,
      boostedAttributes,
      calculateAttributeBonus,
      endBattle,
      skills,
    } = this.props;
    let { hitChance, damage } = this.props;
    for (let key in skills) {
      if (skills[key].activeCoolDown > 0) {
        console.log(key);
        this.props.calculateActiveCoolDown(key);
      }
    }

    // if (boostedAttributes.length > 0) {
    //   boostedAttributes.map(effect => {
    //     console.log(effect);

    //     this.props.decrementActiveCoolDown(effect);
    //   });
    // }

    let minDamage = damage[0];
    let maxDamage = damage[1];

    if (temporaryEffects.includes({ dmgIncrease: ['all', 0.5] })) {
      minDamage *= 1.5;
      maxDamage *= 1.5;
    }

    if (
      temporaryEffects.includes({ dmgIncrease: ['undead', 0.25] }) &&
      opponent.type === 'undead'
    ) {
      minDamage *= 1.25;
      maxDamage *= 1.25;
    }

    if (isStrong) {
      hitChance *= 0.7;
      minDamage *= 1.5;
      maxDamage *= 1.5;
    }

    let opponentDodgeChance = opponent.dodgeChance;

    if (opponent.effects.filter(effect => effect.name === 'Ice').length > 0) {
      opponentDodgeChance *= 0.7;
    }

    if (typeof opponent.armor !== 'undefined') {
      minDamage *= 1 - opponent.armor / 100;
      maxDamage *= 1 - opponent.armor / 100;
    }

    minDamage = Math.round(minDamage);
    maxDamage = Math.round(maxDamage);
    const inflictedDamage = this.getRandomInteger(minDamage, maxDamage);

    let playerHit = Math.random();
    let message = `Player performs ${
      isStrong ? 'a strong attack' : 'an attack'
    }`;

    if (playerHit > hitChance) {
      message += ' and misses.';
      logMessage(['player', message]);
    }

    // Calculate if to inflict damage to enemy
    if (playerHit < hitChance) {
      if (Math.random() < opponentDodgeChance) {
        message += ', but the opponent successfuly dodges.';
        logMessage(['player', message]);
      } else {
        // Calculate if success hit to the enemy
        message += ` and deals ${inflictedDamage} damage!`;
        logMessage(['player', message]);
        dealDamage(inflictedDamage);

        if (lifeDrain > 0) {
          let drainedValue = Math.round(lifeDrain * inflictedDamage);
          logMessage([
            'player',
            `You drain ${drainedValue} life from Your opponent.`,
          ]);
          drainLife({
            character: 'player',
            value: drainedValue,
          });
        }

        if (opponent.currentHP - inflictedDamage <= 0) {
          endBattle(opponent.reward, 'success');
          return;
        }

        if (
          opponent.effects.filter(effect => effect.name === 'Poison').length ===
            0 &&
          temporaryEffects.includes('poison')
        ) {
          logMessage([
            'player',
            "Opponent has been poisoned. Poisoned enemies receive 15% of Hero's base damage each turn.",
          ]);
          addOpponentEffect({
            name: 'Poison',
            dmgPerTurn: Math.round(0.15 * inflictedDamage),
            duration: 20,
          });
        }
      }
    }

    this.opponentsTurn(
      opponent.currentHP / opponent.maxHP < 0.2 ? true : false,
      opponent,
    );
  };

  render() {
    return (
      <div className="hero-battle-screen">
        <div className="flex-row space-around">
          <AttackButtons />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.handleOpponent.opponent,
  currentHP: state.hp.currentHP,
  blockChance: state.playerstats.blockChance,
  boostedAttributes: state.playerstats.boostedAttributes,
  armor: state.playerstats.armor,
  temporaryEffects: state.tempeffects.temporaryEffects,
  equipped: state.equip.equipped,
  maxHP: state.hp.maxHP,
  hitChance: state.playerstats.hitChance,
  damage: state.playerstats.damage,
  lifeDrain: state.playerstats.lifeDrain,
  skills: state.skills,
});

export default connect(mapStateToProps, {
  dealDamage,
  sufferDamage,
  drainLife,
  logMessage,
  effectCooldown,
  endBattle,
  decrementActiveCoolDown,
  calculateActiveCoolDown,
  hpRegen,
  calculateAttributeBonus,
})(HeroBattleScreen);

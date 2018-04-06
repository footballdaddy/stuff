import { connect } from 'react-redux';
import Fight from '../components/Fight';
import * as actions from '../redux/modules/game';

const mapStateToProps = state => ({
  // playerName: state.player.name,
  // playerDmgTaken: state.levelStats.playerDmgTaken,
  // playerHealAmt: state.levelStats.playerHealAmt,
  // enemyDmgTaken: state.levelStats.enemyDmgTaken,
  // moves: state.player.moves,
  // potentialMoves: state.player.potentialMoves,
  stats: state.stats,
  enemy: state.enemy,
  game: state.game,
});

// const actions = {
//   playerAttacks,
//   playerHeals,
//   playerSpecials,
//   playerDies,
//   playerStartAttackPhase,
//   playerEndAttackPhase,
//   playerStartSpecialPhase,
//   playerEndSpecialPhase,
//   playerStartHealPhase,
//   playerEndHealPhase,
//   needsLevelUp,
//   nextEnemy,
//   enemyAttacks,
//   enemySpecials,
//   enem yStartAttackPhase,
//   enemyEndAttackPhase,
//   enemyStartSpecialPhase,
//   enemyEndSpecialPhase
// }

export default connect(mapStateToProps, actions)(Fight);

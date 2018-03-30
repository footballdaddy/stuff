import { connect } from 'react-redux';
import App from '../components/App';
import * as actions from '../redux/modules/stats';

const mapStateToProps = state => ({
  stats: state.stats,
});

export default connect(mapStateToProps, actions)(App);

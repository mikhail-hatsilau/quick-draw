import { connect } from 'react-redux';
import Index from '../components/Index';

const mapStateToProps = (state) => (
  {
    auth: state.auth,
  }
);

const mapDispatchToProps = () => ({});

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default IndexContainer;

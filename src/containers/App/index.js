import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  init,
} from '../../store/global/actions';
import {
  hasLoaded,
} from '../../store/global/selectors';
import logo from './logo.svg';

class App extends Component {
  static propTypes = {
    loaded: PropTypes.bool,
    init: PropTypes.func,
  };

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { loaded } = this.props;

    if (!loaded) {
      return (
        <div>
          Loading
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: hasLoaded(state),
});

const mapDispatchToProps = {
  init,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

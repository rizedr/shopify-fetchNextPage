import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setCollections,
} from '../../store/global/actions';
import {
  areCollectionsLoading,
  getCollections,
} from '../../store/global/selectors';
import {
  Container,
  Segment,
  Header,
  Message,
  List,
  Button,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

class App extends Component {
  static propTypes = {
    collectionsLoading: PropTypes.bool,
    collections: PropTypes.array,
    setCollections: PropTypes.func,
  };

  componentDidMount() {
    this.props.setCollections();
  }

  render() {
    const {
      collectionsLoading,
      collections,
    } = this.props;

    if (collectionsLoading) {
      return (
        <Container>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Container>
      );
    }

    return (
      <Container>
        <Segment style={{ marginTop: '1rem' }} attached="top">
          <Header as="h1">
            Issue Example
          </Header>
        </Segment>
        <Segment attached="bottom">
          <Header>
            Collections
          </Header>
          <Message>
            The list of collections that comes from my shop.
          </Message>
          <div>
            { collections.map(({ id, title }) => (
              <Segment key={id} vertical>
                <Header size="small">
                  { title }
                </Header>
                <Button
                  compact
                  content="Load Products"
                />
              </Segment>
            )) }
          </div>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  collectionsLoading: areCollectionsLoading(state),
  collections: getCollections(state),
});

const mapDispatchToProps = {
  setCollections,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

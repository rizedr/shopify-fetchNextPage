import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setCollections,
  setCollectionProduct,
  setProductsNextPage,
} from '../../store/global/actions';
import {
  areCollectionsLoading,
  getCollections,
  getSelectedCollection,
  areProductsLoading,
  getProducts,
  areNextProductsLoading,
} from '../../store/global/selectors';
import {
  Container,
  Segment,
  Header,
  Message,
  Button,
  Label,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

class App extends Component {
  static propTypes = {
    collectionsLoading: PropTypes.bool,
    collections: PropTypes.array,
    selectedCollection: PropTypes.string,
    productsLoading: PropTypes.bool,
    products: PropTypes.array,
    nextProductsLoading: PropTypes.bool,
    setCollections: PropTypes.func,
    setCollectionProduct: PropTypes.func,
    setProductsNextPage: PropTypes.func,
  };

  componentDidMount() {
    this.props.setCollections();
  }

  render() {
    const {
      collectionsLoading,
      collections,
      selectedCollection,
      productsLoading,
      products,
      nextProductsLoading,
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
        <Segment
          attached="top"
          style={{ marginTop: '1rem' }}
        >
          <Header as="h1">
            Issue Example
          </Header>
        </Segment>
        <Segment attached>
          <Header size="large">
            Collections
          </Header>
          <p>
            The list of collections that comes from my shop.
          </p>
          <div>
            { collections.map(({ id, title }) => (
              <Segment
                key={id}
                vertical
              >
                <Header size="small">
                  { title }
                </Header>
                <Button
                  compact
                  content="Load Products"
                  onClick={() => this.props.setCollectionProduct(id, title)}
                />
              </Segment>
            )) }
          </div>
        </Segment>
        <Segment
          attached="bottom"
          loading={productsLoading}
        >
          <Header size="large">
            Products
          </Header>
          { !selectedCollection ? (
            <Message>
              No collection has been selected.
            </Message>
          ) : (
            <div>
              { !productsLoading && products.length === 0 ? (
                <Message>
                  No Products available in this collection.
                </Message>
              ) : (
                <div>
                  <div style={{ marginBottom: '1em' }}>
                    <Label detail="Selected Collection" content={selectedCollection} />
                  </div>
                  <div>
                    { products.map(({ id, title }, key) => (
                      <Segment
                        key={id}
                        vertical
                      >
                        <Header>
                          { title }
                        </Header>
                        Product no. {key + 1}
                      </Segment>
                    )) }
                  </div>
                  <div style={{ marginTop: '1em' }}>
                    <Button
                      content="Load Next Page"
                      loading={nextProductsLoading}
                      onClick={this.props.setProductsNextPage}
                    />
                  </div>
                </div>
              ) }
            </div>
          ) }
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  collectionsLoading: areCollectionsLoading(state),
  collections: getCollections(state),
  selectedCollection: getSelectedCollection(state),
  productsLoading: areProductsLoading(state),
  products: getProducts(state),
  nextProductsLoading: areNextProductsLoading(state),
});

const mapDispatchToProps = {
  setCollections,
  setCollectionProduct,
  setProductsNextPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

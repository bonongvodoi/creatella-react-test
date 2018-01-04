import React from 'react';
import ProductList from './components/product-list';
import store, {loadProduct} from './stores/store';
import {Configuration} from './commons/configuration';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      loadingSort: false,
      isFirstFetch: false,
      filter: {},
    }
  }

  componentWillMount(){
    store.subscribe( async () => {
      let state = store.getState();
      this.setState({
        products: state.products,
        filter: state.filter,
        loading: state.loading,
        loadingSort: state.loadingSort,
        isFirstFetch: state.isFirstFetch,
      });
    });
  }

  componentDidMount(){
    store.dispatch(loadProduct(this.state.filter));
  }

  render() {
    return (
      <div>
        <ProductList products={this.state.products}
                     end={this.state.isFirstFetch && this.isEndOfCat()}
                     loading={this.state.loading}
                     loadingSort={this.state.loadingSort}
                     filter={this.state.filter}
                     onScrollToEnd={() => {
                       this.handleLoadMore();
                     }}
        />
      </div>
    );
  }

  // Handle load more products
  handleLoadMore() {
    if(!this.state.loading) {
      let filter = Object.assign({}, this.state.filter);
      filter.page = (this.state.filter.page || 1) + 1;
      store.dispatch(loadProduct(filter));
    }
  }

  // Check if all products all loaded
  isEndOfCat() {
    return (this.state.filter.page || 1) * Configuration.LIMIT > this.state.filter.totalRows;
  }
}

export default App;
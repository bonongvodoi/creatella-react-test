import React from 'react';
import Product from '../models/product';
import store, {sortProduct} from '../stores/store';

class ProductList extends React.Component {

  loadMore;

  // Contains all loaded ads key
  currentAdKeys;

  constructor(props) {
    super(props);
    this.loadMore = true;
    this.currentAdKeys = [];
  }

  componentDidMount() {

    // Handle scroll
    window.onscroll = () => {
      if (!this.props.end) {
        let lastRow = document.getElementById('lastRow');
        if (this.loadMore) {
          if (visibleY(lastRow)) {
            this.loadMore = false;
            if (this.props.onScrollToEnd)
              this.props.onScrollToEnd();
          }
        }
        if (!visibleY(lastRow)) {
          this.loadMore = true;
        }
      }
      showScrollTopBtn();
    }
  }

  // Render header with sort ability
  renderSortHeader(text, sort) {
    return (
      <div className={"sort-header"}>
        <a onClick={() => this.handleSort(sort)}>{text}</a>
        {this.props.filter.sort === sort &&
        <span className={"sort-caret"}>
          &#9650;
        </span>}
      </div>
    );
  }

  // Render Ads
  renderAds(key) {
    let randomKey = 0;
    let adKey = 0;
    let fetchTimes = 0;
    if (key < this.currentAdKeys.length) {
      randomKey = this.currentAdKeys[key].randomKey;
    } else {
      do {
        randomKey = Math.floor(Math.random() * 1000);
        adKey = (randomKey % 10) + 1;
        fetchTimes++;
      }
      while (this.currentAdKeys.length > 0 && adKey === this.currentAdKeys[this.currentAdKeys.length - 1].adKey && fetchTimes < 1000);
      this.currentAdKeys.push({
        randomKey: randomKey,
        adKey: adKey
      });
    }
    return (<tr className={'ads-row'}>
      <td colSpan={4} align={"center"}>
        <img className="ad" src={"/ads/?r=" + randomKey}/>
      </td>
    </tr>)
  }

  render() {
    return (
      <div className={"product-container"}>
        <table>
          <thead>
          <tr>
            <th width={260}>
              {this.renderSortHeader("Id", "id")}
            </th>
            <th width={340}>
              {this.renderSortHeader("Size", "size")}
            </th>
            <th width={100}>
              {this.renderSortHeader("Price", "price")}
            </th>
            <th width={100}>
              Date Time
            </th>
          </tr>
          </thead>
          {this.props.products && this.props.products.map((product, index) => {
              let productRow = (
                <tbody key={index}>
                <tr>
                  <td>
                    {product.id}
                  </td>
                  <td style={{fontSize: product.size || 13}}>
                    {product.face}
                  </td>
                  <td>
                    {product.priceDisplay}
                  </td>
                  <td>
                    {product.dateDisplay}
                  </td>
                </tr>
                {index > 0 && ((index + 1) % 20) === 0 && this.renderAds(Math.floor(index / 20))}
                </tbody>
              );
              return productRow;
            }
          )}
          <tbody>
          {
            (this.props.end) &&
            <tr>
              <td colSpan={4} align={"center"}>
                ~ end of catalogue ~
              </td>
            </tr>
          }
          {
            (!this.props.loading && (!this.props.products || this.props.products.length === 0)) &&
            <tr>
              <td colSpan={4} align={"center"}>
                No Product Found.
              </td>
            </tr>
          }
          {this.props.loading &&
          <tr>
            <td className={"loading-td"} colSpan={4}>
              <div className={"loading-more"}>
                <img id={"img-loader"} className={"loading-img"} src="assets/images/loading.gif"/>
              </div>
            </td>
          </tr>
          }
          </tbody>
        </table>
        {this.props.loadingSort && <div className={"loader"}>
          <img id={"img-loader"} className={"loading-img"} src="assets/images/loading.gif"/>
        </div>}
        <div id={"lastRow"}></div>
      </div>
    );
  }

  handleSort(sort) {
    if (sort !== this.props.filter.sort) {
      let filter = Object.assign({}, this.props.filter);
      filter.sort = sort;
      store.dispatch(sortProduct(filter));
    }
    return false;
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(Product),
  loading: PropTypes.bool,
  loadingSort: PropTypes.bool,
  filter: PropTypes.object,
  end: PropTypes.bool,
  onScrollToEnd: PropTypes.func,
};

ProductList.defaultProps = {
  products: [],
  loading: true,
  filter: {},
  end: false
};

export default ProductList;

const visibleY = (el) => {
  let rect = el.getBoundingClientRect(), top = rect.top, height = rect.height,
    pr = el.parentNode;
  do {
    rect = pr.getBoundingClientRect();
    if (top <= rect.bottom === false) return false;
    // Check if the element is out of view due to a container scrolling
    if ((top + height) <= rect.top) return false
    pr = pr.parentNode;
  } while (pr != document.body);
  // Check its within the document viewport
  return top <= document.documentElement.clientHeight;
};


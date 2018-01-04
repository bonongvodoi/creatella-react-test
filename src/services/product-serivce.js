import {Configuration, Helper} from '../commons/configuration';

class ProductService {

  async getProducts(page, sort) {
    page = page || 1;
    let url = Configuration.BASE_URL + 'products?';
    url += '_page=' + page + '&_limit=' + Configuration.LIMIT;
    if (sort) {
      url += '&_sort=' + sort;
    }
    let products = await executeGet(url);
    let totalRows = await this.getTotalRows();
    if (products === null) return null;
    let data = products.map(p => {
      p.priceDisplay = Helper.formatPrice(p.price);
      p.dateDisplay = Helper.formatDate(p.date);
      return p;
    });
    return {
      products: data,
      totalRows
    }
  }

  async sortProducts(page, sort) {
    page = page || 1;
    let url = Configuration.BASE_URL + 'products?';
    url += '_page=1' + '&_limit=' + (Configuration.LIMIT * page);
    if (sort) {
      url += '&_sort=' + sort;
    }
    let products = await executeGet(url);
    let totalRows = await this.getTotalRows();
    if (products === null) return null;
    let data = products.map(p => {
      p.priceDisplay = Helper.formatPrice(p.price);
      p.dateDisplay = Helper.formatDate(p.date);
      return p;
    });
    return {
      products: data,
      totalRows
    }
  }

  async getTotalRows() {
    // let url = Configuration.BASE_URL + 'products';
    // let products = await executeGet(url);
    // if (products === null) return 0;
    // return products.length;

    //Uncomment lines above to get total rows from API

    return 500;
  }
}

const ProductServiceInstance = new ProductService();
export default ProductServiceInstance;

const executeGet = async (url) => {
  try {
    let result = await fetch(url, {
      method: 'GET',
    });
    if (result.ok) {
      return await result.json();
    }
    else {
      return null;
    }
  }
  catch (e) {
    throw e;
  }
};
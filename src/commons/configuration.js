export const Configuration = {
  BASE_URL: 'http://localhost:3000/',
  LIMIT: 30,
};

export const Helper = {
  formatPrice: (price) => {
    return !isNaN(price) ? price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) : ''
  },
  formatDate: (date) => {
    let productDate = new Date(date);
    if(!productDate) return '';
    productDate.setHours(0,0,0,0);
    let today = new Date();
    today.setHours(0,0,0,0)
    let diff = Math.round((today - productDate)/(1000*60*60*24));
    switch (diff) {
      case 0:
        return 'today';
      case 1:
        return 'yesterday';
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return ( diff + ' days ago');
      default:
        return productDate.toLocaleDateString();
    }
  }
};
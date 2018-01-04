
const Product = PropTypes.shape({
  id: PropTypes.string,
  size: PropTypes.number,
  price: PropTypes.number,
  priceDisplay: PropTypes.string,
  face: PropTypes.string,
  date: PropTypes.string,
  dateDisplay: PropTypes.string,
});

export default Product;
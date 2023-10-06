import ProductItem from "./product-item";
import ProductCard from "../layout/productcard";
import classes from './all-products.module.css';

function AllProducts(props) {
  const { products } = props;

  return (
    <section className={classes.products}>
      <ProductCard>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductCard>
    </section>
  );
}
export default AllProducts;

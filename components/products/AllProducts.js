import ProductItem from "./ProductItem";
import ProductCard from "../layout/ProductCard";
import classes from './AllProducts.module.css';

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

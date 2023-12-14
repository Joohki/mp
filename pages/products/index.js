import { Fragment } from "react";
import Head from "next/head";
import AllProducts from "../../components/products/AllProducts";
import { getAllProducts } from "../../lib/products-util";
function AllProductsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Products</title>
        <meta name="description" content="MP그룹의 모든 상품들을 소개합니다" />
      </Head>
      <div>
        <p>준비중입니다!</p>
      </div>
      {/* <AllProducts products={props.products} /> */}
    </Fragment>
  );
}

export async function getServerSideProps() {
  const allProducts = await getAllProducts();
  return {
    props: {
      products: allProducts,
    },
  };
}

export default AllProductsPage;

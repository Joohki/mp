
import Head from "next/head";
import AllProducts from "../../components/products/AllProducts";
import { getAllProducts } from "../../lib/products-util";
function AdminPage(props) {
  return (
    <>
      <Head>
        <title>Admin Products</title>
        <meta name="description"/>
      </Head>
      <AllProducts products={props.products} />
    </>
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

export default AdminPage;

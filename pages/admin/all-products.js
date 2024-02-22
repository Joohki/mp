import Head from "next/head";
import AdminAllProducts from "@/components/admin/AdminAllProducts";
import { getAllProducts } from "../../lib/products-util";
function AdminAllProductsPage(props) {
  return (
    <>
      <Head>
        <title>Admin Products</title>
        <meta name="description" />
      </Head>

      <AdminAllProducts products={props.products} />
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

export default AdminAllProductsPage;

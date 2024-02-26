import Head from "next/head";
import AdminAllProducts from "@/components/admin/AdminAllProducts";
import { getAllProducts } from "../../lib/products-util";
function AdminAllProductsPage() {
  return (
    <>
      <Head>
        <title>Admin Products</title>
        <meta name="description" />
      </Head>

      <AdminAllProducts />
    </>
  );
}

// export async function getServerSideProps() {
//   const allProducts = await getAllProducts();
//   return {
//     props: {
//       products: allProducts,
//     },
//   };
// }

export default AdminAllProductsPage;

import Head from "next/head";

import { getAllProducts } from "../../lib/products-util";

function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin Products</title>
        <meta name="description" />
      </Head>

   
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

export default AdminPage;

import AddProductForm from "../../components/admin/AddProductForm";

function AddProductPage(){
return ( <AddProductForm/>)
}
export async function getServerSideProps() {
    const allProducts = await getAllProducts();
    return {
      props: {
        products: allProducts,
      },
    };
  }
  
export default AddProductPage;
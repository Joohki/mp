import { useRouter } from "next/router";
import EditProductForm from '@/components/admin/EditProductForm'
const AdminEditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EditProductForm id={id}/>
};

export default AdminEditProductPage;

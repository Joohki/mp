import AdminOrderDetail from '@/components/admin/order/AdminOrderDetail'
import { useRouter } from "next/router";
const OrderDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <AdminOrderDetail id={id} />;
};

export default OrderDetailPage;

import OrderDetail from "../../components/order/orderDetail";
import { useRouter } from "next/router";
const OrderDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <OrderDetail id={id} />;
};

export default OrderDetailPage;

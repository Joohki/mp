import OrderDetail from "@/components/order/OrderDetail";
import { useRouter } from "next/router";
const OrderDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <OrderDetail id={id as string} />;
};

export default OrderDetailPage;

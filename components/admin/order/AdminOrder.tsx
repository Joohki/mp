import { useEffect } from "react";
import classes from "./AdminOrder.module.scss";
import useFetchFirebase from "@/hooks/useFetchFirebase";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { orderHistory } from "@/redux/reducer/order";
import { orderActions } from "@/redux/reducer/order";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/ui/Loader";
import { formatTime, priceFormat } from "@/utils/utils";
const AdminOrder = () => {
  const { storeOrders, calculateTotalOrderAmount } = orderActions;
  const { data, isLoading } = useFetchFirebase("orders");

  const dispatch = useDispatch();
  const router = useRouter();

  const orders = useSelector(orderHistory);

  useEffect(() => {
    dispatch(storeOrders(data));
  }, [dispatch, data]);

  const handleClick = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };

  return (
    <div className={classes.order}>
      <Heading title="주문 내역" subtitle="주문 상태 변경" />

      <>
        {isLoading && <Loader basic />}
        <div className={classes.table}>
          {orders.length === 0 ? (
            <p>주문 목록이 없습니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>주문 날짜</th>
                  <th>주문 아이디</th>
                  <th>주문 금액</th>
                  <th>주문 상태</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const { id, orderDate, orderTime, orderAmount, orderStatus } =
                    order;

                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>{formatTime(orderDate)}</td>
                      <td>{id}</td>
                      <td>{priceFormat(orderAmount)}원</td>
                      <td>
                        <p
                          className={
                            orderStatus !== "배송완료"
                              ? `${classes.pending}`
                              : `${classes.delivered}`
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </div>
  );
};

export default AdminOrder;

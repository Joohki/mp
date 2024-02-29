import { useEffect } from "react";
import classes from "./OrderHistory.module.scss";
import useFetchFirebase from "@/hooks/useFetchFirebase";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@/redux/reducer/order";
import { orderHistory } from "@/redux/reducer/order";
import { reduxUserEmail } from "@/redux/reducer/user";
import Loader from "../ui/Loader";
import { formatTime, priceFormat } from "@/utils/utils";

import { useRouter } from "next/navigation";
import { IOrder } from "@/types";

const OrderHistory = () => {
  const { storeOrders} = orderActions;
  const { data, isLoading } = useFetchFirebase(process.env.orders);
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(storeOrders(data.map((item)=>({...item,createdAt:null}))));//redux에 timeStamp가 직렬화가 안되어 비워두고 저장
  }, [dispatch, data]);

  const orders = useSelector(orderHistory);
  const userId = useSelector(reduxUserEmail);

  const filteredOrders = orders.filter(() => true);

  const handleClick = (id:string) => {
    router.push(`/order-history/${id}`);
  };

  return (
    <section className={classes.order}>
      <div className={classes.title}>주문 목록</div>
      {isLoading && <Loader />}
      <div className={classes.table}>
        {filteredOrders.length === 0 ? (
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
              {filteredOrders.map((order:IOrder, index) => {
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
    </section>
  );
};

export default OrderHistory;

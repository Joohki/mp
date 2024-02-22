import classes from "./AdminOrderDetail.module.scss";
import { useParams } from "next/navigation";
import useFetchDocument from "@/hooks/useFetchDocument";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import ChangeOrderStatus from "@/components/changestatus/ChangeStatus";
import { priceFormat } from "@/utils/utils";
import { ICartItem, IOrder } from "@/types";
import { useState, useEffect } from "react";
const AdminOrderDetail = (props) => {
  const { id } = props;
  const [order, setOrder] = useState();
  const { document } = useFetchDocument(process.env.orders, id);
  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section className={classes.table}>
      <Heading title="주문 상세 정보" />
      {order === null ? (
        <Loader />
      ) : (
        <>
          <div className={classes.details}>
            <p>
              <b>주문 아이디</b> {order?.id}
            </p>
            <p>
              <b>주문 가격</b> {order?.orderAmount} 원
            </p>
            <p>
              <b>주문 상태</b> {order?.orderStatus}
            </p>
            
          </div>
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>상품</th>
                <th>가격</th>
                <th>개수</th>
                <th>합계</th>
              </tr>
            </thead>
            <tbody>
              {order?.cartItems.map((cartItem, index) => {
                const { id, name, price, imageURL, totalPrice ,quantity} = cartItem;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>{quantity}</td>
                    <td>{priceFormat(totalPrice)}원</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ChangeOrderStatus order={order} id={id} />
        </>
      )}
    </section>
  );
};

export default AdminOrderDetail;

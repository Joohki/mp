import classes from "./OrderDetail.module.scss";
import useFetchDocument from "@/hooks/useFetchDocument";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { priceFormat } from "@/utils/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { ICartItem } from "@/types";
const OrderDetail = (props: { id: string }) => {
  const { id } = props;

  const [order, setOrder] = useState<DocumentData>();
  const { document } = useFetchDocument(process.env.orders as string, id);
  useEffect(() => {
    setOrder(document as DocumentData);
  }, [document]);

  return (
    <section className={classes.table}>
      <div className={classes.title}>주문 상세 정보</div>
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
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>상품</th>
                  <th>가격</th>
                  <th>개수</th>
                  <th>합계</th>
                  <th>실행</th>
                </tr>
              </thead>
              <tbody>
                {order?.cartItems.map((cartItem: ICartItem, index: number) => {
                  const { id, name, price, quantity, totalPrice } = cartItem;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        {/* <Image
                          src={imageURL}
                          alt={name}
                          width={100}
                          height={100}
                        /> */}
                      </td>
                      <td>{priceFormat(price)}원</td>
                      <td>{quantity}</td>
                      <td>{priceFormat(totalPrice)}원</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default OrderDetail;

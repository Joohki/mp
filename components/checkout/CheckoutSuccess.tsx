import { useState, useEffect } from "react";
import classes from "./CheckoutSuccess.module.scss";
import Link from "next/link";
import { useRouter } from 'next/router';

interface Payment {
  orderName?: string;
  orderId?: string;
  approvedAt?: string;
  card?: {
    number: number;
    amount: number;
  };
  balanceAmount: number;
}

const CheckoutSuccess = () => {
  const router = useRouter();
  const [payment, setPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { orderId } = router.query;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
        const url = `https://api.tosspayments.com/v1/payments/orders/${orderId}`;
        const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다");
        }

        const result: Payment = await response.json();
        setPayment(result);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [router.query]);

  if (!payment) {
    return <div>로딩 중...</div>;
  }

  const { card } = payment;

  return (
    <section className={classes.success}>
      <ul className={classes.list}>
        <li>
          <b>결제 상품:</b>
          {payment.orderName}
        </li>
        <li>
          <b>주문 번호:</b>
          {payment.orderId}
        </li>
        <li>
          <b>카드 번호:</b>
          {card?.number}
        </li>
        <li>
          <b>결제 금액:</b>
          {payment.balanceAmount}원
        </li>
        <li>
          <b>결제승인날짜:</b> {payment.approvedAt}
        </li>
      </ul>
      <button>
        <Link href="/order-history">주문 상태 보기</Link>
      </button>
    </section>
  );
};

export default CheckoutSuccess;
import classes from "./Checkout.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { cartActions } from "../../redux/reducer/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Checkout() {
  const priceFormat = (price) => {
    return price.toLocaleString("ko-Kr");
  };
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount).toFixed(2);
  const userEmail = useSelector((state) => state.user.email);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tossPayment = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
      );

      const data = await tossPayment.requestPayment("카드", {
        amount: totalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
      });

      const { orderId, paymentKey, amount } = data;

      const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

      const url = `https://api.tosspayments.com/v1/payments/confirm`;
      const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
        "base64"
      );

      const confirmResponse = await fetch(url, {
        method: "post",
        body: JSON.stringify({
          amount,
          orderId,
          paymentKey,
        }),
        headers: {
          Authorization: `Basic ${basicToken}`,
          "Content-Type": "application/json",
        },
      });

      const confirmData = await confirmResponse.json();
      console.log("confirmResponse", confirmData);

      const today = new Date();
      const date = today.toDateString();
      const time = today.toLocaleDateString();

      const orderData = {
        orderID: orderId,
        userEmail,
        orderDate: date,
        orderTime: time,
        orderAmount: amount,
        orderStatus: "주문수락",
        cartItems,

        createdAt: Timestamp.now().toDate(),
      };
      console.log(orderData);
      await addDoc(collection(db, "orders"), orderData);
      dispatch(cartActions.clearCart());
      toast.success("성공");
      router.push(`/checkout/success/?orderId=${orderId}`);
    } catch (error) {
      if (error.code === "USER_CANCEL") {
        toast.error("결제창이 닫혔습니다.");
      } else {
        console.error("Error in handleSubmit:", error);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className={classes.summary}>
      <h3>주문 요약</h3>
      <div className={classes.inner}>
        {cartItems.length === 0 ? (
          <>
            <p>장바구니에 상품이 없습니다.</p>
            <Link href="/">홈 페이지로</Link>
          </>
        ) : (
          <>
            <div>
              {cartItems.map((item) => {
                const { id, name, price, quantity } = item;
                return (
                  <div key={id} className={classes.card}>
                    <p>
                      <b>상품:</b> {name}
                    </p>
                    <p>
                      <b>개수: </b>
                      {quantity}
                    </p>
                    <p>
                      <b>가격: </b>
                      {priceFormat(price)}원
                    </p>
                    <p>
                      <b>세트 가격: </b>
                      {priceFormat(price * quantity)}원
                    </p>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSubmit}>
              <div className={classes.content}>
                <div className={classes.quantity}>
                  <b>총 상품 개수 : </b>
                  {totalQuantity}개
                </div>

                <div className={classes.price}>
                  <b>합계 : </b>
                  {priceFormat(totalAmount)}원
                </div>
                <button>결제</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
export default Checkout;

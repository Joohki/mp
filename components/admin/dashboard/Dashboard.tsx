import { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import useFetchFirebase from "@/hooks/useFetchFirebase";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS } from "@/redux/reducer/product";
import {
  orderActions,
  orderHistory,
  totalOrderAmount,
} from "@/redux/reducer/order";
import Heading from "@/components/heading/Heading";
import InfoBox from "@/components/infoBox/InfoBox";
import { priceFormat } from "@/utils/utils";
import Chart from "@/components/chart/Chart";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="#4385F4" />;

const Dashboard = () => {
  const { storeOrders, calculateTotalOrderAmount } = orderActions;
  const dispatch = useDispatch();
  const { data: products } = useFetchFirebase(process.env.products as string);
  const { data } = useFetchFirebase(process.env.orders as string);
  const orderAmount = useSelector(totalOrderAmount);
  const orders = useSelector(orderHistory);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: products,
      })
    );
    dispatch(storeOrders(data));
    dispatch(calculateTotalOrderAmount());
  }, [dispatch, data, products]);

  return (
    <div className={styles.home}>
      <Heading title="관리자 대시보드" />
      <div className={styles.infoBox}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"수익"}
          count={`${priceFormat(Number(orderAmount))}원`}
          icon={earningIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"총상품"}
          count={`${products.length}개`}
          icon={productIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"총 주문건수"}
          count={`${orders.length}건`}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;

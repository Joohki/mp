import { db } from "@/firebase/firebase";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import classes from "./ChangeStatus.module.scss";
import Button from "@/components/ui/Button";
import { IOrder } from "@/types";

interface IChangeOrderStatusProps {
  order: IOrder;
  id: string;
}

const ChangeOrderStatus = ({ order, id }: IChangeOrderStatusProps) => {
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    const orderData = {
      orderStatus: status,
      editedAt: Timestamp.now().toString(),
    };

    try {
      updateDoc(doc(db, "orders", id), orderData);
      setIsLoading(false);
      toast.success("주문 상태가 변경되었습니다.");
      router.push("/admin/orders");
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader basic />}
      <div className={classes.status}>
        <div className={classes.card}>
          <h4>주문 상태 업데이트</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option disabled value="">
                -- 선택 --
              </option>
              <option value="주문수락">주문수락</option>
              <option value="주문처리중">주문처리중</option>
              <option value="배송중">배송중</option>
              <option value="배송완료">배송완료</option>
            </select>
            <div>
              <Button type="submit">업데이트</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeOrderStatus;

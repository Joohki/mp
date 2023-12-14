import { db } from "../firebase/firebase";
import { collection, orderBy, query, getDocs } from "firebase/firestore";

export async function getAllProducts() {
  try {
    const docRef = collection(db, "products");
    const q = query(docRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const loadedProducts = [];

    querySnapshot.forEach((doc) => {
      loadedProducts.push({
        id: doc.id,
        // 필요한 필드에는 doc.data()를 사용하여 접근할 수 있습니다.
        name: doc.data().name,
        // description: doc.data().description,
        price: doc.data().price,
      });
    });

    return loadedProducts;
  } catch (error) {
    console.error("제품을 가져오는 중 오류 발생: ", error);
    throw new Error("문제가 발생했습니다");
  }
}

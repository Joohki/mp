import { useState } from "react";
import classes from "./AddProductForm.module.css";
import { useRouter } from "next/navigation";
export const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
  { id: 5, name: "Movies & Television" },
  { id: 6, name: "Home & Kitchen" },
  { id: 7, name: "Automotive" },
  { id: 8, name: "Software" },
  { id: 9, name: "Video Games" },
  { id: 10, name: "Sports & Outdoor" },
  { id: 11, name: "Toys & Games" },
  { id: 12, name: "Industrial & Scientific" },
];
const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProductForm = () => {
  const [product, setProduct] = useState({ ...initialState });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("이미지를 성공적으로 업로드했습니다.");
        });
      }
    );
  };
  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        addDoc(collection(db, "products"), {
            name: product.name,
            imageURL: product.imageURL,
            price: Number(product.price),
            category: product.category,
            brand: product.brand,
            desc: product.desc,
            createdAt: Timestamp.now().toDate()
        })

        setIsLoading(false);
        setUploadProgress(0);
        setProduct({ ...initialState })

        toast.success('상품을 저장했습니다.');
        router.push("/admin/all-products");
    } catch (error) {
        setIsLoading(false);
        toast.error(getErrorMessage(error));
    }
}

  return (
    <div className={classes.product}>
      <form>
        <label>상품 이름:</label>
        <input
          type="text"
          placeholder="상품 이름"
          required
          name="name"
          value={product.name}
        />

        <div>
          <input type="file" placeholder="상품 이미지" name="image" required />
          {product.imageURL === "" ? null : (
            <input
              type="text"
              name="imageURL"
              disabled
              value={product.imageURL}
              required
              placeholder="이미지 URL"
            />
          )}
        </div>
        <label>상품 가격:</label>
        <input
          type="number"
          placeholder="상품 가격"
          required
          name="price"
          value={product.price}
        />
        <label>상품 카테고리:</label>
        <select required name="category" value={product.category}>
          <option value="" disabled>
            --상품 카테고리 선택
          </option>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>

        <label>상품 브랜드/회사:</label>
        <input
          type="text"
          placeholder="상품 브랜드/회사"
          name="brand"
          value={product.brand}
        />

        <label>상품 설명:</label>
        <textarea name="desc" cols={10} rows={10} required></textarea>
        <button type="submit">상품 생성</button>
      </form>
    </div>
  );
};

export default AddProductForm;

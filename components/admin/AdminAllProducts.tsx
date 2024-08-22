import React, { useEffect, useState } from "react";
import classes from "./AdminAllProducts.module.scss";
import useFetchFirebase from "@/hooks/useFetchFirebase";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "@/redux/reducer/product";
import { filterBySearch, selectFilteredProducts } from "@/redux/reducer/filter";
import Loader from "@/components/ui/Loader";
import Search from "@/components/search/Search";
import Image from "next/image";
import { priceFormat } from "@/utils/utils";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from "@/components/pagination/ListPagination";
import Notiflix from "notiflix";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
const AdminAllProducts = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useFetchFirebase(process.env.products as string);

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts;
  //   .slice(
  //     indexOfFirstProduct,
  //     indexOfLastProduct
  //   );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(filterBySearch({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id: string, imageURL: string) => {
    Notiflix.Confirm.show(
      "상품 삭제하기",
      "이 상품을 삭제하게 됩니다.",
      "삭제",
      "취소",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("삭제가 취소되었습니다.");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "#4385F4",
        okButtonBackground: "#4385F4",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id: string, imageURL: string) => {
    try {
      await deleteDoc(doc(db, process.env.products as string, id));
      if (imageURL) {
        const storageRef = ref(storage, imageURL);
        await deleteObject(storageRef);
      }
      toast.success("상품을 성공적으로 삭제했습니다.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.table}>
        <div className={classes.search}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>순서</th>
                <th>이미지</th>
                <th>이름</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>실행</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index: number) => {
                const { id, name, category, price, imageURL } = product;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{priceFormat(price)}원</td>
                    <td>
                      <Link href={`/admin/editproduct/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>{" "}
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
          productsPerPage={productsPerPage}
        /> */}
      </div>
    </>
  );
};

export default AdminAllProducts;

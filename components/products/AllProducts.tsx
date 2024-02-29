import ProductItem from "./ProductItem";
import ProductCard from "../layout/ProductCard";
import classes from "./AllProducts.module.css";
import ListPagination from "../pagination/ListPagination";
import { useState ,useEffect} from "react";
import { IProduct } from "@/types";
interface AllProductsProps{
  products:IProduct[]
}
function AllProducts(props:AllProductsProps) {
  const { products } = props;
  
  const [lists, setLists] = useState([]); // 백엔드와 통신하여 모든 데이터를 setLists 에 저장해서 사용
  const [limit, setLimit] = useState(5); // 한 페이지에 보여줄 데이터의 개수
  const [page, setPage] = useState(1); // 페이지 초기 값은 1페이지
  const [counts, setCounts] = useState(1); // 데이터의 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0
  const [visibleLists, setVisibleLists] = useState([]);
  useEffect(()=>{setLists(products);setCounts(products.length)},[products])
  
  return (
    <section className={classes.products}>
      <ProductCard>
        {visibleLists.map((product:IProduct) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductCard>
      <ListPagination
        limit={limit}
        page={page}
        setPage={setPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        counts={counts}
        lists={lists}
        setLists={setLists}
        visibleLists={visibleLists}
        setVisibleLists={setVisibleLists}
      />
    </section>
  );
}
export default AllProducts;

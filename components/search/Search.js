import classes from "./Search.module.css";
import { useState, useEffect } from "react";
import { BiSearch } from 'react-icons/bi';
const Search = (props) => {
  let { datas } = props;
  const temp = datas.filter(
    (data) =>
      data?.name?.toLowerCase().includes(search.toLowerCase()) ||
      data?.category?.toLowerCase().includes(search.toLowerCase())
  );
  datas = temp;

  const [searched, setSearched] = useState('')
  useEffect(()=>{},[searched])
  return (
    <div className={classes.input}>
      {" "}
      <BiSearch size={18}  />
      <input
        type="text"
        placeholder="찾고 싶은 것을 검색해보세요."
        value={searched}
        onChange={(event)=>setSearched(event.target.value)}
      />
    </div>
  );
};
export default Search;

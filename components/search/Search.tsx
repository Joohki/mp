import classes from "./Search.module.scss";
import { useState, useEffect } from "react";
import { BiSearch } from 'react-icons/bi';
import { ChangeEvent } from 'react'
interface ISearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({ value, onChange }: ISearchProps) => {
  

  // useEffect(()=>{},[searched])
  // const temp = datas.filter(
  //   (data) =>
  //     data?.name?.toLowerCase().includes(searched.toLowerCase()) ||
  //     data?.category?.toLowerCase().includes(searched.toLowerCase())
  // );
  // datas = temp;

  
  return (
    <div className={classes.search}>
      
      <BiSearch size={18} className={classes.icon} />
      <input
        type="text"
        placeholder="검색해보세요."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default Search;

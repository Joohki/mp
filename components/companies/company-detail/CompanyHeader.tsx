import Image from "next/image";

import classes from "./CompanyHeader.module.css";
interface CompanyHeaderProps {
  title: string;
  image: string;
}
function CompanyHeader(props: CompanyHeaderProps) {
  const { title, image } = props;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt="headerimage" width={200} height={150} />
    </header>
  );
}

export default CompanyHeader;

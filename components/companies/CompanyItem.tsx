import Link from "next/link";
import Image from "next/image";
import { CompanyDetailProps } from "@/types";
import classes from "./CompanyItem.module.css";

function CompanyItem(props: CompanyDetailProps) {
  const { title, image, excerpt, date, slug } = props.company;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/companies/${slug}/${image}`;
  const linkPath = `/companies/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt="detail company image"
            // width={300}
            // height={200}
            // layout="responsive"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          {/* <time>{formattedDate}</time> */}
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default CompanyItem;

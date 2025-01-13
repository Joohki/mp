import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import classes from "./Ad.module.scss";
import Link from "next/link";
import LinkTag from "@/components/layout/LinkTag";

const news = [
  "https://m.kienews.com/news/newsview.php?ncode=1065580129985474",
  "https://m.newspim.com/news/view/20231214001046",
  "https://n.news.naver.com/article/003/0012268426?sid=101",
];
function Ad(props: { onCloseAd: () => void }) {
  return ReactDOM.createPortal(
    <div
      className={classes.ad}
      style={{
        backgroundImage: "url('/images/mpimage/adbackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={classes.item}>
        <FontAwesomeIcon
          icon={faX}
          style={{ fontSize: 25, color: "white" }}
          onClick={props.onCloseAd}
        />
      </div>
      <h2 className={classes.adMain}>MP 보도기사</h2>
      {news.map((item, index) => (
        <p>
          <LinkTag key={index}>{item}</LinkTag>
        </p>
      ))}
    </div>,
    document.getElementById("ad")
  );
}

export default Ad;

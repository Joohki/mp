import { useState } from "react";
import classes from "./BusinessCarousel.module.css";
import Image from "next/image";
const IMAGE_1_URL = "/images/mpimage/naturalenvironment.png";
const IMAGE_2_URL = "/images/mpimage/h2o.png";
const IMAGE_3_URL = "/images/mpimage/globalwarming.png";
const IMAGE_4_URL = "/images/mpimage/emissionright.png";
const IMAGE_5_URL = "/images/mpimage/h2.png";
export default function BusinessCarousel() {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <div className={classes.carousel}>
      <ul className={classes.carousel_slides}>
        <input
          type="radio"
          name="radio-buttons"
          className={classes.img1}
          checked={activeImage === 1}
          readOnly
        />
        <li className={classes.carousel_slidecontainer}>
          <div className={classes.carousel_slideimg}>
            <Image
              src={IMAGE_1_URL}
              width={0}
              height={0}
              sizes="50vw"
              style={{ width: 'auto', height: '100%' }}
            />
          </div>
          <div className={classes.carousel_controls}>
            <label
              onClick={() => setActiveImage(5)}
              className={classes.carousel_slideprev}
            >
              <span>&lsaquo;</span>
            </label>
            <label
              onClick={() => setActiveImage(2)}
              className={classes.carousel_slidenext}
            >
              <span>&rsaquo;</span>
            </label>
          </div>
        </li>
        <input
          type="radio"
          name="radio-buttons"
          className={classes.img2}
          checked={activeImage === 2}
          readOnly
        />
        <li className={classes.carousel_slidecontainer}>
          <div className={classes.carousel_slideimg}>
            <img alt="scenery 2" src={IMAGE_2_URL} />
          </div>
          <div className={classes.carousel_controls}>
            <label
              onClick={() => setActiveImage(1)}
              className={classes.carousel_slideprev}
            >
              <span>&lsaquo;</span>
            </label>
            <label
              onClick={() => setActiveImage(3)}
              className={classes.carousel_slidenext}
            >
              <span>&rsaquo;</span>
            </label>
          </div>
        </li>
        <input
          type="radio"
          name="radio-buttons"
          className={classes.img3}
          checked={activeImage === 3}
          readOnly
        />
        <li className={classes.carousel_slidecontainer}>
          <div className={classes.carousel_slideimg}>
            <img alt="scenery 3" src={IMAGE_3_URL} />
          </div>
          <div className={classes.carousel_controls}>
            <label
              onClick={() => setActiveImage(2)}
              className={classes.carousel_slideprev}
            >
              <span>&lsaquo;</span>
            </label>
            <label
              onClick={() => setActiveImage(4)}
              className={classes.carousel_slidenext}
            >
              <span>&rsaquo;</span>
            </label>
          </div>
        </li>
        <input
          type="radio"
          name="radio-buttons"
          className={classes.img4}
          checked={activeImage === 4}
          readOnly
        />
        <li className={classes.carousel_slidecontainer}>
          <div className={classes.carousel_slideimg}>
            <Image
              src={IMAGE_4_URL}
              width={0}
              height={0}
              sizes="50vw"
              style={{ width: 'auto', height: '100%' }}
            />
          </div>
          <div className={classes.carousel_controls}>
            <label
              onClick={() => setActiveImage(3)}
              className={classes.carousel_slideprev}
            >
              <span>&lsaquo;</span>
            </label>
            <label
              onClick={() => setActiveImage(5)}
              className={classes.carousel_slidenext}
            >
              <span>&rsaquo;</span>
            </label>
          </div>
        </li>
        <input
          type="radio"
          name="radio-buttons"
          className={classes.img5}
          checked={activeImage === 5}
          readOnly
        />
        <li className={classes.carousel_slidecontainer}>
          <div className={classes.carousel_slideimg}>
            <Image
              src={IMAGE_5_URL}
              width={0}
              height={0}
              sizes="50vw"
              style={{ width: 'auto', height: '100%' }}
            />
          </div>
          <div className={classes.carousel_controls}>
            <label
              onClick={() => setActiveImage(4)}
              className={classes.carousel_slideprev}
            >
              <span>&lsaquo;</span>
            </label>
            <label
              onClick={() => setActiveImage(1)}
              className={classes.carousel_slidenext}
            >
              <span>&rsaquo;</span>
            </label>
          </div>
        </li>
        
        <div className={classes.carousel_dots}>
          <label
            onClick={() => setActiveImage(1)}
            className={`${classes.carousel_dot} ${classes.imgdot1}`}
          ></label>
          <label
            onClick={() => setActiveImage(2)}
            className={`${classes.carousel_dot} ${classes.imgdot2}`}
          ></label>
          <label
            onClick={() => setActiveImage(3)}
            className={`${classes.carousel_dot} ${classes.imgdot3}`}
          ></label>
          <label
            onClick={() => setActiveImage(4)}
            className={`${classes.carousel_dot} ${classes.imgdot4}`}
          ></label>
          <label
            onClick={() => setActiveImage(5)}
            className={`${classes.carousel_dot} ${classes.imgdot5}`}
          ></label>
        </div>
      </ul>
      <Image src="/images/mpimage/carousel-background.jpg" fill/>
    </div>
    
    
  );
}

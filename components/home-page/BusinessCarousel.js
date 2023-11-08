import { useState } from "react";
import classes from './BusinessCarousel.module.css'
import Image from "next/image";
const IMAGE_1_URL =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const IMAGE_2_URL =
  "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const IMAGE_3_URL =
  "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";

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
              <img alt="scenery 1" src={IMAGE_1_URL} />
            </div>
            <div className={classes.carousel_controls}>
              <label
                onClick={() => setActiveImage(3)}
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
          </div>
        </ul>
      </div>
    
  );
}

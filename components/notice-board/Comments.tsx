import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import classes from './Comments.module.scss'

export default function Comments(props) {
  return (
    <div className={classes.comments}>
      <form className={classes.comments_form} >
        <div className={classes.form_block}>
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
           
          />
        </div>
        <div className={`${classes.form_block} ${classes.form_block_reverse}`}>
          <input type="submit" value="입력" className={classes.form_btn_submit} />
        </div>
      </form>
      {/* <div className="comments__list">
        {props.post?.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div key={comment.createdAt} className="comment__box">
              <div className="comment__profile-box">
                <div className="comment__email">{comment?.email}</div>
                <div className="comment__date">{comment?.createdAt}</div>
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
            
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__text">{comment?.content}</div>
            </div>
          ))}
      </div> */}
    </div>
  );
}

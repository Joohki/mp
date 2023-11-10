import classes from "./PostDetail.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PostProps } from "./PostList";
import { toast } from "react-toastify";
import Comments from "./Comments.js";
import { useRouter } from "next/router";
import { deleteData } from "../../lib/products-util";
export default function PostDetail(props) {
  // const [post, setPost] = useState("");
  // const params = useParams();

  const { post } = props;
  const router = useRouter();

  const userEmail = useSelector((state) => state.user.email);

  async function handleDelete(event) {
    event.preventDefault();
    try {
      const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
      if (confirm && post && post._id) {
        const result = await deleteData({ id: post._id });

        toast.success("게시글을 삭제했습니다.");
        router.replace("/notice-board");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className={classes.post_detail}>
        {post ? (
          <>
            <div className={classes.post_box}>
              <div className={classes.post_title}>{post?.title}</div>
              <div className={classes.post_profilebox}>
                <div className={classes.post_profile} />
                <div className={classes.post_authorname}>{post?.email}</div>
                <div className={classes.post_date}>{post?.createdAt}</div>
              </div>
              <div className={classes.post_utilsbox}>
                <div className={classes.post_category}>
                  {post?.category || "자유주제"}
                </div>
                {post?.email === userEmail && (
                  <>
                    <div
                      className={classes.post_delete}
                      role="presentation"
                      onClick={handleDelete}
                    >
                      삭제
                    </div>
                    <div className={classes.post_edit}>
                      {/* <Link to={`/posts/edit/${post?.id}`}>수정</Link> */}
                    </div>
                  </>
                )}
              </div>
              <div
                className={`${classes.post_text}${classes.post_textprewrap}`}
              >
                {post?.contents}
              </div>
            </div>
            {/* <Comments post={post} getPost={getPost} /> */}
          </>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}

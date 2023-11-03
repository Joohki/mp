import classes from "./PostDetail.module.css";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostProps } from "./PostList";
import { toast } from "react-toastify";
import Comments from "./Comments.js";

export default function PostDetail(props) {
  // const [post, setPost] = useState("");
  // const params = useParams();
  // const navigate = useNavigate();
  const {post} = props.post

  // const getPost = async () => {
  //   if (id) {
  //     const docRef = doc(db, "posts", id);
  //     const docSnap = await getDoc(docRef);
  //   }
  // };

  // const handleDelete = async () => {
  //   const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
  //   if (confirm && post && post.id) {
  //     await deleteDoc(doc(db, "posts", post.id));
  //     toast.success("게시글을 삭제했습니다.");
  //     navigate("/");
  //   }
  // };

  // useEffect(() => {
  //   if (params?.id) getPost(params?.id);
  // }, [params?.id]);

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
                {post?.uid === user?.uid && (
                  <>
                    <div
                      className={classes.post_delete}
                      role="presentation"
                      onClick={handleDelete}
                    >
                      삭제
                    </div>
                    <div className={classes.post_edit}>
                      <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                    </div>
                  </>
                )}
              </div>
              <div
                className={`${classes.post_text}${classes.post_textprewrap}`}
              >
                {post?.content}
              </div>
            </div>
            {/* <Comments post={post} getPost={getPost} /> */}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

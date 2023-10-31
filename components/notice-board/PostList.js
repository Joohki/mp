import classes from "./PostList.module.css";
import { useState } from "react";
import { CATEGORIES } from "./PostForm";
import Link from "next/link";
function PostList(props) {
  const [activeTab, setActiveTab] = useState("");
  const {boarddata} = props
  const posts = boarddata.sort((data1,data2)=>{
    const date1=  data1.createdAt
    const date2=  data2.createdAt
    if (date1>=date2) {return -1}
    else {return 1}
  })
  return (
    <>
      <div className={classes.post_navigation}>
        <div
          role="presentation"
          onClick={() => {
            setActiveTab("all");
          }}
          className={activeTab === "all" ? classes.active : ""}
        >
          전체
        </div>
        <div
          role="presentation"
          onClick={() => {
            setActiveTab("my");
          }}
          className={activeTab === "my" ? classes.active : ""}
        >
          나의 글
        </div>
        {CATEGORIES.map((category) => (
          <div
            key={category}
            role="presentation"
            onClick={() => setActiveTab(category)}
            className={activeTab === category ? classes.active : ""}
          >
            {category}
          </div>
        ))}
      </div>
      <div className={classes.post_list}>
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post?.id} className={classes.post_box}>
              <Link href={`/posts/${post?.id}`}>
                <div className={classes.post_profilebox}>
                  <div className={classes.post_profile} />
                  <div className={classes.post_author_name}>{post?.email}</div>
                  <div className={classes.post_date}>{post?.createdAt}</div>
                </div>
                <div className={classes.post_title}>{post?.title}</div>
                <div className={classes.post_text}>{post?.summary}</div>
              </Link>
              {/* {post?.uid === user?.uid && (
                <div className={classes.post_utilbox}>
                  <div
                    className={classes.post_delete}
                    role="presentation"
                    onClick={() => handleDelete(post.id)}
                  >
                    삭제
                  </div>
                  <Link
                    to={`/posts/edit/${post?.id}`}
                    className={classes.post_edit}
                  >
                    수정
                  </Link>
                </div>
              )} */}
            </div>
          ))
        ) : (
          <div className={classes.post_nopost}>게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
export default PostList;

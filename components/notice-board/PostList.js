import classes from "./PostList.module.css";
import { useState, useEffect } from "react";
import { CATEGORIES } from "./PostForm";
import Link from "next/link";
import ListPagination from "../pagination/ListPagination";
import Search from "../search/Search";
function PostList(props) {
  const [activeTab, setActiveTab] = useState("");
  const [lists, setLists] = useState([]); // 백엔드와 통신하여 모든 데이터를 setLists 에 저장해서 사용
  const [limit, setLimit] = useState(10); // 한 페이지에 보여줄 데이터의 개수
  const [page, setPage] = useState(1); // 페이지 초기 값은 1페이지
  const [counts, setCounts] = useState(1); // 데이터의 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0
  const [visibleLists, setVisibleLists] = useState([]);
  const { boarddata } = props;
  const posts = boarddata.sort((data1, data2) => {
    const date1 = data1.date;
    const date2 = data2.date;
    if (date1 >= date2) {
      return -1;
    } else {
      return 1;
    }
  });
  useEffect(() => {
    const copy = [...posts];
    setLists(copy);
    setCounts(copy.length);
  }, [posts]);

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
      <Search datas={posts}/>
      <div className={classes.post_list}>
        {posts?.length > 0 ? (
          visibleLists?.map((post, index) => (
            <div key={post?.id} className={classes.post_box}>
              <Link href={`/notice-board/${post?.id}`}>
                <div className={classes.post_profilebox}>
                  <div className={classes.post_index}>
                    {posts.length - index-(page-1)*limit}
                  </div>
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
      <ListPagination
        limit={limit}
        page={page}
        setPage={setPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        counts={counts}
        lists={lists}
        setLists={setLists}
        visibleLists={visibleLists}
        setVisibleLists={setVisibleLists}
      />
    </>
  );
}
export default PostList;

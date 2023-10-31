import PostForm from "../../components/notice-board/PostForm";
import PostList from "../../components/notice-board/PostList";
import {getAllBoardDatas} from '../../lib/board-util'
function PostPage(props) {
  return (
    <>
      <PostForm />
      <PostList boarddata={props.boarddatas}/>
    </>
  );
}
export async function getStaticProps() {
  const allBoardDatas = await getAllBoardDatas();
  return {
    props: {
      boarddatas: allBoardDatas.map((data)=>({
        id:data._id.toString(),
        email:data.email,
        title:data.title,
        summary:data.summary,
        createdAt:data.createdAt,
      })),
    },
  };
}

export default PostPage;


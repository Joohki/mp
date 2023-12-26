import Head from "next/head";
import PostForm from '@/components/notice-board/PostForm'
import PostDetail from "../../../components/notice-board/PostDetail";
import { getAllBoardDatas, getDetailBoardData } from "../../../lib/board-util";
const PostEditPage = (props) => {
  return (
    <>
      <Head></Head>
      <PostDetail post={props.post} />
      <PostForm post={props.post}/>
    </>
  );
};
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const postDatas = await getAllBoardDatas();
  const postData = await getDetailBoardData(postDatas, slug);

  if (!postData) {
    return {
      notFound: true, // Next.js에게 이 페이지는 접근 불가능하다고 알림
    };
  }
  return {
    props: {
      post: postData,
    },
  
  };
}

export default PostEditPage;

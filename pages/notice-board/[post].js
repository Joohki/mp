import Head from "next/head";
import PostDetail from "../../components/notice-board/PostDetail";
import { getAllBoardDatas, getDetailBoardData } from "../../lib/board-util";
const PostDetailPage = (props) => {
  return (
    <>
      <Head></Head>
      <PostDetail post={props.post} />
    </>
  );
};
export function getStaticProps(context) {
  const { params } = context;
  const { post } = params;

  const postDatas = getAllBoardDatas();
  const postData = getDetailBoardData(postDatas, post);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postDatas = getAllBoardDatas();
  return {
    paths: postDatas.map((post) => ({ params: { post: post } })),
    fallback: false,
  };
}
export default PostDetailPage;

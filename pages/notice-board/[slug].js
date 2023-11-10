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
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const postDatas = await getAllBoardDatas();
  let postData = await getDetailBoardData(postDatas, slug);
  if(typeof postData==='undefined'){postData=null}
  return {
    props: {
      post: postData,
    },
    // revalidate: 600,
  };
}

// export async function getStaticPaths() {
//   const postDatas = await getAllBoardDatas();
//   return {
//     paths: postDatas.map((post) => ({ params: { slug: post._id.toString() } })),
//     fallback: false,
//   };
// }
export default PostDetailPage;

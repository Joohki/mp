import PostForm from "@/components/notice-board/PostForm";
import PostDetail from "../../../components/notice-board/PostDetail";
import { getAllBoardDatas, getDetailBoardData } from "../../../lib/board-util";
import { IPostFormProps } from "@/types";

const PostEditPage = (props: IPostFormProps) => {
  return (
    <>
      <PostDetail post={props.post} />
      <PostForm post={props.post} />
    </>
  );
};
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const postDatas = await getAllBoardDatas();
  const postData = getDetailBoardData(postDatas, slug);

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

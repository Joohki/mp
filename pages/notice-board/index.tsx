import { IPostFormData } from "@/types";
import PostList from "../../components/notice-board/PostList";
import { getAllBoardDatas } from "../../lib/board-util";

function BoardPage(props: { boarddatas: IPostFormData[] }) {
  return (
    <>
      <PostList boarddata={props.boarddatas} />
    </>
  );
}
export async function getServerSideProps() {
  const allBoardDatas: IPostFormData[] = await getAllBoardDatas();
  return {
    props: {
      boarddatas: allBoardDatas.map((data) => ({
        ...data,
        _id: data._id && data._id.toString(),
      })),
    },
  };
}

export default BoardPage;

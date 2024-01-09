import classes from "./PostDetail.module.css";
import { useSelector } from "react-redux";
import { PostProps } from "./PostList";
import { toast } from "react-toastify";
import Comments from "./Comments.tsx";
import { useRouter } from "next/router";
import LinkTag from "@/components/layout/LinkTag";
import Link from "next/link";
async function deleteData(id) {
  const response = await fetch("/api/noticeboarddelete", {
    method: "DELETE",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}
export default function PostDetail(props) {
  const { post } = props;
  const { file, filename } = post;

  const router = useRouter();

  const userEmail = useSelector((state) => state.user.email);

  async function handleDownload() {
    try {
      if (file) {
        const a = document.createElement("a");
        a.href = file;
        a.download = file; // 파일 이름 설정
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("파일을 성공적으로 다운로드했습니다.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function handleDelete(event) {
    event.preventDefault();
    try {
      const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
      if (confirm && post && post._id) {
        await deleteData({ id: post._id });

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
                {!post.modifiedAt &&(<div className={classes.post_date}>{post?.createdAt}</div>)}
                {post.modifiedAt && (
                  <div className={classes.post_date}>
                    수정됨&nbsp;&nbsp;{post?.modifiedAt}
                  </div>
                )}
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
                      <Link href={`/notice-board/edit/${post?._id}`}>수정</Link>
                    </div>
                    {file && (
                      <div
                        className={classes.post_download}
                        role="presentation"
                        onClick={handleDownload}
                      >
                        {filename}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div
                className={`${classes.post_text} ${classes.post_textprewrap}`}
              >
                {post?.contents
                  .split("<link>")
                  .map((item, index) =>
                    index % 2 !== 0 ? (
                      <LinkTag key={index}>{item}</LinkTag>
                    ) : (
                      item
                    )
                  )}
              </div>
            </div>
            <Comments />
          </>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}

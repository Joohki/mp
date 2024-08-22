import PostForm from "@/components/notice-board/PostForm";

function PostPage() {
  return (
    <>
      <PostForm post={{name:'',email:'',title:'',summary:'',contents:'',file:'',filename:''}}/>
    </>
  );
}

export default PostPage;

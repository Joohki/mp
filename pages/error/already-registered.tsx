import AlreadyRegistered from "../../components/error/AlreadyRegistered";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function AlreadyRegisteredErrorPage() {
  return <AlreadyRegistered />;
}

export default AlreadyRegisteredErrorPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 세션을 가져오기
  const session = await getSession(context);

  // 세션이 있는 경우 profile 페이지로 리다이렉트
  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  // 세션이 없는 경우 에러 페이지를 그대로 렌더링
  return {
    props: {},
  };
}

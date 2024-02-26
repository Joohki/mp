import Head from "next/head";
import Main from "../components/home-page/Main";
import Slogan from "../components/home-page/MpSlogan";

function HomePage() {
  return (
    <>
      <Head>
        <title>MP</title>
        <meta
          name="description"
          content="주식회사 mp그룹은 고객과 다양한 에너지 솔루션을 공유하며 지구환경에 기여하고자 합니다."
        />
      </Head>
      <Main />
      
    </>
  );
}

export default HomePage;


import Head from 'next/head';
import FeaturedCompanies from '../components/home-page/FeaturedCompanies';
import Hero from '../components/home-page/Hero';
import Slogan from '../components/home-page/MpSlogan';
import { getFeaturedCompanies } from '../lib/companies-util';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>MP</title>
        <meta
          name='description'
          content='주식회사 mp그룹은 고객과 다양한 에너지 솔루션을 공유하며 지구환경에 기여하고자 합니다.'
        />
      </Head>
      <Hero />
      <Slogan/>
      <FeaturedCompanies companies={props.companies} />
    </>
  );
}

export function getStaticProps() {
  const featuredCompanies = getFeaturedCompanies();

  return {
    props: {
      companies: featuredCompanies,
    },
  };
}

export default HomePage;

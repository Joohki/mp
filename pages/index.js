
import Head from 'next/head';
import FeaturedCompanies from '../components/home-page/featured-\bcompanies';
import Hero from '../components/home-page/hero';
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

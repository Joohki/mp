import Head from 'next/head';
import { Fragment } from 'react';

import AllCompanies from '../../components/companies/AllCompanies';
import { getFeaturedCompanies } from '../../lib/companies-util';

function AllCompaniesPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Companies</title>
        <meta
          name='description'
          content='MP그룹의 모든 자회사들을 소개합니다'
        />
      </Head>
      <AllCompanies companies={props.companies} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allCompanies = getFeaturedCompanies ();

  return {
    props: {
      companies: allCompanies,
    },
  };
}

export default AllCompaniesPage;

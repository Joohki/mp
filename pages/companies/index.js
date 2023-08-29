import Head from 'next/head';
import { Fragment } from 'react';

import AllCompanies from '../../components/companies/all-companies';
import { getAllCompanies } from '../../lib/companies-util';

function AllCompaniesPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Companies</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllCompanies companies={props.companies} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allCompanies = getAllCompanies();

  return {
    props: {
      companies: allCompanies,
    },
  };
}

export default AllCompaniesPage;

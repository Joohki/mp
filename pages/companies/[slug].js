import Head from 'next/head';

import CompanyContent from '../../components/companies/company-detail/CompanyContent';
import { getCompanyData, getCompaniesFiles } from '../../lib/companies-util';

function CompanyDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.company.title}</title>
        <meta name='description' content={props.company.excerpt} />
      </Head>
      <CompanyContent company={props.company} />
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const companyData = getCompanyData(slug);

  return {
    props: {
      company: companyData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const companyFilenames = getCompaniesFiles();

  const slugs = companyFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default CompanyDetailPage;

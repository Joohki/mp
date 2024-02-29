import Head from "next/head";
import { CompanyDetailProps } from "@/types";
import CompanyContent from "../../components/companies/company-detail/CompanyContent";
import { getCompanyData, getCompaniesFiles } from "../../lib/companies-util";
import { GetStaticProps, GetStaticPaths } from "next";

function CompanyDetailPage({ company }: CompanyDetailProps) {
  return (
    <>
      <Head>
        <title>{company.title}</title>
        <meta name="description" content={company.excerpt} />
      </Head>
      <CompanyContent company={company} />
    </>
  );
}

export function getStaticProps(context: { params: { slug: string } }) {
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

  const slugs = companyFilenames.map((fileName) =>
    fileName.replace(/\.md$/, "")
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default CompanyDetailPage;

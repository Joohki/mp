import fs from "fs";
import path from "path";

import matter from "gray-matter";

const companiesDirectory = path.join(process.cwd(), "companies");

export function getCompaniesFiles() {
  return fs.readdirSync(companiesDirectory);
}

export function getCompanyData(companyIdentifier) {
  const companySlug = companyIdentifier.replace(/\.md$/, "");
  const filePath = path.join(companiesDirectory, `${companySlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const companyData = {
    slug: companySlug,
    ...data,
    content,
  };

  return companyData;
}

export function getAllCompanies() {
  const companyFiles = getCompaniesFiles();

  const allCompanies = companyFiles.map((companyFile) => {
    return getCompanyData(companyFile);
  });

  const sortedCompanies = allCompanies.sort((companyA, companyB) =>
    companyA.order - companyB.order
  );

  return sortedCompanies;
}

export function getFeaturedCompanies() {
  const allCompanies = getAllCompanies();

  const featuredCompanies = allCompanies.filter(
    (company) => company.isFeatured
  );

  return featuredCompanies;
}

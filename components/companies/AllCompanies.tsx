import classes from "./AllCompanies.module.css";
import CompaniesGrid from "./CompaniesGrid";
import { AllCompaniesProps } from "@/types";
function AllCompanies(props: AllCompaniesProps) {
  return (
    <section className={classes.posts}>
      <h1>All Companies</h1>
      <CompaniesGrid companies={props.companies} />
    </section>
  );
}

export default AllCompanies;

import { AllCompaniesProps } from "@/types";
import CompaniesGrid from "../companies/CompaniesGrid";
import classes from "./FeaturedCompanies.module.css";

function FeaturedCompanies(props: AllCompaniesProps) {
  return (
    <section className={classes.latest}>
      <h2>Subsidiary Companies</h2>
      <CompaniesGrid companies={props.companies} />
    </section>
  );
}

export default FeaturedCompanies;

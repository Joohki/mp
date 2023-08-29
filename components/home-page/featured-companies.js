import CompaniesGrid from '../companies/companies-grid';
import classes from './featured-companies.module.css';

function FeaturedCompanies(props) {
  return (
    <section className={classes.latest}>
      <h2>Subsidiary Companies</h2>
      <CompaniesGrid companies={props.companies} />
    </section>
  );
}

export default FeaturedCompanies;

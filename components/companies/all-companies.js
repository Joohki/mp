import classes from './all-companies.module.css';
import CompaniesGrid from './companies-grid';

function AllCompanies(props) {
  return (
    <section className={classes.posts}>
      <h1>All Companies</h1>
      <CompaniesGrid companies={props.companies} />
    </section>
  );
}

export default AllCompanies;

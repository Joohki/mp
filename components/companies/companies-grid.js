import CompanyItem from './company-item';
import classes from './companies-grid.module.css';

function CompaniesGrid(props) {
  const { companies } = props;

  return (
    <ul className={classes.grid}>
      {companies.map((company) => (
        <CompanyItem key={company.slug} company={company} />
      ))}
    </ul>
  );
}

export default CompaniesGrid;

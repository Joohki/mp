import CompanyItem from './CompanyItem';
import classes from './CompaniesGrid.module.css';

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

import classes from "./Section.module.scss";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={`${classes.container} ${className}`}>{children}</section>;
};

export default Section;
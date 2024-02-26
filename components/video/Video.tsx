import Section from "@/components/layout/Section";
import classes from "./Video.module.scss";
const Video = () => {
  return (
    <Section className={classes.video}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        controls={true}
        poster="./"
      >
        <source src="/video/main.mp4" type="video/mp4"></source>
      </video>
    </Section>
  );
};

export default Video;

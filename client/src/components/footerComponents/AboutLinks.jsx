import { aboutLinks } from "../../data";
import PageLink from "../PageLink";

const AboutLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass}>
      {aboutLinks.map((link) => {
        return <PageLink key={link.id} link={link} itemClass={itemClass} />;
      })}
    </ul>
  );
};
export default AboutLinks;
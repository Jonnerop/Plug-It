import { legalLinks } from "../../data";
import PageLink from "../PageLink";

const LegalLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass}>
      {legalLinks.map((link) => {
        return <PageLink key={link.id} link={link} itemClass={itemClass} />;
      })}
    </ul>
  );
};
export default LegalLinks;
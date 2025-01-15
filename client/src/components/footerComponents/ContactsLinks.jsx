import { contactsLinks } from "../../data";
import PageLink from "../PageLink";

const ContactsLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass}>
      {contactsLinks.map((link) => {
        return <PageLink key={link.id} link={link} itemClass={itemClass} />;
      })}
    </ul>
  );
};
export default ContactsLinks;
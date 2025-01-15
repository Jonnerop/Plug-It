import { Link } from "react-router-dom";

const SocialLink = ({ link, itemClass }) => {
  return (
    <li key={link.id}>
      <Link
        to={link.href}
        className={itemClass}
        target="_blank"
        rel="noreferrer"
      >
        <img src={link.icon} alt={`${link.id} icon`} className="w-12 h-12" />
      </Link>
    </li>
  );
};

export default SocialLink;

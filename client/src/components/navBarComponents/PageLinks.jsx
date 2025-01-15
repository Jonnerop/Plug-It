import React from 'react';
import { Link } from 'react-router-dom';
import { pageLinks } from '../../data';

const PageLinks = ({ parentClass, itemClass }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const filteredLinks = pageLinks.filter((link) => {
    if (link.text === 'Admin') {
      return user?.isAdmin; //only if isAdmin is true
    }
    return true;
  });

  return (
    <ul className={parentClass}>
      {filteredLinks.map((link) => (
        <li key={link.id}>
          <Link to={link.href} className={itemClass}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PageLinks;

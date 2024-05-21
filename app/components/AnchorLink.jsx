import React from 'react';

import NavBarItem from './NavBarItem';

const AnchorLink = ({ children, href, className, icon, tabIndex }) => {
  return (
    <a href={href}>
      <NavBarItem href={href} className={className} icon={icon} tabIndex={tabIndex}>
        {children}
      </NavBarItem>
    </a>
  );
};

export default AnchorLink;

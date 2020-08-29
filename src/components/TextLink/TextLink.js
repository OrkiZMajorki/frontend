import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const TextLink = ({ children, className, href }) => {
  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
};

export default withRouter(TextLink);

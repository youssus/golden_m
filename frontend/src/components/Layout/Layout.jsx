import React from 'react';
import './Layout.css';

const Layout = ({ children, className = '', allowScroll = true }) => {
  const layoutClass = `layout-container ${className} ${allowScroll ? 'scrollable' : 'no-scroll'}`;
  
  return (
    <div className={layoutClass}>
      {children}
    </div>
  );
};

export default Layout;

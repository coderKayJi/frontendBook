import React from 'react';

const Header = () => {
  const headerStyle = {
    backgroundColor: 'rgb(42, 118, 172)',
    color: '#fff',
    padding: '10px 0',
    zIndex: 2, 
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };

  const mediaQueryStyle = {
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  };

  return (
    <header style={headerStyle}>
      <nav style={{ ...navStyle, ...mediaQueryStyle }}>
        This is a book app assignment from Karan Gupta.
      </nav>
    </header>
  );
}

export default Header;

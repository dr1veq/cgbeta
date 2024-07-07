import * as React from 'react';
import styles from './MainNavBar.module.scss';

export interface INavBarProps {
  links: { name: string; url: string; }[];
}

const NavBar: React.FC<INavBarProps> = ({ links }) => {
  return (
    <div className={styles.navBar}>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            {link.name}
          </a>
          {index < links.length - 1 && <span className={styles.separator}>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavBar;

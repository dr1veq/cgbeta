import * as React from 'react';
import styles from './MainFooter.module.scss';

export interface IMainFooterProps {
  items: {
    logoIcon: string;
    logoLinkUrl: string;
    socialLinks: { url: string; icon: string; }[];
  }[];
}

const MainFooter: React.FC<IMainFooterProps> = ({items}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>WEBSITES AND SOCIAL MEDIA</h2>
      <div className={styles.links}>
        {items.map((item, index) => (
          <div key={index} className={styles.linkItem}>
            <a href={item.logoLinkUrl} target="_blank" rel="noopener noreferrer">
              <img src={item.logoIcon} alt="Logo" className={styles.logo} />
            </a>
            <div className={styles.socialIcons}>
              {item.socialLinks.map((link, linkIndex) => (
                <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer">
                  <img src={link.icon} alt="Social Icon" className={styles.socialIcon} />
                </a>
              ))}
            </div>
            {index < items.length - 1 && <div className={styles.separator}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

  export default MainFooter;
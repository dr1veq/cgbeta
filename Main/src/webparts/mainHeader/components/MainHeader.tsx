import * as React from 'react';
import styles from './MainHeader.module.scss';
import type { IMainHeaderProps } from './IMainHeaderProps';

export default class MainHeader extends React.Component<IMainHeaderProps, {}> {
  public render(): React.ReactElement<IMainHeaderProps> {
    const {
      headerText
    } = this.props;

    return (
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={require('../assets/images/logo.png')} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.headerText}>{headerText}</h1>
        </div>
      </div>
    );
  }
}

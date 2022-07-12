import Image from 'next/image';
import React from 'react';
import SignInButton from '../SignInButton';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src='/images/logo.svg'
          alt='ig.news logo'
          width={110}
          height={30}
        />
        <nav>
          <a className={styles.active}>Home</a>
          <a href=''>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};

export default Header;

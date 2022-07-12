import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

const SignInButton = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return isUserLoggedIn ? (
    <button type='button' className={styles.signInButton}>
      <FaGithub color='#04d361' />
      Gabriel Trzimajewski
      <FiX color='#737380' className={styles.closeIcon} />
    </button>
  ) : (
    <button type='button' className={styles.signInButton}>
      <FaGithub color='#8257e6' />
      Sign in with Github
    </button>
  );
};

export default SignInButton;
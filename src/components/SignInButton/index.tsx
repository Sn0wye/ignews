import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

const SignInButton = () => {
  const { data: session, status } = useSession();

  return session ? (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color='#61dafb' />
      {session.user?.name}
      <FiX color='#737380' className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color='#8257e6' />
      Sign in with Github
    </button>
  );
};

export default SignInButton;

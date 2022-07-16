import Image from 'next/image';
import { ActiveLink } from '../ActiveLink';
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
          <ActiveLink href='/' activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href='/posts' activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
};

export default Header;

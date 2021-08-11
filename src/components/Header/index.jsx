import style from 'src/components/Header/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo.png';

export const Header = () => {
  return (
    <header className={style.header}>
      <Link href='/'>
        <a>
          <Image src={logo} alt='logo image' width={45} height={45} />
        </a>
      </Link>
      <Link href='/'>
        <a className={style.logo}>最後の本</a>
      </Link>
    </header>
  );
};

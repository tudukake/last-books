import { Header } from 'src/components/Header';
import style from 'src/components/LayoutWrapper/LayoutWrapper.module.css';

export const LayoutWrapper = (props) => {
  return (
    <div className={style.wrap}>
      <Header />
      <main>{props.children}</main>
      footer
    </div>
  );
};

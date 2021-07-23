import style from 'src/components/LayoutWrapper/LayoutWrapper.module.css';

export const LayoutWrapper = (props) => {
  return (
    <div className={style.wrap}>
      header
      <main>{props.children}</main>
      footer
    </div>
  );
};

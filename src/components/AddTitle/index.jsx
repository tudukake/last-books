import style from 'src/components/AddTitle/AddTitle.module.css';
import { Fab } from '@material-ui/core';
import { useCallback, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { BookModal } from 'src/components/BookModal';

export const AddTitle = (props) => {
  // 五十音図
  const NAVI = [
    'ALL',
    'あ',
    'か',
    'さ',
    'た',
    'な',
    'は',
    'ま',
    'や',
    'ら',
    'わ',
  ];

  const [open, setOpen] = useState(false);

  // モーダルを開く
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <div className={style.add_navi}>
        <Fab size='medium' color='primary' aria-label='add'>
          <AddIcon onClick={openModal} />
        </Fab>
        <div>
          <ul className={style.navies}>
            {NAVI.map((nav, idx) => {
              return (
                <li className={style.navi} key={idx}>
                  {nav}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <BookModal
        uid={props.uid}
        isEdit={false}
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        refresh={props.refresh}
      />
    </div>
  );
};

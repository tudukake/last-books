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

  // 本追加
  const addBook = useCallback(async () => {
    // タイトル未入力は無視
    if (!title) return;

    // supabaseに登録
    const postIsbn = isbn === '' ? null : isbn;
    const postAuthor = author === '' ? null : author;
    const postPossession = possession === '' ? null : possession;
    const { data, error } = await client.from('books').insert([
      {
        uid: props.uid,
        isbn: postIsbn,
        title: title,
        author: postAuthor,
        possession: postPossession,
      },
    ]);

    if (error) {
      alert(error);
    } else {
      if (data) {
        closeModal();

        // 一覧に追加
        props.addBook(data);
      }
    }
  });

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
        addBook={props.addBook}
      />
    </div>
  );
};

import style from 'src/components/AddTitle/AddTitle.module.css';
import {
  Button,
  createTheme,
  Fab,
  Modal,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { useCallback, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import { client } from 'src/libs/supabase';

const theme = createTheme({
  palette: {
    primary: {
      main: '#24b47e',
      dark: '#008351',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff782e',
      light: '#ffa95d',
      dark: '#c54800',
      contrastText: '#fff',
    },
  },
});

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
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [possession, setPossession] = useState('');

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
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div className={style.modal_style}>
            <h1 className={style.modal_title}>本追加</h1>
            <div className={style.inps}>
              <div className={style.search}>
                <div>
                  <TextField
                    id='search'
                    label='検索'
                    type='search'
                    size='small'
                    style={{ width: 250 }}
                  />
                </div>
                <div className={style.search_icon}>
                  <SearchIcon fontSize='large' />
                </div>
              </div>
              <TextField
                id='isbn'
                label='ISBN'
                variant='outlined'
                size='small'
                value={isbn}
                onChange={(e) => {
                  setIsbn(e.target.value);
                }}
              />
              <TextField
                id='title'
                label='タイトル'
                variant='outlined'
                size='small'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                id='author'
                label='作家'
                variant='outlined'
                size='small'
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
              <TextField
                id='possession'
                label='所持巻数'
                type='number'
                variant='outlined'
                size='small'
                style={{ width: 120 }}
                onChange={(e) => {
                  setPossession(e.target.value);
                }}
              />
            </div>
            <div className={style.btns}>
              <ThemeProvider theme={theme}>
                <Button
                  variant='contained'
                  color='secondary'
                  startIcon={<CancelOutlined />}
                  style={{ width: 120 }}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<PostAddIcon />}
                  style={{ width: 120 }}
                  onClick={addBook}
                >
                  追加
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </Modal>
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
    </div>
  );
};

import style from 'src/components/BookModal/BookModal.module.css';
import {
  Button,
  createTheme,
  Modal,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { useCallback, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import { client } from 'src/libs/supabase';
import { useEffect } from 'react';

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

export const BookModal = (props) => {
  const [id, setId] = useState(null);
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [possession, setPossession] = useState('');

  // 追加 Or 修正
  const addEditStr = props.isEdit ? '修正' : '追加';

  // 本追加 Or 修正
  const upsertBook = useCallback(async () => {
    // タイトル未入力は無視
    if (!title) return;

    // supabaseに登録
    const postIsbn = isbn === '' ? null : isbn;
    const postAuthor = author === '' ? null : author;
    const postPossession = possession === '' ? null : possession;

    // 登録
    let upsertData = {
      uid: props.uid,
      isbn: postIsbn,
      title: title,
      author: postAuthor,
      possession: postPossession,
    };
    if (props.isEdit) {
      upsertData = { id: id, ...upsertData };
    }

    const { data, error } = await client.from('books').upsert([upsertData]);

    if (error) {
      alert(error);
    } else {
      if (data) {
        props.closeModal();
        props.refresh();
      }
    }
  });

  useEffect(() => {
    if (!props.editBook) return;

    const editIsbn = props.editBook.isbn ? props.editBook.isbn : '';
    const editTitle = props.editBook.title ? props.editBook.title : '';
    const editAuthor = props.editBook.author ? props.editBook.author : '';
    const editPossession = props.editBook.possession
      ? props.editBook.possession
      : '';

    setId(props.editBook.id);
    setIsbn(editIsbn);
    setTitle(editTitle);
    setAuthor(editAuthor);
    setPossession(editPossession);
  }, [props.editBook]);

  return (
    <div>
      <div className={style.add_navi}>
        <Modal
          open={props.open}
          onClose={props.closeModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div className={style.modal_style}>
            <h1 className={style.modal_title}>{addEditStr}</h1>
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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                id='author'
                label='作家'
                variant='outlined'
                size='small'
                value={author}
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
                value={possession}
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
                  onClick={props.closeModal}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<PostAddIcon />}
                  style={{ width: 120 }}
                  onClick={upsertBook}
                >
                  {addEditStr}
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

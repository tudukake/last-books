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

export const AddTitle = () => {
  const [open, setOpen] = useState(false);

  // モーダルを開く
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

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
              />
              <TextField
                id='title'
                label='タイトル'
                variant='outlined'
                size='small'
              />
              <TextField
                id='author'
                label='作家'
                variant='outlined'
                size='small'
              />
              <TextField
                id='posession'
                label='所持巻数'
                type='number'
                variant='outlined'
                size='small'
                style={{ width: 120 }}
              />
            </div>
            <div className={style.btns}>
              <ThemeProvider theme={theme}>
                <Button
                  variant='contained'
                  color='secondary'
                  startIcon={<CancelOutlined />}
                  style={{ width: 120 }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<PostAddIcon />}
                  style={{ width: 120 }}
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

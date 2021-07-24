import style from 'src/components/BookList/BookList.module.css';
import Image from 'next/image';
import noImage from 'public/no_image.jpg';
import { Button, createTheme, ThemeProvider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCallback, useState } from 'react';
import { client } from 'src/libs/supabase';

const theme = createTheme({
  palette: {
    primary: {
      main: '#24b47e',
      dark: '#008351',
      contrastText: '#fff',
    },
  },
});

export const BookList = (props) => {
  const handleEdit = useCallback(async () => {
    console.log(123);
  }, []);

  const handleDelete = useCallback(async (id, title) => {
    const msg = title + 'を削除しますか？';
    if (!confirm(msg)) return;

    const { error } = await client.from('books').delete().eq('id', id);
    if (error) {
      alert(error);
    }

    props.delBook();
  }, []);

  return (
    <div className={style.box_list}>
      {props.books.map((book) => {
        return (
          <div key={book.id} className={style.card}>
            <div className={style.book_img}>
              {book.img_url ? (
                <Image
                  src={book.img_url}
                  alt='thumbnail'
                  width={120}
                  height={150}
                />
              ) : (
                <Image src={noImage} alt='thumbnail' width={120} height={150} />
              )}
            </div>
            <div className={style.book_info}>
              <div className={style.book_title}>{book.title}</div>
              <div>作家：{book.author}</div>
              <div>巻数：{book.volume}</div>
              <div>所持：{book.posession}</div>
              <div>ISBN：{book.isbn}</div>
              <div className={style.btns}>
                <ThemeProvider theme={theme}>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<EditIcon />}
                    size='small'
                    onClick={() => {
                      handleEdit(book.title);
                    }}
                  >
                    修正
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    size='small'
                    onClick={() => {
                      handleDelete(book.id, book.title);
                    }}
                  >
                    削除
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

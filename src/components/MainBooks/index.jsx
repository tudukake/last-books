import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { AddTitle } from 'src/components/AddTitle';
import { BookList } from 'src/components/BookList';
import { client } from 'src/libs/supabase';

export const MainBooks = (props) => {
  const [books, setBooks] = useState([]);

  // 一覧の取得
  const getBookList = useCallback(async () => {
    const { data, error } = await client
      .from('books')
      .select('*')
      .order('title');

    if (!error && data) {
      setBooks(data);
    }
  }, []);

  useEffect(() => {
    getBookList();
  }, []);

  const refresh = () => {
    getBookList();
  };

  const addBook = (data) => {
    // 追加した本は一覧の先頭に追加
    setBooks((prev) => [...data, ...prev]);
  };

  return (
    <div>
      <AddTitle uid={props.uid} refresh={refresh} />
      <BookList uid={props.uid} books={books} refresh={refresh} />
    </div>
  );
};

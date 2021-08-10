import { Button } from '@material-ui/core';
import { useState } from 'react';
import style from 'src/components/ChoiceInput/ChoiceInput.module.css';

export const ChoiceInput = (props) => {
  const [value, setVale] = useState(props.isbn);

  const handleChoice = async (isbn) => {
    props.returnIsbn(isbn);
  };

  return (
    <div key={props.idx} className={style.choice}>
      <div className={style.isbn}>
        <input
          type='text'
          value={value}
          onChange={(e) => {
            setVale(e.target.value);
          }}
        />
      </div>
      <div>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={() => {
            handleChoice(props.isbn);
          }}
        >
          選択
        </Button>
      </div>
    </div>
  );
};

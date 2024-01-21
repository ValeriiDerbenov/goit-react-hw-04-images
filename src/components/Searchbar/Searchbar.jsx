import { useState } from 'react';
import css from './Searchbar.module.css';
import { paramsForNotify } from 'components/App';
import { Notify } from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [textQuery, setTextQuery] = useState('');
  
     // зміни в інпуті
     const onChangeInput = (event) => {
      setTextQuery(event.currentTarget.value.toLowerCase().trim())
  }; 
  
  const handleSubmit = e => {
      e.preventDefault();

      if (textQuery === '') {
          Notify.info('Enter your request, please!', paramsForNotify);
          return;
      }
      //фун-я onSubmit прийшла з App через пропси
      onSubmit(textQuery);

      //очистка рядка пошука
      setTextQuery('');
  };
    
  return(
    <div className={css.searchbar}>		
    <form onSubmit={handleSubmit} className={css.SearchForm}>
      <input
        className={css.searchFormInput}
        value = {textQuery}
        onChange = {onChangeInput}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
		<button type="submit" className={css.searchFormBtn}>Search
    </button>			
    </form>
  </div>
  )
};


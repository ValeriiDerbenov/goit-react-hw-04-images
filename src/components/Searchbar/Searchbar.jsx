import css from './Searchbar.module.css'

export const Searchbar = ({ onSubmitSearchBar }) => (
  <div className={css.searchbar}>
		
    <form onSubmit={onSubmitSearchBar} className={css.SearchForm}>
      <input
        className={css.searchFormInput}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
		<button className={css.searchFormBtn}>Search
        {/* <span className={css.searchFormBtnSpan}></span> */}
    </button>
			
    </form>
  </div>
);
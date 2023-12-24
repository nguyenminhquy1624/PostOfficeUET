import { useState } from 'react'
import search_icon from '/src/assets/img/search_1.png'
import {PropTypes} from 'prop-types' 
const SearchBar = (props) => {
    const searchFunc = props.searchFunc
    const [searchTerm, setSearchTerm] = useState("")

    const changeSearchTerm = (event) => {
        // event.preventDefault();
        setSearchTerm(event.target.value);
      };
    
      const activateSearch = (event) => {
        event.preventDefault();
        searchFunc(searchTerm);
      }; 
    return (
        <div id='searchbar' className='mx-10 mt-24 p-4 mb-8'>
        <form onSubmit={activateSearch}>   
            <div className='flex float-right rounded-full border-black border-2 py-1 px-2 space-x-2'>
                <button 
                className='align-middle justify-center' 
                type='submit'>
                    <img src={search_icon} />
                </button>
                <input 
                className="border-none focus:border-none focus:outline-none focus:ring-0" 
                value={searchTerm}
                onChange={changeSearchTerm}
                placeholder='Tìm kiếm...' />
            </div>
        </form>
        </div>
    )
}

SearchBar.propTypes = {
    searchFunc: PropTypes.func.isRequired,
}

export default SearchBar
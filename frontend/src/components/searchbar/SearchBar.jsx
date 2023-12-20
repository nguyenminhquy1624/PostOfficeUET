import search_icon from '/src/assets/img/search_1.png'

const SearchBar = () => {
    return (
        <div id='searchbar' className='mx-10 mt-24 p-4 mb-8'>
        <form>   
            <div className='flex float-right rounded-full border-black border-2 py-1 px-2 space-x-2'>
                <button className='align-middle justify-center' type='submit'>
                    <img src={search_icon} />
                </button>
                <input className="border-none focus:border-none focus:outline-none focus:ring-0" placeholder='Tìm kiếm...' />
            </div>
        </form>
        </div>
    )
}

export default SearchBar
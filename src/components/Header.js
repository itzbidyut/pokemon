export default function Header({ handleSearch, setSearchValue, searchValue }) {
  return (
    <div className="headerComponent">
      <div className="container">
        <div className="headerTitle">
          <p className="title">Pokedex</p>
        </div>
        <div className="searchBox">
          <form onSubmit={handleSearch}>
            <input
              value={searchValue}
              placeholder="search pokemon"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}

import "../styles/header.scss";

export default function Header({ handleSearch, setSearchValue, searchValue }) {
  return (
    <div className="headerComponent">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-6">
            <div className="headerTitle">
              <p className="title">Pokedex</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-6">
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
      </div>
    </div>
  );
}

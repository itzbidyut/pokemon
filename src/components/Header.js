 

export default function Header() {
  return (
    <div className="headerComponent">
      <div className="container">
        <div className="headerTitle">
          <p className="title">Pokedex</p>
        </div>
        <div className="searchBox">
          <form>
            <input className="" placeholder="search pokemon" />
          </form>
        </div>
      </div>
    </div>
  );
}

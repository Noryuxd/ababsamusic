
function Navbar({ keyword, setKeyword, fetchMusicData }) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/ababsamusic">
          <i className="bi bi-music-note-list mx-3 fontest"></i>
          <span className="fontest">ABSMusic</span>
        </a>

        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="zbi fontest bg-grey w-25 bg-body-tertiary"
            type="search"
            placeholder="Ex : Pure Cocaine"
            aria-label="Search"
            id="search-input"
          />
          <button onClick={fetchMusicData} className="btn fontest btn-dark">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

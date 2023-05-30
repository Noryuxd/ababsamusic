import { useState } from "react";

function Navbar({ keyword, setKeyword, fetchMusicData }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <nav className="navbar navbar-expand-lg animate__animated animate__fadeInDown">
      <div className="container-fluid">
        <a className="navbar-brand" href="/ababsamusic/">
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
            placeholder={isInputFocused ? "" : "Ex : Pure Cocaine"}
            aria-label="Search"
            id="search-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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

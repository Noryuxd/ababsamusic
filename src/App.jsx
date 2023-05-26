import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);

  const fetchMusicData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/ababsamusic">
            <i className="bi bi-music-note-list mx-3 fontest"></i><span className="fontest">ABSMusic</span>
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

      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <div className="ratio ratio-1x1 bg-secondary bg-opacity-25">
                    <img
                      src={element.album.images[0].url}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title fontest2">{element.name}</h5>
                    <p className="card-text fontest">
                      Artist: {element.album.artists[0].name}
                    </p>
                    <p className="card-text fontest">Album: {element.album.name}</p>
                    <audio
                      src={element.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row py-3">
          <div className="col">
            <h4 className="text-center text-danger py-2"></h4>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-12 py-5 text-center">
            <h1>
              <i className="bi bi-music-note-list mx-3 fontest"></i>
              <span className="fontest">ABSMusic</span>
            </h1>
            <h1 className="py-5 fontest">
              Discover your favorite music in 30 seconds only !{" "}
            </h1>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark btn-lg"
                href="https://github.com/Noryuxd?tab=repositories"
              >
                <i className="bi bi-github mx-2 "></i><span className="fontest2">Github</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

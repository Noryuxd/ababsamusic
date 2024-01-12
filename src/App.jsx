import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MusicCard from "./components/MusicCard";

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
        throw new Error("Please type a valid search !");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
              "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
          }
        );

        if (!response.ok) {
          throw new Error("Please type valid search !");
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
  }, []);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        fetchMusicData={fetchMusicData}
      />
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
          {tracks.map((element) => (
            <MusicCard key={element.id} element={element} />
          ))}
        </div>
        <div className="row py-3">
          <div className="col">
            <h4 className="text-center text-danger py-2"></h4>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-12 py-5 text-center animate__animated animate__fadeInUp">
            <h1>
              <i className="bi bi-music-note-list mx-3 fontest"></i>
              <span className="fontest">ABSMusic</span>
            </h1>
            <h1 className="py-5 fontest">
              Discover your favorite music in 30 seconds only!
            </h1>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark btn-lg"
                href="https://github.com/Noryuxd"
              >
                <i className="bi bi-github mx-2"></i>
                <span className="fontest2">Github</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

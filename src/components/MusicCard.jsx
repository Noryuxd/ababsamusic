function MusicCard({ element }) {
  return (
    <div key={element.id} className="col-lg-3 col-md-6 py-2 animate__animated animate__fadeInUp">
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
          <audio src={element.preview_url} controls className="w-100"></audio>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;

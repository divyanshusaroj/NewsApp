import React from "react";

const NewsItem = (props) => {
  
    let { title, description, imageUrl, newsUrl, date, author, source } =
      props;

    return (
      <div className="my-3">
        <div className="card">
         
          <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>
          <span className="badge rounded-pill bg-success">
            {source}
          </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://static.toiimg.com/thumb/msid-47529300,width-1070,height-580,imgsize-110164,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                {author ? author : "Unknown"} on {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark my-2"
            >
              Read More
            </a>
          </div>
        
      </div>
      </div>
    );

}

export default NewsItem;

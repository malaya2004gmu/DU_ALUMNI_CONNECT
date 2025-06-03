import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const images = [
  {
    src: "./images/duclocktower.png",
    alt: "College Campus 1",
    caption: "Welcome to Our Beautiful Campus",
  },
  {
    src: "./images/dustudent1.png",
    alt: "College Campus 2",
    caption: "A Place for Learning and Growth",
  },
  {
    src: "./images/dulab.png",
    alt: "College Campus 3",
    caption: "Join Our Vibrant Alumni Community",
  },
];

const Slider = () => {
  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide">
      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`Slide ${idx + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-item${idx === 0 ? " active" : ""}`}
            data-bs-interval={
              idx === 0 ? "10000" : idx === 1 ? "2000" : undefined
            }
          >
            <img
              src={img.src}
              className="d-block w-100"
              alt={img.alt}
              style={{ height: "750px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h1
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "2px 2px 8px #000",
                  fontSize: "3rem",
                }}
              >
                {img.caption}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;

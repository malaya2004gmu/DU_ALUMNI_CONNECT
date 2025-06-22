import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const images = [
  {
    src: "./images/duclocktower.png",
    alt: "DU Clock Tower",
    caption: "Welcome to Our Beautiful Campus",
  },
  {
    src: "./images/dustudent1.png",
    alt: "DU Students",
    caption: "A Place for Learning and Growth",
  },
  {
    src: "./images/dulab.png",
    alt: "DU Labs",
    caption: "Join Our Vibrant Alumni Community",
  },
];

const Slider = () => {
  const isLoggedIn = localStorage.getItem("user"); // Change if you're using other auth

  return (
    <div
      id="carouselExampleDark"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
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

      {/* Slides */}
      <div className="carousel-inner">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`carousel-item${idx === 0 ? " active" : ""}`}
            data-bs-interval="5000"
          >
            <div
              style={{
                position: "relative",
                height: "80vh",
                overflow: "hidden",
              }}
            >
              {/* Background image */}
              <img
                src={img.src}
                className="d-block w-100"
                alt={img.alt}
                style={{
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(75%)",
                }}
              />

              {/* Overlay gradient */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
                  zIndex: 1,
                }}
              ></div>

              {/* Caption */}
              <div
                className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100"
                style={{ zIndex: 2 }}
              >
                <h1
                  className="display-4 fw-bold mb-4"
                  style={{
                    color: "#fff",
                    textShadow: "2px 2px 10px rgba(0,0,0,0.9)",
                  }}
                >
                  {img.caption}
                </h1>

                {/* Show login/signup only if not logged in */}
                {!isLoggedIn && (
                  <div className="d-flex gap-3">
                    <a
                      href="/login"
                      className="btn btn-outline-light btn-lg"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="btn btn-primary btn-lg"
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
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

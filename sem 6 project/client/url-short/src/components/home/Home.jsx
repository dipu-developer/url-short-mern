import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import "./../../App.css"
import "./index.css"

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid text-center py-5 bg-wave text-white mt-5">
        <h1>
          Make your <span className="text-primary">connection </span> count
        </h1>
        <p>Create short links using shortly and earn money.</p>
        <form action="" method="post">
          <div className="d-flex input-box m-auto">
            <input
              type="text"
              className="form-control d-inline-block"
              placeholder="Enter URL"
            />
            <button
              type="button"
              className="btn btn-primary d-inline-block p-3"
            >
              Short
            </button>
          </div>
        </form>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <h3>Simple and fast URL shortener!</h3>
            <p>
              ShortURL allows to shorten long links from Instagram, Facebook,
              YouTube, Twitter, Linked In, WhatsApp, TikTok, blogs and sites.
              Just paste the long URL and click the Shorten URL button. On the
              next page, copy the shortened URL and share it on sites, chat and
              emails. After shortening the URL, check how many clicks it
              received.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <h3>Shorten, share and track</h3>
            <p>
              Your shortened URLs can be used in publications, documents,
              advertisements, blogs, forums, instant messages, and other
              locations. Track statistics for your business and projects by
              monitoring the number of hits from your URL with our click
              counter.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-wave py-5">
        <h2 className="text-center fs-1 my-5 text-white mt-0">
          More than a free link shortener
        </h2>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="button"
            className="btn btn-primary mx-auto px-5 py-3 mb-0"
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <div className="details">
              <div className="svg text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21M6 8v13H2V8z"
                  />
                </svg>
              </div>
              <h4 className="text-center">Easy</h4>
              <p className="text-center">
                ShortURL is easy and fast, enter the long link to get your
                shortened link
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="details">
              <div className="svg text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="m7.859 14.691l-.81.805a1.814 1.814 0 0 1-2.545 0a1.762 1.762 0 0 1 0-2.504l2.98-2.955c.617-.613 1.779-1.515 2.626-.675a.992.992 0 1 0 1.397-1.407c-1.438-1.428-3.566-1.164-5.419.675l-2.98 2.956A3.719 3.719 0 0 0 2 14.244a3.72 3.72 0 0 0 1.108 2.658a3.779 3.779 0 0 0 2.669 1.096c.967 0 1.934-.365 2.669-1.096l.811-.805a.988.988 0 0 0 .005-1.4a.995.995 0 0 0-1.403-.006m9.032-11.484c-1.547-1.534-3.709-1.617-5.139-.197l-1.009 1.002a.99.99 0 1 0 1.396 1.406l1.01-1.001c.74-.736 1.711-.431 2.346.197c.336.335.522.779.522 1.252s-.186.917-.522 1.251l-3.18 3.154c-1.454 1.441-2.136.766-2.427.477a.99.99 0 1 0-1.396 1.406c.668.662 1.43.99 2.228.99c.977 0 2.01-.492 2.993-1.467l3.18-3.153A3.732 3.732 0 0 0 18 5.866a3.726 3.726 0 0 0-1.109-2.659"
                  />
                </svg>
              </div>
              <h4 className="text-center">Shortened</h4>
              <p className="text-center">
                Use any link, no matter what size, ShortURL always shortens
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="details">
              <div className="svg text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 256 256"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={16}
                  >
                    <path d="m 127.99999,239.96468 c 0,0 95.98506,-31.99503 95.98506,-111.98257" />
                    <path d="M 223.98505,127.98211 V 31.997059 c 0,0 -31.99502,-15.997511 -95.98506,-15.997511" />
                    <path d="m 128,239.96468 c 0,0 -95.985056,-31.99503 -95.985056,-111.98257" />
                    <path d="M 32.014944,127.98211 V 31.997059 c 0,0 31.995019,-15.997509 95.985056,-15.997509" />
                    <path d="M 191.99003,63.99208 C 128,111.9846 112.00249,175.97464 112.00249,175.97464 c 0,0 -15.997511,-19.0946 -31.995019,-31.99502" />
                  </g>
                </svg>
              </div>
              <h4 className="text-center">Secure</h4>
              <p className="text-center">
                It is fast and secure, our service has data encryption
                protection
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;

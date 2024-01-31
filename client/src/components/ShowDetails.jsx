import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import styled from 'styled-components';

const ShowDetails = ({ shows }) => {
  const { id } = useParams();
  const show = shows.find((s) => s.show.id.toString() === id);

  const [formData, setFormData] = useState({
    movieName: '',
    language: '',
    genres: '',
    status: '',
  });

  useEffect(() => {
    if (show) {
      setFormData({
        movieName: show.show.name,
        language: show.show.language,
        genres: show.show.genres.join(', '),
        status: show.show.status,
      });
    }
  }, [show]);

  const handleBookButtonClick = () => {
    const formContainer = document.getElementById('book-form-container');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const formContainer = document.getElementById('book-form-container');
    formContainer.style.display = 'none';
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container c1">
      <h2 className="page-title">{show.show.name}</h2>
      <div className="show-details-container">
        <img src={show.show.image.original} alt={show.show.name} className="show-image" />
        <div className="show-details">
          <p>Type: {show.show.type}</p>
          <p>Language: {show.show.language}</p>
          <p>Genres: {show.show.genres.join(', ')}</p>
          <p>Status: {show.show.status}</p>
          <button className="book-button" onClick={handleBookButtonClick}>
            BOOK
          </button>
        </div>
      </div>
      <div className="show-summary" dangerouslySetInnerHTML={{ __html: show.show.summary }} />

      <div id="book-form-container" className="overlay" style={{ display: 'none' }}>
        <form className="book-form" onSubmit={handleFormSubmit}>
          <label htmlFor="movieName">Movie Name:</label>
          <input type="text" id="movieName" name="movieName" value={formData.movieName} readOnly />
          <label htmlFor="language">Language:</label>
          <input type="text" id="language" name="language" value={formData.language} readOnly />
          <label htmlFor="genres">Genres:</label>
          <input type="text" id="genres" name="genres" value={formData.genres} readOnly />
          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" value={formData.status} readOnly />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ShowDetails;

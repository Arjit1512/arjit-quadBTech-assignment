import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Show List</h2>
      {shows.map((show) => (
        <div key={show.show.id} className="show-container">
          <Link to={`/show/${show.show.id}`} className="show-link">
            <h3 className="show-title">{show.show.name}</h3>
            <p className="show-detail">Type: {show.show.type}</p>
            <p className="show-detail">Language: {show.show.language}</p>
            <p className="show-detail">Genres: {show.show.genres.join(', ')}</p>
            <p className="show-detail">Status: {show.show.status}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShowList;

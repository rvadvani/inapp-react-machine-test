// src/components/Home.js

import React, { useEffect, useState } from 'react';
import { getUserDetails, logoutUser, searchMovies, searchPersons } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);
    const [persons, setPersons] = useState([]);
    const [movieFilters, setMovieFilters] = useState({ year: '', genre: '', type: '' });
    const [personFilters, setPersonFilters] = useState({ movieTitle: '', name: '', profession: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                const userData = await getUserDetails(token);
                setUser(userData);
            } else {
                navigate('/'); 
            }
        };
        fetchUserDetails();
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    const handleMovieSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        if (token) {
            const results = await searchMovies(token, movieFilters);
            setMovies(results);
        } else {
            navigate('/'); 
        }
    };

    const handlePersonSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        if (token) {
            const results = await searchPersons(token, personFilters);
            setPersons(results);
        } else {
            navigate('/'); 
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Welcome, {user ? user.username : 'User'}</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

            {/* Movie Search Section */}
            <h3 className="mt-5">Search Movies</h3>
            <form onSubmit={handleMovieSearch}>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Year"
                            className="form-control"
                            value={movieFilters.year}
                            onChange={(e) => setMovieFilters({ ...movieFilters, year: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Genre"
                            className="form-control"
                            value={movieFilters.genre}
                            onChange={(e) => setMovieFilters({ ...movieFilters, genre: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Type (e.g., Movie/TV Series/Documentary)"
                            className="form-control"
                            value={movieFilters.type}
                            onChange={(e) => setMovieFilters({ ...movieFilters, type: e.target.value })}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Search Movies</button>
            </form>

            {/* Movies List */}
            <h4 className="mt-4">Movies List</h4>
            <div className="list-group">
                {movies.map(movie => (
                    <div key={movie.tconst} className="list-group-item">
                        <h5>{movie.primary_title} ({movie.start_year})</h5>
                        <p><strong>Type:</strong> {movie.title_type}</p>
                        <p><strong>Genre:</strong> {movie.genres}</p>
                        <p><strong>People Associated:</strong>
                            <ul>
                                {movie.people_associated?.map(person => (
                                    <li key={person.nconst}>{person.primary_name}</li>
                                ))}
                            </ul>
                        </p>
                    </div>
                ))}
            </div>

            {/* Person Search Section */}
            <h3 className="mt-5">Search Persons</h3>
            <form onSubmit={handlePersonSearch}>
                <div className="row mb-3">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Movie Title"
                            className="form-control"
                            value={personFilters.movieTitle}
                            onChange={(e) => setPersonFilters({ ...personFilters, movieTitle: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            value={personFilters.name}
                            onChange={(e) => setPersonFilters({ ...personFilters, name: e.target.value })}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Profession"
                            className="form-control"
                            value={personFilters.profession}
                            onChange={(e) => setPersonFilters({ ...personFilters, profession: e.target.value })}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Search Persons</button>
            </form>

            {/* Persons List */}
            <h4 className="mt-4">Persons List</h4>
            <div className="list-group">
                {persons.map(person => (
                    <div key={person.nconst} className="list-group-item">
                        <h5>{person.primary_name}</h5>
                        <p><strong>Birth Year:</strong> {person.birth_year}</p>
                        <p><strong>Profession:</strong> {person.primary_profession}</p>
                        <p><strong>Known For:</strong>
                            <ul>
                                {person.known_for_titles?.split(',').map(title => (
                                    <li key={title}>{title}</li>
                                ))}
                            </ul>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

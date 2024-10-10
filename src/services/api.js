// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Adjust the base URL as necessary

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// to log in the user
export const loginUser = async (credentials) => {
    const response = await api.post('login/', credentials);
    return response.data;
};

// to get user details
export const getUserDetails = async (token) => {
    const response = await api.get('user/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// to logout user
export const logoutUser = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// to search movies
export const searchMovies = async (token, filters) => {
    const response = await api.get('movies/search/', {
        eaders: {
            Authorization: `Bearer ${token}`,
        },
        params: filters
    });
    return response.data;
};

// to search persons
export const searchPersons = async (token, filters) => {
    const response = await api.get('persons/search/', {
        peaders: {
            Authorization: `Bearer ${token}`,
        }, arams: filters
    });
    return response.data;
};

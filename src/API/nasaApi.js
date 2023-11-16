// src/api/nasaApi.js

import axios from 'axios';
import moment from 'moment';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const fetchNasaPhotos = async (data) => {
    try {
        const { count } = data
        let url = `${apiUrl}?api_key=${apiKey}&count=${ count || 100}`

        const response = await axios.get(url);
        return [response.data];
    } catch (error) {
        console.error(error)
        return [];
    }
};

export { fetchNasaPhotos };
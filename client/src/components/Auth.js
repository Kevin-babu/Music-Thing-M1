import React, { use } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Auth(code) {
  
    console.log("code in Auth --", code)
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [expiresIn, setExpiresIn] = useState(null);

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
         code,
        }).then(response => {
            console.log('Access Token details:', response)
            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
            setExpiresIn(response.data.expires_in);

            window.history.pushState({}, null, '/');
        }).catch(error => {
            console.error('Error fetching access token:', error);
            // window.location = '/';
        }); 
}, [code]);

useEffect(() => {

    if (!refreshToken || !expiresIn) return;
    
    const interval = setInterval(() => {    

        axios.post('http://localhost:3001/refresh', {
            refreshToken,
        }).then(response => {
            console.log('Refreshed Access Token details:', response)
            setAccessToken(response.data.access_token);
            setExpiresIn(response.data.expires_in);
        }).catch(error => {
            console.error('Error refreshing access token:', error);
            window.location = '/';
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);

}, [refreshToken, expiresIn]);

return accessToken;
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Example() {
    useEffect(() => {
        function showLocation(data) {
            console.log(data);
            const lon = data.coords.longitude;
            const lat = data.coords.latitude;
            const url = process.env.REACT_APP_WEATHER_END_POINT;
            const key = process.env.REACT_APP_API_KEY;
        console.log(`${url}?lat=${lat}&lon=${lon}&appid=${key}`);
        //const axios = require('axios'); // legacy way
        const url1 = `${url}?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
        // Make a request for a user with a given ID
        axios.get(url1)
          .then(function (response) {
            // handle success
            console.log(response);
          })
    }
      navigator.geolocation.getCurrentPosition(showLocation)
  }, []);


  return (
    <div>
      
    </div>
  );
}

export default Example ;
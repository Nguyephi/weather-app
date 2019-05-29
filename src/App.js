import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      temperature: "",
      weather: null,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getWeather(10.776530, 106.700980)
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.getWeather(latitude, longitude);
    });
  };


  getWeather = async (latitude, longitude) => {
    const API_KEY = "3de6162d3745365b168ade2bbe4e1d66";
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    try {
      let data = await fetch(api)
      let response = await data.json()
      this.setState({
        locationName: response.name,
        temperatureF: (((response.main.temp-273.15)*1.8)+32).toFixed(1) + " ℉",
        temperatureC: (response.main.temp-273.15).toFixed(1)+ " ℃",
        weatherDescription: response.weather[0].description,
        isLoading: false
      })
    } catch(error) {
      this.setState({ isLoading: false, hasErrored: true })
    }


    // Left this here for old school people who don't like ES6!

    // fetch(api)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       locationName: data.name,
    //       temperatureF: (((data.main.temp-273.15)*1.8)+32).toFixed(1),
    //       temperatureC: (data.main.temp-273.15).toFixed(1),
    //       weatherDescription: data.weather[0].description,
    //       isLoading: false
    //     })
    //   })
    //   .catch(error => { 
    //     console.log('error',error)
    //   })
  }
  
  render () {
    // typeof this.state => Object

    // 1. Technique
    // const isLoading = this.state.isLoading
    // const locationName = this.state.locationName
    // const temperatureF = this.state.temperatureF
    // const temperatureC = this.state.temperatureC
    // const weatherDescription = this.state.weatherDescription
    // const hasErrored = this.state.hasErrored
    // const loading = this.state.loading

    // 2. Technique
    const {
      isLoading,
      locationName,
      temperatureF,
      temperatureC, 
      weatherDescription,
      hasErrored,
      loading
    } = this.state
    
    if(isLoading) {
      return (
        <div style={{margin:'10em'}} className='sweet-loading'>
          <CircleLoader
            css={override}
            sizeUnit={"px"}
            size={250}
            color={'grey'}
            loading={loading}
          />
        </div> 
      )
    }
    return (  
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">Phil's Forecast</h1>
            <h2 className="col-12">{locationName}</h2>
            <div style={{display:'flex',justifyContent: 'center'}}>
            <h3 style={{padding: 0}} className="col-12 text-danger">{temperatureF}</h3>
            <h3 style={{padding: 0}} className="col-12 text-danger">{temperatureC} </h3>
            </div>
            <h3 className="col-12">{weatherDescription}</h3>
            {hasErrored && <h3 className="col-12 text-danger">Weather failed to load!</h3>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;



// try {
//   'hello' + 'go'
// } catch(error) {
//   console.log('HAHAHA')  
// }

// try {
//   hello + go
// } catch(error) {
//   console.log('HAHAHA')  
// }

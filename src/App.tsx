import { SyntheticEvent, useState } from "react";

import Axios from "axios";
import { WeatherCondition } from "./models";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherCondition | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLocation("");
    getWeather();
  }

  const url = `${import.meta.env.VITE_BASE_URL}/current.json?rapidapi-key=${
    import.meta.env.VITE_BASE_URL_KEY
  }&q=${location}`;

  async function getWeather() {
    try {
      setLoading(true);
      const response = await Axios.get(url);
      setWeatherData({
        country: response.data.location.country,
        temp_c: response.data.current.temp_c,
        text: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={location}
          type="text"
          onChange={(event) => setLocation(event.target.value)}
        />
        <button>Search</button>
      </form>

      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h1>Country: {weatherData?.country}</h1>
          <h3>Temp: {weatherData?.temp_c}</h3>
          <p>Condition: {weatherData?.text}</p>
          <img src={weatherData?.icon} alt="" />
        </div>
      )}

      {error && <h1>Error</h1>}
    </div>
  );
}

export default App;

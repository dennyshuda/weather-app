import { SyntheticEvent, useEffect, useState } from "react";

import Axios from "axios";
import { WeatherCondition } from "./models";
import { Container } from "./components/Container";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherCondition | null>(null);
  const [location, setLocation] = useState("indonesia");
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

  useEffect(() => {
    getWeather();
  }, []);

  async function getWeather() {
    try {
      setLoading(true);
      const response = await Axios.get(url);
      setWeatherData({
        country: response.data.location.country,
        name: response.data.location.name,
        temp_c: response.data.current.temp_c,
        text: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  {
    error && <div>Error to get data</div>;
  }

  return (
    <div className="App">
      <Container>
        <div>
          {loading ? (
            <h1>loading</h1>
          ) : (
            <div className="max-w-lg text-center py-10 px-5 rounded-md bg-white">
              <div className="text-blue-500 text-3xl font-bold mb-5">
                Weather App
              </div>
              <form className="space-x-5" onSubmit={handleSubmit}>
                <input
                  className="border-b-2 border-blue-500 py-2 focus:outline-none"
                  value={location}
                  type="text"
                  placeholder="Enter a city name"
                  onChange={(event) => setLocation(event.target.value)}
                />
                <button className="py-2 px-5 bg-blue-500 text-white rounded-md">
                  Search
                </button>
              </form>
              <div className="py-5">
                <h1 className="uppercase text-2xl font-bold">
                  {weatherData?.name}
                </h1>
                <p className="text-">{weatherData?.text}</p>
                <img
                  className="inline-block my-5 w-28"
                  src={weatherData?.icon}
                  alt={weatherData?.name}
                />
                <h1 className="text-5xl font-bold">{weatherData?.temp_c}°C</h1>

                <h1 className="font-bold">{weatherData?.country}</h1>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;

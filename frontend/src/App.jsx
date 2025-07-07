
import { useEffect ,useState} from 'react';
import './App.css'
import SearchBar from './components/Searchbar';
import { useWeather } from './context/WeatherContext';


function App() {
  const weather = useWeather();
  const [temp, setTemp] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    if (weather?.weather?.length === 2) {
      setTemp(weather.weather[0]);
      setData(weather.weather[1]);
    }
  }, [weather]);

  const [x,setx] = useState(0);
  const [y,sety] = useState(0);
  const [error,setError] = useState(0);
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setx(pos.coords.latitude);
      sety(pos.coords.longitude);
      setError(5);
    },
    (err) => {
      if (err.code === 1) setError(1);
      else if (err.code === 2) setError(2);
      else if (err.code === 3) setError(3);
      else setError(4);
    }
  );
}, []);

  const getWeather = async () => {
    let weatherUrl = `http://localhost:8000/api/getWeather/place/london`;
    let forecastUrl = `http://localhost:8000/api/getForecast/place/london`;

    if(error===5) {
      weatherUrl = `http://localhost:8000/api/getWeather/coords/${x}/${y}`;
      forecastUrl = `http://localhost:8000/api/getForecast/coords/${x}/${y}`;
    }

    try {
      const [current, forecast] = await Promise.all([
        fetch(weatherUrl).then(res => res.json()),
        fetch(forecastUrl).then(res => res.json())
      ]);
      weather.setWeather([current, forecast]);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };
  useEffect(() => {
  if (error !== 0) {
    getWeather();
  }
}, [error]);
 
  if (!temp || !data) {
  return <div className="text-center text-xl p-10">Loading weather data...</div>;
}
  

  return (
    <div >
      <h1 className='text-5xl font-bold text-center shadow-xs p-5 my-10 bg-amber-200'> Weather App</h1>
      <div className="content">
        <div className="inp flex flex-row justify-center items-center mt-10">
          <SearchBar />
        </div>
        <div className="data bg-amber-50">
           <div className="currCard shadow-2xl rounded-2xl flex flex-col justify-center items-center my-10 p-10">
            <img src={temp.current.condition.icon} alt="" />
            <p>{temp.current.condition.text}</p>
            <h2 className='text-4xl font-bold'>{temp.location.name}</h2>
            <h3 className='text-2xl'>{temp.location.region}</h3>
            <h4 className='text-1xl'>{temp.location.country}</h4>
            <p className='mb-10'>Local Time: {temp.location.localtime}</p>
            <div className="details flex justify-around  gap-10 p- flex-wrap" >
              <div className="smcard shadow-2xl  p-5 rounded-2xl flex flex-col items-center bg-white hover:scale-125">
                  <p className='font-bold text-2xl'>Temperature</p>
                  <p>{temp.current.temp_c} C</p>
                  <p>Feels Like: {temp.current.feelslike_c}</p>
              </div>
              <div className="smcard shadow-2xl  p-5 rounded-2xl flex flex-col items-center bg-white hover:scale-125">
                <p className='font-bold text-2xl'>Wind and Pressure</p>
                <p >Wind: {temp.current.wind_kph }Kph , {temp.current.wind_dir}</p>
                <p >Pressure: {temp.current.pressure_mb} mb</p>
              </div>
              <div className="smcard shadow-2xl  p-5 rounded-2xl flex flex-col items-center  bg-white hover:scale-125">
                <p className='font-bold text-2xl'> Percipitaion And Humidity</p>
                <p >Percipitaion: {temp.current.precip_mm} mm</p>
                <p >Humidity: {temp.current.humidity} %</p>
              </div>
              <div className="smcard shadow-2xl  p-5 rounded-2xl flex flex-col items-center bg-white hover:scale-125">
                 <p className='font-bold text-2xl'> General</p>
                <p >Visibility: {temp.current.vis_km} km</p>
                <p >UV: {temp.current.uv}</p>
              </div>
            </div>
            
           </div>
        </div>
        <div className="forcast shadow-2xl mb-10 bg-amber-50">
          <h1 className='text-3xl font-bold'>Forcast</h1>
          <div className="forcastWrapper flex justify-around flex-wrap p-10" >
              {data.forecast.forecastday.map((e,index) => (
                <div key={index} className=' flex flex-col mt-10 rounded-2xl shadow-2xl p-10 bg-white hover:scale-110'>
                  <p className='font-bold text-2xl'>{e.date}</p>
                  <img className="w-20" src={e.day.condition.icon} alt="" />
                  <p>Temp: {e.day.avgtemp_c} C ({e.day.mintemp_c} C - {e.day.maxtemp_c} C) </p>
                  <p>Total Prepcipitaion: {e.day.totalprecip_mm} mm</p>
                  <p>Avg. Visibility: {e.day.avgvis_km} km</p>
                  <p>Avg. Humidity: {e.day.avghumidity}%</p>
                  <p>Sunrise/Sunset : {e.astro.sunrise}/{e.astro.sunset}</p>
                </div>
                
              ))}
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default App

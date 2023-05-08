import Search from "./components/search";
import UseForecast from "./components/hooks/useForecast";
import Forecast from "./components/Forecast";

const App: React.FC = () => {
  const {
    term,options,forecast,onInputChange,onOptionSelect,onSubmit
  } = UseForecast()

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-500 to-orange-500 h-[100vh] w-full">  
    {forecast ? (<Forecast data={forecast}/>) : (
    <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit}/>
  )}
      
    </main>
  )
}

export default App

import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { ForecastType, OptionType } from '../../types'

const UseForecast = () => {
  const API_KEY = '1b6fffa7ddfdfbfe126b293f7691b04c'
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<OptionType | null>(null)
  const [forecast, setForecast] = useState<ForecastType | null>(null)

  const fetchCity = async (value: string) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${API_KEY}`
      )
      setOptions(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)
    if (value === '') {
      return
    }

    fetchCity(value)
  }

  const getForecast = async (city: OptionType) => {
    try {
      const { data } = await axios.get(
        ` https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
      )
      console.log(data)

      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16),
      }
      setForecast(forecastData)
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const onOptionSelect = (option: OptionType) => {
    setCity(option)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}

export default UseForecast

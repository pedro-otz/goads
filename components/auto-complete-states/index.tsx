"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { MapPin } from "lucide-react";

type AddressProps = {
  country: string;
  country_code: string;
  municipality?: string;
  region?: string;
  state: string;
  state_district?: string;
  city : string;
};

type SuggestionProps = {
  place_id: string;
  display_name: string;
  address: AddressProps;
};

const SelectState = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SuggestionProps[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
            );
            const data: SuggestionProps = await res.json();

            const cityName = data.address.city;
            setCityInput(cityName);
            setSelectedCity(cityName);
            // fetchCities(cityName);

          } catch (error) {
            console.error("Erro ao obter localização do usuário:", error);
          }
        },
        (error) => {
          console.error("Erro ao acessar localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada neste navegador.");
    }
  };
  const fetchCities = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${query}&format=json&addressdetails=1&countrycodes=BR`
      );
      const data: SuggestionProps[] = await res.json();
      setSuggestions(data.slice(0, 4)); 
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    fetchCities(value); 
  };

  
  const handleCitySelect = (city: AddressProps) => {
    setSelectedCity(city.municipality || city.state); 
    setCityInput(city.municipality || ""); 
    setSuggestions([]); 
  };
  useEffect(() => {
    fetchUserLocation();
  }, []);
  return (
    <div className="relative sm:w-64 w-fit">
      <Input
        type="text"
        placeholder="Selecione sua cidade..."
        value={cityInput}
        onChange={handleCityChange}
        className="pl-10"
      />
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md w-full z-20 max-h-60 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city.place_id}
              className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleCitySelect(city.address)}
            >
              {city.address.municipality || city.address.state}, {city.address.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectState;

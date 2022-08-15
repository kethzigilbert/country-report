
import { httpService } from "./httpService"
const CountryService = {
    getAllCountries: () => httpService('https://restcountries.com/v2/all'),
    searchCountry: (searchTerm) => httpService(`https://restcountries.com/v2/name/${searchTerm}`),
    getCountryDetails: (name) => httpService(`https://restcountries.com/v2/name/${name}?fullText=true`)

}


export default CountryService
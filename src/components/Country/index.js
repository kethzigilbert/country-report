
import React, {  useState } from 'react';
import {  useQuery } from 'react-query';
import CountryList from './countries-list'
import {CountryService} from'./../../api';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounced } from '../custom-hooks';
import { isEmpty } from 'lodash';
import {  TextField,InputAdornment, CircularProgress, Box} from '@mui/material';
import ErrorAlert from '../common/error-alert';
const Countries = (props ) =>{
 const [searchTerm, setSearchTerm] = useState("");

const debouncedSearchTerm = useDebounced(searchTerm, 500);
  
    const { isLoading, isError: isCountryError, isSuccess, data: allCountries } = useQuery(
        ["ALL_COUNTRIES"],
        async () => {
          const response = await CountryService.getAllCountries()
          return response?.data
        }
        ,
        {
          enabled: true,
          retry:false,
          refetchOnWindowFocus: false
        }
      );


const { data : searchResults=[], isLoading :isSearching , isError : isSearchError ,isFetched } = useQuery(
  ['COUNTRY_SEARCH', debouncedSearchTerm], 
  async() => {
    const response = await CountryService.searchCountry(searchTerm)
    return response?.data
  },
  { enabled: Boolean(debouncedSearchTerm) ,refetchOnWindowFocus: false, retry:false}
)

const countries = isEmpty(searchResults) ? allCountries : searchResults
const isError = isSearchError || isCountryError
const isInProgress = isLoading || isSearching
const searchNotFound = !isEmpty(debouncedSearchTerm) && isSearchError && isFetched

return(

  <div className='mt-5  ps-0 ms-5'>


<TextField
           
           
           
            value={searchTerm}
            variant="outlined"
            placeholder={'Search for a country..'}
           onChange={(e) => setSearchTerm(e.target.value)}    
           InputProps={{
            startAdornment: (
              <InputAdornment>
               
                 <SearchIcon color='primary'/>
               
              </InputAdornment>
            ),
          }}
           
          
          />
    {isInProgress && <div className='d-flex flex-row justify-content-center mt-5 '><CircularProgress /></div>}
    {searchNotFound  &&<div className='d-flex flex-row mt-5  '> <ErrorAlert severity="info">No results found</ErrorAlert> </div> }
    {isError && !searchNotFound && <div className='d-flex flex-row mt-5  '> <ErrorAlert severity="error">Unable to retreive countries at the moment. Please try again later</ErrorAlert> </div>}
    {!isInProgress && !isError && <CountryList countries={countries} ></CountryList>}
    </div>
  
)
}


export default Countries;
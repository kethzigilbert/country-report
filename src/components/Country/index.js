
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import CountryList from './countries-list'
import {CountryService} from'./../../api';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

import { useDebounced } from '../custom-hooks';
import { isEmpty } from 'lodash';
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
const Countries = (props ) =>{
 const [searchTerm, setSearchTerm] = useState("");

const debouncedSearchTerm = useDebounced(searchTerm, 500);
  
    const { isLoading, isError, isSuccess, data: allCountries } = useQuery(
        ["ALL_COUNTRIES"],
        async () => {
          const response = await CountryService.getAllCountries()
          return response.json()
        }
        ,
        {
          enabled: true,
          retry:false,
          refetchOnWindowFocus: false
        }
      );


const { data : searchResults, isLoading :isSearching } = useQuery(
  ['COUNTRY_SEARCH', debouncedSearchTerm], 
  async() => {
    const response = await CountryService.searchCountry(searchTerm)
    return response.json()
  },
  { enabled: Boolean(debouncedSearchTerm) ,refetchOnWindowFocus: false}
)

const countries = isEmpty(searchResults) ? allCountries : searchResults


return(

  <div className='mt-5 container'>


<OutlinedInput
           
            type={'text'}
            color="primary"
            value={searchTerm}
            placeholder={'Search for a country..'}
           onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="end">
               
                 <SearchIcon color='primary'/>
               
              </InputAdornment>
            }
          
          />

    <CountryList countries={countries} ></CountryList>
    </div>
)
}


export default Countries;
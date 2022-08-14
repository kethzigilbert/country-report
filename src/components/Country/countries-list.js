
import React, { useCallback, useEffect, useRef,useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import slice from 'lodash/slice'
import Typography from '@mui/material/Typography';
import { cloneDeep } from 'lodash';
import Link from 'next/link';

const CountryList = (props ) =>{
const {countries = []} = props; 

// const countries = [{
// 	"name": "Afghanistan",
// 	"topLevelDomain": [".af"],
// 	"alpha2Code": "AF",
// 	"alpha3Code": "AFG",
// 	"callingCodes": ["93"],
// 	"capital": "Kabul",
// 	"altSpellings": ["AF", "Afġānistān"],
// 	"subregion": "Southern Asia",
// 	"region": "Asia",
// 	"population": 40218234,
// 	"latlng": [33.0, 65.0],
// 	"demonym": "Afghan",
// 	"area": 652230.0,
// 	"timezones": ["UTC+04:30"],
// 	"borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
// 	"nativeName": "افغانستان",
// 	"numericCode": "004",
// 	"flags": {
// 		"svg": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
// 		"png": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png"
// 	},
// 	"currencies": [{
// 		"code": "AFN",
// 		"name": "Afghan afghani",
// 		"symbol": "؋"
// 	}],
// 	"languages": [{
// 		"iso639_1": "ps",
// 		"iso639_2": "pus",
// 		"name": "Pashto",
// 		"nativeName": "پښتو"
// 	}, {
// 		"iso639_1": "uz",
// 		"iso639_2": "uzb",
// 		"name": "Uzbek",
// 		"nativeName": "Oʻzbek"
// 	}, {
// 		"iso639_1": "tk",
// 		"iso639_2": "tuk",
// 		"name": "Turkmen",
// 		"nativeName": "Türkmen"
// 	}],
// 	"translations": {
// 		"br": "Afeganistão",
// 		"pt": "Afeganistão",
// 		"nl": "Afghanistan",
// 		"hr": "Afganistan",
// 		"fa": "افغانستان",
// 		"de": "Afghanistan",
// 		"es": "Afganistán",
// 		"fr": "Afghanistan",
// 		"ja": "アフガニスタン",
// 		"it": "Afghanistan",
// 		"hu": "Afganisztán"
// 	},
// 	"flag": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
// 	"regionalBlocs": [{
// 		"acronym": "SAARC",
// 		"name": "South Asian Association for Regional Cooperation"
// 	}],
// 	"cioc": "AFG",
// 	"independent": true
// }]

const lastItemRef = useRef();
  const observer = useRef();
  const [loadedCountries, setLoadedCountries] = useState(
   []
  );



  useEffect(()=>{
	const sliced = slice(countries,0,7)

	setLoadedCountries(sliced)
  },[countries])

  const handleObserver = useCallback((entries) => {
	console.log(entries)
  if (entries[0].isIntersecting) {
   if(loadedCountries.length!==countries.length)
	setLoadedCountries([
	  ...loadedCountries,
	  ...countries.slice(loadedCountries.length,loadedCountries.length+7)
	]);
   
  }
},[loadedCountries,countries])
useEffect(() => {
    const options = {
      root: document,
      rootMargin: "20px",
      threshold: 1
    };
    
    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }
    return () => {
      observer.current.disconnect();
    };
},[handleObserver]);
return(
    <div className='d-flex row  flex-wrap w-100 mt-3  '>
        {loadedCountries.map((eachCountry,index)=>{
            const {flag , name, population, region, capital} = eachCountry

			
            return(
				<div key={name}  className='col-3 ' >
					<Link href={`country/${name}`} passHref>
      <Card >
       <CardMedia
        component="img"
        height="140"
        image={flag}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {name}
        </Typography>
        <div className='flex-row d-flex'>
        <Typography variant="h6" color="text.secondary">
          Population
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {population}
        </Typography>
        </div>
       
      </CardContent>
    </Card>
	</Link>
	{index === loadedCountries.length - 1 &&
	
		  <p ref={lastItemRef}>
		  </p>
	
	  }
	  </div>
            )
        })}
    </div>
)
}


export default React.memo(CountryList);
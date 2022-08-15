
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import slice from 'lodash/slice'
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  fullHeightCard: {
    height: '100%'
  }
})
const CountryList = (props) => {
  const { countries = [] } = props;
  const classes = useStyles()


  const lastItemRef = useRef();
  const observer = useRef();
  const [loadedCountries, setLoadedCountries] = useState(
    []
  );



  useEffect(() => {
    const sliced = slice(countries, 0, 8)

    setLoadedCountries(sliced)
  }, [countries])

  const handleObserver = useCallback((entries) => {

    if (entries[0].isIntersecting) {
      if (loadedCountries.length !== countries.length)
        setLoadedCountries([
          ...loadedCountries,
          ...countries.slice(loadedCountries.length, loadedCountries.length + 8)
        ]);

    }
  }, [loadedCountries, countries])
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
  }, [handleObserver]);
  return (
    <div className='container ps-0 m-0'>
      <div className='d-flex row  flex-wrap w-100 mt-3  '>
        {loadedCountries.map((eachCountry, index) => {
          const { flag, name, population, region, capital } = eachCountry


          return (
            <div key={name} className='col-12 col-sm-12 col-md-3 col-lg-3  align-self-stretch mb-3' >
              <Link href={`country/${name}`} passHref>
                <Card className={classes.fullHeightCard}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={flag}
                    alt={name}
                  />
                  <CardContent>

                    <Typography variant="h6" style={{ fontWeight: '600' }} className="mb-2">
                      {name}
                    </Typography>
                    <div className='col-12  d-flex flex-row align-items-end'>
                      <Typography variant="body1" color="text.primary" className='me-1'>
                        Population:
                      </Typography>
                      {' '}
                      <Typography variant="caption" color="text.primary">
                        {population}
                      </Typography>
                    </div>
                    <div className='col-12 d-flex flex-row align-items-end'>
                      <Typography variant="body1" color="text.primary" className='me-1'>
                        Region:{' '}
                      </Typography>
                      <Typography variant="caption" color="text.primary">
                        {region}
                      </Typography>
                    </div>
                    <div className='col-12  d-flex flex-row align-items-end'>
                      <Typography variant="body1" color="text.primary" className='me-1'>
                        Capital:{" "}
                      </Typography>
                      <Typography variant="caption" color="text.primary">
                        {capital}
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
    </div>
  )
}


export default React.memo(CountryList);
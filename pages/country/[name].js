
import React, { useMemo } from 'react';
import { useRouter } from 'next/router'
import { useQuery } from 'react-query';
import { CountryService } from '../../src/api';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Button } from '@mui/material';


const CountryDetail = (props) => {
    const router = useRouter()
    const { name } = router.query
    const { data: result, isLoading } = useQuery(
        ['COUNTRY_SEARCH', name],
        async () => {
            const response = await CountryService.getCountryDetails(name)
            return response.json()
        },
        { enabled: Boolean(name), refetchOnWindowFocus: false }
    )
    const country = result?.[0] || {}
    const { flag, capital, nativeName, population = '', languages = [], region, borders = [], currencies = [], subregion, topLevelDomain = [] } = country



    const countryAttributesList = useMemo(() => {
        return ([
            {
                label: 'Native Name',
                value: nativeName
            },
            {
                label: 'Top Level Domain',
                value: topLevelDomain?.join(',') || ''
            }, {
                label: 'Population',
                value: population
            }, {
                label: 'Currencies',
                value: currencies?.map(each => each?.name)?.join(',') || ''
            },
            {
                label: 'Region',
                value: region
            },
            {
                label: 'Languages',
                value: languages?.map(each => each?.name)?.join(',') || ''
            },
            {
                label: 'Sub Region',
                value: subregion
            },
            {
                label: 'Capital',
                value: capital
            }

        ]


        )
    }, [region, subregion, nativeName, topLevelDomain, currencies, population, capital, languages])


    const countryAttributes = useMemo(() => {
        return (
            <div className='d-flex mt-5 flex-row flex-wrap'>
                {countryAttributesList?.map((each) =>
                    <div key={each?.label} className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-row align-items-end">
                        <Typography variant="h6" className="me-2" color="text.primary">
                            {each?.label}{': '}
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                            {each?.value}
                        </Typography>
                    </div>
                )
                }

            </div>
        )
    }, [countryAttributesList])
    return (

        <div className='d-flex flex-column  flex-wrap w-100 mt-4 px-5 '>
            <div className='col-2'>
                <Button variant="outlined" color="success" onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
                    Back
                </Button></div>
            <div className='container mt-5 ms-0 ps-0 align-items-center'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <img src={flag} alt={name} width="100%" height={'300px'} />
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center'>
                        <Typography variant="h5" color="text.primary" style={{ fontWeight: '550' }}>
                            {name}
                        </Typography>
                        {countryAttributes}

                    </div>
                </div>

            </div>

        </div>
    )
}


export default CountryDetail;
This Project allows you to view list of countries and its details. You can
* see all countries from the API on the homepage on load
* search for a country using an input field
* click on a country to see more detailed information on a separate page
* toggle the color scheme between light and dark mode

This Project is deployed to https://country-report.vercel.app/
## Getting Started
First install the required modules 

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Design

* API endpoints are present in the the ./src/api folder seperated according to service.
* Common visual components are present in ./src/components/common
* Common reusable hooks are present in ./src/components/custom-hooks



## Performance Optimization

* Country details on homepage are lazy loaded on scroll. 


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
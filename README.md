# Championship ranking simulator

A tools for the french amator football club to know toward the end of the season the number of scenario in which they will be for up and down

The website is build with react and requesting the fff api client side

## Launch
There is a cors policy on the data so you need to launch a cors proxy
`sudo npm install -g local-cors-proxy
lcp --proxyUrl https://api-dofa.fff.fr/`

`npm install
npm run dev`

## Todo
- pick a championship
    - waiting for the season to start to have access to the normal api
- render all information
- compute the ranking and the probability
- Edit score function
- Choose the day to go back in time
- Button to put same score on the outward and return journey
- stylizing with a react componant librairy


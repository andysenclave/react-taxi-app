#mytaxi-test-frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Please start the server before proceeding further

## Available Scripts

In the project directory, you can run:

### `npm install`

To install all the app dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm lint`

Launches the lint runner to check for linting errors<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>

### `Guide to the app`

#### Goals

* Task 1: Retrieving Data & List

* Task 2: Extend data to a map

#### Implementation

* The app uses to `Redux` for state management, the data is loaded once during the app load and persists throughout the navigation of the app

* No external libraries are used for styling and design of the app, I have used my own custom styles to achieve the design

* More Information:

  1) List of cars - the data from both Car2Go and My Taxi api is listed down in cards, where each card contains vehicle specific informations with visual explanation,
  2) Map - where both types of cabs are geo positioned using google map api (my personal api authentication key is used, which can be changed in the app.config file listed under constants folder)
  3) `Blue` color is used to uniquely identify - car2go cars both in map and in the list,
  4) `Yellow` color is used to uniquely identify - mytaxi cars both in map and in the list,
  5) `Grey` color is used to signify inactive cars, 
  6) To keep the data synchronous, car2go data contains two parameters interior car condition and exterior car condition if both of them results as 'UNACCEPTABLE' it is considered as INACTIVE, whereas mytaxi car data has a specific parameter called state which results to 'INACTIVE' in some cases,
  7) The fuel value has a visual representation of three stages - empty, half-full and full,
  8) Inactive cars has visual representation in the cards,
  9) The state, interior and exterior conditions are marked by a tick for good and cross for unacceptable status in the cards,

### `Filter`

* Custom filters are added -

  1) Filter to see specific type of cars - All, Car2Go, MyTaxi
  2) Filter to see specific state of cars - All, Active, Inactive

  Filters apply to both the list and the map, i.e., we can used them to filter the data and see specific data in the list or in the map.

### `Modal`

* Clicking on a card individually locates the specific cab in the map rendered inside a custom modal

### `Mobile`

* The app has a minimal mobile view, not too sassy, with a nav-bar at the bottom
* The filter bar at the top is horizontally scrollable


##Please share your feedback with me at andysenclave@gmail.com, hope you like it :-)

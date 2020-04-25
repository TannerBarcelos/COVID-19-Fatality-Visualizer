const URL = 'https://data.cdc.gov/resource/kn79-hsxy.json'; //endpoint of json data on cdc dev page
let CASE_DATA = ''; //global variable to store the data to be worked with

//the select drop down
const selector = document.getElementById('selectorDropDown');

//make chart variable global to allow the update method
let covid_chart;

let state_list = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];
state_list.forEach((ind) => {
  //make options for each state
  const option = document.createElement('OPTION');
  const optionText = document.createTextNode(`${ind}`);
  option.appendChild(optionText);
  selector.appendChild(option);
});

//grab the submit button
const button = document.getElementById('get-state-data');
//once the user selected a state, when they press generat chart, that will open the chart with the exact data based off that selected state
button.addEventListener('click', () => {
  fetch(URL)
    //then save it to the global variable and start adding option elements to the select box options
    .then(function (response) {
      CASE_DATA = response.json(); //this actually returns a promise so we must chain another then()
      return CASE_DATA;
    })
    //data here is the returned promise json data above
    .then(function createChart(data) {
      //console.log(data);
      //get the users selected state from the selector
      const selectedState = document.getElementById('selectorDropDown');
      const stateSelected =
        selectedState.options[selectedState.selectedIndex].text;

      //convert the json to an array to run filter over it and return all indices of that matching state
      let countiesInState = Array.from(data).filter((state) => {
        if (state.state_name === stateSelected) {
          return state; //an object of all the data of the state
        }
      });
      //if a curreent rendered chart exists, reset it then update it with the new data
      if (covid_chart) {
        covid_chart.destroy();
        let ctx = document.getElementById('myChart').getContext('2d'); //grab the canvas and place it in to a new chart
        covid_chart = new Chart(ctx, {
          type: 'bar',
          data: {
            //map the counties returning an array of county names to render [map returns a defined array off desired code]
            labels: countiesInState.map((county) => {
              return county.county_name;
            }),
            datasets: [
              {
                label: '# of Deaths',
                //get the corresponding data from the label on deaths
                data: countiesInState.map((county) => {
                  return county.covid_death;
                }),
                //generate random background colors for each bar using this syntax: ['rgba(255, 99, 132, 0.2)']
                backgroundColor: countiesInState.map((val) => {
                  var x = Math.floor(Math.random() * 256);
                  var y = Math.floor(Math.random() * 256);
                  var z = Math.floor(Math.random() * 256);
                  var bgColor =
                    'rgba(' + x + ',' + y + ',' + z + ',' + 0.4 + ')';
                  return bgColor;
                }),
                borderColor: 'black',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
        covid_chart.update();
      } else {
        //this will be the initial chart made for the first entry, then all subsequent entries will be handled in that if
        let ctx = document.getElementById('myChart').getContext('2d'); //grab the canvas and place it in to a new chart
        covid_chart = new Chart(ctx, {
          type: 'bar',
          data: {
            //map the counties returning an array of county names to render [map returns a defined array off desired code]
            labels: countiesInState.map((county) => {
              return county.county_name;
            }),
            datasets: [
              {
                label: '# of Deaths',
                //get the corresponding data from the label on deaths
                data: countiesInState.map((county) => {
                  return county.covid_death;
                }),
                //generate random background colors for each bar using this syntax: ['rgba(255, 99, 132, 0.2)']
                backgroundColor: countiesInState.map((val) => {
                  var x = Math.floor(Math.random() * 256);
                  var y = Math.floor(Math.random() * 256);
                  var z = Math.floor(Math.random() * 256);
                  var bgColor =
                    'rgba(' + x + ',' + y + ',' + z + ',' + 0.4 + ')';
                  return bgColor;
                }),
                borderColor: 'black',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

/**
   * side notes:
   * 
   * //sort object properties
    CASE_DATA = data.sort((a, b) => (a.state_name > b.state_name ? 1 : -1));
   */

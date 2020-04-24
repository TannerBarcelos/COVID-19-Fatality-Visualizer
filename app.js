const URL = 'https://data.cdc.gov/resource/kn79-hsxy.json'; //endpoint of json data on cdc dev page
let CASE_DATA = ''; //global variable to store the data to be worked with

//the select drop down
const selector = document.getElementById('selectorDropDown');

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
          return state;
        }
      });

      console.log(countiesInState);
      let ctx = document.getElementById('myChart').getContext('2d'); //grab the canvas and place it in to a new chart
      let covid_chart = new Chart(ctx, {
        type: 'bar',
        data: {
          //TODO: ADD LABELS
          labels: '',
          datasets: [
            {
              label: '# of Deaths',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: ['rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
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

/**
 * constants
 */

const PVI_VEHICLE_TYPES = {
  TRANSPORTATION: 1,
  PICKUP_TRUCK: 2,
  VAN: 3,
  SPECIALISTS: 4,
  TRUCK_1: 5,
  TRUCK_2: 6,
  TRUCK_3: 7,
  TRUCK_4: 8,
  COMMERCIAL: 9
};

const MAX_COUNT = 10;
const MILLION = 1000000;
const BILLION = 1000000000;

/**
 * global variables
 */

let isCommercial = false;
let years = 1;
let provider = "vbi"

let modelPrice = 0;
let modelName = "";
let modelYear = 0;
let modelAge = 0;

const dict = new Map()
const keys = new Array()

const updateTotalPrice = () => {
  console.log("commercial:", isCommercial);
  console.log("years:", years);
  console.log("provider:", provider);
  const pricePerYear = modelPrice*(isCommercial ? 12 : 11); // thousands VND
  document.getElementById("totalPrice").innerHTML = pricePerYear * years;
}

const commercialCheckBox = (checkbox) => {
  isCommercial = checkbox.checked;
  updateTotalPrice();
}

const yearsSelection = (select) => {
  years = select.id.slice(4);
  updateTotalPrice();
}

const providerSelection = (select) => {
  provider = select.value;
  updateTotalPrice();
}

const refreshModelInfo = (name) => {
  modelName = name;
  modelYear = Number(name.slice(-4));
  modelPrice = ~~(dict.get(name) / MILLION);
  modelAge = 2023 - modelYear;

  // document.getElementById("model").innerHTML = modelName;
  // document.getElementById("year").innerHTML = modelYear;
  // document.getElementById("age").innerHTML = modelAge;
  setEstimatedPrice(modelPrice);
}

const increaseEstimatedPrice = (amount) => {
  setEstimatedPrice(modelPrice + amount);
}

const setEstimatedPrice = (amount) => {
  modelPrice = amount;
  document.getElementById("estimatedPrice").value = modelPrice;

  updateTotalPrice();
}

const findMatches = (data, q) => {
  var matches = [];
  // iterate through the pool of strings and for any string that
  // contains the substring `q`, add it to the `matches` array
  data.forEach((str, i) => {
    if (str.indexOf(q) >= 0) {
      matches.push(str);
    }
  });
  return matches;
};

const init = () => {
  fetch("/data/index.csv")
    .then(res => res.text())
    .then(text => {
      const lines = text.split(/\r\n|\n/)
      lines.forEach((line, id) => {
        const arr = line.split(/,/)
        dict.set(arr[0].toLowerCase(), arr[1])
        keys.push(arr[0].toLowerCase())
      });
    })
};

/**
 * initialization
 */
init();

$(document).ready(function() {
    var substringMatcher = function(strs) {
      return function findTheMatches(q, cb) {
        var matches = keys;
        q.toLowerCase().split(" ").forEach((item, i) => {
          matches = findMatches(matches, item);
        });
        cb(matches);
      }
    };

    $('.typeahead').typeahead({
      hint: true,
      highlight: false,
      minLength: 1
    },
    {
      name: 'states',
      source: substringMatcher(keys)
    });

    $('.typeahead').on('typeahead:selected', function(event, datum) {
      refreshModelInfo(datum);
      updateTotalPrice();
    });
});

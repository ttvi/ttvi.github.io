/**
 * constants
 */

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

// ==========================================
//           pricing model and data
// ==========================================

const PRICE_RANGE_ALL = [Infinity];

const BSH_PRICE_RANGE_1 = [500, 700, 800, Infinity];
const BSH_PRICE_RANGE_2 = [500, Infinity];
const BSH_YEAR_RANGE = [3, 6, 10, Infinity];

const PVI_PRICE_RANGE = [700, 1000, Infinity];
const PVI_YEAR_RANGE = [3, 6, 10];

class PricingTool {
  /**
   * 
   * @param {Array} priceRanges - an array of integers as the upper bound values of the price ranges
   * @param {Array} yearRanges - an array of integers as the upper bound values of the year ranges
   * @param {Object} pricingFactors - a matrix of price factors with rows as price and column as year
   * @param {String} description - description of the item
   */
  constructor(priceRanges, yearRanges, pricingFactors, description) {
      this.priceRanges = priceRanges;
      this.yearRanges = yearRanges;
      this.pricingFactors = pricingFactors;
      this.description = description;
  }

  /**
   * 
   * @param {Number} carPrice - price of the car in million Dong
   * @param {Number} carYear - age of the car in number of years
   * @returns - the insurance price for the car
   */
  getPrice(carPrice, carYear) {
      if (carPrice < 0 || carYear < 0) {
          throw new RangeError("Invalid Value: please input a positive integer");
      }
      let priceId = 0, yearId = 0;
      for (let i = 0; i < this.priceRanges.length && carPrice > this.priceRanges[i]; i++) {
          priceId = i;
      }
      for (let j = 0; j < this.yearRanges.length && carYear > this.yearRanges[j]; j++) {
          yearId = j;
      }
      const pricingFactor = this.pricingFactors[priceId][yearId];
      return carPrice * pricingFactor;
  }

  /**
   * 
   * @returns - the description of the category
   */
  getDescription() {
      return this.description;
  }
}

const BSH_VEHICLE_TYPES = {
    NON_COMMERCIAL_PASSENGER: new PricingTool(BSH_PRICE_RANGE_1, BSH_YEAR_RANGE,
        [[1.4, 1.5, 1.6, 1.8], [1.3, 1.4, 1.5, 1.62], [1.2, 1.3, 1.4, 1.62], [1, 1.2, 1.42, 1.62]], "XE KHÔNG KINH DOANH"),
    COMMERCIAL_TRANSIT_SMALL: new PricingTool(BSH_PRICE_RANGE_2, BSH_YEAR_RANGE,
        [[1.68, 1.90, 2.10, 2.20], [1.60, 1.85, 1.95, 2.30]], "XE KINH DOANH (đến 9 chỗ)"),
    COMMERCIAL_TRANSIT_LARGE: new PricingTool(BSH_PRICE_RANGE_2, BSH_YEAR_RANGE,
        [[1.10, 1.36, 1.50, 1.73], [1.10, 1.21, 1.32, 1.73]], "XE KINH DOANH (trên 9 chỗ)"),
    PICKUP_TRUCK: new PricingTool(BSH_PRICE_RANGE_2, BSH_YEAR_RANGE,
        [[1.25, 1.55, 1.66, 1.84], [1.21, 1.42, 1.65, 1.84]], "XE PICKUP"),
    MERCEDES: new PricingTool(PRICE_RANGE_ALL, BSH_YEAR_RANGE, [[1.10, 1.40, 1.62, 1.73]], "XE MERCEDES"),
    TRUCK_OTHERS: new PricingTool(PRICE_RANGE_ALL, BSH_YEAR_RANGE, [[1.21, 1.32, 1.43, 1.84]], "XE TẢI (trừ Hino, Isuzu)"),
    TRUCK_HINO_ISUZU: new PricingTool(PRICE_RANGE_ALL, BSH_YEAR_RANGE, [[1.21, 1.52, 1.63, 1.84]], "XE TẢI Hino, Isuzu"),
    MISC: new PricingTool(PRICE_RANGE_ALL, BSH_YEAR_RANGE, [[1.65, 1.76, 1.87, 2.39]], "XE ĐẦU KÉO, XE TẬP LÁI, XE ĐÔNG LẠNH"),
    TRAILER_SATSI: new PricingTool(PRICE_RANGE_ALL, BSH_YEAR_RANGE, [[0.66, 0.77, 0.88, 1.40]], "ROMOOC SATSI"),
    TRAILER_BEN: new PricingTool(PRICE_RANGE_ALL, BSH_YEAR_RANGE, [[1.30, 1.60, 1.80, 2.20]], "ROMOOC BEN (ROMOOC TỰ ĐỔ)")
};

const PVI_VEHICLE_TYPES = {
    NON_COMMERCIAL_PASSENGER: new PricingTool(PVI_PRICE_RANGE, PVI_YEAR_RANGE,
        [[1.62, 1.9, 2], [1.19, 1.4, 1.47], [1.11, 1.3, 1.37]], "Xe chở người, xe chở tiền"),
    NON_COMMERCIAL_PICKUP: new PricingTool(PVI_PRICE_RANGE, PVI_YEAR_RANGE,
        [[1.81, 2.09, 2.33], [1.33, 1.54, 1.72], [1.24, 1.43, 1.59]], "Xe bán tải (Pick-up)"),
    NON_COMMERCIAL_VAN: new PricingTool(PVI_PRICE_RANGE, PVI_YEAR_RANGE,
        [[2.04, 2.33, 2.57], [1.51, 1.72, 1.89], [1.4, 1.59, 1.76]], "Xe tải VAN; Các loại xe vừa chở người vừa chở hàng khác"),
    SPECIAL_TRANSPORTATION: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.35, 1.6, 1.8]], "Xe chở xăng, dầu, khí hoả lỏng, nhựa đường, nhiên liệu"),
    SPECIAL_CONSTRUCTION: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.35, 1.6, 1.8]], "Xe tải gắn cấu, xe gắn thiết bị khoan, xe cầu tự hành (được phép lưu hành trên đường bộ), xe trộn/bơm bê tông"),
    SPECIAL_SERVICE: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.35, 1.6, 1.8]], "Xe cứu thương, cứu hoả, xe thang, xe vệ sinh, xe quét đường, xe téc chở chất lỏng"),
    TRUCK_COMMERCIAL: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.3, 1.6, 1.9]], "Xe ô tô vận tải hàng hoá; Xe không hoạt động trên công trường/khai trường/khu vực khai thác khoáng sản"),
    TRUCK_HEAVY_DUTY: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[2.1, 2.3, 2.6]], "Xe tải chở hàng đông lạnh/gắn thùng bảo ôn; Xe hoạt động trên công trường/khai trường/khu vực khai thác khoáng sản; Xe đầu kéo, xe chở hàng siêu trường, siêu trọng;"),
    TRUCK_TRAILER_NORMAL: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[0.98, 1.28, 2]], "Rơ mooc thông thường"),
    TRUCK_TRAILER_SPECIALIZED: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.65, 1.95, 2.9]], "Rơ mooc có gắn thiết bị chuyên dùng Rơ mooc chở hàng đông lạnh/gắn thùng bảo ôn; Rơ mooc ben tự đổ"),
    COMMERCIAL_TRANSIT_CONTRACTOR: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.46, 1.82, 2.1]], "Xe chở người theo hợp đồng dịch vụ"),
    COMMERCIAL_TRANSIT_TECHNOLOGY: new PricingTool(PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1, 1, 1]], "Xe taxi công nghệ (kinh doanh Grab hoặc các loại hình tương tự")
};

// ==========================================

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

// ==========================================
//                   tab
// ==========================================

function populateDropDown() { 
  const dropdown = $('#london_cars'); 
  dropdown.empty();  // Clear existing options 

  // Add options to the drop-down 
  for (const vtype of Object.keys(PVI_VEHICLE_TYPES)) {
    // console.log("price: " + PVI_VEHICLE_TYPES[vtype].getPrice(price, year));
    dropdown.append($('<option></option>').attr('value', vtype).text(vtype + " : " + PVI_VEHICLE_TYPES[vtype].getDescription()));
  }
} 

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// ==========================================

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
  populateDropDown();
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

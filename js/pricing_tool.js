export class PricingTool {
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

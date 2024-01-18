import { PricingTool } from "./pricing_tool.js"

const BSH_YEAR_RANGE = [3, 6, 10, Infinity];

export const BSH_VEHICLE_TYPES = {
    NON_COMMERCIAL_PASSENGER: new PricingTool([500, 700, 800, Infinity], BSH_YEAR_RANGE,
        [[1.4, 1.5, 1.6, 1.8], [1.3, 1.4, 1.5, 1.62], [1.2, 1.3, 1.4, 1.62], [1, 1.2, 1.42, 1.62]], "XE KHÔNG KINH DOANH"),
    COMMERCIAL_TRANSIT_SMALL: new PricingTool([500, Infinity], BSH_YEAR_RANGE,
        [[1.68, 1.90, 2.10, 2.20], [1.60, 1.85, 1.95, 2.30]], "XE KINH DOANH (đến 9 chỗ)"),
    COMMERCIAL_TRANSIT_LARGE: new PricingTool([500, Infinity], BSH_YEAR_RANGE,
        [[1.10, 1.36, 1.50, 1.73], [1.10, 1.21, 1.32, 1.73]], "XE KINH DOANH (trên 9 chỗ)"),
    PICKUP_TRUCK: new PricingTool([500, Infinity], BSH_YEAR_RANGE,
        [[1.25, 1.55, 1.66, 1.84], [1.21, 1.42, 1.65, 1.84]], "XE PICKUP"),
    MERCEDES: new PricingTool([Infinity], BSH_YEAR_RANGE, [[1.10, 1.40, 1.62, 1.73]], "XE MERCEDES"),
    TRUCK_OTHERS: new PricingTool([Infinity], BSH_YEAR_RANGE, [[1.21, 1.32, 1.43, 1.84]], "XE TẢI (trừ Hino, Isuzu)"),
    TRUCK_HINO_ISUZU: new PricingTool([Infinity], BSH_YEAR_RANGE, [[1.21, 1.52, 1.63, 1.84]], "XE TẢI Hino, Isuzu"),
    MISC: new PricingTool([Infinity], BSH_YEAR_RANGE, [[1.65, 1.76, 1.87, 2.39]], "XE ĐẦU KÉO, XE TẬP LÁI, XE ĐÔNG LẠNH"),
    TRAILER_SATSI: new PricingTool([Infinity], BSH_YEAR_RANGE, [[0.66, 0.77, 0.88, 1.40]], "ROMOOC SATSI"),
    TRAILER_BEN: new PricingTool([Infinity], BSH_YEAR_RANGE, [[1.30, 1.60, 1.80, 2.20]], "ROMOOC BEN (ROMOOC TỰ ĐỔ)")
};

import { PricingTool } from "./pricing_tool.js";

const PVI_PRICE_RANGE = [700, 1000, Infinity];
const PVI_PRICE_RANGE_ALL = [Infinity];
const PVI_YEAR_RANGE = [3, 6, 10];

export const PVI_VEHICLE_TYPES = {
    NON_COMMERCIAL_PASSENGER: new PricingTool(PVI_PRICE_RANGE, PVI_YEAR_RANGE,
        [[1.62, 1.9, 2], [1.19, 1.4, 1.47], [1.11, 1.3, 1.37]], "Xe chở người, xe chở tiền"),
    NON_COMMERCIAL_PICKUP: new PricingTool(PVI_PRICE_RANGE, PVI_YEAR_RANGE,
        [[1.81, 2.09, 2.33], [1.33, 1.54, 1.72], [1.24, 1.43, 1.59]], "Xe bán tải (Pick-up)"),
    NON_COMMERCIAL_VAN: new PricingTool(PVI_PRICE_RANGE, PVI_YEAR_RANGE,
        [[2.04, 2.33, 2.57], [1.51, 1.72, 1.89], [1.4, 1.59, 1.76]], "Xe tải VAN; Các loại xe vừa chở người vừa chở hàng khác"),
    SPECIAL_TRANSPORTATION: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.35, 1.6, 1.8]], "Xe chở xăng, dầu, khí hoả lỏng, nhựa đường, nhiên liệu"),
    SPECIAL_CONSTRUCTION: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.35, 1.6, 1.8]], "Xe tải gắn cấu, xe gắn thiết bị khoan, xe cầu tự hành (được phép lưu hành trên đường bộ), xe trộn/bơm bê tông"),
    SPECIAL_SERVICE: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.35, 1.6, 1.8]], "Xe cứu thương, cứu hoả, xe thang, xe vệ sinh, xe quét đường, xe téc chở chất lỏng"),
    TRUCK_COMMERCIAL: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.3, 1.6, 1.9]], "Xe ô tô vận tải hàng hoá; Xe không hoạt động trên công trường/khai trường/khu vực khai thác khoáng sản"),
    TRUCK_HEAVY_DUTY: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[2.1, 2.3, 2.6]], "Xe tải chở hàng đông lạnh/gắn thùng bảo ôn; Xe hoạt động trên công trường/khai trường/khu vực khai thác khoáng sản; Xe đầu kéo, xe chở hàng siêu trường, siêu trọng;"),
    TRUCK_TRAILER_NORMAL: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[0.98, 1.28, 2]], "Rơ mooc thông thường"),
    TRUCK_TRAILER_SPECIALIZED: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.65, 1.95, 2.9]], "Rơ mooc có gắn thiết bị chuyên dùng Rơ mooc chở hàng đông lạnh/gắn thùng bảo ôn; Rơ mooc ben tự đổ"),
    COMMERCIAL_TRANSIT_CONTRACTOR: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1.46, 1.82, 2.1]], "Xe chở người theo hợp đồng dịch vụ"),
    COMMERCIAL_TRANSIT_TECHNOLOGY: new PricingTool(PVI_PRICE_RANGE_ALL, PVI_YEAR_RANGE,
        [[1, 1, 1]], "Xe taxi công nghệ (kinh doanh Grab hoặc các loại hình tương tự")
};

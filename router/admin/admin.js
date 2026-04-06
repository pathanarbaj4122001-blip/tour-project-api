const express = require("express");
const AdminRouter = require("./login/adminRouter");
const TourPackageRouter = require("./tour/packageRouter");
const HighlightRouter = require("./tour/highlightRouter");
const CountryRouter = require("./tour/countryRouter");
const CityRouter = require("./tour/cityRouter");
const IncludeRouter = require("./tour/includeRouter");
const ExcludeRouter = require("./tour/excludeRouter");
const ItineraryRouter = require("./tour/itineraryRouter");
const GalleryRouter = require("./tour/imageRouter");
const CancellationRouter = require("./tour/cancellationRouter");
const TermConditionRouter = require("./tour/termConditionRouter");
const CategoryRouter = require("./category/categoryRouter");
const TagRouter = require("./tag/tagRouter");
const BlogRouter = require("./blog/blogRouter");
const BlogGalleryRouter = require("./blog/imageRouter");
const ApiProviderRouter = require("./api provider/apiProviderRouter");
const ApiFieldRouter = require("./api provider/apiFieldRouter");
const SubscriptionRouter = require("./subscription/subscriptionRouter");
const PlansRouter = require("./plans/plansRouter");
const FlightSupplierRouter = require("./supplier/flightSuppliers");
const HotelSupplierRouter = require("./supplier/hotelSuppliers");

const router = express.Router();

router.use("/login", AdminRouter);

router.use("/tour_package", TourPackageRouter);
router.use("/highlight", HighlightRouter);
router.use("/country", CountryRouter);
router.use("/city", CityRouter);
router.use("/tour_include", IncludeRouter);
router.use("/tour_exclude", ExcludeRouter);
router.use("/tour_itinerary", ItineraryRouter);
router.use("/tour_gallery", GalleryRouter);
router.use("/tour_cancellation", CancellationRouter);
router.use("/tour_term_condition", TermConditionRouter);

router.use("/category", CategoryRouter);
router.use("/tag", TagRouter);
router.use("/blog", BlogRouter);
router.use("/blog_gallery", BlogGalleryRouter);

router.use("/api_provider", ApiProviderRouter);
router.use("/api_fields", ApiFieldRouter);

router.use("/subscription", SubscriptionRouter);
router.use("/plans", PlansRouter);
router.use("/flight_suppliers", FlightSupplierRouter);
router.use("/hotel_suppliers", HotelSupplierRouter);

module.exports = router;

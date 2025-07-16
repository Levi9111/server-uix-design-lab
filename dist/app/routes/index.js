"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faqs_route_1 = require("../modules/FAQs/faqs.route");
const pricing_route_1 = require("../modules/Pricing/pricing.route");
const features_route_1 = require("../modules/Features/features.route");
const projects_route_1 = require("../modules/Projects/projects.route");
const reviews_route_1 = require("../modules/Reviews/reviews.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/faqs',
        router: faqs_route_1.FAQsRoute,
    },
    {
        path: '/pricing',
        router: pricing_route_1.PricingRoute,
    },
    {
        path: '/features',
        router: features_route_1.FeaturesRoute,
    },
    {
        path: '/projects',
        router: projects_route_1.ProjectRoutes,
    },
    {
        path: '/reviews',
        router: reviews_route_1.ReviewsRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
//# sourceMappingURL=index.js.map
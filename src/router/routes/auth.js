import HomeView from "../../views/auth/HomeView.vue";
import imaging_routes from "./auth/imaging";
import ipd_routes from "./auth/ipd";
import lab_routes from "./auth/lab";
import opd_routes from "./auth/opd";
import reception_routes from "./auth/reception.js";

const auth_routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            required_auth: true,
            title: 'Home - My Hospital EMRS',
        }
    },
    ... reception_routes,
    ... opd_routes,
    ... ipd_routes,
    ... lab_routes,
    ... imaging_routes,
    {
        path: "/pharmacy",
        name: "pharmacy",
        component: () => import('../../views/PharmacyView.vue'),
        meta: {
            required_auth: true,
            title: 'Pharmacy'
        }
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import('../../views/SettingView.vue'),
        meta: {
            required_auth: true,
            title: 'Settings'
        }
    },
    {
        path: "/pos",
        name: "pos",
        component: () => import('../../views/PosView.vue'),
        meta: {
            required_auth: true,
            title: 'Point of Sales'
        }
    },
    {
        path: "/transactions",
        name: "transactions",
        component: () => import('../../views/TransactionView.vue'),
        meta: {
            required_auth: true,
            title: 'Transactions'
        }
    }
];

export default auth_routes;

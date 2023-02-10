import HomeView from "../../views/HomeView.vue";

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
    {
        path: "/reception",
        name: "reception",
        components: {
            default: () => import('../../views/ReceptionView.vue'),
            sub_layout: () => import('../../layouts/_layouts/ReceptionLayout.vue')
        },
        meta: {
            required_auth: true,
            title: 'Reception'
        }
    },
    {
        path: "/opd",
        name: "opd",
        components: {
            default: () => import('../../views/OpdView.vue'),
            sub_layout: () => import('../../layouts/_layouts/OpdLayout.vue')
        },
        meta: {
            required_auth: true,
            title: 'Out Patient Deparment'
        }
    },
    {
        path: "/ipd",
        name: "ipd",
        components: {
            default: () => import('../../views/IpdView.vue'),
            sub_layout: () => import('../../layouts/_layouts/IpdLayout.vue')
        },
        meta: {
            required_auth: true,
            title: 'In Patient Deparment'
        }
    },
    {
        path: "/lab",
        name: "lab",
        components: {
            default: () => import('../../views/LabView.vue'),
            sub_layout: () => import('../../layouts/_layouts/LabLayout.vue')
        },
        meta: {
            required_auth: true,
            title: 'Laboratory'
        }
    },
    {
        path: "/imaging",
        name: "imaging",
        components: {
            default: () => import('../../views/ImagingView.vue'),
            sub_layout: () => import('../../layouts/_layouts/ImagingLayout.vue')
        },
        meta: {
            required_auth: true,
            title: 'Imaging Services'
        }
    },
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
];

export default auth_routes;

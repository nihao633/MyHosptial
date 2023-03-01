const opd_routes = [
    {
        path: "/opd/create",
        name: "opd_create",
        components: {
            default: () => import('../../../views/auth/opd/CreateView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/OpdLayout.vue')
        },
        meta: {
            department: 'opd',
            required_auth: true,
            title: 'Out Patient Deparment| Create A New Medical Record'
        }
    },
    {
        path: "/opd/manage",
        name: "opd_manage",
        components: {
            default: () => import('../../../views/auth/opd/ManageView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/OpdLayout.vue')
        },
        meta: {
            department: 'opd',
            required_auth: true,
            title: 'Out Patient Deparment| Manage Medical Records'
        }
    },
]

export default opd_routes
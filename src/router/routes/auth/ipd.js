const ipd_routes = [
    {
        path: "/ipd/create",
        name: "ipd_create",
        components: {
            default: () => import('../../../views/auth/ipd/CreateView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/IpdLayout.vue')
        },
        meta: {
            department: 'ipd',
            required_auth: true,
            title: 'In Patient Deparment| Create A New Medical Record'
        }
    },
    {
        path: "/ipd/manage",
        name: "ipd_manage",
        components: {
            default: () => import('../../../views/auth/ipd/ManageView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/IpdLayout.vue')
        },
        meta: {
            department: 'ipd',
            required_auth: true,
            title: 'In Patient Deparment| Manage Medical Records'
        }
    },
]

export default ipd_routes
const lab_routes = [
    {
        path: "/lab/create",
        name: "lab_create",
        components: {
            default: () => import('../../../views/auth/lab/CreateView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/LabLayout.vue')
        },
        meta: {
            department: 'lab',
            required_auth: true,
            title: 'Laboratory| Create A New Laboratory Record'
        }
    },
    {
        path: "/lab/manage",
        name: "lab_manage",
        components: {
            default: () => import('../../../views/auth/lab/ManageView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/LabLayout.vue')
        },
        meta: {
            department: 'ipd',
            required_auth: true,
            title: 'Laboratory| Manage Laboratory Records'
        }
    },
]

export default lab_routes
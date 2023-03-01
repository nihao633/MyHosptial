const imaging_routes = [
    {
        path: "/imaging/create",
        name: "imaging_create",
        components: {
            default: () => import('../../../views/auth/imaging/CreateView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/ImagingLayout.vue')
        },
        meta: {
            department: 'imaging',
            required_auth: true,
            title: 'Imaging Servies| Create A New Imaging Record'
        }
    },
    {
        path: "/imaging/manage",
        name: "imaging_manage",
        components: {
            default: () => import('../../../views/auth/imaging/ManageView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/ImagingLayout.vue')
        },
        meta: {
            department: 'imaging',
            required_auth: true,
            title: 'Imaging Servies| Manage Imaging Records'
        }
    },
]

export default imaging_routes
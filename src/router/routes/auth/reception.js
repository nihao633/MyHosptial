const reception_routes = [
    {
        path: "/reception/register",
        name: "reception_register",
        components: {
            default: () => import('../../../views/auth/reception/RegisterView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/ReceptionLayout.vue')
        },
        meta: {
            department: 'reception',
            required_auth: true,
            title: 'Reception| Register New Client'
        }
    },
    {
        path: "/reception/appointment",
        name: "reception_appointment",
        components: {
            default: () => import('../../../views/auth/reception/AppointmentView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/ReceptionLayout.vue')
        },
        meta: {
            department: 'reception',
            required_auth: true,
            title: 'Reception| Make New Appointment'
        }
    },
    {
        path: "/reception/manage",
        name: "reception_manage",
        components: {
            default: () => import('../../../views/auth/reception/ManageView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/ReceptionLayout.vue')
        },
        meta: {
            department: 'reception',
            required_auth: true,
            title: 'Reception| Manage Client Records'
        }
    },
    {
        path: "/reception/find",
        name: "reception_find",
        components: {
            default: () => import('../../../views/auth/reception/FindView.vue'),
            sub_layout: () => import('../../../layouts/_layouts/ReceptionLayout.vue')
        },
        meta: {
            department: 'reception',
            required_auth: true,
            title: 'Reception| Find Records'
        }
    },
]

export default reception_routes
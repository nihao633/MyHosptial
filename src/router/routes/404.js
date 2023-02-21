const routes_404 = [
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: () => import('../../views/NotFound.vue'),
        meta: {
            required_auth: false,
            title: '404 | Not Found'
        }
    },
    {
        path: "/unavailable",
        name: 'Unavailable',
        component: () => import('../../views/UnavailableView.vue'),
        meta: {
            required_auth: false,
            title: '503 | Unavailable'
        }
    }
]

export default routes_404
const routes_404 = [
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: () => import('../../views/guest/NotFound.vue'),
        meta: {
            required_auth: false,
            title: '404 | Not Found'
        }
    },
]

export default routes_404
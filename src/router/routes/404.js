import NotFound from '../../views/NotFound.vue';

const routes_404 = [
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: NotFound,
        meta: {
            required_auth: false,
            title: '404 | Not Found'
        }
    }
]

export default routes_404
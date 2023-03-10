const guest_routes = [
    {
        path: "/forget-password",
        name: "forgot_password",
        component: () => import("../../views/guest/ForgetPassword.vue"),
        meta: {
            required_auth: false,
            title: 'Request Password Reset'
        }
    },
    {
        path: "/reset-password",
        name: "reset_password",
        component: () => import("../../views/guest/ResetPassword.vue"),
        meta: {
            required_auth: false,
            title: 'Set New Password'
        }
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../../views/guest/RegisterView.vue"),
        meta: {
            required_auth: false,
            title: 'New Staff Register'
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../../views/guest/LoginView.vue"),
        meta: {
            required_auth: false,
            title: 'Staff Login'
        }
    },
    {
        path: "/contact",
        name: "contact",
        component: () => import("../../views/guest/ContactView.vue"),
        meta: {
            required_auth: false,
            title: 'Contacts'
        }
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../../views/guest/AboutView.vue"),
        meta: {
            required_auth: false,
            title: 'About the author'
        }
    },
];
export default guest_routes;

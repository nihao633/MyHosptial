const guest_routes = [
    {
        path: "/forget-password",
        name: "forgot_password",
        component: () => import("../../views/ForgetPassword.vue"),
        meta: {
            required_auth: false,
            title: 'Request Password Reset'
        }
    },
    {
        path: "/reset-password",
        name: "reset_password",
        component: () => import("../../views/ResetPassword.vue"),
        meta: {
            required_auth: false,
            title: 'Set New Password'
        }
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../../views/RegisterView.vue"),
        meta: {
            required_auth: false,
            title: 'New Staff Register'
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../../views/LoginView.vue"),
        meta: {
            required_auth: false,
            title: 'Staff Login'
        }
    },
    {
        path: "/contact",
        name: "contact",
        component: () => import("../../views/ContactView.vue"),
        meta: {
            required_auth: false,
            title: 'Contacts'
        }
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../../views/AboutView.vue"),
        meta: {
            required_auth: false,
            title: 'About the author'
        }
    },
];
export default guest_routes;

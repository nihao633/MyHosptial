const pharmacy_routes = [
    {
        path: "/pharmacy/create_purchase",
        name: "pharmacy_create_purchase",
        component: () => import('@/views/auth/pharmacy/CreatePurchase.vue'),
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Create A New Purchase Record'
        }
    },
    {
        path: "/pharmacy/create_dispense",
        name: "pharmacy_create_dispense",
        component: () => import('@/views/auth/pharmacy/CreateDispense.vue'),
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Create A New Dispense Record'
        }
    },
    {
        path: "/pharmacy/purchase_records",
        name: "pharmacy_purchase",
        component: () => import('@/views/auth/pharmacy/PurchaseView.vue'),
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Manage Purchase Records'
        }
    },
    {
        path: "/pharmacy/dispense_records",
        name: "pharmacy_dispense",
        component: () => import('@/views/auth/pharmacy/DispenseView.vue'),
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Manage Dispense Records'
        }
    },
    {
        path: "/pharmacy/inventory",
        name: "pharmacy_inventory",
        component: () => import('@/views/auth/pharmacy/InventoryView.vue'),
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Manage Medical Inventory'
        }
    },
]

export default pharmacy_routes;
const pharmacy_routes = [
    {
        path: "/pharmacy/create_purchase",
        name: "pharmacy_create_purchase",
        components: {
            pharmacy_side_bar: () => import('@/views/auth/pharmacy/SideBar.vue'),
            pharmacy_side_content: () => import('@/views/auth/pharmacy/SideContents/CreatePurchase.vue')
        },
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Create A New Purchase Record'
        }
    },
    {
        path: "/pharmacy/create_dispense",
        name: "pharmacy_create_dispense",
        components: {
            pharmacy_side_bar: () => import('@/views/auth/pharmacy/SideBar.vue'),
            pharmacy_side_content: () => import('@/views/auth/pharmacy/SideContents/CreateDispense.vue')
        },
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Create A New Dispense Record'
        }
    },
    {
        path: "/pharmacy/purchase_records",
        name: "pharmacy_purchase",
        components: {
            pharmacy_side_bar: () => import('@/views/auth/pharmacy/SideBar.vue'),
            pharmacy_side_content: () => import('@/views/auth/pharmacy/SideContents/PurchaseView.vue')
        },
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Manage Purchase Records'
        }
    },
    {
        path: "/pharmacy/dispense_records",
        name: "pharmacy_dispense",
        components: {
            pharmacy_side_bar: () => import('@/views/auth/pharmacy/SideBar.vue'),
            pharmacy_side_content: () => import('@/views/auth/pharmacy/SideContents/DispenseView.vue')
        },
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Manage Dispense Records'
        }
    },
    {
        path: "/pharmacy/inventory",
        name: "pharmacy_inventory",
        components: {
            pharmacy_side_bar: () => import('@/views/auth/pharmacy/SideBar.vue'),
            pharmacy_side_content: () => import('@/views/auth/pharmacy/SideContents/InventoryView.vue')
        },
        meta: {
            department: 'pharmacy',
            required_auth: true,
            title: 'Pharmacy| Manage Medical Inventory'
        }
    },
]

export default pharmacy_routes;
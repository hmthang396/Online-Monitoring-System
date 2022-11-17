import {
    Home,
    Box,
    Tag,
    Clipboard,
    UserPlus,
    LogOut,
    BarChart,Settings,Archive,
} from 'react-feather';
export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'History',path:'/history', icon: Archive, type: 'link', active: false
    },
    {
        title: 'Reports',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
    {
        title: 'Settings',path:'/settings', icon: Settings, type: 'link', active: false
    },
    {
        title: 'Projects', icon: Box, type: 'sub', active: false, children: [
            { path: '/product-list', title: 'Project List', type: 'link' },
            { path: '/addProject', title: 'Add Project', type: 'link' },
        ]
    },
    {
        title: 'Nodes', icon: Tag, type: 'sub', active: false, children: [
            { path: '/list-nodes', title: 'List Node', type: 'link' },
            { path: '/addNode', title: 'Create Node', type: 'link' },
        ]
    },
    {
        title: 'Sources', icon: Clipboard , type: 'sub', active: false, children: [
            { path: '/list-source', title: 'List Source', type: 'link' },
            { path: '/create-source', title: 'Create Source', type: 'link' },
        ]
    },
    {
        title: 'Users', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/list-user', title: 'User List', type: 'link' },
            { path: '/create-user', title: 'Create User', type: 'link' },
        ]
    },
    {
        title: 'Logout',path:'/auth/logout', icon: LogOut, type: 'link', active: false
    }
]
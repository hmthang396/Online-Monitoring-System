import {
    Home,
    Box,
    Tag,
    Clipboard,
    UserPlus,
    LogOut,
    BarChart,
    Settings,
    Cloud,
    Archive,
} from 'react-feather';
export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false , role: ['Customer','Admin']
    },
    {
        title: 'History',path:'/history', icon: Archive, type: 'link', active: false,role: ['Customer','Admin']
    },
    {
        title: 'Reports',path:'/reports', icon: BarChart, type: 'link', active: false,role: ['Customer','Admin']
    },
    {
        title: 'Settings',path:'/settings', icon: Settings, type: 'link', active: false,role: ['Customer','Admin']
    },
    {
        title: 'Projects', icon: Box, type: 'sub', active: false,role: ['Admin'], children: [
            { path: '/product-list', title: 'Project List', type: 'link',role: ['Admin'] },
            { path: '/addProject', title: 'Add Project', type: 'link',role: ['Admin'] },
        ]
    },
    {
        title: 'Sources', icon: Clipboard , type: 'sub',role: ['Admin'], active: false, children: [
            { path: '/list-source', title: 'List Source', type: 'link',role: ['Admin'] },
            { path: '/create-source', title: 'Create Source', type: 'link' ,role: ['Admin']},
        ]
    },
    {
        title: 'Nodes', icon: Cloud, type: 'sub', active: false,role: ['Admin'], children: [
            { path: '/list-nodes', title: 'List Node', type: 'link',role: ['Admin'] },
            { path: '/addNode', title: 'Create Node', type: 'link',role: ['Admin'] },
        ]
    },
    {
        title: 'Report File', icon: Clipboard, type: 'sub', active: false,role: ['Admin'], children: [
            { path: '/list-report', title: 'List File', type: 'link',role: ['Admin'] },
            { path: '/create-report', title: 'Create File', type: 'link',role: ['Admin'] },
        ]
    },
    {
        title: 'Users', icon: UserPlus, type: 'sub', active: false,role: ['Admin'], children: [
            { path: '/list-user', title: 'User List', type: 'link' ,role: ['Admin']},
            { path: '/create-user', title: 'Create User', type: 'link' ,role: ['Admin']},
        ]
    },
    {
        title: 'Logout',path:'/auth/logout', icon: LogOut, type: 'link', active: false
    }
]
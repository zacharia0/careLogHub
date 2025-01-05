import React, { useEffect, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getLoggedEmployee } from '../ApiCalls/employees.js';

const navigation = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Daily Logs', to: '/all-daily-logs' },
    { name: 'Clients', to: '/all-clients' },
    { name: 'Staff', to: '/all-employees' }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const [loggedEmployee, setLogEmployee] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // Get current path

    useEffect(() => {
        const fetchLoggedInEmployee = async () => {
            const response = await getLoggedEmployee();
            if (response.success) {
                setLogEmployee(response.data);
            }
        };

        fetchLoggedInEmployee();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Disclosure as="nav" className="bg-gray-800 ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        aria-current={location.pathname === item.to ? 'page' : undefined}
                                        className={classNames(
                                            location.pathname === item.to ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <Link to={`/employee-profile/${loggedEmployee._id}`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Your Profile
                                    </Link>
                                </MenuItem>

                                <MenuItem>
                                    <button
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            aria-current={location.pathname === item.to ? 'page' : undefined}
                            className={classNames(
                                location.pathname === item.to ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export default Navbar;






















// import React, {useEffect, useState} from 'react';
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import {Link, useNavigate} from "react-router-dom";
// import {getLoggedEmployee} from "../ApiCalls/employees.js";
//
// const navigation = [
//     { name: 'Dashboard', to: '/dashboard', current: true },
//     { name: 'Daily Logs', to: '/all-daily-logs', current: false },
//     { name: 'Clients', to: '/all-clients', current: false },
//     // { name: 'All Medication', to:'/all-medication', current: false },
//     // {name:"Pass Medications", to:"/administer-med",current:false},
//     {name:"Staff",to:"/all-employees",current:false}
// ]
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }
// const Navbar = () => {
//     const [loggedEmployee,setLogEmployee] = useState("")
//     const navigate = useNavigate()
//
//     useEffect(() => {
//         const fetchLoggedInEmployee = async() =>{
//             const response = await getLoggedEmployee()
//             if(response.success){
//                 // setLogEmployee(`${response.data.firstName} ${response.data.lastName}`)
//                 setLogEmployee(response.data)
//             }
//             console.log(response.data)
//         }
//
//
//
//         // console.log(r)
//         fetchLoggedInEmployee()
//
//     }, []);
//
//     const handleLogout = () =>{
//         localStorage.removeItem('token');
//         navigate('/login')
//     }
//
//     return (
//         <Disclosure as="nav" className="bg-gray-800 ">
//             <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                 <div className="relative flex h-16 items-center justify-between">
//                     <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                         {/* Mobile menu button*/}
//                         <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                             <span className="absolute -inset-0.5" />
//                             <span className="sr-only">Open main menu</span>
//                             <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
//                             <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
//                         </DisclosureButton>
//                     </div>
//                     <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                         <div className="flex flex-shrink-0 items-center">
//                             <img
//                                 alt="Your Company"
//                                 src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
//                                 className="h-8 w-auto"
//                             />
//                         </div>
//                         <div className="hidden sm:ml-6 sm:block">
//                             <div className="flex space-x-4">
//                                 {navigation.map((item) => (
//                                     <Link
//                                         key={item.name}
//                                         to={item.to}
//                                         aria-current={item.current ? 'page' : undefined}
//                                         className={classNames(
//                                             item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                             'rounded-md px-3 py-2 text-sm font-medium',
//                                         )}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                         <button
//                             type="button"
//                             className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                         >
//                             <span className="absolute -inset-1.5" />
//                             <span className="sr-only">View notifications</span>
//                             <BellIcon aria-hidden="true" className="h-6 w-6" />
//                         </button>
//
//                         {/* Profile dropdown */}
//                         <Menu as="div" className="relative ml-3">
//                             <div>
//                                 <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                     <span className="absolute -inset-1.5" />
//                                     <span className="sr-only">Open user menu</span>
//                                     <img
//                                         alt=""
//                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                                         className="h-8 w-8 rounded-full"
//                                     />
//                                 </MenuButton>
//                             </div>
//                             <MenuItems
//                                 transition
//                                 className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                             >
//                                 <MenuItem>
//                                     <Link to={`/employee-profile/${loggedEmployee._id}`} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
//                                         Your Profile
//                                     </Link>
//                                 </MenuItem>
//
//                                 <MenuItem>
//                                     <button
//                                         className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                                         onClick={handleLogout}
//                                     >
//                                         Sign out
//                                     </button>
//                                 </MenuItem>
//                             </MenuItems>
//                         </Menu>
//                     </div>
//                 </div>
//             </div>
//
//             <DisclosurePanel className="sm:hidden">
//                 <div className="space-y-1 px-2 pb-3 pt-2">
//                     {navigation.map((item) => (
//                         <Link
//                             key={item.name}
//                             as="a"
//                             to={item.to}
//                             aria-current={item.current ? 'page' : undefined}
//                             className={classNames(
//                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                 'block rounded-md px-3 py-2 text-base font-medium',
//                             )}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                 </div>
//             </DisclosurePanel>
//         </Disclosure>
//
//     )
// }
//
// export default Navbar;







// import React from 'react';
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Link } from "react-router-dom";
//
// const navigation = [
//     { name: 'Dashboard', to: '/dashboard', current: true },
//     { name: 'Daily Logs', to: '/all-daily-logs', current: false },
//     { name: 'Clients', to: '/all-clients', current: false },
//     { name: 'All Medication', to: '/all-medication', current: false },
//     { name: "Pass Medications", to: "/administer-med", current: false },
//     { name: "Staff", to: "/all-employees", current: false }
// ];
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }
//
// const Navbar = () => {
//     return (
//         <div className="flex h-screen">
//             {/* Left Sidebar */}
//             <div className="w-64 bg-gray-800 text-white p-4 fixed h-full">
//                 <div className="flex items-center space-x-2 mb-8">
//                     <img
//                         alt="Logo"
//                         src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
//                         className="h-8 w-auto"
//                     />
//                     <span className="text-xl font-semibold">Your Company</span>
//                 </div>
//
//                 <div className="space-y-4">
//                     {navigation.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.to}
//                             aria-current={item.current ? 'page' : undefined}
//                             className={classNames(
//                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                 'block rounded-md px-4 py-2 text-sm font-medium'
//                             )}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Main Content */}
//             <div className="flex-1 ml-64 p-6">
//                 <Disclosure as="nav" className="bg-gray-800 mb-4">
//                     <div className="flex items-center justify-between h-16">
//                         <div className="flex items-center">
//                             {/* Mobile menu button */}
//                             <div className="sm:hidden">
//                                 <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                                     <span className="sr-only">Open main menu</span>
//                                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                                     <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
//                                 </DisclosureButton>
//                             </div>
//                         </div>
//
//                         {/* Profile and Notifications */}
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 type="button"
//                                 className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
//                             >
//                                 <BellIcon className="h-6 w-6" aria-hidden="true" />
//                             </button>
//
//                             <Menu as="div" className="relative">
//                                 <MenuButton className="flex rounded-full bg-gray-800 text-sm">
//                                     <img
//                                         alt="User Avatar"
//                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                                         className="h-8 w-8 rounded-full"
//                                     />
//                                 </MenuButton>
//
//                                 <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//                                     <MenuItem>
//                                         <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
//                                     </MenuItem>
//                                     <MenuItem>
//                                         <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
//                                     </MenuItem>
//                                     <MenuItem>
//                                         <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
//                                     </MenuItem>
//                                 </MenuItems>
//                             </Menu>
//                         </div>
//                     </div>
//                 </Disclosure>
//
//                 {/* Main content goes here */}
//                 <div className="p-6">
//                     {/* Your page content */}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Navbar;


//
// import React from 'react';
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link } from "react-router-dom";
//
// const navigation = [
//     { name: 'Dashboard', to: '/dashboard', current: true },
//     { name: 'Daily Logs', to: '/all-daily-logs', current: false },
//     { name: 'Clients', to: '/all-clients', current: false },
//     { name: 'All Medication', to: '/all-medication', current: false },
//     { name: "Pass Medications", to: "/administer-med", current: false },
//     { name: "Staff", to: "/all-employees", current: false }
// ];
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }
//
// const Navbar = () => {
//     return (
//         <Disclosure as="nav" className="bg-gray-800 fixed inset-y-0 left-0 w-64">
//             <div className="flex flex-col h-full">
//                 <div className="flex flex-shrink-0 items-center justify-center p-4">
//                     <img
//                         alt="Your Company"
//                         src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
//                         className="h-8 w-auto"
//                     />
//                 </div>
//                 <div className="flex-1 overflow-y-auto">
//                     <div className="space-y-4 p-4">
//                         {navigation.map((item) => (
//                             <Link
//                                 key={item.name}
//                                 to={item.to}
//                                 aria-current={item.current ? 'page' : undefined}
//                                 className={classNames(
//                                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                     'block rounded-md px-4 py-2 text-sm font-medium'
//                                 )}
//                             >
//                                 {item.name}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </Disclosure>
//     )
// };
//
// export default Navbar;
//
//


// import React, { useState } from 'react';
// import { Disclosure } from '@headlessui/react';
// import { Link } from "react-router-dom";
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
//
// const navigation = [
//     { name: 'Dashboard', to: '/dashboard', current: true },
//     { name: 'Daily Logs', to: '/all-daily-logs', current: false },
//     { name: 'Clients', to: '/all-clients', current: false },
//     { name: 'All Medication', to: '/all-medication', current: false },
//     { name: "Pass Medications", to: "/administer-med", current: false },
//     { name: "Staff", to: "/all-employees", current: false }
// ];
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }
//
// const Navbar = () => {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//
//     return (
//         <Disclosure as="nav" className="bg-gray-800 fixed inset-y-0 left-0 w-64">
//             <div className="flex flex-col h-full">
//                 <div className="flex-shrink-0 p-4 text-white">
//                     <h1 className="text-xl font-bold">Group Home App</h1>
//                 </div>
//
//                 {/* Mobile Hamburger Menu */}
//                 <div className="flex justify-between items-center lg:hidden p-4">
//                     <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
//                         {mobileMenuOpen ? (
//                             <XMarkIcon className="h-6 w-6" />
//                         ) : (
//                             <Bars3Icon className="h-6 w-6" />
//                         )}
//                     </button>
//                 </div>
//
//                 {/* Navbar Links */}
//                 <div className={`flex flex-col p-4 space-y-2 lg:block ${mobileMenuOpen ? 'block' : 'hidden'}`}>
//                     {navigation.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.to}
//                             aria-current={item.current ? 'page' : undefined}
//                             className={classNames(
//                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                 'block rounded-md px-4 py-2 text-sm font-medium'
//                             )}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </Disclosure>
//     );
// };
//
// export default Navbar;

//
//
// import React, { useState } from 'react';
// import { Disclosure } from '@headlessui/react';
// import { Link } from "react-router-dom";
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
//
// const navigation = [
//     { name: 'Dashboard', to: '/dashboard', current: true },
//     { name: 'Daily Logs', to: '/all-daily-logs', current: false },
//     { name: 'Clients', to: '/all-clients', current: false },
//     { name: 'All Medication', to: '/all-medication', current: false },
//     { name: "Pass Medications", to: "/administer-med", current: false },
//     { name: "Staff", to: "/all-employees", current: false }
// ];
//
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }
//
// const Navbar = () => {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//
//     return (
//         <Disclosure as="nav" className="bg-gray-800 fixed inset-y-0 left-0 w-64 z-50">
//             <div className="flex flex-col h-full">
//                 <div className="flex-shrink-0 p-4 text-white">
//                     <h1 className="text-xl font-bold">Medication Table</h1>
//                 </div>
//
//                 {/* Mobile Hamburger Menu */}
//                 <div className="flex justify-between items-center lg:hidden p-4">
//                     <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
//                         {mobileMenuOpen ? (
//                             <XMarkIcon className="h-6 w-6" />
//                         ) : (
//                             <Bars3Icon className="h-6 w-6" />
//                         )}
//                     </button>
//                 </div>
//
//                 {/* Navbar Links */}
//                 <div className={`flex flex-col p-4 space-y-2 lg:block ${mobileMenuOpen ? 'block' : 'hidden'} bg-gray-800`}>
//                     {navigation.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.to}
//                             aria-current={item.current ? 'page' : undefined}
//                             className={classNames(
//                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                 'block rounded-md px-4 py-2 text-sm font-medium'
//                             )}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </Disclosure>
//     );
// };
//
// export default Navbar;


//
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
//
// const navigation = [
//     { name: 'Dashboard', to: '/dashboard' },
//     { name: 'Daily Logs', to: '/all-daily-logs' },
//     { name: 'Clients', to: '/all-clients' },
//     { name: 'All Medication', to: '/all-medication' },
//     { name: 'Pass Medications', to: '/administer-med' },
//     { name: 'Staff', to: '/all-employees' },
// ];
//
// const Navbar = () => {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//
//     return (
//         <>
//             {/* Navbar Header */}
//             <div className="lg:hidden flex items-center justify-between bg-gray-80 text-gray-500p-4 fixed top-0 left-0 w-full z-50">
//                 <h1 className="text-white text-lg font-bold">Medication Table</h1>
//                 <button
//                     onClick={() => setMobileMenuOpen(true)}
//                     className="text-gray-300 hover:text-white focus:outline-none"
//                 >
//                     <Bars3Icon className="h-6 w-6" />
//                 </button>
//             </div>
//
//             {/* Sidebar */}
//             <div className={`fixed inset-0 flex z-50 ${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
//                 {/* Overlay */}
//                 <div
//                     className="fixed inset-0 bg-black opacity-50"
//                     onClick={() => setMobileMenuOpen(false)}
//                 ></div>
//                 {/* Sidebar Menu */}
//                 <div className="relative w-64 bg-gray-800 text-white h-full">
//                     <button
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="absolute top-4 right-4 text-gray-300 hover:text-white"
//                     >
//                         <XMarkIcon className="h-6 w-6" />
//                     </button>
//                     <nav className="flex flex-col p-4 space-y-4 mt-8">
//                         {navigation.map((item) => (
//                             <Link
//                                 key={item.name}
//                                 to={item.to}
//                                 className="block px-4 py-2 rounded-md hover:bg-gray-700"
//                                 onClick={() => setMobileMenuOpen(false)}
//                             >
//                                 {item.name}
//                             </Link>
//                         ))}
//                     </nav>
//                 </div>
//             </div>
//
//             {/* Sidebar for Larger Screens */}
//             <div className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-80 text-gray-500 fixed inset-y-0 left-0">
//                 <div className="p-4 text-xl font-bold">Medication Table</div>
//                 <nav className="flex flex-col p-4 space-y-2">
//                     {navigation.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.to}
//                             className="block px-4 py-2 rounded-md hover:bg-gray-100"
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                 </nav>
//             </div>
//         </>
//     );
// };
//
// export default Navbar;
//

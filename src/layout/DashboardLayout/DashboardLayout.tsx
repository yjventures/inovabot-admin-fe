/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'

import logo from "@/assets/images/inova-logo.png"
import logoDark from "@/assets/images/inova-logo-dark.png"
import avatar from "@/assets/images/sidebar/avatar.svg"
import avatarDark from "@/assets/images/sidebar/avatar-dark.svg"
import setting from "@/assets/images/sidebar/setting.svg"
import settingDark from "@/assets/images/sidebar/setting-dark.svg"
import moon from "@/assets/images/sidebar/moon.svg"
import moonDark from "@/assets/images/sidebar/moon-dark.svg"
import sidebar from "@/assets/images/sidebar/sidebar.svg"
import sidebarDark from "@/assets/images/sidebar/sidebar-dark.svg"
import plus from "@/assets/images/sidebar/plus.svg"
import plusDark from "@/assets/images/sidebar/plus-dark.svg"

import { NavLink, Outlet, useLocation } from 'react-router-dom'
import CommonHelmet from '@/components/CommonHelmet/CommonHelmet'
import { useSidebarStore } from '@/store/store'
import Faq from '@/components/Faq/Faq'



export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [expended, setExpended] = useState(true)

    const location = useLocation()
    const [title, setTitle] = useState<String>(location.pathname.split("/")[1] || "");
    useEffect(() => {
        setTitle(location.pathname.split("/")[1]);
    }, [location.pathname])

    const darkMode = useSidebarStore(state => state.darkMode)
    const setDarkMode = useSidebarStore(state => state.setDarkMode)

    return (
        <>
            <CommonHelmet title={`${title ? title.toUpperCase() : 'Home'} | Inova`} />

            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-light-sidebar dark:bg-dark-sidebar" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-light-headingText dark:text-dark-headingText" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col overflow-y-auto bg-light-sidebar dark:bg-dark-sidebar py-4 px-2">
                                        <img src={logo} alt="inova-logo" className=" object-cover h-10 -ms-1" />
                                        <div className="flex items-center justify-between my-4">
                                            <div className="flex justify-start gap-2 items-center w-full">
                                                <img src={avatar} alt="avatar" className="my-4 border-[1px] border-dark-sidebar dark:border-light-sidebar p-1 h-7 w-7 rounded-md" />
                                                <h3 className="text-light-headingText dark:text-dark-headingText font-semibold">Mahinur Rahman</h3>
                                            </div>

                                            <div className="flex gap-2">

                                                <img
                                                    onClick={() => {
                                                        setDarkMode(!darkMode)
                                                    }}

                                                    src={moon} alt="moon-icon"
                                                    className="my-4 p-1 h-6 w-6 rounded-md hover:bg-slate-200 hover:dark:bg-neutral-600 cursor-pointer transition"
                                                />
                                            </div>
                                        </div>
                                        {/* FAQ part */}
                                        <Faq />

                                        <div className="mt-auto flex flex-col gap-1 w-full">
                                            <button
                                                className="group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 bg-light-gradientButton text-light-sidebar hover:bg-dark-gradientButton transition transition-duration-500"
                                            >
                                                <img src={plusDark} alt="plus button" className='shrink-0' />
                                                Start New Chat
                                            </button>

                                            <NavLink
                                                to="setting"
                                                className="group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 bg-light-gradientButton text-light-sidebar hover:bg-dark-gradientButton transition transition-duration-500"
                                            >
                                                <img src={darkMode ? setting : settingDark} alt="setting button" />

                                                Settings
                                            </NavLink>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className={`${expended ? 'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col' : 'hidden'}`}>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col overflow-y-auto bg-light-sidebar dark:bg-dark-sidebar px-6 py-4 transition-all duration-400">
                        <img src={darkMode ? logoDark : logo} alt="inova-logo" className="object-cover h-10 -ms-1" />
                        <div className="flex items-center justify-between my-4">
                            <div className="flex justify-start gap-2 items-center w-full">
                                <img src={darkMode ? avatarDark : avatar} alt="avatar" className="my-4 border-[1px] border-dark-sidebar dark:border-light-sidebar p-1 h-7 w-7 rounded-md" />
                                <h3 className="text-light-headingText dark:text-dark-headingText font-semibold">Mahinur Rahman</h3>
                            </div>

                            <div className="flex gap-2 ms-6">
                                <img
                                    onClick={() => {
                                        setExpended(false)
                                    }}
                                    src={darkMode ? sidebarDark : sidebar} alt="sidebar-icon"
                                    className="my-4 p-1 h-6 w-6 rounded-md hover:bg-slate-200 hover:dark:bg-neutral-600 cursor-pointer transition"
                                />
                                <img
                                    onClick={() => {
                                        setDarkMode(!darkMode)
                                    }}

                                    src={darkMode ? moonDark : moon} alt="moon-icon"
                                    className="my-4 p-1 h-6 w-6 rounded-md hover:bg-slate-200 hover:dark:bg-neutral-600 cursor-pointer transition"
                                />
                            </div>
                        </div>
                        {/* FAQ part */}
                        <Faq />

                        <div className="mt-auto flex flex-col gap-3 w-full">
                            <button
                                className="group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 bg-light-gradientButton text-light-sidebar hover:bg-dark-gradientButton trasnsition transition-duration-500"
                            >
                                <img src={plusDark} alt="plus button" className='shrink-0' />
                                Start New Chat
                            </button>

                            <NavLink
                                to="setting"
                                className="group flex gap-x-3 w-full rounded-md p-2 text-sm font-semibold leading-6 bg-light-gradientButton text-light-sidebar hover:bg-dark-gradientButton transition transition-duration-500"
                            >
                                <img src={settingDark} alt="setting button" />
                                Settings
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className={` ${expended ? 'lg:pl-72' : 'lg:pl-0'}`}>
                    <main className="bg-light-panel dark:bg-dark-panel w-full rounded-lg border-2 transition-all duration-400">
                        <button
                            type="button"
                            className={`p-2.5 text-gray-700 m-2 ${expended && 'lg:hidden'}`}
                            onClick={() => {
                                setSidebarOpen(true);
                                setExpended(true);
                            }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <img
                                src={darkMode ? sidebarDark : sidebar}
                                alt="sidebar-icon"
                                className="my-4 p-1 h-6 w-6 rounded-md hover:bg-slate-200 hover:dark:bg-neutral-600 cursor-pointer transition"
                            />
                        </button>
                        <Outlet />
                    </main>
                </div>

            </div>
        </>
    )
}


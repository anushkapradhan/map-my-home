import React, {Fragment, useState, useEffect} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, CalculatorIcon, ChatBubbleLeftEllipsisIcon, HeartIcon, HomeIcon, NewspaperIcon, XMarkIcon, } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';


const navigation = [
    { name: 'Explore', href: '/Explore', current: true, svg:<HomeIcon/>},
    { name: 'Favourites', href: '/Favourites', current: false, svg:<HeartIcon/> },
    { name: 'Tools', href: '/Tools', current: false, svg:<CalculatorIcon/> },
    { name: 'Blog', href: '/Blog', current: false, svg:<NewspaperIcon/> },
    { name: 'Chatbot', href: '/Chatbot', current: false, svg:<ChatBubbleLeftEllipsisIcon/> },
    { name: 'Sign-in', href: '/sign-in', current: false },
    { name: 'Sign-up', href: '/sign-up', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const [activeItem, setActiveItem] = useState(navigation.find((item) => item.current)?.name);

  const handleItemClick = (item) => {
    // Update the active item when a navigation item is clicked.
    setActiveItem(item.name);
  };

  useEffect(() => {
    const updateActiveItem = () => {
      const currentPath = window.location.pathname;
      const currentNavItem = navigation.find((item) => item.href === currentPath);
      if (currentNavItem) {
        setActiveItem(currentNavItem.name);
      }
    };

    // Update activeItem on initial load
    updateActiveItem();

    // Add a listener to update activeItem on route changes
    window.addEventListener('popstate', updateActiveItem);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('popstate', updateActiveItem);
    };
  }, []);
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-950 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-950">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <Link to={'/'} >
              <div className="hidden sm:block sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                        <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                        <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
                    </svg>
                </div>
              </div>
              
              <div className='absolute inset-y-5 start-1/2 translate-x-[-50%] sm:hidden'>
                {/* <p className='font-sans font-bold text-slate-950 '>MapMyHome</p> */}
                <span className='font-sans font-bold text-slate-500'>Map</span>
                <span className='font-sans font-bold text-slate-700'>MyHome</span>
              </div>
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.name === activeItem ? 'text-slate-950 border-b-2 border-slate-950' : 'text-slate-950 hover:bg-gray-700 hover:text-white hover:rounded-lg',
                        'flex items-center px-2 py-1 text-sm font-medium'
                      )}
                      aria-current={item.name === activeItem ? 'page' : undefined}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.name}
                      {item.name === activeItem && <svg className='h-5 w-5 ml-1'>{item.svg}</svg>}
                    </a>
                  ))}
                  </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="user_image"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/Profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/Settings"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-slate-950 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.name === activeItem ? 'bg-gray-900 text-white' : 'text-slate-950 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.name === activeItem ? 'page' : undefined}
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                  {item.name === activeItem && <svg className='h-5 w-5 ml-1'>{item.svg}</svg>}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
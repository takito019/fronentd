import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson, IoChevronDownSharp, IoBagAdd, IoBagSharp } from 'react-icons/io5';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className='bg-zinc-700 my-3 flex justify-between items-start
                        py-5 px-10 rounded-lg'>
            <Link to={
                isAuthenticated ? '/products' : '/'}
            >
                <h1 className='text-2xl font-bold'>Productos</h1>
            </Link>
            <ul className='flex gap-x-2'>
                {
                    isAuthenticated ? (
                        <>
                            <li>
                                <div className='flex mx-3 px-3'>
                                    <IoPerson size={30} /> {user.username}
                                </div>
                            </li>
                            <li>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 
                                    rounded-md bg-zinc-700 px-3 py-2 text-sm
                                    ring-1 ring-inset 
                                    ring-zinc-700 hover:bg-zinc-800">
                                            <IoBagSharp className='-mr-1 h-5 w-5' /> Productos
                                            <IoChevronDownSharp className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 
                                        w-56 origin-top-right rounded-md bg-white 
                                        shadow-lg ring-1 ring-black ring-opacity-5 
                                        focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to='/products'
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            <IoBagSharp className='h-5 w-5 inline-flex' /> Listar
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to='/add-product'
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            <IoBagAdd className='h-5 w-5 inline-flex' /> Agregar
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to='/logout'
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            <IoLogOut className='h-5 w-5 inline-flex' /> Salir
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <form method="POST" action="#">
                                                </form>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'
                                    className=' px-4 py-1 rounded-sm'>
                                    <IoLogIn size={30} /> </Link>
                            </li>
                            <li>
                                <Link to='/register'
                                    className='px-4 py-1 rounded-sm'>
                                    <IoPerson size={30} /> </Link>
                            </li>
                        </>
                    )
                }

            </ul>
        </nav>
    )
}

export default Navbar
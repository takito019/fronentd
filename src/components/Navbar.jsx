import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoPersonAdd, IoLogIn, IoAddCircle, IoLogOut, IoPerson } from 'react-icons/io5';

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
                                <Link to='/add-product'
                                    className=' px-4 py-1 rounded-sm'>
                                    <IoAddCircle size={30} /> </Link>
                            </li>
                            <li>
                                <Link to='/' onClick={() => { logout() }}
                                    className='px-4 py-1 rounded-sm' >
                                    <IoLogOut size={30} /> </Link>
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
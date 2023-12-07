import React from 'react'
import { useProducts } from '../context/ProductsContext';
import { Link } from 'react-router-dom'
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

function ProductCard({ product }) {
    const { deleteProduct } = useProducts();
    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md' >
            <header className='flex justify-between'>
                <h1 className=' text-1xl font-bold'> {product.name} </h1>
                <div className='flex gap-x-2 items-center'>
                    <button className='bg-red-500 hover:bg-red-600
                    text-white px-4 py-2 rounded-lg'
                        onClick={() => {
                            //console.log(product._id);
                            deleteProduct(product._id);
                        }}
                    >
                        <IoTrashBinSharp /> </button>

                    <Link to={'/products/' + product._id}
                        className='bg-green-500 hover:bg-green-600
                    text-white px-4 py-2 rounded-lg'>
                        <IoPencilSharp />
                    </Link >
                </div>
            </header>
            <p className='text-slate-300 my-2'>
                {product.price}
            </p>
            <p className='text-salte-300 my-2' >
                {product.year}
            </p>
            ProductCard</div>
    )
}

export default ProductCard
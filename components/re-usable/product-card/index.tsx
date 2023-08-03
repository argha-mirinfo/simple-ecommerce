import React from 'react'
import Link from 'next/link';
import { Product } from '../../../interfaces';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className=' border border-gray-300'>
            <Link href={`/product/${product.id}`}>
                <img src={product.image} alt="product-image" className='w-full h-56 object-contain' />
            </Link>
            <div className='px-2 pt-3'>
                <Link href={`/product/${product.id}`}>
                    <p className='text-sm leading-5 font-medium text-blue-500'>{product.title}</p>
                </Link>
                <p className='text-lg leading-6 font-bold text-amber-400 mt-1'>৳ {product.price}</p>
            </div>
        </div>
    )
}
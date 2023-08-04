import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { ProductWithQuantity } from '../../../interfaces';
import { decreaseProductQuantity, increaseProductQuantity, removeProduct } from '../../../store/cartSlice';

interface CartCardProps {
    product: ProductWithQuantity;
}

export const CartCard: React.FC<CartCardProps> = ({ product }) => {

    const dispatch = useDispatch()


    const handleIncreasingProductQuantity = (selectedProduct: ProductWithQuantity) => {
        dispatch(increaseProductQuantity({ productId: selectedProduct.id }))
    }

    const handleDecreasingProductQuantity = (selectedProduct: ProductWithQuantity) => {
        dispatch(decreaseProductQuantity({ productId: selectedProduct.id }))
    }

    const handleRemovingProduct = (selectedProduct: ProductWithQuantity) => {
        dispatch(removeProduct({ productId: selectedProduct.id }))
    }

    return (
        <div className='border border-gray-300 p-4 my-4'>
            <div className='flex items-center w-full'>
                <Link href={`/product/${product.id}`}>
                    <img src={product.image} alt="product-image" className='w-full h-20 object-contain' />
                </Link>
                <div className='flex justify-between items-center w-5/6 ml-5'>
                    <div>
                        <Link href={`/product/${product.id}`}>
                            <p className='text-blue-500'>{product.title}</p>
                        </Link>
                        <p>Quantity: {product.quantity}</p>
                        <div className='flex'>
                            <button className='w-1/4 bg-red-500 text-white' onClick={() => handleDecreasingProductQuantity(product)}>-</button>
                            <button className='w-1/4 bg-green-500' onClick={() => handleIncreasingProductQuantity(product)}>+</button>
                            <button className='w-1/4 bg-red-800 ml-4' onClick={() => handleRemovingProduct(product)}>X</button>
                        </div>
                    </div>

                    <div>
                        <p>{product.price * product.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

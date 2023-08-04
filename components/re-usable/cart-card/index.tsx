import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { ProductWithQuantity } from '../../../interfaces';
import { decreaseProductQuantity, increaseProductQuantity } from '../../../store/cartSlice';

interface CartCardProps {
    product: ProductWithQuantity;
}

export const CartCard: React.FC<CartCardProps> = ({ product }) => {

    const dispatch = useDispatch()


    const handleIncreasingProductQuantity = (selectedProduct: ProductWithQuantity) => {
        // dispatch(updateProductQuantity({ productId: selectedProduct.id, type: "increase" }));
        dispatch(increaseProductQuantity({ productId: selectedProduct.id }))
    }

    const handleDecreasingProductQuantity = (selectedProduct: ProductWithQuantity) => {
        // dispatch(updateProductQuantity({ productId: selectedProduct.id, type: "decrease" }));
        dispatch(decreaseProductQuantity({ productId: selectedProduct.id }))
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
                            <p>{product.title}</p>
                        </Link>
                        <p>Quantity: {product.quantity}</p>
                        <div className='flex'>
                            <button className='w-1/4 bg-red-500 text-white' onClick={() => handleDecreasingProductQuantity(product)}>-</button>
                            <button className='w-1/4 bg-green-500' onClick={() => handleIncreasingProductQuantity(product)}>+</button>
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

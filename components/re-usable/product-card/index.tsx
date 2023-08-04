import React, { useEffect, useMemo } from 'react'
import Link from 'next/link';
import { ProductWithQuantity } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { setCartArray, increaseProductQuantity, decreaseProductQuantity } from '../../../store/cartSlice';
import { RootState } from '../../../store/rootState';
import { updateProductQuantity } from '../../../store/allProductSlice';

interface ProductCardProps {
    product: ProductWithQuantity;
}

interface CartState {
    cartArray: ProductWithQuantity[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const dispatch = useDispatch()

    const { cartArray } = useSelector((state: RootState) => state.cart)

    useMemo(() => {
        console.log("cartarray", cartArray)
    }, [cartArray])

    const handleAddingProductToCart = (selectedProduct: ProductWithQuantity) => {
        dispatch(updateProductQuantity({ productId: selectedProduct.id, type: "increase" }));
        dispatch(setCartArray({ product: selectedProduct }))
    }

    const handleIncreasingProductQuantity = (selectedProduct: ProductWithQuantity) => {
        dispatch(updateProductQuantity({ productId: selectedProduct.id, type: "increase" }));
        dispatch(increaseProductQuantity({ productId: selectedProduct.id }))
    }

    const handleDecreasingProductQuantity = (selectedProduct: ProductWithQuantity) => {
        dispatch(updateProductQuantity({ productId: selectedProduct.id, type: "decrease" }));
        dispatch(decreaseProductQuantity({ productId: selectedProduct.id }))
    }

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
            {
                product.quantity === 0 ? (
                    <button className='w-full flex justify-center items-center bg-red-500 p-2' onClick={() => handleAddingProductToCart(product)}>Add to Cart</button>
                ) : (
                    <div className='flex'>
                        <button className='w-1/4 bg-red-500 text-white' onClick={() => handleDecreasingProductQuantity(product)}>-</button>
                        <p className='w-2/4 flex justify-center'>{product.quantity}</p>
                        <button className='w-1/4 bg-green-500' onClick={() => handleIncreasingProductQuantity(product)}>+</button>
                    </div>
                )
            }
        </div>
    )
}
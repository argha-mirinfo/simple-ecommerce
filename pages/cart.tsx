import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Section } from "../components"
import { Layout } from "../page-layout"
import { RootState } from "../store/rootState"
import { CartCard } from "../components"
import { setCartArrayFromLocalStorage } from "../store/cartSlice"

const CartPage = () => {

    const dispatch = useDispatch()

    const { cartArray } = useSelector((state: RootState) => state.cart)

    useEffect(() => {
        const cartArrayFromLocalStorage = JSON.parse(localStorage.getItem("cartArray") || "[]");
        dispatch(setCartArrayFromLocalStorage({ products: cartArrayFromLocalStorage }))
    }, [])

    return (
        <Layout>
            <Section>
                <div className='grid grid-cols-4'>

                    <div className="col-span-4 md:col-span-3 lg:col-span-2 ">
                        {
                            cartArray.length ? cartArray.map((product, index) => (
                                <CartCard {...{ product }} key={index} />
                            )) : (
                                <p>No products in the cart</p>
                            )
                        }
                    </div>

                </div>
            </Section>
        </Layout>
    )
}

export default CartPage
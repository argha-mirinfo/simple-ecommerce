import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Section } from "../components"
import { Layout } from "../page-layout"
import { RootState } from "../store/rootState"
import { CartCard } from "../components"

const CartPage = () => {

    const { cartArray } = useSelector((state: RootState) => state.cart)

    useEffect(() => {
        console.log("cartArray", cartArray)
    }, [cartArray])

    return (
        <Layout>
            <Section>
                <div className='grid grid-cols-4'>

                    <div className="col-span-4 md:col-span-3 lg:col-span-2 ">
                        {
                            cartArray.map((product, index) => (
                                <CartCard {...{ product }} key={index} />
                            ))
                        }
                    </div>

                </div>
            </Section>
        </Layout>
    )
}

export default CartPage
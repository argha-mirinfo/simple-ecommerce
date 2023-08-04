import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Section } from "../../components";
import { Product, ProductWithQuantity } from "../../interfaces";
import { Layout } from "../../page-layout";
import { APIDataService } from "../../service-pattern";
import { setCartArrayFromLocalStorage, setCartArrayFromIndividualProduct } from "../../store/cartSlice";
import { useRouter } from "next/router";
import Head from "next/head";


interface ProductPageProps {
    product: Product;
}

const defaultProduct: ProductWithQuantity = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {},
    quantity: 0,
};

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {

    const router = useRouter()

    const dispatch = useDispatch()
    const [component_product, set_component_product] = useState<ProductWithQuantity>(defaultProduct);
    const [productInCart, setProductInCart] = useState<ProductWithQuantity>(defaultProduct);


    useEffect(() => {
        const cartArrayFromLocalStorage = JSON.parse(localStorage.getItem("cartArray") || "[]");
        dispatch(setCartArrayFromLocalStorage({ products: cartArrayFromLocalStorage }))

        const productInCart = cartArrayFromLocalStorage.find((item: ProductWithQuantity) => item.id === product.id);
        setProductInCart(cartArrayFromLocalStorage.find((item: ProductWithQuantity) => item.id === product.id))

        set_component_product({
            ...product,
            quantity: productInCart ? productInCart.quantity : 1
        })

    }, [product])

    const handleIncrease = () => {
        set_component_product(prevState => ({ ...prevState, quantity: prevState.quantity + 1 }))
    }

    const handleDecrease = () => {
        if ((component_product.quantity ?? 1) > 1) {
            set_component_product(prevState => ({ ...prevState, quantity: prevState.quantity - 1 }))
        }
    }

    const handleAddingProductToCart = () => {
        dispatch(setCartArrayFromIndividualProduct({ product: component_product }))
        router.push("/cart")
    }

    return (
        <>
            <Head>
                <title>{component_product.title}</title>
            </Head>
            <Layout>
                <Section>
                    <div className=''>

                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
                        <div className="col-span-1">
                            <img src={component_product.image} alt="product-image" className='w-full h-56 object-contain' />
                        </div>
                        <div>
                            <p>{component_product.title}</p>
                            <p className="mt-5">{component_product.description}</p>
                            <p className="mt-5">৳ {component_product.price}</p>

                            <div className='flex mt-5'>
                                <button className='w-1/4 bg-red-500 text-white' onClick={handleDecrease}>-</button>
                                <p className='w-2/4 flex justify-center'>{component_product.quantity}</p>
                                <button className='w-1/4 bg-green-500' onClick={handleIncrease}>+</button>
                            </div>

                            <button className='w-full flex justify-center items-center bg-green-500 p-2 mt-10' onClick={handleAddingProductToCart}>{productInCart?.quantity >= 1 ? "Already Added. Add MORE!!" : "Add to Cart"}</button>
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    )
}

export default ProductPage

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const { query } = context

    let dataToBeSent = {
        product: {},
    }

    try {
        const productData = await new APIDataService().GetSingleProduct(`/products/${query.slug}`);
        dataToBeSent.product = productData.data;
    } catch (error) {
        dataToBeSent.product = {};
        console.log('product api erorr', error);
    }

    return {
        props: {
            product: dataToBeSent.product,
        }
    }

}

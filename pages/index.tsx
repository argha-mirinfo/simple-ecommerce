import type { GetServerSidePropsContext, NextPage } from 'next'
import { APIDataService } from '../service-pattern'
import { Product, ProductWithQuantity } from '../interfaces'
import { ProductCard } from '../components'
import { Section } from '../components'
import { Layout } from '../page-layout'
import { Category } from '../interfaces'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { setAllProductArray } from '../store/allProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootState'
import { setCartArrayFromLocalStorage } from '../store/cartSlice'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface HomeProps {
  allProducts: Product[];
  allCategory: Category[];
  selectedCategory: Category;
  selectedSort: Category
}

const sortOptionArray = [
  { label: "Asc", value: "asc" },
  { label: "Desc", value: "desc" }
]

const Home: NextPage<HomeProps> = ({ allProducts, allCategory, selectedCategory, selectedSort }) => {

  const dispatch = useDispatch()
  const { allProductArray } = useSelector((state: RootState) => state.allProduct)
  const router = useRouter()

  const [queryData, setQueryData] = useState({})
  const [component_selectedCategory, set_component_selectedCategory] = useState(selectedCategory)
  const [component_selectedSort, set_component_selectedSort] = useState(selectedSort)


  useEffect(() => {
    const cartArrayFromLocalStorage = JSON.parse(localStorage.getItem("cartArray") || "[]");
    dispatch(setCartArrayFromLocalStorage({ products: cartArrayFromLocalStorage }))
    const temp_allProducts = allProducts.map((product) => ({
      ...product,
      quantity: cartArrayFromLocalStorage.find((cartItem: ProductWithQuantity) => cartItem.id === product.id)?.quantity || 0,
    }));
    dispatch(setAllProductArray(temp_allProducts));
  }, [allProducts])

  const handleChangeQuery = (e: any, type: string) => {
    if (type === "category") {
      setQueryData(prevState => ({ ...prevState, category: e.value }))
      set_component_selectedCategory(e)
    } else {
      setQueryData(prevState => ({ ...prevState, sort: e?.value }))
      set_component_selectedSort(e)
    }
  }

  useEffect(() => {
    if (Object.keys(queryData).length) {
      router.push({
        pathname: "/",
        query: queryData
      })
    }
  }, [queryData])

  return (
    <>
      <Head>
        <title>E-commerce</title>
      </Head>
      <Layout>
        <Section>
          <div className='mt-5 mb-10'>
            <p>Filter by category</p>
            <Select options={allCategory} value={component_selectedCategory} onChange={(e) => handleChangeQuery(e, "category")} />
            <p>Filter by asc/desc</p>
            <Select options={sortOptionArray} value={component_selectedSort} onChange={(e) => handleChangeQuery(e, "sort")} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
            {
              allProductArray.length ? allProductArray.map((value, index) => (
                <ProductCard product={value} key={index} />
              )) : ""
            }
          </div>
        </Section>
      </Layout>
    </>
  )
}

export default Home

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const { query } = context

  let dataToBeSent = {
    allProducts: [],
    allCategory: [{ label: "All", value: "all" }],
    selectedCategory: { label: "All", value: "all" },
    selectedSort: { label: "Asc", value: "asc" },
  }

  if (query.sort) {
    dataToBeSent.selectedSort = { label: Array.isArray(query.sort) ? query.sort[0] : query.sort.toUpperCase(), value: Array.isArray(query.sort) ? query.sort[0] : query.sort }
  }

  if (query.category == undefined || query.category == "all") {
    delete query.category;
    try {
      const allProductsData = await new APIDataService().GetALLProducts(query);
      dataToBeSent.allProducts = allProductsData.data;
    } catch (error) {
      dataToBeSent.allProducts = [];
      console.log('all products api erorr', error);
    }
  } else {
    dataToBeSent.selectedCategory = { label: Array.isArray(query.category) ? query.category[0] : query.category.charAt(0).toUpperCase() + query.category.slice(1), value: Array.isArray(query.category) ? query.category[0] : query.category }
    try {
      const allProductsData = await new APIDataService().GetProductByCategory(`/products/category/${query.category}`, query);
      dataToBeSent.allProducts = allProductsData.data;
    } catch (error) {
      dataToBeSent.allProducts = [];
      console.log('products by category api erorr', error);
    }
  }

  try {
    const allCategoryData = await new APIDataService().GetALLCategory();
    dataToBeSent.allCategory.push(...allCategoryData.data.map((value: string) => ({ value: value, label: value.charAt(0).toUpperCase() + value.slice(1) })))
  } catch (error) {
    dataToBeSent.allCategory = [];
    console.log('all category api erorr', error);
  }

  return {
    props: {
      allProducts: dataToBeSent.allProducts,
      allCategory: dataToBeSent.allCategory,
      selectedCategory: dataToBeSent.selectedCategory,
      selectedSort: dataToBeSent.selectedSort
    }
  }

}

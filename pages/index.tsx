import type { NextPage } from 'next'
import { APIDataService } from '../service-pattern'
import { Product } from '../interfaces'
import { ProductCard } from '../components'
import { Section } from '../components'
import { Layout } from '../page-layout'
import { Category } from '../interfaces'
import Select from 'react-select'

interface HomeProps {
  allProducts: Product[];
  allCategory: Category[]
}

const Home: NextPage<HomeProps> = ({ allProducts, allCategory }) => {

  const sortOptionArray = [
    {label: "Ascending", value: "asc"},
    {label: "Descending", value: "desc"}
  ]

  return (
    <Layout>
      <Section>
        <div className=''>

        </div>
        <Select options={allCategory} />
        <Select options={sortOptionArray}/>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
          {
            allProducts.map((value, index) => (
              <ProductCard product={value} key={index} />
            ))
          }
        </div>
      </Section>
    </Layout>
  )
}

export default Home

export const getServerSideProps = async () => {

  let dataToBeSent = {
    allProducts: [],
    allCategory: [{label: "All", value: "all"}]
  }

  try {
    const allProductsData = await new APIDataService().GetALLProducts();
    dataToBeSent.allProducts = allProductsData.data;
  } catch (error) {
    dataToBeSent.allProducts = [];
    console.log('all products api erorr', error);
  }

  try {
    const allCategoryData = await new APIDataService().GetALLCategory();
    dataToBeSent.allCategory.push(...allCategoryData.data.map((value: string) => ({ value: value, label: value.charAt(0).toUpperCase() + value.slice(1) })))
  } catch (error) {
    dataToBeSent.allCategory = [];
    console.log('all products api erorr', error);
  }

  return {
    props: {
      allProducts: dataToBeSent.allProducts,
      allCategory: dataToBeSent.allCategory
    }
  }

}

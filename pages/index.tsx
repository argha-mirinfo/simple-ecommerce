import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { APIDataService } from '../service-pattern'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Product } from '../interfaces'
import { ProductCard } from '../components'
import { Section } from '../components'
import { Layout } from '../page-layout'

interface HomeProps {
  allProducts: Product[];
}

const Home: NextPage<HomeProps> = ({ allProducts }) => {

  console.log("allProducts", allProducts)

  return (
    <Layout>
      <Section>
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

  let allProducts = []

  try {
    const allProductsData = await new APIDataService().GetALLProducts();
    allProducts = allProductsData.data;
  } catch (error) {
    allProducts = [];
    console.log('all products api erorr', error);
  }

  return {
    props: {
      allProducts
    }
  }

}

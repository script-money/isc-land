import React from 'react'
import Layout from '../components/Layout'
import Total from '../components/Total'
import SubmitForm from '../components/SubmitForm'
import Title from '../components/Title'
import MegaCity from '../components/MegaCity'

const Main = () => {
  return (
    <Layout>
      <Title />
      <div className="flex flex-row flex-wrap py-4">
        <div className="w-full border-dotted px-2 pt-6 sm:w-1/2">
          <Total />
          <MegaCity />
        </div>
        <SubmitForm />
      </div>
    </Layout>
  )
}

export default Main

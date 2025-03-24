import React from 'react'
import Header from '../../components/Header'
import StaticData from '../../utils/Global'

const Home = () => {
  return (
    <div>
        <Header desc={StaticData.myName} />
    </div>
  )
}
export default Home
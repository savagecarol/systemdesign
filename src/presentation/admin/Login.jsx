import React from 'react'
import LoginForm from '../../components/LoginForm'

const Login = () => {
  
  return (
    <div className=" mx-auto item-center py-24">
        <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl  title-font mb-4 text-gray-900 font-extrabold">Savagecarol Admin Portal</h1>
        </div>
        <LoginForm/>
    </div>   
  )
}
export default Login
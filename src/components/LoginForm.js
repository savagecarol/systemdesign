import React  , {useState} from 'react'
import toast , {  Toaster } from 'react-hot-toast';
import { login } from '../services/FirebaseFunction';
import { useNavigate } from 'react-router-dom';




const LoginForm = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!inputs.email || !inputs.password) {
      toast.error('Please fill in all the fields');
      return;
    }
    const uuid = await login(inputs.email , inputs.password);


    if (uuid == null) {
      toast.error('Please provide correct email and password');
      return;
    }

    localStorage.setItem('uuid', uuid);
    toast.success("Successfully Logged In"  , {duration : 10000})
    navigate('/admin-panel');
  }


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));

    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        toast.error('Please enter a valid email address' , { duration: 500 });
      }
    }

    // Password validation (at least 6 characters, at least one uppercase letter, one lowercase letter, and one number)
    if (name === 'password' && value) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
      if (!passwordRegex.test(value)) {
        toast.error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number' ,  { duration: 1000 });
      }
    }
  };


  return (
    <div>
<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
  <div className="mb-5">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">email </label>
    <input 
        type="email" 
        name="email" 
        value={inputs.email || ""} 
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 " required />   
  </div>
  <div className="mb-5">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">password</label>
    <input 
        type="password" 
        name="password" 
        value={inputs.password || ""} 
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 " required />
  </div>
 
  <button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
</form>
<Toaster position='top-right' />
</div>
  )
}

export default LoginForm
import React from 'react';
import WebIcon from '../assets/icon.svg';
import { logOut } from '../services/FirebaseFunction';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import StaticData from '../utils/Global';

const Header = ({ desc }) => {
const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut(); 
      console.log('Logged out successfully');
      navigate('/login');
      toast.success("Successfully Logged Out"  , {duration : 10000})

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href={StaticData.redirectUrl} >
          <div>
            <img src={WebIcon} alt="Logo" className="w-10 h-10" />
          </div>
          <span className="ml-3 text-xl">{StaticData.companyName}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        </nav>
        
        {desc === 'logout' ? (
          <button
            onClick={handleLogOut}
            className="mr-5 text-gray-900 hover:text-gray-700 border-2 border-gray-900 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <a className="mr-5 hover:text-gray-900" href={StaticData.yotubeUrl} >{desc}</a>
        )}
      </div>
    </header>
  );
};

export default Header;

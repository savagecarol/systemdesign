import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header';
import StaticData from '../../utils/Global';
import { fetchAllDataFromCollection } from '../../services/FirebaseFunction';

const Home = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllDataFromCollection(StaticData.collectionName.subjectDb);
        if (data) {
          setDocuments(data);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);  

  return (
    <div className="container mx-auto p-4">
      <Header desc={StaticData.myName} />
      
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <NavLink
                to={`/${doc.id}`} 
                key={doc.id}
                className="bg-white border-2 border-yellow-500 border-gray-200 rounded-sm shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out hover:border-yellow-500"
              >
                <div className="p-8 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{doc.name}</h3>  
                </div>
              </NavLink>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading documents...</p>
          )}
        </div>
        <div>
          <p className="text-center text-gray-500 mt-4">Note: Click on the subject to view the chapters</p>
        </div>

        <div>
          <p className="text-gray-700 mt-8">{StaticData.companyDescription}</p>
        </div>
      </div>
    </div>
  );
  
};

export default Home;

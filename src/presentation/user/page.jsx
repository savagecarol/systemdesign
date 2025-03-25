// Page.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StaticData from '../../utils/Global';
import { fetchDataFromKey, getDocumentById, getDocumentsBySubjectAndChapter } from '../../services/FirebaseFunction';
import Header from '../../components/Header';
import TopicDetails from '../../components/TopicDetails';

const Page = () => {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTopicData, setSelectedTopicData] = useState(null);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isTopicDataLoading, setIsTopicDataLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subject = await getDocumentById(StaticData.collectionName.subjectDb, id);
        if (!subject) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        setSubjectData(subject);

        const data = await fetchDataFromKey(StaticData.collectionName.chapterDb, 'subject', id);
        if (data) {
          setDocuments(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [id]);

  const handleBoxClick = async (subject, chapter) => {
    try {
      setIsTopicDataLoading(true);
      if (selectedBoxId === chapter) {
        setSelectedTopicData(null);
        setSelectedBoxId(null);
      } else {
        const topicData = await getDocumentsBySubjectAndChapter(subject, chapter);
        console.log(topicData);
        if (topicData.length > 0) {
          setSelectedTopicData(topicData);
          setSelectedBoxId(chapter);
        } else {
          setSelectedTopicData([]);
          setSelectedBoxId(chapter);
        }
      }
    } catch (error) {
      console.error('Error fetching topic data:', error);
    } finally {
      setIsTopicDataLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto p-4">
        <Header desc={StaticData.myName} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (isError || !subjectData) {
    return (
      <div className="container mx-auto p-4">
        <Header desc={StaticData.myName} />
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold">404 - Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Header desc={StaticData.myName} />
      <div className="text-center my-6">
        <h2 className="text-3xl font-semibold text-gray-800">{subjectData.name}</h2>
      </div>

      <div className="w-full">
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <div key={doc.id}>
              <div
                className={`${
                  selectedBoxId === doc.id ? 'bg-yellow-400' : 'bg-white border-2 border-yellow-500'
                } rounded-l p-2 cursor-pointer my-4`}
                onClick={() => handleBoxClick(subjectData.id, doc.id)}
                style={{
                  transition: 'background-color 0.3s ease, padding 0.3s ease', // Smooth transition added inline
                }}
              >
                <span className="flex space-x-2 text-l font-bold text-gray-800 p-1">
                  <h2>{index + 1} .</h2>
                  <h2>{doc.name}</h2>
                </span>
              </div>

              {/* Loader while fetching topic details */}
              {isTopicDataLoading && selectedBoxId === doc.id && (
                <div className="text-center mt-4">
                  <div className="text-gray-500">Loading topic details...</div>
                </div>
              )}

              {/* Display Topic Details for selected chapter */}
              {selectedBoxId === doc.id && selectedTopicData && selectedTopicData.length > 0 && !isTopicDataLoading && (
                <ul>
                  {selectedTopicData.map((topic, topicIndex) => (
                    <li key={topicIndex}>
                      <TopicDetails topic={{ ...topic, index: topicIndex }} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No Topic available</p>
        )}
      </div>
    </div>
  );
};

export default Page;

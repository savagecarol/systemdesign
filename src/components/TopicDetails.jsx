// TopicDetails.js
import React, { useState } from 'react';
import VideoLink from './VideoLink';
import CodeViewer from './CodeViewer';

const TopicDetails = ({ topic }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(prevState => !prevState); // Toggle the visibility of code
  };

  return (
    <div className="my-4 mx-4 p-4 bg-gray-100">
      <span className="flex space-x-2 text-l font-bold text-gray-800 p-1 mb-4">
        <p>{topic.index + 1}</p>
        <p>{topic.title}</p>
      </span>

      <p>{topic.description}</p>

      <VideoLink videoLink={topic.videoLink} />

      {topic.code && topic.code !== '' && (
        <>
          <button
            className="mt-2 mb-2 px-4 py-2 bg-yellow-500 text-white rounded-l w-full"
            onClick={toggleCodeVisibility}
          >
            {isCodeVisible ? 'Close Code' : 'Show Code'}
          </button>
          {/* Show CodeViewer if isCodeVisible is true */}
          {isCodeVisible && <CodeViewer code={topic.code} />}
        </>
      )}

      {topic.pdfLink && topic.pdfLink !== '' && (
        <>
          <button
            className="mb-2 px-4 py-2 bg-yellow-500 text-white rounded-l w-full"
          >
            <a 
              href={topic.pdfLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full text-center inline-block"
            >
              Open PDF in New Tab
            </a>
          </button>
        </>
      )}
    </div>
  );
};

export default TopicDetails;

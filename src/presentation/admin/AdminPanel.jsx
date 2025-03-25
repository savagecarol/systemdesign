import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import toast, { Toaster } from 'react-hot-toast';
import { addDocumentToCollection, fetchAllDataFromCollection } from '../../services/FirebaseFunction';
import StaticData from '../../utils/Global';

const AdminPanel = () => {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState({
    subject: '',
    name: '',
    createdAt: null
  });
  const [topic, setTopic] = useState({
    chapter: '',
    subject: '',
    videoLink: '',
    code: '',
    pdfLink: '',
    createdAt: null
  });

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsData = await fetchAllDataFromCollection(StaticData.collectionName.subjectDb);
      if (subjectsData) {
        setSubjects(subjectsData);
      }
    };
    fetchSubjects();
  }, []);


  const fetchChapters = async () => {
    if (topic.subject) {
      const chaptersData = await fetchAllDataFromCollection(StaticData.collectionName.chapterDb);
      if (chaptersData) {
        const filteredChapters = [];
        for (let i = 0; i < chaptersData.length; i++) {
          const chap = chaptersData[i];
          console.log(chap);
          console.log(topic.subject);
          if (chap.subject === topic.subject) {
            filteredChapters.push(chap);
          }
        }
        setChapters(filteredChapters);
      }
    }
  };


  useEffect(() => {
    fetchChapters();
  }, [topic.subject]); 
  


  const handleSubject = async (event) => {
    event.preventDefault();

    try {
      await addDocumentToCollection(StaticData.collectionName.subjectDb, { name: subject });
      setSubject('');
      toast.success('Subject added successfully!');
    } catch (error) {
      console.error('Error adding subject: ', error);
      toast.error('Error adding subject.');
    }
  };

  const handleChapter = async (event) => {
    event.preventDefault();

    if (!chapter.subject) {
      toast.error('Please select a subject before adding a chapter.');
      return;
    }

    try {
      await addDocumentToCollection(StaticData.collectionName.chapterDb, { name: chapter.name, subject: chapter.subject, createdAt: new Date().toISOString(), });
      setChapter({ subject: '', name: '' });
      toast.success('Chapter added successfully!');
    } catch (error) {
      console.error('Error adding chapter: ', error);
      toast.error('Error adding chapter.');
    }
  };


  const handleTopic = async (event) => {
    event.preventDefault();

    if (!topic.subject || !topic.chapter) {
      toast.error('Please select both subject and chapter before adding a topic.');
      return;
    }

    try {
      await addDocumentToCollection(StaticData.collectionName.topicDb, {
        chapter: topic.chapter,
        subject: topic.subject,
        title: topic.title,
        description: topic.description,
        videoLink: topic.videoLink,
        code: topic.code,
        pdfLink: topic.pdfLink,
        createdAt: new Date().toISOString(),
      });

      setTopic({
        chapter: '',
        subject: '',
        title: '',
        description: '',
        videoLink: '',
        code: '',
        pdfLink: '',
      });
      toast.success('Topic added successfully!');
    } catch (error) {
      console.error('Error adding topic: ', error);
      toast.error('Error adding topic.');
    }
  };


  return (
    <div>
      <Header desc="logout" />
      <div className="mx-16 my-12">
        <h1 className="sm:text-3xl text-2xl title-font text-gray-900 font-extrabold">
          Add Subject
        </h1>
        <section className="my-8">
          <div>
            <form className="mx-auto" onSubmit={handleSubject}>
              <div className="mb-5">
                <input
                  type="text"
                  name="subject"
                  value={subject || ''}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="subject"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
            <Toaster position="top-right" />
          </div>
        </section>

        {/* Add Chapter Section */}
        <h1 className="sm:text-3xl text-2xl title-font text-gray-900 font-extrabold">
          Add Chapter
        </h1>
        <section className="my-8">
          <div>
            <form className="mx-auto" onSubmit={handleChapter}>
              <div className="mb-5">
                <select
                  name="subject"
                  value={chapter.subject}
                  onChange={(e) => setChapter({ ...chapter, subject: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="chapter"
                  value={chapter.name || ''}
                  onChange={(e) => setChapter({ ...chapter, name: e.target.value })}
                  placeholder="chapter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
            <Toaster position="top-right" />
          </div>
        </section>

        <h1 className="sm:text-3xl text-2xl title-font text-gray-900 font-extrabold">
          Add Topic
        </h1>
        <section className="my-8">
          <div>
            <form className="mx-auto" onSubmit={handleTopic}>
              <div className="mb-5">
                <select
                  name="subject"
                  value={topic.subject}
                  onChange={(e) => setTopic({ ...topic, subject: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <select
                  name="chapter"
                  value={topic.chapter}
                  onChange={(e) => setTopic({ ...topic, chapter: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                >
                  <option value="">Select Chapter</option>
                  {chapters.map((chap) => (
                    <option key={chap.id} value={chap.id}>
                      {chap.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="title"
                  value={topic.title || ''}
                  onChange={(e) => setTopic({ ...topic, title: e.target.value })}
                  placeholder="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                />
              </div>
              
              <div className="mb-5">
                <textarea
                  type="text"
                  name="description"
                  value={topic.description || ''}
                  onChange={(e) => setTopic({ ...topic, description: e.target.value })}
                  placeholder="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  rows="5" 
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="video link"
                  value={topic.videoLink || ''}
                  onChange={(e) => setTopic({ ...topic, videoLink: e.target.value })}
                  placeholder="video link"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="pdf link"
                  value={topic.pdfLink || ''}
                  onChange={(e) => setTopic({ ...topic, pdfLink: e.target.value })}
                  placeholder="pdf link"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                />
              </div>
              <div className="mb-5">
                <textarea
                  name="code"
                  value={topic.code || ''}
                  onChange={(e) => setTopic({ ...topic, code: e.target.value })}
                  placeholder="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-full p-2.5"
                  rows="5" 
                />
              </div>

              <button
                type="submit"
                className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
            <Toaster position="top-right" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;

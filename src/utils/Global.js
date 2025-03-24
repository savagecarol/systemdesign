const StaticData = {
    companyDescription: process.env.REACT_APP_COMPANY_DESCRIPTION,
    redirectUrl: process.env.REACT_APP_REDIRECT_URL,
    companyName: process.env.REACT_APP_COMPANY_NAME,
    myName: process.env.REACT_APP_MY_NAME,
    collectionName: {
      bannerDb: process.env.REACT_APP_COLLECTION_BANNER_DB,
      counterDb: process.env.REACT_APP_COLLECTION_COUNTER_DB,
      aboutDb: process.env.REACT_APP_COLLECTION_ABOUT_DB,
      rideDb: process.env.REACT_APP_COLLECTION_RIDE_DB,
      storyDb: process.env.REACT_APP_COLLECTION_STORY_DB
    },
    counterDocument: process.env.REACT_APP_COUNTER_DOCUMENT,
    aboutDocument: process.env.REACT_APP_ABOUT_DOCUMENT,
    bannerCustomList: [
      { url: process.env.REACT_APP_BANNER_CUSTOM_LIST_1 },
      { url: process.env.REACT_APP_BANNER_CUSTOM_LIST_2 },
      { url: process.env.REACT_APP_BANNER_CUSTOM_LIST_3 },
      { url: process.env.REACT_APP_BANNER_CUSTOM_LIST_4 }
    ],
    pending: process.env.REACT_APP_PENDING,
    accept: process.env.REACT_APP_ACCEPT,
    reject: process.env.REACT_APP_REJECT,
    telegramLink: process.env.REACT_APP_TELEGRAM_LINK
  };
  
  console.log(StaticData);
  
  export default StaticData;
  
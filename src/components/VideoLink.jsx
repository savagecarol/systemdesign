import React from 'react';

const VideoLink = ({ videoLink }) => {
  const videoIdMatch = videoLink.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  const embedLink = videoId
    ? videoLink.replace(
        'https://www.youtube.com/watch?v=',
        'https://www.youtube.com/embed/'
      ).replace('&list=', '?list=')
    : '';

  return (
    <div className="my-4">
      <div className="w-full">
        {embedLink ? (
          <iframe
            width="100%" 
            height="450" 
            src={embedLink}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p>Invalid video URL.</p>
        )}
      </div>
    </div>
  );
};

export default VideoLink;

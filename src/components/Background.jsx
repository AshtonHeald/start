import React, { useState } from 'react';

import robot from "../assets/robot.mp4";
import samurai from "../assets/samurai.mp4";
import samurai2 from "../assets/samurai2.mp4";
import samurai3 from "../assets/samurai3.mp4";

import robotThumb from "../assets/test/robot.png";
import samuraiThumb from "../assets/test/image1.jpg";
import samurai2Thumb from "../assets/test/image2.jpg";
import samurai3Thumb from "../assets/test/image3.jpg";

const Background = () => {
  // State to hold the current video
  const [currentVideo, setCurrentVideo] = useState(robot);

  // Function to change the video
  const changeVideo = (video) => {
    console.log(`Changing video to: ${video}`);  // Debug: Log which video is being set
    setCurrentVideo(video);
  };

  return (
    <div>
      <video autoPlay muted loop id="videoBG" key={currentVideo}>
        <source src={currentVideo} type="video/mp4" />
      </video>
      {/*}
      <div>
        <img
          src={robotThumb}
          alt="Robot"
          style={{ width: 100, cursor: 'pointer' }}
          onClick={() => changeVideo(robot)}
        />
        <img
          src={samuraiThumb}
          alt="Samurai"
          style={{ width: 100, cursor: 'pointer' }}
          onClick={() => changeVideo(samurai)}
        />
        <img
          src={samurai2Thumb}
          alt="Samurai2"
          style={{ width: 100, cursor: 'pointer' }}
          onClick={() => changeVideo(samurai2)}
        />
        <img
          src={samurai3Thumb}
          alt="Samurai3"
          style={{ width: 100, cursor: 'pointer' }}
          onClick={() => changeVideo(samurai3)}
        />
      </div>
  */}
    </div>
  );
};

export default Background;

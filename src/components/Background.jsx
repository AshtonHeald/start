

const Background = ({ videoUrl, autoPlay, keyProp }) => {
// keyProp is used to remount the component when autoPlay changes
  return (
    <div>
      <video autoPlay={autoPlay} muted loop id="videoBG" key={keyProp} src={videoUrl}>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;

import { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const loadPosters = async () => {
      // Import all images in the directory (eagerly)
      const posterModules = import.meta.glob('../assets/test/*.jpg', { eager: true });

      // Convert imported modules to an array of URLs
      const loadedPosters = Object.values(posterModules).map(module => module.default);
      setPosters(loadedPosters);
    };

    loadPosters();
  }, []);

  return (
    <div>
      {posters.map((src, index) => (
        <img key={index} src={src} alt={`Gallery ${index}`} style={{ width: '100px', height: '100px' }} />
      ))}
    </div>
  );
};

export default ImageGallery;

import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

export const CloudinaryComponent = () => { 
  const { store, actions } = useContext(Context);
  
  const [media, setMedia] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadMedia = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      await actions.uploadCloudinaryMedia(files);
    }
  };

  useEffect(() => {
    setMedia(store.media);
    setMediaType(store.mediaType);
    setLoading(store.loading);
  }, [store.media, store.mediaType, store.loading]);

  return (
    <div className="container">
      <h2 className="text-center my-4">Upload Media to Cloudinary</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input type="file" className="form-control" onChange={uploadMedia} />
        </div>
      </div>
      <div className="row justify-content-center my-4">
        <div className="col-md-8">
          {store.loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            store.media && (
              store.mediaType === 'image' ? (
                <img src={store.media} className="img-fluid" alt="Uploaded" />
              ) : (
                <video controls className="img-fluid">
                  <source src={store.media} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

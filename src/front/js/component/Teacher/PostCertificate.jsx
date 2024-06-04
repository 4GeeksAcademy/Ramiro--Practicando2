
import React, { useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { MdOutlineFileUpload } from "react-icons/md";

export const PostCertificate = () => {

  const { store, actions } = useContext(Context);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first');
      return;  // Salida temprana si no hay archivo seleccionado
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(process.env.BACKEND_URL + `/api/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        alert('File uploaded successfully: ' + JSON.stringify(data));
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        alert('File upload failed: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      setError('An error occurred while uploading the file');
      alert('An error occurred while uploading the file');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: '100%' }}>
      <form onSubmit={submit} className="d-flex flex-column align-items-center p-3">
        <label htmlFor="fileInput" className="fileUploader btn btn-secondary mb-3 d-flex align-items-center justify-content-center" style={{ borderRadius: '10px', width: '40%', height: '200px' }}>
          <MdOutlineFileUpload />
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="d-none"
        />
        {file && <div className="mb-3 text-center">{file.name}</div>}
        <button type="submit" className="btn btn-primary mb-3" disabled={loading} style={{ borderRadius: '10px', padding: '10px 20px' }}>
          Upload
        </button>
      </form>
      <span className="text-center">
        {loading && <p>Uploading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </span>
    </div>
  );
};





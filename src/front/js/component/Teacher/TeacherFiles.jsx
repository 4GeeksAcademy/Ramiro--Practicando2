import React, {useState, useEffect} from 'react';
import '../../../styles/components.css';


export const TeacherFiles = () => {
    const [files, setFiles] = useState([]);
    const pdfUrl = process.env.BACKEND_URL +'/api/uploads';

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(pdfUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch files');
                }
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, [pdfUrl]); 

    return (
        <div className='text-center'>
            <h5>Files:</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {files.map((file, index) => (
                    <div key={index} className="folder">
                        <a 
                            href={process.env.BACKEND_URL + `/api/uploads/${file}`} 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {file}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
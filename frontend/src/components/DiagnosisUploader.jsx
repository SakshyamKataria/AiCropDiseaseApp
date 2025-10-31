import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const DiagnosisUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [diagnosisResult, setDiagnosisReult] = ueState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if(!selectedFile)return;

        setLoading(true);

        const formData = new FormData();
        formData.append('plantImage',selectedFile);

        try{
            const response = await axios.post(
            'http://localhost:5000/api/diagnose',
            formData
            );
            setDiagnosisResult(response.data.diagnosis);
        }catch(error){
            console.error("Upload failed:", error);
        }finally{
            setLoading(false);
        }

    }

  return (
    <div>
      <input
        type="file"
        accept='image/*'
        onChange={handleFileChange}
      />

        {selectedFile && <p>Selected File: {selectedFile.name}</p>}

      <button onClick={handleUpload} disabled={loading || !selectedFile}>Upload</button>

    {
        diagnosisResult && (
            <div >
            </div>
        )
    }

    </div>
  )
}

export default DiagnosisUploader

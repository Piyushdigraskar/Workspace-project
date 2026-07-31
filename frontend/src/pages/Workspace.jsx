import { useEffect, useState } from "react";
import api from "../services/api";

import UploadButton from "../components/UploadButton";
import FileList from "../components/FileList";

function Workspace() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await api.get("/files");
      setFiles(response.data.files);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileSelect = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mb-8 text-4xl font-bold">Workspace</h1>

        <div className="mb-8">
          <UploadButton onFileSelect={handleFileSelect} />
        </div>

        <h2 className="mb-4 text-2xl font-semibold">Uploaded Files</h2>

        <FileList files={files} />
      </div>
    </div>
  );
}

export default Workspace;

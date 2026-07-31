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

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await api.post("/files/upload", formData);

      // Refresh file list
      fetchFiles();

      // Allow uploading the same file again
      event.target.value = "";

      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    }
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

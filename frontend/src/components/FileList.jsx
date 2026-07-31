import FileCard from "./FileCard";

function FileList({ files }) {
  if (files.length === 0) {
    return <p className="text-gray-500">No files uploaded yet.</p>;
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}

export default FileList;

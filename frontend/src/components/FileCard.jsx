function FileCard({ file, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
    >
      <h3 className="font-semibold">{file.filename}</h3>

      <p className="text-sm text-gray-500">{file.language}</p>
    </div>
  );
}

export default FileCard;

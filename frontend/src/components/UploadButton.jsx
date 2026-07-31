function UploadButton({ onFileSelect }) {
  return (
    <div>
      <label
        htmlFor="file-upload"
        className="inline-block cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition"
      >
        Upload File
      </label>

      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={onFileSelect}
      />
    </div>
  );
}

export default UploadButton;


import { useState } from "react";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/upload/certificate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:scale-105"
      >
        Upload Image
      </button>

      {url && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Image URL:</p>
          <a className="text-blue-500 underline" href={url} target="_blank">
            {url}
          </a>
          <img src={url} alt="certificate" className="mt-2 rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}

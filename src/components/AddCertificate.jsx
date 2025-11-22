import { useState } from "react";

export default function AddCertificate() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Upload Image
    const formData = new FormData();
    formData.append("file", file);
    const uploadRes = await fetch("http://127.0.0.1:8000/upload/certificate", {
      method: "POST",
      body: formData,
    });
    const { image_url } = await uploadRes.json();

    // 2. Save to DB
    await fetch(`http://127.0.0.1:8000/certificates/add?title=${title}&description=${description}&image_url=${image_url}`, {
      method: "POST",
    });

    alert("Certificate saved!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />

        <input
          type="text"
          placeholder="Certificate Title"
          className="border p-2 rounded w-full"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Save Certificate
        </button>
      </form>
    </div>
  );
}

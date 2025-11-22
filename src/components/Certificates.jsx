
import { useEffect, useState } from "react";

export default function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/certificates")
      .then((res) => res.json())
      .then((data) => setCerts(data));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6">
      {certs.map((cert) => (
        <div key={cert.id} className="shadow-lg rounded-lg p-4">
          <img src={cert.image_url} className="w-full h-48 object-cover rounded" />
          <h3 className="font-bold mt-2">{cert.title}</h3>
          <p className="text-sm text-gray-600">{cert.description}</p>
        </div>
      ))}
    </div>
  );
}

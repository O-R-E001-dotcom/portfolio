
export default function Toast({ message }) {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded">
      {message}
    </div>
  );
}

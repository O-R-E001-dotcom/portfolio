
export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

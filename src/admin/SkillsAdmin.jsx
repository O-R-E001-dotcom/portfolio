import { useEffect, useState } from "react";
import { getSkills, addSkill, deleteSkill } from "../api";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addSkill({
      name: e.target.name.value,
      category: e.target.category.value,
      level: e.target.level.value,
    });
    setToast("Skill added!");
    setOpen(false);
    setSkills(await getSkills());
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Skill</button>

      {skills.map((s) => (
        <div key={s.id}>
          {s.name} ({s.categpry}) ({s.level})
          <button onClick={() => deleteSkill(s.id)}>Delete</button>
        </div>
      ))}

      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleAdd} className="space-y-4 p-6">
          {/* Skill Name */}
          <input
            name="name"
            placeholder="Skill name"
            required
            className="w-full px-3 py-2 rounded bg-gray-100"
          />

          {/* Category */}
          <select
            name="category"
            required
            className="w-full px-3 py-2 rounded bg-gray-100"
          >
            <option value="">Select category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="AI">AI</option>
            <option value="Tools">Tools</option>
          </select>

          {/* Level */}
          <select
            name="level"
            required
            className="w-full px-3 py-2 rounded bg-gray-100"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Add Skill
          </button>
        </form>
      </Modal>

      {toast && <Toast message={toast} />}
    </>
  );
}

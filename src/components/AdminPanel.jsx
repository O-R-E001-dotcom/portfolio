import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const PROFICIENCY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-[#15101c] border border-white/10 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white"
            type="button"
          >
            Close
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

const parseTechStack = (value) => {
  if (!value) return [];
  try {
    const obj = JSON.parse(value);
    if (!obj || typeof obj !== 'object') return [];
    return Object.entries(obj).map(([group, items]) => ({
      group,
      items: Array.isArray(items) ? items.join(', ') : '',
    }));
  } catch {
    return [];
  }
};

const serializeTechStack = (groups) => {
  const out = {};
  groups.forEach((g) => {
    const key = g.group.trim();
    if (!key) return;
    const items = g.items
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length) out[key] = items;
  });
  return Object.keys(out).length ? JSON.stringify(out) : '';
};

export default function AdminPanel() {
  const defaultCategories = ['Frontend', 'Backend', 'AI', 'Tools', 'Other'];

  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [skills, setSkills] = useState({ items: [], page: 1, page_size: 12, total: 0 });
  const [projects, setProjects] = useState({ items: [], page: 1, page_size: 9, total: 0 });
  const [skillsPage, setSkillsPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const [editingSkill, setEditingSkill] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const [skillForm, setSkillForm] = useState({
    category: '',
    name: '',
    icon_name: '',
    proficiency_level: 'Intermediate',
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    repo_url: '',
    live_url: '',
  });
  const [projectStacks, setProjectStacks] = useState([
    { group: 'Frontend', items: '' },
    { group: 'Backend', items: '' },
    { group: 'Tools', items: '' },
  ]);
  const [projectImage, setProjectImage] = useState(null);

  const [profile, setProfile] = useState({ profile_image_url: '', cv_url: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const isAuthed = useMemo(() => Boolean(token), [token]);

  const fetchJSON = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || 'Request failed');
    }
    return res.json();
  };

  const fetchSkills = async () => {
    const data = await fetchJSON(`${API_URL}/skills?page=${skillsPage}&page_size=12`);
    setSkills(data);
  };

  const fetchProjects = async () => {
    const data = await fetchJSON(`${API_URL}/projects?page=${projectsPage}&page_size=9`);
    setProjects(data);
  };

  const fetchProfile = async () => {
    const data = await fetchJSON(`${API_URL}/profile`);
    setProfile(data || {});
  };

  const categoryOptions = useMemo(() => {
    const fromData = skills.items.map((s) => s.category).filter(Boolean);
    return [...new Set([...defaultCategories, ...fromData])];
  }, [skills.items]);

  useEffect(() => {
    if (isAuthed) {
      fetchSkills().catch((e) => toast.error(e.message));
      fetchProjects().catch((e) => toast.error(e.message));
      fetchProfile().catch((e) => toast.error(e.message));
    }
  }, [isAuthed, skillsPage, projectsPage]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      const res = await fetchJSON(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('admin_token', res.access_token);
      setToken(res.access_token);
      toast.success('Logged in');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setEmail('');
    setPassword('');
    toast.success('Logged out');
  };

  const openNewSkill = () => {
    setEditingSkill(null);
    setSkillForm({ category: '', name: '', icon_name: '', proficiency_level: 'Intermediate' });
    setSkillModalOpen(true);
  };

  const openEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      category: skill.category,
      name: skill.name,
      icon_name: skill.icon_name || '',
      proficiency_level: skill.proficiency_level || 'Intermediate',
    });
    setSkillModalOpen(true);
  };

  const submitSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await fetchJSON(`${API_URL}/skills/${editingSkill.id}`, {
          method: 'PUT',
          body: JSON.stringify(skillForm),
        });
        toast.success('Skill updated');
      } else {
        await fetchJSON(`${API_URL}/skills`, {
          method: 'POST',
          body: JSON.stringify(skillForm),
        });
        toast.success('Skill added');
      }
      setSkillModalOpen(false);
      fetchSkills();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteSkill = async (skillId) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await fetchJSON(`${API_URL}/skills/${skillId}`, { method: 'DELETE' });
      toast.success('Skill deleted');
      fetchSkills();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const openNewProject = () => {
    setEditingProject(null);
    setProjectForm({ title: '', description: '', repo_url: '', live_url: '' });
    setProjectStacks([
      { group: 'Frontend', items: '' },
      { group: 'Backend', items: '' },
      { group: 'Tools', items: '' },
    ]);
    setProjectImage(null);
    setProjectModalOpen(true);
  };

  const openEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      repo_url: project.repo_url || '',
      live_url: project.live_url || '',
    });
    const parsed = parseTechStack(project.tech_stack);
    setProjectStacks(parsed.length ? parsed : [
      { group: 'Frontend', items: '' },
      { group: 'Backend', items: '' },
      { group: 'Tools', items: '' },
    ]);
    setProjectImage(null);
    setProjectModalOpen(true);
  };

  const updateStack = (index, key, value) => {
    setProjectStacks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addStackGroup = () => {
    setProjectStacks((prev) => [...prev, { group: '', items: '' }]);
  };

  const removeStackGroup = (index) => {
    setProjectStacks((prev) => prev.filter((_, i) => i !== index));
  };

  const submitProject = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(projectForm).forEach(([k, v]) => {
        if (v !== '' && v !== null && v !== undefined) formData.append(k, v);
      });
      const techStackJson = serializeTechStack(projectStacks);
      if (techStackJson) formData.append('tech_stack', techStackJson);
      if (projectImage) formData.append('image', projectImage);

      const res = await fetch(`${API_URL}/projects${editingProject ? `/${editingProject.id}` : ''}`, {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Request failed');
      }

      toast.success(editingProject ? 'Project updated' : 'Project added');
      setProjectModalOpen(false);
      fetchProjects();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteProject = async (projectId) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetchJSON(`${API_URL}/projects/${projectId}`, { method: 'DELETE' });
      toast.success('Project deleted');
      fetchProjects();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    if (!profileImage && !cvFile) {
      toast.error('Select a new image or CV first');
      return;
    }
    setSavingProfile(true);
    try {
      const formData = new FormData();
      if (profileImage) formData.append('image', profileImage);
      if (cvFile) formData.append('cv', cvFile);

      const res = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Request failed');
      }

      const data = await res.json();
      setProfile(data || {});
      setProfileImage(null);
      setCvFile(null);
      toast.success('Profile updated');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSavingProfile(false);
    }
  };

  if (!isAuthed) {
    return (
      <div className="max-w-md mx-auto p-8 bg-[#14101b] text-white rounded-xl border border-white/10 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 p-3 rounded-lg font-bold hover:bg-pink-700 transition"
            disabled={loadingLogin}
          >
            {loadingLogin ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button onClick={logout} className="text-sm text-white/70 hover:text-white">Logout</button>
      </div>

      {/* Skills */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Skills</h3>
          <button
            onClick={openNewSkill}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Skill
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {skills.items.map((skill) => (
            <div key={skill.id} className="bg-[#1b1524] border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/70">{skill.category}</div>
                  <div className="font-semibold">{skill.name}</div>
                  <div className="text-xs text-white/60">{skill.icon_name || 'no icon'} • {skill.proficiency_level}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditSkill(skill)} className="text-sm px-3 py-1 rounded bg-white/10">Edit</button>
                  <button onClick={() => deleteSkill(skill.id)} className="text-sm px-3 py-1 rounded bg-red-600/80">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
            onClick={() => setSkillsPage(Math.max(1, skillsPage - 1))}
            disabled={skillsPage <= 1}
          >
            Prev
          </button>
          <span className="text-sm text-white/70">
            Page {skills.page} of {Math.max(1, Math.ceil(skills.total / skills.page_size))}
          </span>
          <button
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
            onClick={() => setSkillsPage(skillsPage + 1)}
            disabled={skills.page * skills.page_size >= skills.total}
          >
            Next
          </button>
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Projects</h3>
          <button
            onClick={openNewProject}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.items.map((project) => (
            <div key={project.id} className="bg-[#1b1524] border border-white/10 rounded-lg overflow-hidden">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <div className="font-semibold mb-2">{project.title}</div>
                <div className="text-sm text-white/70 line-clamp-3">{project.description}</div>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => openEditProject(project)} className="text-sm px-3 py-1 rounded bg-white/10">Edit</button>
                  <button onClick={() => deleteProject(project.id)} className="text-sm px-3 py-1 rounded bg-red-600/80">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
            onClick={() => setProjectsPage(Math.max(1, projectsPage - 1))}
            disabled={projectsPage <= 1}
          >
            Prev
          </button>
          <span className="text-sm text-white/70">
            Page {projects.page} of {Math.max(1, Math.ceil(projects.total / projects.page_size))}
          </span>
          <button
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
            onClick={() => setProjectsPage(projectsPage + 1)}
            disabled={projects.page * projects.page_size >= projects.total}
          >
            Next
          </button>
        </div>
      </section>

      <Modal
        open={skillModalOpen}
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
        onClose={() => setSkillModalOpen(false)}
      >
        <form onSubmit={submitSkill} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-white/70">Category</label>
            <select
              className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
              value={skillForm.category}
              onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
              required
            >
              <option value="" disabled>Select a category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Name"
            value={skillForm.name}
            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
            required
          />
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Icon name (optional)"
            value={skillForm.icon_name}
            onChange={(e) => setSkillForm({ ...skillForm, icon_name: e.target.value })}
          />
          <div className="space-y-2">
            <label className="text-sm text-white/70">Proficiency</label>
            <select
              className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
              value={skillForm.proficiency_level}
              onChange={(e) => setSkillForm({ ...skillForm, proficiency_level: e.target.value })}
              required
            >
              {PROFICIENCY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <button className="w-full bg-blue-600 p-3 rounded-lg">Save</button>
        </form>
      </Modal>

      <Modal
        open={projectModalOpen}
        title={editingProject ? 'Edit Project' : 'Add Project'}
        onClose={() => setProjectModalOpen(false)}
      >
        <form onSubmit={submitProject} className="space-y-4">
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Title"
            value={projectForm.title}
            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
            required
          />
          <textarea
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg h-28"
            placeholder="Description"
            value={projectForm.description}
            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
          />
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Repo URL"
            value={projectForm.repo_url}
            onChange={(e) => setProjectForm({ ...projectForm, repo_url: e.target.value })}
          />
          <input
            className="w-full p-3 bg-[#1b1524] border border-white/10 rounded-lg"
            placeholder="Live URL"
            value={projectForm.live_url}
            onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Tech Stack Groups</span>
              <button type="button" onClick={addStackGroup} className="text-xs bg-white/10 px-3 py-1 rounded">
                Add Group
              </button>
            </div>
            {projectStacks.map((group, index) => (
              <div key={`${group.group}-${index}`} className="grid md:grid-cols-5 gap-2">
                <input
                  className="md:col-span-2 p-3 bg-[#1b1524] border border-white/10 rounded-lg"
                  placeholder="Group name (e.g., UI, API, Infra)"
                  value={group.group}
                  onChange={(e) => updateStack(index, 'group', e.target.value)}
                />
                <input
                  className="md:col-span-3 p-3 bg-[#1b1524] border border-white/10 rounded-lg"
                  placeholder="Items (comma separated)"
                  value={group.items}
                  onChange={(e) => updateStack(index, 'items', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeStackGroup(index)}
                  className="md:col-span-5 text-xs text-red-300 hover:text-red-200 text-left"
                >
                  Remove group
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
          />
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setProjectModalOpen(false)} className="w-full bg-white/10 p-3 rounded-lg">
              Close
            </button>
            <button className="w-full bg-green-600 p-3 rounded-lg">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}




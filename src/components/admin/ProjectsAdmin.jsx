import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";
import toast from "react-hot-toast";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const handleSubmit = async () => {
  if (!form.title) return toast.error("Title required");

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("githubLink", form.githubLink);
    formData.append("liveLink", form.liveLink);

    if (form.image) {
      formData.append("image", form.image); // 🔥 IMPORTANT
    }

    if (editingId) {
      const res = await updateProject(editingId, formData);
      setProjects((prev) =>
        prev.map((p) => (p._id === editingId ? res.data : p))
      );
      toast.success("Project updated ✅");
    } else {
      const res = await createProject(formData);
      setProjects((prev) => [...prev, res.data]);
      toast.success("Project added 🚀");
    }

    setForm({
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
      image: null,
    });

    setEditingId(null);

  } catch {
    toast.error("Something went wrong");
  }
};

  const handleEdit = (project) => {
    setForm(project);
    setEditingId(project._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 UX upgrade
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Deleted ❌");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
<p className="text-gray-600 dark:text-gray-400 text-sm">
            Manage your portfolio projects
        </p>
      </div>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-4">
          <input
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="input-premium"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="input-premium h-32 resize-none"
          />

          <input
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={(e) =>
              setForm({ ...form, githubLink: e.target.value })
            }
            className="input-premium"
          />

          <input
            placeholder="Live Link"
            value={form.liveLink}
            onChange={(e) =>
              setForm({ ...form, liveLink: e.target.value })
            }
            className="input-premium"
          />

          {/* 🔥 FIX YOU MISSED */}
        <label className="input-premium cursor-pointer flex items-center justify-between">
  <span className="text-sm text-gray-500 dark:text-gray-400">
{form.image
  ? typeof form.image === "string"
    ? "Image selected"
    : form.image.name
  : "Choose Image"}
    </span>

  <span className="text-xs bg-green-500/20 px-2 py-1 rounded">
    Browse
  </span>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setForm({ ...form, image: e.target.files[0] })
    }
    className="hidden"
  />
</label>

          <button
            onClick={handleSubmit}
            className="btn-primary w-full"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
          <p className="text-sm text-gray-400 mb-3">Live Preview</p>

          <div className="rounded-xl overflow-hidden bg-black/10 dark:bg-black/30">
            <img
              src={
  form.image
    ? typeof form.image === "string"
      ? form.image
      : URL.createObjectURL(form.image)
    : "https://source.unsplash.com/400x250/?technology"
}
              alt="preview"
              className="w-full h-44 object-cover"
            />
          </div>

          <h3 className="mt-4 font-semibold text-lg">
            {form.title || "Project Title"}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {form.description || "Project description..."}
          </p>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="
            p-5 rounded-xl 
           bg-black/[0.03] bg-black/[0.03] dark:bg-white/5
border border-black/10 dark:border-white/10
hover:border-green-500/40
            transition flex justify-between items-center
          "
          >
            <div>
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-gray-400 line-clamp-1">
                {p.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 text-sm rounded-md bg-blue-500/10 dark:bg-blue-500/20 
hover:bg-blue-500/20 dark:hover:bg-blue-500/30"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 text-sm rounded-md bg-red-500/10 dark:bg-red-500/20 
hover:bg-red-500/20 dark:hover:bg-red-500/30 "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProjectsAdmin;
export const parseTechStack = (value) => {
  if (!value) return {};
  if (typeof value === "object" && !Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
  } catch {
    return {};
  }

  return {};
};

export const normalizeItems = (items) => {
  if (Array.isArray(items)) return items.filter(Boolean);
  if (typeof items === "string") {
    return items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

export const getProjectPath = (project) => `/project/${project.id}`;

// Presentation order for the portfolio grid. New projects added through the
// admin panel fall to the end, sorted newest first.
const FEATURED_ORDER = [
  "talyn",
  "forexgpt",
  "my-taxpal",
  "soulsync",
  "ai study architect",
  "wedding",
];

const priorityOf = (project) => {
  const title = (project?.title || "").toLowerCase();
  const index = FEATURED_ORDER.findIndex((key) => title.includes(key));
  return index === -1 ? FEATURED_ORDER.length : index;
};

export const sortProjects = (projects) =>
  [...projects].sort(
    (a, b) => priorityOf(a) - priorityOf(b) || (b.id || 0) - (a.id || 0)
  );

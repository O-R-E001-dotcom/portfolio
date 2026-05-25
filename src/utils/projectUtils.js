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

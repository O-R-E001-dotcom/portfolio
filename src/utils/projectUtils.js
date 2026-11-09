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

const TITLE_SEPARATORS = [" — ", ": ", " - "];

/**
 * Splits "My-TaxPal: AI Tax Compliance" into its name and tagline so the UI
 * can place them on separate lines instead of relying on a dash separator.
 */
export const splitProjectTitle = (title = "") => {
  const value = String(title).trim();
  if (!value) return { name: "", tagline: "" };

  for (const separator of TITLE_SEPARATORS) {
    const index = value.indexOf(separator);
    if (index !== -1) {
      return {
        name: value.slice(0, index).trim(),
        tagline: value.slice(index + separator.length).trim(),
      };
    }
  }

  return { name: value, tagline: "" };
};

// Full single-line title for document titles, alt text, and aria labels.
export const formatProjectTitle = (title = "") => {
  const { name, tagline } = splitProjectTitle(title);
  return tagline ? `${name} — ${tagline}` : name;
};

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

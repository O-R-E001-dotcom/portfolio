import { LayersIcon, NetworkIcon, ServerIcon, UserRoundIcon } from "./icons";
import { formatProjectTitle } from "../utils/projectUtils";

const GRADIENTS = [
  "from-[#1f0a2e] via-[#3b0764] to-[#172554]",
  "from-[#0b1120] via-[#1e1b4b] to-[#3b0764]",
  "from-[#111827] via-[#312e81] to-[#0c4a6e]",
  "from-[#2a0a4a] via-[#4c1d95] to-[#1e3a8a]",
];

const hashString = (value = "") => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 2147483647;
  }
  return Math.abs(hash);
};

const iconFor = (category = "") => {
  const value = category.toLowerCase();
  if (value.includes("ai") || value.includes("rag") || value.includes("agent")) {
    return <NetworkIcon size={54} />;
  }
  if (value.includes("back") || value.includes("infra")) {
    return <ServerIcon size={54} />;
  }
  if (value.includes("front") || value.includes("feature")) {
    return <LayersIcon size={54} />;
  }
  return <UserRoundIcon size={54} />;
};

/**
 * Renders the project artwork. Projects with an uploaded image use it;
 * otherwise a deterministic gradient cover is generated from the title,
 * so the grid never repeats the same stock photo.
 */
/**
 * Cloudinary serves the original upload unless transforms are requested.
 * Ask for modern formats and a capped width so cards do not download
 * multi-megabyte PNGs.
 */
const transformImage = (url, width) => {
  if (!url || !url.includes("/image/upload/")) return url;
  if (/\/image\/upload\/(?:[^/]+\/)*f_auto/.test(url)) return url;
  return url.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,c_limit,w_${width}/`
  );
};

const buildSrcSet = (url) => {
  if (!url || !url.includes("/image/upload/")) return undefined;
  return [480, 900, 1600]
    .map((value) => `${transformImage(url, value)} ${value}w`)
    .join(", ");
};

export default function ProjectCover({
  project,
  category,
  imgClassName,
  className = "",
  width = 900,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 480px",
}) {
  if (project?.image_url) {
    return (
      <img
        src={transformImage(project.image_url, width)}
        srcSet={buildSrcSet(project.image_url)}
        sizes={sizes}
        alt={formatProjectTitle(project.title)}
        loading="lazy"
        decoding="async"
        className={imgClassName || "h-full w-full object-cover"}
      />
    );
  }

  const gradient = GRADIENTS[hashString(project?.title) % GRADIENTS.length];

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-48 w-48 rounded-full bg-brand-500/20 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex flex-col items-center gap-3 text-white/60">
        {iconFor(category)}
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Case Study
        </span>
      </div>
    </div>
  );
}

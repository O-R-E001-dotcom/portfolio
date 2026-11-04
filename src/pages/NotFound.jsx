import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card text-brand-500">
          <SearchX size={28} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          That page does not exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          The link may be broken or the page may have moved. Head back to the
          portfolio to explore the work.
        </p>
        <Link to="/" className="btn btn-primary mt-8">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    </section>
  );
}

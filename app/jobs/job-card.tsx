import type { JobWithClient } from "@/app/types";

export default function JobCard({ job }: { job: JobWithClient }) {
  return (
    <a
      href={`/jobs/${job.id}`}
      className="block rounded-2xl p-6 hover:border-[#fe6e00]/40 transition"
      style={{ backgroundColor: "#ffffff", border: "1px solid #e3e0dd", boxShadow: "0 1px 3px rgba(0,0,0,0.10)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="mt-2 text-sm line-clamp-2" style={{ color: "#797067" }}>{job.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills?.split(",").map((s: string) => (
              <span
                key={s}
                className="rounded-full px-3 py-1 text-xs"
                style={{ backgroundColor: "rgba(254, 110, 0, 0.1)", color: "#fe6e00" }}
              >
                {s.trim()}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold" style={{ color: "#00c758" }}>
            ${job.budget?.toLocaleString()}
          </p>
          <p className="mt-1 text-sm" style={{ color: "#797067" }}>
            {job._count?.proposals ?? 0} proposals
          </p>
          <span
            className="mt-2 inline-block rounded-full px-3 py-1 text-xs"
            style={{ backgroundColor: "rgba(0, 199, 88, 0.2)", color: "#00c758" }}
          >
            {job.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm" style={{ color: "#797067" }}>
        <span>By {job.client.name ?? job.client.username ?? "Anonymous"}</span>
        <span>•</span>
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
    </a>
  );
}

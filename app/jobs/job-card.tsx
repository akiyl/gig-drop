import type { JobWithClient } from "@/app/types";

export default function JobCard({ job }: { job: JobWithClient }) {
  return (
    <a
      href={`/jobs/${job.id}`}
      className="block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:border-purple-500/40 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{job.title}</h3>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{job.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills?.split(",").map((s: string) => (
              <span
                key={s}
                className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
              >
                {s.trim()}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-emerald-400">
            ${job.budget?.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            {job._count?.proposals ?? 0} proposals
          </p>
          <span className="mt-2 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
            {job.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
        <span>By {job.client.name ?? job.client.username ?? "Anonymous"}</span>
        <span>•</span>
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
    </a>
  );
}

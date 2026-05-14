"use client";

import type { JobWithClient } from "@/app/types";

export default function JobDetail({ job }: { job: JobWithClient }) {
  return (
    <div>
      <a href="/jobs" className="text-sm text-purple-400 hover:underline mb-4 inline-block">
        ← Back to jobs
      </a>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold flex-1">{job.title}</h1>
          <span className="shrink-0 rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            {job.status}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
          <span>By {job.client.name ?? job.client.username ?? "Anonymous"}</span>
          <span>•</span>
          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
          {job.deadline && (
            <>
              <span>•</span>
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </>
          )}
        </div>

        <p className="mt-6 text-zinc-300 leading-relaxed">{job.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.skills?.split(",").map((s: string) => (
            <span
              key={s}
              className="rounded-full bg-purple-500/10 px-3 py-1.5 text-sm text-purple-300"
            >
              {s.trim()}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-8">
          <div>
            <p className="text-sm text-zinc-400">Budget</p>
            <p className="text-3xl font-bold text-emerald-400">${job.budget?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Proposals</p>
            <p className="text-3xl font-bold">{job._count?.proposals ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { JobWithClient } from "@/app/types";

export default function JobDetail({ job }: { job: JobWithClient }) {
  return (
    <div>
      <a href="/jobs" className="text-sm hover:underline mb-4 inline-block" style={{ color: "#fe6e00" }}>
        ← Back to jobs
      </a>
      <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)", boxShadow: "0 1px 3px rgba(0,0,0,0.30)" }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold flex-1">{job.title}</h1>
          <span className="shrink-0 rounded-full px-4 py-2 text-sm" style={{ backgroundColor: "rgba(10, 255, 181, 0.2)", color: "#0AFFB5" }}>
            {job.status}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm" style={{ color: "#6B6774" }}>
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

        <p className="mt-6 leading-relaxed" style={{ color: "#EAE6DF" }}>{job.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {job.skills?.split(",").map((s: string) => (
            <span
              key={s}
              className="rounded-full px-3 py-1.5 text-sm"
              style={{ backgroundColor: "rgba(254, 110, 0, 0.1)", color: "#fe6e00" }}
            >
              {s.trim()}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <div>
            <p className="text-sm" style={{ color: "#6B6774" }}>Budget</p>
            <p className="text-3xl font-bold" style={{ color: "#0AFFB5" }}>${job.budget?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: "#6B6774" }}>Proposals</p>
            <p className="text-3xl font-bold">{job._count?.proposals ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

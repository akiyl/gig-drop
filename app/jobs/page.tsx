import { getJobs } from "../actions/job";
import JobCard from "./job-card";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; skill?: string }>;
}) {
  const params = await searchParams;
  const jobs = await getJobs({ search: params.search, skill: params.skill });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#04040A", color: "#EAE6DF" }}>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Browse Jobs</h1>
          <a
            href="/jobs/new"
            className="rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#EAE6DF", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Post a Job
          </a>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 && (
            <p className="text-center py-20" style={{ color: "#6B6774" }}>No jobs found.</p>
          )}
          {jobs.map((job: import("../types").JobWithClient) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

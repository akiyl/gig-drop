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
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">Browse Jobs</h1>
          <a
            href="/jobs/new"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90 transition"
          >
            Post a Job
          </a>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 && (
            <p className="text-zinc-400 text-center py-20">No jobs found.</p>
          )}
          {jobs.map((job: import("../types").JobWithClient) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

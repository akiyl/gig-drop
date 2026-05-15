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
    <div className="min-h-screen" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">Browse Jobs</h1>
          <a
            href="/jobs/new"
            className="rounded-xl px-6 py-3 font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#ffffff", color: "#423d38", border: "1px solid #e3e0dd" }}
          >
            Post a Job
          </a>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 && (
            <p className="text-center py-20" style={{ color: "#797067" }}>No jobs found.</p>
          )}
          {jobs.map((job: import("../types").JobWithClient) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

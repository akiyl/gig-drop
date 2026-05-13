import { getJobById } from "../../actions/job";
import { getProposalsForJob } from "../../actions/proposal";
import JobDetail from "./job-detail";
import ProposalList from "./proposal-list";
import SubmitProposal from "./submit-proposal";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [job, proposals] = await Promise.all([
    getJobById(id),
    getProposalsForJob(id),
  ]);

  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <JobDetail job={job} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Proposals ({proposals.length})</h2>
          <ProposalList proposals={proposals} />
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold mb-6">Submit a Proposal</h2>
          <SubmitProposal jobId={job.id} />
        </div>
      </div>
    </div>
  );
}

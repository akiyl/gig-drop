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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
        <p style={{ color: "#797067" }}>Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <JobDetail job={job} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Proposals ({proposals.length})</h2>
          <ProposalList proposals={proposals} job={job} />
        </div>
        <div className="mt-12 pt-8" style={{ borderTop: "1px solid #e3e0dd" }}>
          <h2 className="text-2xl font-bold mb-6">Submit a Proposal</h2>
          <SubmitProposal jobId={job.id} />
        </div>
      </div>
    </div>
  );
}

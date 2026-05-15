type Role = "CLIENT" | "FREELANCER";
type JobStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";

export type { Role, JobStatus, ProposalStatus };

export type UserProfile = {
  id: string;
  walletAddress: string;
  username: string | null;
  name: string | null;
  bio: string | null;
  role: Role;
  skills: string | null;
  hourlyRate: number | null;
  avatarUrl: string | null;
  createdAt: Date;
};

export type JobWithClient = {
  id: string;
  title: string;
  description: string;
  skills: string | null;
  budget: number | null;
  deadline: Date | null;
  status: JobStatus;
  createdAt: Date;
  client: {
    id: string;
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
    walletAddress: string | null;
  };
  _count?: {
    proposals: number;
  };
};

export type ProposalWithFreelancer = {
  id: string;
  coverLetter: string;
  bidAmount: number;
  timeframe: number | null;
  status: ProposalStatus;
  createdAt: Date;
  freelancer: {
    id: string;
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
    hourlyRate: number | null;
  };
};

export type DashboardStats = {
  activeJobs: number;
  totalProposals: number;
  completedContracts: number;
  totalEarned: number;
};

export type WalletData = {
  balance: number;
  escrowBalance: number;
  pendingPayouts: number;
  totalAssets: number;
  transactions: TransactionItem[];
};

export type TransactionItem = {
  id: string;
  type: string;
  amount: number;
  description: string | null;
  counterpartyId: string | null;
  counterpartyName: string | null;
  createdAt: Date;
};

export type ContractWithDetails = {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string | null;
  freelancerId: string;
  freelancerName: string | null;
  amount: number;
  status: string;
  startDate: Date;
  endDate: Date | null;
};

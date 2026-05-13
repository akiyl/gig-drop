import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function FreelancersPage() {
  const freelancers = await prisma.user.findMany({
    where: { role: "FREELANCER" },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      skills: true,
      hourlyRate: true,
      createdAt: true,
      _count: { select: { proposals: true, reviewsReceived: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Browse Freelancers</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {freelancers.length === 0 && (
            <p className="text-zinc-400 col-span-full text-center py-20">
              No freelancers registered yet.
            </p>
          )}
          {freelancers.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                  {f.name?.charAt(0) ?? f.username?.charAt(0) ?? "F"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{f.name ?? f.username ?? "Anonymous"}</h3>
                  {f.hourlyRate && (
                    <p className="text-sm text-emerald-400">${f.hourlyRate}/hr</p>
                  )}
                </div>
              </div>
              {f.bio && (
                <p className="mt-4 text-sm text-zinc-400 line-clamp-3">{f.bio}</p>
              )}
              {f.skills && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {f.skills.split(",").slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                    >
                      {s.trim()}
                    </span>
                  ))}
                  {f.skills.split(",").length > 4 && (
                    <span className="text-xs text-zinc-500 self-center">
                      +{f.skills.split(",").length - 4} more
                    </span>
                  )}
                </div>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                <span>{f._count.proposals} proposals</span>
                <span>•</span>
                <span>{f._count.reviewsReceived} reviews</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen" style={{ backgroundColor: "#fcfaf7", color: "#423d38" }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-10">Browse Freelancers</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {freelancers.length === 0 && (
            <p className="col-span-full text-center py-20" style={{ color: "#797067" }}>
              No freelancers registered yet.
            </p>
          )}
          {freelancers.map((f: { id: string; name: string | null; username: string | null; bio: string | null; skills: string | null; hourlyRate: number | null; createdAt: Date; _count: { proposals: number; reviewsReceived: number } }) => (
            <div
              key={f.id}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e3e0dd", boxShadow: "0 1px 3px rgba(0,0,0,0.10)" }}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: "#fe6e00", color: "#ffffff" }}>
                  {f.name?.charAt(0) ?? f.username?.charAt(0) ?? "F"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{f.name ?? f.username ?? "Anonymous"}</h3>
                  {f.hourlyRate && (
                    <p className="text-sm" style={{ color: "#00c758" }}>${f.hourlyRate}/hr</p>
                  )}
                </div>
              </div>
              {f.bio && (
                <p className="mt-4 text-sm line-clamp-3" style={{ color: "#797067" }}>{f.bio}</p>
              )}
              {f.skills && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {f.skills.split(",").slice(0, 4).map((s: string) => (
                    <span
                      key={s}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{ backgroundColor: "rgba(254, 110, 0, 0.1)", color: "#fe6e00" }}
                    >
                      {s.trim()}
                    </span>
                  ))}
                  {f.skills.split(",").length > 4 && (
                    <span className="text-xs self-center" style={{ color: "#797067" }}>
                      +{f.skills.split(",").length - 4} more
                    </span>
                  )}
                </div>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: "#797067" }}>
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

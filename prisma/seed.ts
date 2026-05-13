import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const dummyWallets = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
];

async function main() {
  const existing = await sql`SELECT COUNT(*) FROM "User"`;
  if (existing[0].count > 0) {
    console.log("Database already has data, skipping seed.");
    return;
  }

  await sql`INSERT INTO "User" (id, "walletAddress", username, name, bio, role, skills, "hourlyRate", balance, "updatedAt") VALUES
    (gen_random_uuid()::text, ${dummyWallets[0]}, 'alex_dev', 'Alex Chen', 'Full-stack blockchain developer with 5+ years experience in Solidity, React, and TypeScript.', 'FREELANCER', 'Solidity,React,TypeScript,Node.js,Python', 85, 4500, NOW()),
    (gen_random_uuid()::text, ${dummyWallets[1]}, 'sarah_design', 'Sarah Johnson', 'UI/UX designer specialized in Web3 interfaces.', 'FREELANCER', 'Figma,UI/UX Design,Prototyping', 65, 2800, NOW()),
    (gen_random_uuid()::text, ${dummyWallets[2]}, 'mike_engineer', 'Mike Rivera', 'Smart contract auditor and backend engineer.', 'FREELANCER', 'Solidity,Auditing,Rust,Go,PostgreSQL', 120, 8200, NOW()),
    (gen_random_uuid()::text, ${dummyWallets[3]}, 'defi_labs', 'DeFi Labs', 'Building the next generation of DeFi protocols.', 'CLIENT', 'DeFi,Blockchain,Finance', NULL, 50000, NOW()),
    (gen_random_uuid()::text, ${dummyWallets[4]}, 'nft_studio', 'NFT Studio', 'Creative studio focused on NFT collections.', 'CLIENT', 'NFT,Gaming,3D Design', NULL, 25000, NOW())
  `;

  const users = await sql`SELECT id, username FROM "User" ORDER BY "createdAt"`;
  const userMap = Object.fromEntries(users.map((u: any) => [u.username, u.id]));

  const futureDate = (days: number) =>
    new Date(Date.now() + days * 86400000).toISOString();

  await sql`
    INSERT INTO "Job" (id, "clientId", title, description, skills, budget, deadline, status, "updatedAt") VALUES
    (gen_random_uuid()::text, ${userMap["defi_labs"]}, 'Build a DeFi Dashboard',
      'We need an experienced full-stack developer to build a comprehensive DeFi dashboard with portfolio analytics, yield farming opportunities, and cross-chain balances.',
      'React,TypeScript,Node.js,Web3', 12000, ${futureDate(45)}, 'OPEN', NOW()),
    (gen_random_uuid()::text, ${userMap["defi_labs"]}, 'Smart Contract Audit - Lending Protocol',
      'Looking for an experienced auditor to review our lending protocol including pools, liquidation, and oracles.',
      'Solidity,Auditing,Security', 25000, ${futureDate(30)}, 'OPEN', NOW()),
    (gen_random_uuid()::text, ${userMap["nft_studio"]}, 'NFT Marketplace Frontend',
      'Building an NFT marketplace for generative art. Need a frontend developer for gallery, bidding, and creator profiles.',
      'React,Next.js,Tailwind CSS,Web3', 8000, ${futureDate(60)}, 'OPEN', NOW()),
    (gen_random_uuid()::text, ${userMap["nft_studio"]}, '3D Artist for Metaverse Assets',
      'Looking for a 3D artist to create high-quality assets for our metaverse project.',
      'Blender,3D Modeling,glTF', 15000, ${futureDate(90)}, 'OPEN', NOW()),
    (gen_random_uuid()::text, ${userMap["defi_labs"]}, 'GraphQL API for Blockchain Indexer',
      'Build a GraphQL API that indexes on-chain events from our smart contracts.',
      'GraphQL,Node.js,PostgreSQL,The Graph', 10000, ${futureDate(40)}, 'OPEN', NOW())
  `;

  const jobs =
    await sql`SELECT id, title FROM "Job" ORDER BY "createdAt" LIMIT 5`;
  const jobIds = jobs.map((j: any) => j.id);

  const freelancerIds = [userMap["alex_dev"], userMap["sarah_design"], userMap["mike_engineer"]];

  await sql`
    INSERT INTO "Proposal" (id, "jobId", "freelancerId", "coverLetter", "bidAmount", timeframe, status, "updatedAt") VALUES
    (gen_random_uuid()::text, ${jobIds[0]}, ${freelancerIds[0]},
      'I have built several DeFi dashboards serving 10k+ daily users. Can deliver within 4 weeks.', 11000, 28, 'PENDING', NOW()),
    (gen_random_uuid()::text, ${jobIds[0]}, ${freelancerIds[1]},
      'I bring strong UX sensibilities alongside development support for this dashboard.', 9500, 35, 'PENDING', NOW()),
    (gen_random_uuid()::text, ${jobIds[1]}, ${freelancerIds[2]},
      'I have audited over 50 DeFi protocols including major lending platforms.', 22000, 21, 'PENDING', NOW()),
    (gen_random_uuid()::text, ${jobIds[1]}, ${freelancerIds[0]},
      'I have extensive Solidity experience and have completed multiple security audits.', 20000, 25, 'PENDING', NOW()),
    (gen_random_uuid()::text, ${jobIds[2]}, ${freelancerIds[1]},
      'I have designed NFT marketplace UIs for three different projects.', 7500, 30, 'PENDING', NOW())
  `;

  const userIds = (await sql`SELECT id, username FROM "User" ORDER BY "createdAt"`).map(
    (u: any) => u.id
  );

  const txDate = (daysAgo: number) =>
    new Date(Date.now() - daysAgo * 86400000).toISOString();

  await sql`
    INSERT INTO "Transaction" (id, "userId", type, amount, description, "createdAt") VALUES
    (gen_random_uuid()::text, ${userIds[0]}, 'DEPOSIT', 5000, 'Payment for DeFi Dashboard project', ${txDate(10)}),
    (gen_random_uuid()::text, ${userIds[0]}, 'WITHDRAWAL', 500, 'Withdrawn to external wallet', ${txDate(5)}),
    (gen_random_uuid()::text, ${userIds[1]}, 'DEPOSIT', 3000, 'Payment for NFT Marketplace UI', ${txDate(7)}),
    (gen_random_uuid()::text, ${userIds[1]}, 'WITHDRAWAL', 200, 'Withdrawn to external wallet', ${txDate(3)}),
    (gen_random_uuid()::text, ${userIds[2]}, 'DEPOSIT', 8500, 'Payment for Smart Contract Audit', ${txDate(14)}),
    (gen_random_uuid()::text, ${userIds[2]}, 'WITHDRAWAL', 300, 'Withdrawn to external wallet', ${txDate(2)}),
    (gen_random_uuid()::text, ${userIds[3]}, 'DEPOSIT', 50000, 'Initial funding', ${txDate(30)}),
    (gen_random_uuid()::text, ${userIds[4]}, 'DEPOSIT', 25000, 'Initial funding', ${txDate(30)})
  `;

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));

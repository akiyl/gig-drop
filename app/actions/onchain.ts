"use server";

export async function getOnChainTransactions(address: string) {
  const apiKey = process.env.ETHERSCAN_API_KEY ?? "";
  const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc${apiKey ? `&apikey=${apiKey}` : ""}`;

  try {
    const res = await fetch(url, { next: { revalidate: 15 } });
    const data = await res.json();
    if (data.status !== "1") return [];
    return data.result as any[];
  } catch {
    return [];
  }
}

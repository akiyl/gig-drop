const items = [
  "Ethereum",
  "Smart Contracts",
  "Zero Platform Fees",
  "IPFS Storage",
  "Polygon Network",
  "Crypto Payments",
  "Trustless Escrow",
  "NFT Credentials",
  "DAO Governance",
  "On-Chain Identity",
];

export default function MarqueeStrip() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-row">
        {items.map((item) => (
          <span key={item} className="mq-item">
            {item}
          </span>
        ))}
        {items.map((item) => (
          <span key={item + "-dup"} className="mq-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

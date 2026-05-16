const techs = [
  "Ethereum",
  "Polygon",
  "IPFS",
  "Chainlink",
  "The Graph",
  "WalletConnect",
];

export default function TechBar() {
  return (
    <div className="tech-bar">
      <div className="tech-inner">
        <div className="tech-label">Powered by</div>
        <div className="tech-logos">
          {techs.map((tech) => (
            <span key={tech} className="tech-name">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

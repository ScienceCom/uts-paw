export default function PesanPeringatan({ pesan }) {
  if (!pesan) return null;
  return <p role="alert" className="pesan-error">{pesan}</p>;
}
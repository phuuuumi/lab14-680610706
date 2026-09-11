import type { Registrant } from "../libs/Registrant";

const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];


export default function UserRegisterCard({
  id,
  fullName,
  plan,
  gender,
  bottle,
  shoes,
  cap,
  total
}: Registrant) {
  const planLabel = (planId: string) => {
    const selectedPlan = plans.find((p) => p.id === planId);
    if (selectedPlan) return selectedPlan.label;
  };

  return <div className="card">
    <div className="card-body">
      <div className="card-title d-flex justify-content-between gap-2">
        <h5 className="mb-0">{fullName}</h5>
        <span>{total} THB</span>
      </div>
      <div className="card-text text-muted">
        {planLabel(plan)} · {gender === "male" ? "👨 Male" : "👩 Female"}
      </div>
      <div className="mt-2 d-flex gap-1">
        {bottle && <span className="badge border p-1 text-black fw-bold"> Bottle 🍼</span>}
        {shoes && <span className="badge border p-1 text-black fw-bold"> Shoes 👟</span>}
        {cap && <span className="badge border p-1 text-black fw-bold"> Cap 🧢</span>}
      </div>
    </div>


  </div>;
}

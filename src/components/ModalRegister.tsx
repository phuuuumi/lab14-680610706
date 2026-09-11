
import { useState } from "react";
import {v4 as uuidv4 } from "uuid";
import { type Registrant } from "../libs/Registrant";
//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
  bottle: boolean;
  shoes: boolean;
  cap: boolean;
};

type Props = {
  onClose: () => void;
  onAdd: (r: Registrant) => void;
}

export default function ModalRegister({ onClose, onAdd }: Props) {
  

  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
    bottle: false,
    shoes: false,
    cap: false,
  });

  const updateForm = (key: keyof RegisterForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  })

  const registerBtnOnClick = () => {
    const updateErrors = {
      fname: form.fname === "",
      lname: form.lname === "",
      plan: form.plan === "",
      gender: form.gender === "",
    }

    setErrors(updateErrors);

    const hasError = Object.values(updateErrors).some((isError) => isError);
    if (hasError) return;

    onAdd(
      {
        id: uuidv4(),
        fullName: `${form.fname} ${form.lname}`,
        gender: form.gender,
        plan: form.plan,
        bottle: form.bottle,
        shoes: form.shoes,
        cap: form.cap,
        total: totalPayment(),
      });

    alert(
      `Registration complete. Please pay money for ${totalPayment().toLocaleString()} THB.`,
    );

    onClose();
  }


  const totalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    if (form.bottle) total += extraItems[0].price;
    if (form.shoes) total += extraItems[1].price;
    if (form.cap) total += extraItems[2].price;
    if (form.bottle && form.shoes && form.cap) total *= 0.8;
    return total;
  }

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalregisterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex gap-2">
                <div>
                  <label className="form-label">First name</label>
                  <input className={`form-control ${errors.fname ? "is-invalid" : ""}`} value={form.fname} onChange={(e) => updateForm("fname", e.target.value)} />
                  <div className="invalid-feedback">Invalid first name</div>
                </div>

                <div>
                  <label className="form-label">Last name</label>
                  <input className={`form-control ${errors.lname ? "is-invalid" : ""}`} value={form.lname} onChange={(e) => updateForm("lname", e.target.value)} />
                  <div className="invalid-feedback">Invalid last name</div>
                </div>
              </div>

              {/* PLAN */}
              <div className="mt-2">
                <label className="form-label">Plan</label>
                <select className={`form-select ${errors.plan ? "is-invalid" : ""}`} value={form.plan} onChange={(e) => updateForm("plan", e.target.value)}>
                  <option value="">Please select..</option>
                  {
                    plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} ({p.price.toLocaleString()} THB)
                      </option>
                    ))
                  }
                </select>
                <div className="invalid-feedback">Please select a Plan</div>
              </div>

              {/* GENDER */}
              <div className="mt-2">
                <label className={"form-label"}>Gender</label>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="radio"
                    checked={form.gender === "male"}
                    onChange={() => updateForm("gender", "male")}
                  />
                  Male 👨
                  <input
                    className="mx-2 form-check-input"
                    type="radio"
                    checked={form.gender === "female"}
                    onChange={() => updateForm("gender", "female")}
                  />
                  Female 👩
                </div>
                {
                  errors.gender && <div className="text-danger">Please select gender</div>
                }
              </div>


              {/* Extra Items */}
              <div>
                <label className="form-label">Extra Item(s)</label>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    onChange={() => updateForm("bottle", !form.bottle)}
                  />
                  <label className="form-check-label">
                    Bottle 🍼 (200 THB)</label>
                </div>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    onChange={() => updateForm("shoes", !form.shoes)}
                  />
                  <label className="form-check-label">Shoes 👟 (600 THB)</label>
                </div>
                <div>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    onChange={() => updateForm("cap", !form.cap)}
                  />
                  <label className="form-check-label">Cap 🧢 (400 THB)</label>
                </div>

                {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
                {form.bottle && form.cap && form.shoes && (
                  <span className="text-success d-block">(20% Discounted)</span>
                )}
              </div>

              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>

              <div>Total Payment : {totalPayment().toLocaleString()} THB</div>
            </div>

            <div className="modal-footer">
              {/* AGREEMENT */}
              <div>
                <input
                  className="me-2 
                form-check-input"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                I agreeto the terms and conditions
              </div>
              <button className="btn btn-success my-2" disabled={!agree} onClick={registerBtnOnClick}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal-backdrop fade show"></div> */}
    </>
  );
}

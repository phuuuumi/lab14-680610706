import ModalRegister from "../components/ModalRegister";
import { useState, useEffect } from "react";
import { type Registrant } from "../libs/Registrant";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const defaultRegistrants: Registrant[] = [];
  
    const STORAGE_KEY = "lab14.registrants";
  
    function loadRegistrant(): Registrant[] {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : defaultRegistrants;
      } catch {
        return defaultRegistrants;
      }
    }
  
    const [registrants, setRegistrants] = useState<Registrant[]>(loadRegistrant);

    const handleAdd = (newRegistrant : Registrant) => {
      setRegistrants([...registrants, newRegistrant]);
    }
  
    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrants));
    }, [registrants]);

  return (
    <div className="col-12 mt-4 p-0">
      <div className="container text-center">
        <h2> Wellcome To CMU Marathon</h2>
        <div>
          <img src="/marathonrun.png" alt="Logo CMU Marathon" />
        </div>
        <button
          type="button"
          className="m-4 btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Register
        </button>
      </div>

      {showModal && <ModalRegister onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </div>
  );
}

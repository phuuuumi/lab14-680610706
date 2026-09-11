// import { useEffect, useState } from "react";

import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

export default function DashboardPage() {
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

  const registrants = loadRegistrant();


  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <span className="m2">
        {
          (registrants.length === 0) ?
          "ยังไม่มีผู้ลงทะเบียน" :
          `มีผู้ลงทะเบียนแล้ว (${registrants.length}) คน`
        }
      </span>
      {/* Conditional Rendering + Render Component */}
      <div className="mb-2 d-flex flex-column gap-2 mt-2">
        {
          registrants.map((r) => <UserRegisterCard
            id = {r.id}
            fullName= {r.fullName}
            plan= {r.plan}
            gender= {r.gender}
            bottle = {r.bottle}
            shoes = {r.shoes}
            cap = {r.cap}
            total={r.total}
          />)
        }
      </div>
    </div>
  );
}

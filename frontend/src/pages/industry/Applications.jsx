import { useState } from "react";
import ApplicantCard from "../../components/industry/ApplicantCard";

const initial = [
  { id: 1, name: "Ananya Raj", degree: "B.Tech CSE", college: "ABC Engineering College", cgpa: 8.7, match: 92, status: "New", skills: ["React", "JavaScript", "SQL"] },
  { id: 2, name: "Karthik S", degree: "B.Tech IT", college: "XYZ Institute of Technology", cgpa: 8.3, match: 88, status: "New", skills: ["Python", "Power BI", "SQL"] },
  { id: 3, name: "Divya P", degree: "B.E CSE", college: "City Engineering College", cgpa: 8.9, match: 86, status: "Reviewed", skills: ["Java", "Spring Boot", "MySQL"] },
];

export default function Applications() {
  const [items, setItems] = useState(initial);
  const update = (id, status) => setItems(items.map((x) => x.id === id ? { ...x, status } : x));

  return (
    <div>
      <h2 className="text-2xl font-extrabold">Applications</h2>
      <p className="mb-6 text-slate-500">Review candidates and move them to the next hiring stage.</p>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input className="input sm:max-w-sm" placeholder="Search applicant..." />
        <select className="input sm:max-w-xs">
          <option>All Roles</option>
          <option>Frontend Developer</option>
          <option>Data Analyst Intern</option>
          <option>Java Developer</option>
        </select>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onShortlist={() => update(applicant.id, "Shortlisted")}
            onReject={() => update(applicant.id, "Rejected")}
          />
        ))}
      </div>
    </div>
  );
}

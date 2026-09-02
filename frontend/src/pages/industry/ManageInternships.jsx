import { useState } from "react";
import InternshipCard from "../../components/industry/InternshipCard";

const initial = [
  { id: 1, title: "Data Analyst Intern", stipend: "₹15,000/month", location: "Chennai", duration: "3 months", applicants: 65, status: "Active" },
  { id: 2, title: "UI/UX Intern", stipend: "₹12,000/month", location: "Remote", duration: "2 months", applicants: 49, status: "Active" },
  { id: 3, title: "Java Intern", stipend: "₹18,000/month", location: "Bengaluru", duration: "6 months", applicants: 38, status: "Active" },
];

export default function ManageInternships() {
  const [items, setItems] = useState(initial);

  return (
    <div>
      <h2 className="text-2xl font-extrabold">Manage Internships</h2>
      <p className="mb-6 text-slate-500">Track and maintain active internship opportunities.</p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((internship) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            onEdit={() => alert(`Edit ${internship.title}`)}
            onDelete={() => setItems(items.filter((x) => x.id !== internship.id))}
          />
        ))}
      </div>
    </div>
  );
}

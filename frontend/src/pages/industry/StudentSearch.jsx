import { useMemo, useState } from "react";
import StudentMatchCard from "../../components/industry/StudentMatchCard";

const students = [
  {
    id: 1,
    name: "Ananya Raj",
    degree: "B.Tech CSE",
    year: "Final Year",
    location: "Chennai",
    email: "ananya@example.com",
    match: 94,
    skills: ["React", "JavaScript", "SQL"],
  },
  {
    id: 2,
    name: "Karthik S",
    degree: "B.Tech IT",
    year: "Final Year",
    location: "Coimbatore",
    email: "karthik@example.com",
    match: 90,
    skills: ["Python", "Power BI", "SQL"],
  },
  {
    id: 3,
    name: "Meena V",
    degree: "B.E CSE",
    year: "3rd Year",
    location: "Madurai",
    email: "meena@example.com",
    match: 87,
    skills: ["Java", "Spring", "MySQL"],
  },
  {
    id: 4,
    name: "Rahul K",
    degree: "B.Tech AI & DS",
    year: "Final Year",
    location: "Chennai",
    email: "rahul@example.com",
    match: 85,
    skills: ["Python", "ML", "Pandas"],
  },
];

export default function StudentSearch() {
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    if (!query.trim()) return students;

    return students.filter((student) => {
      const q = query.toLowerCase();

      return (
        student.name.toLowerCase().includes(q) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(q)
        )
      );
    });
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Student Search</h2>
        <p className="text-slate-500">
          Find suitable candidates based on skills.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by name or skill..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.map((student) => (
          <StudentMatchCard
            key={student.id}
            student={student}
          />
        ))}
      </div>
    </div>
  );
}
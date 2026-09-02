import { useState } from "react";
import JobCard from "../../components/industry/JobCard";

const initialJobs = [
  { id: 1, title: "Frontend Developer", type: "Full Time", location: "Chennai", applicants: 42, experience: "0-2 years", status: "Active" },
  { id: 2, title: "Java Developer", type: "Full Time", location: "Bengaluru", applicants: 31, experience: "1-3 years", status: "Active" },
  { id: 3, title: "Data Analyst", type: "Full Time", location: "Hybrid", applicants: 58, experience: "0-2 years", status: "Active" },
];

export default function ManageJobs() {
  const [jobs, setJobs] = useState(initialJobs);
  const remove = (id) => setJobs(jobs.filter((j) => j.id !== id));

  return (
    <div>
      <h2 className="text-2xl font-extrabold">Manage Jobs</h2>
      <p className="mb-6 text-slate-500">Edit, track and remove published jobs.</p>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={() => alert(`Edit ${job.title}`)}
            onDelete={() => remove(job.id)}
          />
        ))}
      </div>
    </div>
  );
}

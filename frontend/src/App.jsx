import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          AI-powered career platform
        </p>
        <h1 className="text-5xl font-bold tracking-tight">SKILLORA AI</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">
          Connect student skills, learning, internships, jobs, industry needs,
          institutions and academic opportunities in one platform.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Student", "/student"],
            ["Industry", "/industry"],
            ["Institution", "/institution"],
            ["Academician", "/academician"],
          ].map(([name, path]) => (
            <Link
              key={path}
              to={path}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
            >
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="mt-2 text-sm text-slate-400">Open module →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function ModulePage({ title, items }) {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-blue-600">← Home</Link>
        <h1 className="mt-6 text-4xl font-bold">{title}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Starter page — connect this screen to the FastAPI endpoint for this feature.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/student"
        element={
          <ModulePage
            title="Student Module"
            items={[
              "Login / Register",
              "Profile",
              "Digital Portfolio",
              "AI Skill Assessment",
              "Courses / Progress",
              "Internships",
              "Job Applications",
              "Certifications / Resume / Projects Upload",
              "Breaks",
              "Daily Challenges",
            ]}
          />
        }
      />
      <Route
        path="/industry"
        element={
          <ModulePage
            title="Industry Module"
            items={[
              "Login",
              "Dashboard",
              "Recruitment / Job Description",
              "Internship Offers / Applications",
              "Assessment / Interview",
              "Faculty Training Programs",
            ]}
          />
        }
      />
      <Route
        path="/institution"
        element={
          <ModulePage
            title="Institution Module"
            items={[
              "Login",
              "Student Tracking",
              "Placement Analysis",
              "Industry Demands → Curriculum Modification",
            ]}
          />
        }
      />
      <Route
        path="/academician"
        element={
          <ModulePage
            title="Academician Module"
            items={[
              "Login",
              "Faculty Opportunities",
              "Industrial Training",
              "Research & Collaborative Projects",
            ]}
          />
        }
      />
    </Routes>
  );
}

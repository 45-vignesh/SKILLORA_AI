import { Building2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function IndustryLogin() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/industry/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <Building2 size={28} />
          </div>
          <h1 className="text-2xl font-extrabold">Industry Login</h1>
          <p className="mt-2 text-sm text-slate-500">Access jobs, internships and student talent.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Official Email</label>
            <input type="email" className="input" placeholder="hr@company.com" required />
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input type={show ? "text" : "password"} className="input pr-12" placeholder="Enter password" required />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3.5 text-slate-500">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="btn-primary w-full">Login</button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New company?{" "}
          <Link to="/industry/register" className="font-semibold text-indigo-600">Register here</Link>
        </p>
      </div>
    </div>
  );
}

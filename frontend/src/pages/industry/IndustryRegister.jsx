import { Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function IndustryRegister() {
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate("/industry/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-6 shadow-sm md:p-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-600 p-3 text-white"><Building2 /></div>
          <div>
            <h1 className="text-2xl font-extrabold">Industry Registration</h1>
            <p className="text-sm text-slate-500">Create your verified company account.</p>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label">Company Name</label>
            <input className="input" placeholder="ABC Technologies" required />
          </div>
          <div>
            <label className="label">Industry Type</label>
            <select className="input" required>
              <option value="">Select type</option>
              <option>IT / Software</option>
              <option>Manufacturing</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>
          </div>
          <div>
            <label className="label">Official Email</label>
            <input type="email" className="input" placeholder="hr@company.com" required />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" placeholder="+91 98765 43210" required />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" placeholder="https://company.com" />
          </div>
          <div>
            <label className="label">Company Size</label>
            <select className="input">
              <option>1-50</option>
              <option>51-200</option>
              <option>201-1000</option>
              <option>1000+</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="label">Head Office Address</label>
            <textarea className="input min-h-24" placeholder="Company address" required />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" required />
          </div>
          <div>
            <label className="label">Confirm Password</label>
            <input type="password" className="input" required />
          </div>
          <button className="btn-primary md:col-span-2">Create Account</button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already registered? <Link className="font-semibold text-indigo-600" to="/industry/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

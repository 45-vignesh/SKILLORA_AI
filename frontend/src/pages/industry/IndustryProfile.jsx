export default function IndustryProfile() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold">Industry Profile</h2>
        <p className="text-slate-500">Update your company information visible to students and institutions.</p>
      </div>

      <div className="card">
        <form className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label">Company Name</label>
            <input className="input" defaultValue="ABC Technologies" />
          </div>
          <div>
            <label className="label">Industry</label>
            <input className="input" defaultValue="Information Technology" />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" defaultValue="https://abctech.com" />
          </div>
          <div>
            <label className="label">HR Email</label>
            <input className="input" defaultValue="hr@abctech.com" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Company Description</label>
            <textarea className="input min-h-32" defaultValue="Technology company focused on software, analytics and digital transformation." />
          </div>
          <div className="md:col-span-2">
            <label className="label">Address</label>
            <textarea className="input min-h-24" defaultValue="Chennai, Tamil Nadu, India" />
          </div>
          <button type="button" className="btn-primary md:w-fit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

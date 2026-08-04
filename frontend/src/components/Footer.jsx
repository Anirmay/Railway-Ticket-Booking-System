import { Link } from 'react-router-dom';
import { FaTrain, FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-blue-600 px-4 py-2.5 text-white shadow-lg shadow-blue-500/10">
              <FaTrain className="text-xl" />
              <span className="text-base font-semibold">RailEase</span>
            </div>
            <p className="mt-5 max-w-sm text-slate-400 text-sm leading-relaxed">
              A student-built railway ticket booking demo delivering clear user journeys, secure auth, and an admin console for management.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              <li><Link to="/" className="transition hover:text-white">Home</Link></li>
              <li><Link to="/trains" className="transition hover:text-white">Trains</Link></li>
              <li><Link to="/about" className="transition hover:text-white">About</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="transition hover:text-white">FAQ</a></li>
              <li><a href="#" className="transition hover:text-white">Help Center</a></li>
              <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-white">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Information</h3>
            <div className="space-y-4 text-slate-400">
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-blue-400" />
                <div>
                  <p className="text-sm">support@railease.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="mt-1 text-blue-400" />
                <div>
                  <p className="text-sm">+91 83678 33266</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-blue-400" />
                <div>
                  <p className="text-sm">XYZ Institute, Computer Science Department</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-slate-500 sm:flex-row">
          <div className="text-sm">© 2026 RailEase. All Rights Reserved.</div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link to="/" className="transition hover:text-white">Software Engineering Lab Project</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-white"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-white"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

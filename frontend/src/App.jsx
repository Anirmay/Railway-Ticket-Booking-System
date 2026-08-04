import { BrowserRouter, Routes, Route, Link, NavLink, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FaTrain, FaTicketAlt, FaShieldAlt, FaChartLine, FaCalendarAlt, FaMoneyBillWave, FaClipboardList, FaSearch, FaUserCircle, FaEnvelope, FaPhone, FaHandsHelping, FaCheck, FaUsers, FaReact, FaNodeJs, FaDatabase, FaLock, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaClock, FaLifeRing, FaChevronDown, FaChevronUp, FaHistory } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import './App.css';
import Footer from './components/Footer.jsx';

const stationOptions = [
  'Delhi',
  'Mumbai',
  'Kolkata',
  'New Delhi',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Vijayawada',
  'Pune',
  'Ahmedabad',
  'Jaipur',
];

const API = 'http://localhost:5000/api';

function Layout({ children, user, logout }) {
  const location = useLocation();
  const publicRoutes = ['/', '/trains', '/about', '/contact'];
  const showFooter = publicRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <div className="flex-1">
        <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-blue-700">
              <FaTrain className="text-2xl" /> RailEase
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <NavLink to="/" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                Home
              </NavLink>
              <NavLink to="/trains" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                Trains
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                Contact
              </NavLink>
              {user && user.role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                  Admin
                </NavLink>
              )}
              {user ? (
                <>
                  <NavLink to="/bookings" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                    My Bookings
                  </NavLink>
                  <NavLink to="/dashboard" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/profile" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                    Profile
                  </NavLink>
                  <button onClick={logout} className="rounded-full bg-blue-600 px-4 py-2 text-white">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                    Login
                  </NavLink>
                  <NavLink to="/admin/login" className={({ isActive }) => `nav-link-underline text-sm font-medium transition ${isActive ? 'active text-blue-700' : 'text-slate-600 hover:text-blue-700'}`}>
                    Admin Login
                  </NavLink>
                  <NavLink to="/register" className="rounded-full bg-blue-600 px-4 py-2 text-white">Register</NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
        {children}
      </div>
      {showFooter ? <Footer /> : null}
    </div>
  );
}

function AdminLayout({ children, user, logout }) {
  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Manage Trains', path: '/admin/trains' },
    { label: 'Manage Users', path: '/admin/users' },
    { label: 'Manage Bookings', path: '/admin/bookings' },
    { label: 'Payments', path: '/admin/payments' },
    { label: 'Reports', path: '/admin/reports' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-80 shrink-0 flex-col border-r border-slate-200 bg-slate-950 text-slate-100 md:flex">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="border-b border-slate-800 px-6 py-8">
                <div className="inline-flex items-center gap-3 text-lg font-semibold text-white">
                  <FaTrain className="text-2xl" /> RailEase Admin
                </div>
                <p className="mt-3 text-sm text-slate-400">Central console for reports, trains, users, and bookings.</p>
              </div>
              <nav className="space-y-1 px-4 py-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) => `flex items-center rounded-3xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}
                  >
                    {({ isActive }) => (
                      <span className={`nav-link-underline ${isActive ? 'active' : ''} ${item.path === '/admin' ? 'text-white' : ''}`}>{item.label}</span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="border-t border-slate-800 px-6 py-6">
              <Link to="/admin/profile" className="group block rounded-3xl bg-slate-900 p-4 transition hover:bg-slate-800">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-600 p-3 text-white"><FaUserCircle /></div>
                  <div>
                    <p className="text-sm text-slate-300">Signed in as</p>
                    <p className="font-semibold text-white">{user?.name || 'Admin'}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-400 group-hover:text-white">View profile and account settings</p>
              </Link>
              <button onClick={logout} className="mt-5 w-full rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">Sign Out</button>
            </div>
          </div>
        </aside>
        <div className="flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="text-lg font-semibold text-slate-900">Admin Control Center</div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>{user?.email || 'admin@railease.com'}</span>
                <button onClick={logout} className="rounded-2xl border border-slate-300 px-3 py-2 hover:border-blue-600 hover:text-blue-700">Logout</button>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

function HomePage({ user }) {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    source: '',
    destination: '',
    date: '',
    travelClass: 'Sleeper',
    passengers: '1',
  });
  const [searchError, setSearchError] = useState('');

  const stationOptions = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'New Delhi',
    'Chennai',
    'Bengaluru',
    'Hyderabad',
    'Vijayawada',
    'Pune',
    'Ahmedabad',
    'Jaipur',
  ];

  const popularRoutes = [
    { source: 'Delhi', destination: 'Mumbai' },
    { source: 'Kolkata', destination: 'New Delhi' },
    { source: 'Chennai', destination: 'Bengaluru' },
    { source: 'Hyderabad', destination: 'Vijayawada' },
  ];

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchForm.source || !searchForm.destination || !searchForm.date || !searchForm.travelClass || !searchForm.passengers) {
      setSearchError('Please fill in all fields before searching.');
      return;
    }
    if (searchForm.source === searchForm.destination) {
      setSearchError('Source and destination must be different.');
      return;
    }
    if (searchForm.date < today) {
      setSearchError('Journey date cannot be in the past.');
      return;
    }

    setSearchError('');
    const params = new URLSearchParams({
      source: searchForm.source,
      destination: searchForm.destination,
      date: searchForm.date,
      travelClass: searchForm.travelClass,
      passengers: searchForm.passengers,
    }).toString();
    navigate(`/trains?${params}`);
  };

  const handleSwap = () => {
    setSearchForm((prev) => ({
      ...prev,
      source: prev.destination,
      destination: prev.source,
    }));
  };

  const fillRoute = (source, destination) => {
    setSearchForm((prev) => ({
      ...prev,
      source,
      destination,
    }));
  };

  return (
    <main>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm"> <FaTicketAlt /> Fast, simple railway booking</div>
            <h1 className="mb-4 text-4xl font-semibold leading-tight md:text-5xl">Book Train Tickets Online With Ease</h1>
            <p className="mb-6 max-w-xl text-base text-blue-50">Plan your journey with live seat availability, secure payments, and instant e-tickets for a smooth travel experience.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/trains" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-blue-700">Search Train</Link>
              <Link to={user ? '/dashboard' : '/register'} className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium">Get Started</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-3xl bg-white p-4 text-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Popular Route</h3>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">Trending</span>
              </div>
              <div className="space-y-2">
                {['Delhi → Mumbai', 'Bengaluru → Chennai', 'Hyderabad → Vijayawada'].map((route) => (
                  <div key={route} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3">
                    <span className="text-sm">{route}</span>
                    <span className="text-sm text-blue-700">From ₹820</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <div className="relative mt-4 mb-10 px-2 sm:px-0">
          <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white p-4 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 lg:p-5">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Search trains</p>
                <h2 className="text-xl font-semibold text-slate-900">Find the best trains for your journey</h2>
              </div>
              <div className="rounded-2xl bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">Quick route planning in one step</div>
            </div>
            <form onSubmit={handleSearch} className="grid gap-4 grid-cols-1 xl:grid-cols-[1.25fr_1.25fr_0.85fr_0.8fr_0.65fr_1fr]">
              <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-slate-700"><FaMapMarkerAlt /> Source Station</label>
                <input
                  list="station-list"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  placeholder="Enter source"
                  value={searchForm.source}
                  onChange={(e) => setSearchForm({ ...searchForm, source: e.target.value })}
                />
                <datalist id="station-list">
                  {stationOptions.map((station) => (
                    <option key={station} value={station} />
                  ))}
                </datalist>
              </div>

              <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-slate-700"><FaMapMarkerAlt /> Destination Station</label>
                <input
                  list="station-list"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  placeholder="Enter destination"
                  value={searchForm.destination}
                  onChange={(e) => setSearchForm({ ...searchForm, destination: e.target.value })}
                />
              </div>

              <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-slate-700"><FaCalendarAlt /> Journey Date</label>
                <input
                  type="date"
                  min={today}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  value={searchForm.date}
                  onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                />
              </div>

              <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-slate-700"><FaTicketAlt /> Travel Class</label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  value={searchForm.travelClass}
                  onChange={(e) => setSearchForm({ ...searchForm, travelClass: e.target.value })}
                >
                  <option value="Sleeper">Sleeper</option>
                  <option value="AC 3 Tier">AC 3 Tier</option>
                  <option value="AC 2 Tier">AC 2 Tier</option>
                  <option value="First AC">First AC</option>
                </select>
              </div>

              <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-slate-700"><FaUserCircle /> Passengers</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  value={searchForm.passengers}
                  onChange={(e) => setSearchForm({ ...searchForm, passengers: e.target.value })}
                />
              </div>

              <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-3 xl:col-span-1">
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="rounded-3xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    ⇄ Swap
                  </button>
                  <button
                    type="submit"
                    className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-2 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-sky-600"
                  >
                    Search Trains
                  </button>
                </div>
              </div>
            </form>
            {searchError ? <div className="mt-2 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700">{searchError}</div> : null}

            <div className="mt-4 rounded-3xl bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Popular Routes</h3>
                  <p className="text-[11px] text-slate-500">Tap any route to fill source and destination.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularRoutes.map((route) => (
                  <button
                    key={`${route.source}-${route.destination}`}
                    type="button"
                    onClick={() => fillRoute(route.source, route.destination)}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
                  >
                    {route.source} → {route.destination}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold">Why choose RailEase?</h2>
          <p className="mt-2 text-slate-600">Everything you need for a smooth ticket booking experience.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: <FaShieldAlt />, title: 'Easy Booking', description: 'Quick booking flow with clear steps.' },
            { icon: <FaMoneyBillWave />, title: 'Secure Payment', description: 'Trusted payment methods and instant confirmation.' },
            { icon: <FaTicketAlt />, title: 'Instant E-ticket', description: 'Download your ticket as soon as payment succeeds.' },
            { icon: <FaChartLine />, title: 'Live Availability', description: 'See seat availability before booking.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 inline-flex rounded-2xl bg-blue-100 p-2.5 text-blue-700">{item.icon}</div>
              <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function AuthForm({ type, onSubmit, error }) {
  const [form, setForm] = useState(type === 'register' ? { name: '', username: '', email: '', phone: '', password: '', confirmPassword: '' } : { username: '', password: '' });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
      <div>
        <h2 className="text-3xl font-semibold">{type === 'register' ? 'Create your account' : 'Welcome back'}</h2>
        <p className="mt-2 text-slate-600">{type === 'register' ? 'Register to book train tickets and manage trips' : 'Sign in to continue your journey'}</p>
        {type === 'register' ? <p className="mt-2 text-sm text-slate-500">Your account is stored in the demo backend file <code>backend/data/app-data.json</code>.</p> : null}
      </div>
      {error ? <div className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</div> : null}
      <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
        {type === 'register' ? (
          <>
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          </>
        ) : (
          <>
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </>
        )}
        <button className="rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white" type="submit">{type === 'register' ? 'Register' : type === 'admin' ? 'Admin Login' : 'Login'}</button>
      </form>
      {type === 'admin' ? (
        <div className="mt-4 text-sm text-slate-500">
          Use your administrator credentials here. If you are a passenger, please sign in via the regular <Link to="/login" className="text-blue-700 hover:underline">login page</Link>.
        </div>
      ) : null}
    </div>
  );
}

function RequireAdmin({ user, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;
  return children;
}

function RequireAuth({ user, children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-20 text-slate-700">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-lg">
          <p className="text-center text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }
  return children;
}

function PassengerDashboard({ user, bookings, trains }) {
  const cards = [
    { title: 'Total Bookings', value: bookings.length, icon: <FaClipboardList /> },
    { title: 'Upcoming Trips', value: bookings.filter((b) => b.status === 'confirmed').length, icon: <FaCalendarAlt /> },
    { title: 'Cancelled Tickets', value: bookings.filter((b) => b.status === 'cancelled').length, icon: <FaTicketAlt /> },
    { title: 'Total Amount Paid', value: `₹${bookings.reduce((sum, booking) => sum + booking.amount, 0)}`, icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 rounded-3xl bg-gradient-to-r from-blue-600 to-slate-800 p-8 text-white">
        <h2 className="text-3xl font-semibold">Welcome back, {user?.name}</h2>
        <p className="mt-2 text-blue-100">Manage your tickets, travels, and payments in one place.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">{card.icon}</div>
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold">Featured Trains</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {trains.slice(0, 4).map((train) => (
            <div key={train._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{train.name}</h4>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">₹{train.fare}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{train.source} → {train.destination}</p>
              <p className="text-sm text-slate-500">Departure {train.departure} • Seats {train.seatsAvailable}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchTrainPage({ trains, onBook }) {
  const location = useLocation();
  const [query, setQuery] = useState({
    source: '',
    destination: '',
    date: '',
    travelClass: 'Sleeper',
    passengers: '1',
  });
  const [filtered, setFiltered] = useState(trains);
  const [submitted, setSubmitted] = useState(false);
  const [expandedTrainId, setExpandedTrainId] = useState(null);

  const stationAddressMap = {
    Delhi: 'New Delhi Railway Station, Ajmeri Gate Road, New Delhi',
    Mumbai: 'Chhatrapati Shivaji Terminus, Dadar Station Road, Mumbai',
    Kolkata: 'Howrah Junction, Howrah, Kolkata',
    'New Delhi': 'New Delhi Railway Station, Ajmeri Gate Road, New Delhi',
    Bengaluru: 'Bengaluru City Junction, KR Market, Bengaluru',
    Chennai: 'Chennai Central, Park Town, Chennai',
    Hyderabad: 'Hyderabad Deccan Nampally, Hyderabad',
    Vijayawada: 'Vijayawada Junction, MG Road, Vijayawada',
    Pune: 'Pune Junction, Shivaji Nagar, Pune',
    Ahmedabad: 'Ahmedabad Junction, Relief Road, Ahmedabad',
    Jaipur: 'Jaipur Junction, Jaipur',
  };

  const getStationAddress = (station) => stationAddressMap[station] || `${station} Railway Station`;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('source') || '';
    const destination = params.get('destination') || '';
    const date = params.get('date') || '';
    const travelClass = params.get('travelClass') || 'Sleeper';
    const passengers = params.get('passengers') || '1';
    setQuery({ source, destination, date, travelClass, passengers });
    setSubmitted(Boolean(source || destination || date));
  }, [location.search]);

  useEffect(() => {
    const result = trains.filter((train) => {
      const sourceMatch = !query.source || train.source.toLowerCase().includes(query.source.toLowerCase());
      const destinationMatch = !query.destination || train.destination.toLowerCase().includes(query.destination.toLowerCase());
      return sourceMatch && destinationMatch;
    });
    setFiltered(result);
  }, [trains, query]);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Search Trains</h2>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={submit}>
          <div>
            <input
              className="rounded-2xl border border-slate-300 p-3 w-full"
              list="station-options"
              placeholder="Source"
              value={query.source}
              onChange={(e) => setQuery({ ...query, source: e.target.value })}
            />
          </div>
          <div>
            <input
              className="rounded-2xl border border-slate-300 p-3 w-full"
              list="station-options"
              placeholder="Destination"
              value={query.destination}
              onChange={(e) => setQuery({ ...query, destination: e.target.value })}
            />
          </div>
          <input className="rounded-2xl border border-slate-300 p-3" type="date" value={query.date} onChange={(e) => setQuery({ ...query, date: e.target.value })} />
          <div className="rounded-2xl border border-slate-300 bg-slate-50 p-3">
            <select className="w-full bg-transparent text-slate-900 outline-none" value={query.travelClass} onChange={(e) => setQuery({ ...query, travelClass: e.target.value })}>
              <option value="Sleeper">Sleeper</option>
              <option value="AC 3 Tier">AC 3 Tier</option>
              <option value="AC 2 Tier">AC 2 Tier</option>
              <option value="First AC">First AC</option>
            </select>
          </div>
          <div className="rounded-2xl border border-slate-300 bg-slate-50 p-3">
            <input className="w-full bg-transparent text-slate-900 outline-none" type="number" min="1" max="6" value={query.passengers} onChange={(e) => setQuery({ ...query, passengers: e.target.value })} placeholder="Passengers" />
          </div>
          <button className="md:col-span-3 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white" type="submit">Search</button>
        </form>
        <datalist id="station-options">
          {stationOptions.map((station) => (
            <option key={station} value={station} />
          ))}
        </datalist>
      </div>
      {submitted && filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
          No trains available for the selected route and date.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 text-sm uppercase text-slate-600">
            <tr>
              <th className="p-4">Train</th>
              <th className="p-4">Source</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Departure</th>
              <th className="p-4">Seats</th>
              <th className="p-4">Fare</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((train) => (
              <>
                <tr key={train._id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{train.name}</div>
                        <div className="text-sm text-slate-500">#{train.trainNumber}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedTrainId(expandedTrainId === train._id ? null : train._id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
                      >
                        {expandedTrainId === train._id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  </td>
                  <td className="p-4">{train.source}</td>
                  <td className="p-4">{train.destination}</td>
                  <td className="p-4">{train.departure}</td>
                  <td className="p-4">{train.seatsAvailable}</td>
                  <td className="p-4">₹{train.fare}</td>
                  <td className="p-4"><button onClick={() => onBook(train)} className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">Book</button></td>
                </tr>
                {expandedTrainId === train._id && (
                  <tr className="bg-slate-50">
                    <td colSpan={7} className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm font-semibold text-slate-900">Source Address</p>
                          <p className="mt-2 text-sm text-slate-600">{getStationAddress(train.source)}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm">
                          <p className="text-sm font-semibold text-slate-900">Destination Address</p>
                          <p className="mt-2 text-sm text-slate-600">{getStationAddress(train.destination)}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

function BookingPage({ selectedTrain, onPay }) {
  const [form, setForm] = useState({ passengerName: '', age: '', gender: 'Male', seatPreference: 'Window', seats: 1 });
  const amount = (selectedTrain?.fare || 0) * Number(form.seats || 1);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Book Ticket</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Passenger Name" value={form.passengerName} onChange={(e) => setForm({ ...form, passengerName: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <select className="rounded-2xl border border-slate-300 p-3" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option>Male</option><option>Female</option><option>Other</option></select>
            <select className="rounded-2xl border border-slate-300 p-3" value={form.seatPreference} onChange={(e) => setForm({ ...form, seatPreference: e.target.value })}><option>Window</option><option>Aisle</option><option>Middle</option></select>
            <input className="rounded-2xl border border-slate-300 p-3" type="number" min="1" max="6" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} />
            <input className="rounded-2xl border border-slate-300 p-3" type="date" />
          </div>
          <button onClick={() => onPay({ ...form, trainId: selectedTrain?._id, amount })} className="mt-6 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white">Proceed to Payment</button>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <h3 className="text-xl font-semibold">Fare Summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between"><span>Train</span><span>{selectedTrain?.name}</span></div>
            <div className="flex justify-between"><span>Seats</span><span>{form.seats}</span></div>
            <div className="flex justify-between"><span>Fare</span><span>₹{selectedTrain?.fare}</span></div>
            <div className="flex justify-between border-t border-white/20 pt-3 text-lg font-semibold"><span>Total</span><span>₹{amount}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentPage({ bookingInfo, onFinish }) {
  const [method, setMethod] = useState('UPI');
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Payment</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-3 text-slate-600">Choose your method</p>
            <div className="grid gap-3">
              {['UPI', 'Debit Card', 'Credit Card', 'Net Banking'].map((item) => (
                <button key={item} onClick={() => setMethod(item)} className={`rounded-2xl border p-3 text-left ${method === item ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200'}`}>{item}</button>
              ))}
            </div>
            <button onClick={() => onFinish(method)} className="mt-6 rounded-2xl bg-green-600 px-4 py-3 font-semibold text-white">Pay ₹{bookingInfo?.amount || 0}</button>
          </div>
          <div className="rounded-3xl bg-slate-900 p-6 text-white">
            <h3 className="text-xl font-semibold">Transaction Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span>Passenger</span><span>{bookingInfo?.passengerName}</span></div>
              <div className="flex justify-between"><span>Method</span><span>{method}</span></div>
              <div className="flex justify-between"><span>Status</span><span className="text-green-400">Success</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketPage({ booking }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">E-Ticket</h2>
            <p className="text-slate-600">Your journey details are confirmed.</p>
          </div>
          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">Payment Confirmed</div>
        </div>
        <div className="mt-8 grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex justify-between"><span>PNR</span><span className="font-semibold">{booking?.pnr || 'PNR123456'}</span></div>
            <div className="flex justify-between"><span>Passenger</span><span>{booking?.passengerName}</span></div>
            <div className="flex justify-between"><span>Train</span><span>{booking?.train?.name || 'Rajdhani Express'}</span></div>
            <div className="flex justify-between"><span>Journey Date</span><span>{booking?.journeyDate || '2026-08-20'}</span></div>
            <div className="flex justify-between"><span>Source</span><span>{booking?.train?.source || 'Delhi'}</span></div>
            <div className="flex justify-between"><span>Destination</span><span>{booking?.train?.destination || 'Mumbai'}</span></div>
            <div className="flex justify-between"><span>Coach</span><span>{booking?.coach || 'A1'}</span></div>
            <div className="flex justify-between"><span>Seat</span><span>{booking?.seatNumber || '12A'}</span></div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
            <div className="mb-3 inline-flex rounded-full bg-blue-100 p-3 text-blue-700"><FaTicketAlt /></div>
            <div className="mx-auto inline-flex h-40 w-40 items-center justify-center rounded-3xl bg-slate-100 p-3 shadow-inner">
              <QRCode
                value={JSON.stringify({
                  pnr: booking?.pnr || 'PNR123456',
                  passenger: booking?.passengerName || 'John Doe',
                  train: booking?.train?.name || 'Rajdhani Express',
                  date: booking?.journeyDate || '2026-08-20',
                  source: booking?.train?.source || 'Delhi',
                  destination: booking?.train?.destination || 'Mumbai',
                  seat: booking?.seatNumber || '12A',
                })}
                bgColor="#ffffff"
                fgColor="#0f172a"
                size={160}
              />
            </div>
            <p className="mt-3 text-sm text-slate-500">Scan to verify your ticket</p>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button className="rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white">Download Ticket</button>
          <button className="rounded-2xl border border-slate-300 px-4 py-3 font-semibold">Print Ticket</button>
        </div>
      </div>
    </div>
  );
}

function MyBookingsPage({ bookings, onCancel }) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">My Bookings</h2>
            <p className="mt-2 text-slate-600">Review your reservations and cancel any ticket if needed.</p>
          </div>
          <button onClick={() => navigate('/history')} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            <FaHistory className="text-base" />
            View History Page
          </button>
        </div>
      </div>
      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">No bookings yet. Search trains and reserve your next journey.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{booking.trainName}</h3>
                    <p className="mt-1 text-slate-600">{booking.source} → {booking.destination}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">{booking.status}</div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">PNR</p>
                    <p>{booking.pnr}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Date</p>
                    <p>{booking.journeyDate}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Seats</p>
                    <p>{booking.seats}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Amount</p>
                    <p>₹{booking.amount}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <div className="text-sm text-slate-500">Booked on {new Date(booking.createdAt).toLocaleDateString()}</div>
                  <button onClick={() => onCancel(booking._id)} disabled={booking.status === 'cancelled'} className="rounded-2xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300">Cancel Ticket</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-700"><FaHistory /></div>
              <div>
                <h3 className="text-lg font-semibold">Booking History</h3>
                <p className="text-sm text-slate-500">Quick overview of your past activity.</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total Bookings</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{bookings.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Confirmed</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{bookings.filter((booking) => booking.status === 'confirmed').length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Cancelled</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{bookings.filter((booking) => booking.status === 'cancelled').length}</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function BookingHistoryPage({ bookings, onCancel }) {
  const totalAmount = bookings.reduce((sum, booking) => sum + Number(booking.amount || 0), 0);
  const confirmedCount = bookings.filter((booking) => booking.status === 'confirmed').length;
  const cancelledCount = bookings.filter((booking) => booking.status === 'cancelled').length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Booking History</h2>
            <p className="mt-2 text-slate-600">A detailed history of your ride bookings, payments, and status updates.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
            <FaHistory /> Full overview
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Bookings</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{bookings.length}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Confirmed</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{confirmedCount}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Cancelled</p>
          <p className="mt-4 text-3xl font-bold text-slate-900">{cancelledCount}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 text-sm uppercase text-slate-600">
            <tr>
              <th className="p-4">Train</th>
              <th className="p-4">Route</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="p-4 font-semibold text-slate-900">{booking.trainName}</td>
                <td className="p-4 text-slate-600">{booking.source} → {booking.destination}</td>
                <td className="p-4 text-slate-600">{booking.journeyDate}</td>
                <td className="p-4 text-slate-600">{booking.status}</td>
                <td className="p-4 text-slate-900">₹{booking.amount}</td>
                <td className="p-4">
                  <button onClick={() => onCancel(booking._id)} disabled={booking.status === 'cancelled'} className="rounded-full bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Total spent on bookings</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">₹{totalAmount}</p>
          </div>
          <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">Manage and review your travel history all in one place.</div>
        </div>
      </div>
    </div>
  );
}

function LogoutConfirmModal({ open, onClose, onConfirm }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl transition-transform duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <h3 className="text-2xl font-semibold">Confirm Logout</h3>
        <p className="mt-3 text-slate-600">Logging out will end your current session. Are you sure you want to continue?</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button onClick={onClose} className="rounded-2xl border border-slate-300 px-4 py-3 text-slate-700">Cancel</button>
          <button onClick={onConfirm} className="rounded-2xl bg-blue-600 px-4 py-3 text-white">Logout</button>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h2 className="text-6xl font-semibold text-slate-900">404</h2>
      <p className="mt-4 text-slate-600">Sorry, the page you are looking for cannot be found.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-blue-600 px-6 py-3 text-white">Return Home</Link>
    </div>
  );
}

function LoginRequiredModal({ open, onClose, onLogin }) {
  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-blue-600/10 text-blue-700 flex items-center justify-center text-2xl">!</div>
        <h3 className="mb-2 text-2xl font-semibold text-slate-900">Login Required</h3>
        <p className="mb-6 text-slate-600">You need to login before booking a ticket. Please sign in to continue with your reservation.</p>
        <div className="flex flex-col gap-3">
          <button onClick={onLogin} className="rounded-2xl bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700">Go to Login</button>
          <button onClick={onClose} className="rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 transition hover:bg-slate-100">Maybe Later</button>
        </div>
      </div>
    </div>
  );
}

function TopSuccessToast({ message }) {
  return (
    <div className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4 transition-transform duration-500 ${message ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-xl rounded-b-3xl bg-emerald-600 px-6 py-4 text-white shadow-2xl">
        <p className="text-center text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

function ProfilePage({ user, onUpdate }) {
  const [form, setForm] = useState({ name: user?.name || '', username: user?.username || '', email: user?.email || '', phone: user?.phone || '', password: '' });
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoFill, setAutoFill] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '',
    });
  }, [user]);

  const handleSave = async () => {
    const payload = { ...form };
    if (!payload.password) delete payload.password;
    await onUpdate(payload);
    setSaveStatus('Profile saved successfully.');
    window.setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '',
    });
    setSaveStatus('Changes discarded.');
    window.setTimeout(() => setSaveStatus(''), 3000);
  };

  const loyaltyLevel = user?.role === 'admin' ? 'RailEase Admin' : 'Premium Traveller';
  const memberSince = user?._id ? new Date(user._id.toString().slice(0, 8) * 1000).toLocaleDateString() : 'Unknown';

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Your Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back, {user?.name || 'Traveller'}</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">Manage your profile, booking preferences, security settings, and travel history from one central place.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 shadow-inner">
            <div className="font-semibold text-slate-900">Account status</div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-xs uppercase text-slate-500">Bookings</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{user?.bookings?.length ?? '—'}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-xs uppercase text-slate-500">Reward level</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{loyaltyLevel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-4xl text-white">{user?.name?.[0] ?? 'U'}</div>
              <div>
                <p className="text-xl font-semibold text-slate-900">{user?.name || 'Guest User'}</p>
                <p className="text-sm text-slate-500">{user?.email || 'no-email@railease.com'}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Username</span>
                <span className="font-medium text-slate-900">{user?.username || 'unknown'}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Phone</span>
                <span className="font-medium text-slate-900">{user?.phone || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Member since</span>
                <span className="font-medium text-slate-900">{memberSince}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <label className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                <span>Receive email updates</span>
                <input type="checkbox" checked={notifyEmail} onChange={() => setNotifyEmail((prev) => !prev)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                <span>SMS alerts for journeys</span>
                <input type="checkbox" checked={notifySms} onChange={() => setNotifySms((prev) => !prev)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                <span>Auto-complete passenger details</span>
                <input type="checkbox" checked={autoFill} onChange={() => setAutoFill((prev) => !prev)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-3xl bg-slate-50 px-4 py-4">
                <span>Dark mode</span>
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode((prev) => !prev)} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-rose-900">Danger Zone</h2>
            <p className="mt-3 text-sm text-rose-700">Deleting your account will remove your profile and booking history from this demo project.</p>
            <button onClick={() => setDeleteOpen(true)} className="mt-5 w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-700">Delete account</button>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Personal information</h2>
                <p className="mt-2 text-sm text-slate-600">Update your name, contact details, and account security in one place.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={handleCancel} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSave} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Save changes</button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <input className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" />
                <label className="block text-sm font-medium text-slate-700">Email address</label>
                <input className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" />
                <label className="block text-sm font-medium text-slate-700">Phone number</label>
                <input className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
              </div>
              <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <div>
                  <p className="text-sm font-medium text-slate-700">Security</p>
                  <p className="mt-2 text-sm text-slate-500">Change your password and keep your account secure.</p>
                </div>
                <label className="block text-sm font-medium text-slate-700">New password</label>
                <input className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to keep current password" />
                <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
                  <p className="font-semibold text-slate-900">Password strength</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full ${form.password.length > 8 ? 'w-4/5 bg-emerald-500' : form.password.length > 4 ? 'w-1/2 bg-amber-400' : 'w-1/4 bg-rose-500'}`} />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Use at least 8 characters with numbers and letters for best security.</p>
                </div>
              </div>
            </div>
            {saveStatus ? <p className="mt-4 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{saveStatus}</p> : null}
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Latest travel summary</h3>
                  <p className="mt-2 text-sm text-slate-600">Quick insight into your recent journeys and status.</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Active</span>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Next departure</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">Delhi → Mumbai</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Upcoming tickets</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Travel credits</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">₹450</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Recent bookings</h3>
              <p className="mt-2 text-sm text-slate-600">Review your latest journey snapshots.</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">PNR: 4582-91</p>
                  <p className="mt-2 font-semibold text-slate-900">Kolkata → New Delhi • 12 Aug</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">PNR: 7391-06</p>
                  <p className="mt-2 font-semibold text-slate-900">Hyderabad → Vijayawada • 27 Sep</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {deleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-rose-700">Confirm account deletion</h2>
            <p className="mt-4 text-sm text-slate-600">This action cannot be undone. Your profile settings and demo data will be removed from the current session.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={() => setDeleteOpen(false)} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Keep account</button>
              <button onClick={() => {
                setDeleteOpen(false);
                setSaveStatus('Account deletion request sent.');
              }} className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-700">Delete account</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="bg-white">
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/70 to-slate-900/60" />
        <div className="relative mx-auto max-w-7xl px-6 py-28" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517949908111-3a5f0f9dfb10?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b8f2d4c6d1a5e2f')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-extrabold">About RailEase</h1>
            <p className="mt-4 text-lg text-blue-100">A modern, student-built railway booking demo focused on clarity, UX, and end-to-end functionality — perfect for a Software Engineering showcase.</p>
            <div className="mt-8 flex gap-4">
              <Link to="/trains" className="rounded-full bg-white/90 px-6 py-3 font-semibold text-slate-900 shadow hover:scale-105 transition">Book Your Journey</Link>
              <Link to="/contact" className="rounded-full border border-white/30 px-6 py-3 text-white hover:bg-white/10 transition">Contact Support</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[{icon:<FaSearch/>,title:'Easy Train Booking',desc:'Search and reserve seats in a few clicks.'},{icon:<FaLock/>,title:'Secure Payment',desc:'Simulated secure payments with clear flow.'},{icon:<FaTicketAlt/>,title:'Instant E-Ticket',desc:'Downloadable e-tickets immediately after payment.'},{icon:<FaChartLine/>,title:'Live Seat Availability',desc:'See seats available before booking.'}].map((f)=> (
            <div key={f.title} className="transform rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
              <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 p-3 text-blue-600">{f.icon}</div>
              <h4 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow">
            <h3 className="text-xl font-semibold text-slate-900">Mission</h3>
            <p className="mt-3 text-slate-600">To teach practical full-stack development by building a friendly, production-like demo with real-world UX patterns.</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow">
            <h3 className="text-xl font-semibold text-slate-900">Vision</h3>
            <p className="mt-3 text-slate-600">To make learning web engineering approachable through hands-on projects that follow industry best practices.</p>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold text-slate-900">Why Choose RailEase?</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {['Fast Booking','Secure by design','Clear UI','Educational demo'].map((t)=> (
              <div key={t} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <div className="rounded-full bg-emerald-50 p-2 text-emerald-600"><FaCheck /></div>
                <div>
                  <div className="font-semibold text-slate-900">{t}</div>
                  <div className="text-sm text-slate-600">Reliable and easy to use for students and reviewers.</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 text-center shadow">
            <div className="text-3xl font-bold text-slate-900">100+</div>
            <div className="text-sm text-slate-600">Trains</div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow">
            <div className="text-3xl font-bold text-slate-900">500+</div>
            <div className="text-sm text-slate-600">Daily Bookings</div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow">
            <div className="text-3xl font-bold text-slate-900">99%</div>
            <div className="text-sm text-slate-600">Secure Transactions</div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-center shadow">
            <div className="text-3xl font-bold text-slate-900">24×7</div>
            <div className="text-sm text-slate-600">Support</div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-gradient-to-r from-blue-50 to-white p-8 shadow">
          <h3 className="text-xl font-semibold text-slate-900">Technology Stack</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-blue-700"><FaReact /> React</div>
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-blue-700"><FaNodeJs /> Node.js</div>
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-blue-700"><FaDatabase /> MongoDB</div>
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-blue-700"><FaLock /> JWT</div>
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-blue-700">Tailwind CSS</div>
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-white p-8 shadow">
          <h3 className="text-xl font-semibold">Meet the Developer</h3>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
            <div className="h-28 w-28 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl">AK</div>
            <div>
              <div className="font-semibold text-slate-900">Anirmay Khan</div>
              <div className="text-sm text-slate-600">College: XYZ Institute • Branch: Computer Science</div>
              <p className="mt-3 text-sm text-slate-600">A compact project demonstrating core full-stack concepts including authentication, stateful bookings, and demo persistence for educational review.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // try demo backend endpoint
      const res = await fetch(`${API}/feedback`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('no-backend');
      setSent(true);
    } catch (err) {
      // fallback to mailto
      const mailto = `mailto:anirmay.05khan@gmail.com?subject=${encodeURIComponent(form.subject || 'Contact from RailEase')}&body=${encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`)}`;
      window.location.href = mailto;
      setSent(true);
    } finally { setLoading(false); }
  };

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-lg text-blue-100">Need help booking or have feedback? Our support team is here to help.</p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow">
            <h3 className="text-xl font-semibold">Send us a message</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input required className="rounded-2xl border p-3" placeholder="Full Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
              <input required className="rounded-2xl border p-3" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
              <input className="rounded-2xl border p-3" placeholder="Phone Number" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
              <input className="rounded-2xl border p-3" placeholder="Subject" value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} />
              <textarea required className="md:col-span-2 rounded-2xl border p-3" rows={6} placeholder="Message" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} />
            </div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-white shadow" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </div>
            {sent && <div className="mt-3 text-sm text-emerald-600">Message handled. Thank you!</div>}
          </form>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-50 p-3 text-blue-700"><FaMapMarkerAlt /></div>
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-sm text-slate-600">XYZ Institute, Computer Science Department</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-50 p-3 text-blue-700"><FaEnvelope /></div>
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:anirmay.05khan@gmail.com" className="text-sm text-blue-700 hover:underline">anirmay.05khan@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-50 p-3 text-blue-700"><FaPhone /></div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-slate-600">8367833266</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-50 p-3 text-blue-700"><FaClock /></div>
                <div>
                  <div className="font-semibold">Office Hours</div>
                  <div className="text-sm text-slate-600">Mon - Sun • 09:00 - 20:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow">
          <h4 className="font-semibold">FAQ</h4>
          <div className="mt-3 divide-y">
            {[
              {q:'How do I book a ticket?', a:'Search trains, choose seats, and follow the booking flow.'},
              {q:'How do refunds work?', a:'This demo simulates refund flows; contact support for details.'},
              {q:'Is payment secure?', a:'Payments are simulated for demo — no real money is processed.'},
              {q:'How to contact support?', a:'Use the form or email the developer.'}
            ].map((f,i)=> (
              <div key={i} className="py-3">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full text-left flex items-center justify-between">
                  <div className="font-medium">{f.q}</div>
                  <div className="text-slate-500">{openFaq===i?'-':'+'}</div>
                </button>
                {openFaq===i && <div className="mt-2 text-sm text-slate-600">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="h-40 w-full rounded-2xl bg-slate-100" />
          <div className="flex gap-3 text-slate-600">
            <a className="hover:text-blue-700"><FaFacebook /></a>
            <a className="hover:text-blue-700"><FaInstagram /></a>
            <a className="hover:text-blue-700"><FaLinkedin /></a>
            <a className="hover:text-blue-700"><FaGithub /></a>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white text-center shadow">
          <div className="text-lg font-semibold">Need immediate help? Call our support team.</div>
          <a href="tel:8367833266" className="mt-4 inline-block rounded-2xl bg-white/10 px-6 py-3 font-semibold">Call Now</a>
        </div>
      </main>
    </div>
  );
}

function PaymentSuccessPage({ bookingInfo, ticket }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl bg-white p-8 shadow">
        <h2 className="text-2xl font-semibold">Payment Successful</h2>
        <p className="mt-2 text-slate-600">Your payment was processed successfully.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">PNR</div>
            <div className="font-semibold text-slate-900">{bookingInfo?.pnr || ticket?.pnr}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Amount</div>
            <div className="font-semibold text-slate-900">₹{bookingInfo?.amount || ticket?.amount}</div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => navigate('/ticket')} className="rounded-2xl bg-blue-600 px-4 py-2 text-white">View E-Ticket</button>
          <button onClick={() => navigate('/bookings')} className="rounded-2xl border px-4 py-2">My Bookings</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Admin Pages (scaffold) ------------------ */
function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalTrains: 0, totalBookings: 0, todayBookings: 0, cancelledTickets: 0, revenue: 0, pendingPayments: 0, activeTrains: 0 });
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch(`${API}/admin/dashboard`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
    fetch(`${API}/admin/reports`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => res.json())
      .then((data) => {
        const monthly = Object.entries(data.monthly || {}).map(([month, count]) => ({ month, bookings: count }));
        setReportData(monthly);
      })
      .catch(() => {});
  }, []);

  const metrics = [
    { label: 'Total Users', value: stats.totalUsers, color: 'bg-sky-100 text-sky-700' },
    { label: 'Total Trains', value: stats.totalTrains, color: 'bg-violet-100 text-violet-700' },
    { label: 'Total Bookings', value: stats.totalBookings, color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Revenue', value: `₹${stats.revenue}`, color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
          <p className="mt-2 text-slate-600">Monitor trains, users, bookings, and revenue in one place.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className={`inline-flex rounded-full px-3 py-2 font-semibold ${metric.color}`}>{metric.label}</div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{metric.value}</div>
          </div>
        ))}
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Monthly Bookings</h3>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">Last 12 months</span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Performance Snapshot</h3>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Active Trains</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.activeTrains}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Today’s Bookings</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.todayBookings}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Cancelled Tickets</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.cancelledTickets}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Pending Payments</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.pendingPayments}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminProfilePage({ user }) {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Bardhaman',
    state: user?.state || 'West Bengal',
    country: user?.country || 'India',
    pinCode: user?.pinCode || '713101',
    department: user?.department || 'Railway Administration',
    employeeId: user?.employeeId || 'ADM-1001',
    memberSince: user?.memberSince || 'January 2026',
    lastLogin: user?.lastLogin || new Date().toLocaleString(),
    role: user?.role || 'Super Administrator',
    status: user?.status || 'Active',
    profilePhoto: user?.profilePhoto || '',
    dob: user?.dob || '1995-06-14',
    gender: user?.gender || 'Male',
    notifications: user?.notifications || {
      booking: true,
      payment: true,
      userRegistration: true,
      refund: true,
      reports: true,
      email: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState('');
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [stats, setStats] = useState({ totalTrains: 0, totalUsers: 0, totalBookings: 0, paymentsProcessed: 0, reportsGenerated: 0, refundRequests: 0 });
  const [activity] = useState([
    { label: 'Added Train', description: 'Express line added to system', time: 'Today 10:45 AM', status: 'Success' },
    { label: 'Updated Train Schedule', description: 'Route timings refreshed', time: 'Yesterday 4:20 PM', status: 'Success' },
    { label: 'Approved Refund', description: 'Refund approved for booking PNR1234', time: '2 days ago', status: 'Success' },
    { label: 'Deleted User', description: 'Removed suspended user account', time: '3 days ago', status: 'Success' },
    { label: 'Generated Report', description: 'Monthly revenue report created', time: '4 days ago', status: 'Success' },
    { label: 'Updated Booking', description: 'Booking details modified for PNR5678', time: '5 days ago', status: 'Success' },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    fetch(`${API}/admin/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setProfile((prev) => ({
          ...prev,
          ...data,
          profilePhoto: data.profilePhoto || prev.profilePhoto,
          notifications: data.notifications || prev.notifications,
          employeeId: data.employeeId || prev.employeeId,
          memberSince: data.memberSince || prev.memberSince,
          lastLogin: data.lastLogin || prev.lastLogin,
          department: data.department || prev.department,
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch(`${API}/admin/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setStats({
        totalTrains: data.totalTrains || 0,
        totalUsers: data.totalUsers || 0,
        totalBookings: data.totalBookings || 0,
        paymentsProcessed: data.paymentsProcessed || 0,
        reportsGenerated: data.reportsGenerated || 0,
        refundRequests: data.refundRequests || 0,
      }))
      .catch(() => {});
  }, [user]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3000);
  };

  const handleProfileSave = async () => {
    if (!profile.name || !profile.username || !profile.email || !profile.phone || !profile.address) {
      showToast('Please fill in all required fields.');
      return;
    }
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/admin/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: profile.name,
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        pinCode: profile.pinCode,
      }),
    });
    if (res.ok) {
      showToast('Profile changes saved successfully.');
      setEditMode(false);
    } else {
      showToast('Unable to save profile changes.');
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showToast('Please complete all password fields.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New password and confirmation do not match.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters.');
      return;
    }
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/admin/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }),
    });
    if (res.ok) {
      showToast('Password updated successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      const error = await res.json();
      showToast(error.message || 'Password update failed.');
    }
  };

  const handleNotificationSave = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/admin/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ notifications: profile.notifications }),
    });
    if (res.ok) {
      showToast('Notification settings saved.');
    } else {
      showToast('Failed to save notification settings.');
    }
  };

  const handleUploadPhoto = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/admin/upload-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ photoBase64: reader.result }),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile((prev) => ({ ...prev, profilePhoto: data.profilePhoto || prev.profilePhoto }));
        showToast('Profile photo updated.');
      } else {
        showToast('Photo upload failed.');
      }
    };
    reader.readAsDataURL(file);
  };

  const statsCards = [
    { label: 'Total Trains Managed', value: stats.totalTrains, icon: <FaTrain className="text-xl text-blue-600" /> },
    { label: 'Total Users', value: stats.totalUsers, icon: <FaUsers className="text-xl text-slate-700" /> },
    { label: 'Total Bookings', value: stats.totalBookings, icon: <FaClipboardList className="text-xl text-emerald-600" /> },
    { label: 'Payments Processed', value: stats.paymentsProcessed, icon: <FaMoneyBillWave className="text-xl text-orange-600" /> },
    { label: 'Reports Generated', value: stats.reportsGenerated, icon: <FaChartLine className="text-xl text-violet-600" /> },
    { label: 'Refund Requests', value: stats.refundRequests, icon: <FaShieldAlt className="text-xl text-red-600" /> },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-36 rounded-3xl bg-slate-200 animate-pulse" />
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-40 rounded-3xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast ? (
        <div className="rounded-3xl bg-emerald-600 px-5 py-4 text-white shadow-lg">{toast}</div>
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt="Admin profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-4xl text-slate-600">{profile.name?.[0] || 'A'}</div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-500">
                <input type="file" className="hidden" accept="image/*" onChange={(event) => handleUploadPhoto(event.target.files?.[0])} />
                <FaUserCircle />
              </label>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile</p>
              <h1 className="text-3xl font-semibold text-slate-900">{profile.name}</h1>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">Administrator Badge</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">{profile.role}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Employee ID</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile.employeeId}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Account Status</p>
              <p className="mt-2 text-lg font-semibold text-emerald-700">{profile.status}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Email</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{profile.email}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Phone</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{profile.phone}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Department</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{profile.department}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Last Login</p>
            <p className="mt-2 text-sm font-medium text-slate-900">{profile.lastLogin}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-600">Member since</p>
            <p className="text-lg font-semibold text-slate-900">{profile.memberSince}</p>
          </div>
          <button onClick={() => setEditMode(true)} className="rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Edit Profile</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                <p className="mt-2 text-sm text-slate-600">Manage your administrator profile details.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditMode(!editMode)} className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">{editMode ? 'View' : 'Edit'}</button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Full Name', value: profile.name, key: 'name', type: 'text' },
                { label: 'Username', value: profile.username, key: 'username', type: 'text' },
                { label: 'Email', value: profile.email, key: 'email', type: 'email' },
                { label: 'Mobile Number', value: profile.phone, key: 'phone', type: 'tel' },
                { label: 'Date of Birth', value: profile.dob, key: 'dob', type: 'date' },
                { label: 'Gender', value: profile.gender, key: 'gender', type: 'text' },
                { label: 'Address', value: profile.address, key: 'address', type: 'text', full: true },
                { label: 'City', value: profile.city, key: 'city', type: 'text' },
                { label: 'State', value: profile.state, key: 'state', type: 'text' },
                { label: 'Country', value: profile.country, key: 'country', type: 'text' },
                { label: 'PIN Code', value: profile.pinCode, key: 'pinCode', type: 'text' },
              ].map((field) => (
                <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-slate-700">{field.label}</label>
                  {editMode ? (
                    <input
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500"
                      type={field.type}
                      value={profile[field.key]}
                      onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                    />
                  ) : (
                    <p className="mt-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{field.value}</p>
                  )}
                </div>
              ))}
            </div>
            {editMode ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button onClick={() => { setProfile({ ...profile, name: user?.name || profile.name, username: user?.username || profile.username, email: user?.email || profile.email, phone: user?.phone || profile.phone }); setEditMode(false); }} className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={handleProfileSave} className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Save Changes</button>
              </div>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Account Information</h3>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                {[
                  { label: 'Admin ID', value: profile.employeeId },
                  { label: 'Role', value: profile.role },
                  { label: 'Department', value: profile.department },
                  { label: 'Created Account', value: profile.memberSince },
                  { label: 'Last Updated', value: profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A' },
                  { label: 'Account Status', value: profile.status },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Dashboard Statistics</h3>
              <div className="mt-6 grid gap-4">
                {statsCards.map((item) => (
                  <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="rounded-2xl bg-white p-3 shadow-sm">{item.icon}</div>
                      <p className="text-sm text-slate-500">{item.label}</p>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Security Settings</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Current Password</label>
                  <input type={showPassword ? 'text' : 'password'} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">New Password</label>
                  <input type={showPassword ? 'text' : 'password'} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
                  <input type={showPassword ? 'text' : 'password'} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
                </div>
                <div className="flex items-center gap-3">
                  <input id="show-password" type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                  <label htmlFor="show-password" className="text-sm text-slate-600">Show password</label>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Password Strength</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full ${passwordData.newPassword.length > 8 ? 'w-4/5 bg-emerald-500' : passwordData.newPassword.length > 4 ? 'w-1/2 bg-amber-400' : 'w-1/4 bg-rose-500'}`} />
                  </div>
                </div>
                <button onClick={handlePasswordUpdate} className="rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Update Password</button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Notification Settings</h3>
              <div className="mt-6 space-y-4 text-sm text-slate-700">
                {[
                  { label: 'Booking Notifications', key: 'booking' },
                  { label: 'Payment Notifications', key: 'payment' },
                  { label: 'User Registration Alerts', key: 'userRegistration' },
                  { label: 'Refund Alerts', key: 'refund' },
                  { label: 'Report Notifications', key: 'reports' },
                  { label: 'Email Notifications', key: 'email' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                    <span>{item.label}</span>
                    <input type="checkbox" checked={profile.notifications[item.key]} onChange={() => setProfile((prev) => ({ ...prev, notifications: { ...prev.notifications, [item.key]: !prev.notifications[item.key] } }))} className="h-5 w-5 rounded border-slate-300 text-blue-600" />
                  </label>
                ))}
              </div>
              <button onClick={handleNotificationSave} className="mt-6 rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Save Settings</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Recent Admin Activity</h3>
              <span className="text-sm text-slate-500">Latest actions</span>
            </div>
            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{item.status}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Quick Actions</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Manage Trains', path: '/admin/trains' },
                { label: 'Manage Users', path: '/admin/users' },
                { label: 'Manage Bookings', path: '/admin/bookings' },
                { label: 'View Reports', path: '/admin/reports' },
                { label: 'Dashboard', path: '/admin' },
              ].map((action) => (
                <Link key={action.path} to={action.path} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 transition hover:bg-blue-50">{action.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageTrains() {
  const [trainsList, setTrainsList] = useState([]);
  useEffect(() => { fetch(`${API}/trains`).then((r) => r.json()).then(setTrainsList).catch(() => setTrainsList([])); }, []);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Manage Trains</h3>
          <p className="mt-2 text-slate-600">Add, edit, or remove train routes from the system.</p>
        </div>
        <Link to="/admin/trains/add" className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-white">Add Train</Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 text-sm text-slate-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Route</th>
              <th className="p-4">Seats</th>
              <th className="p-4">Fare</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainsList.map((t) => (
              <tr key={t._id} className="border-t hover:bg-slate-50">
                <td className="p-4 font-semibold">{t.name}</td>
                <td className="p-4">{t.source} → {t.destination}</td>
                <td className="p-4">{t.seatsAvailable}</td>
                <td className="p-4">₹{t.fare}</td>
                <td className="p-4"><Link to={`/admin/trains/${t._id}/edit`} className="text-blue-600">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddTrain() {
  const [form, setForm] = useState({ name:'', source:'', destination:'', seatsAvailable:0, fare:0 });
  const navigate = useNavigate();
  const save = async () => {
    await fetch(`${API}/trains`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });
    navigate('/admin/trains');
  };
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h3 className="text-2xl font-semibold">Add Train</h3>
      <div className="mt-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr] sm:items-center">
              <label className="text-sm font-semibold text-slate-700">Train name</label>
              <input className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3" placeholder="Write train name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr] sm:items-center">
              <label className="text-sm font-semibold text-slate-700">Source station</label>
              <input className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3" placeholder="Write source station" value={form.source} onChange={e=>setForm({...form,source:e.target.value})} />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr] sm:items-center">
              <label className="text-sm font-semibold text-slate-700">Destination station</label>
              <input className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3" placeholder="Write destination station" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr] sm:items-center">
              <label className="text-sm font-semibold text-slate-700">Seats available</label>
              <input type="number" className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3" placeholder="Write seats available" value={form.seatsAvailable} onChange={e=>setForm({...form,seatsAvailable:Number(e.target.value)})} />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr] sm:items-center">
              <label className="text-sm font-semibold text-slate-700">Fare (₹)</label>
              <input type="number" className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-3" placeholder="Write fare in rupees" value={form.fare} onChange={e=>setForm({...form,fare:Number(e.target.value)})} />
            </div>
            <div className="flex justify-end"><button onClick={save} className="rounded-2xl bg-blue-600 px-4 py-2 text-white">Save</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditTrain() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  useEffect(()=>{ fetch(`${API}/trains`).then(r=>r.json()).then(list=>{ const t=list.find(x=>x._id===id); setForm(t||{name:'',source:'',destination:'',seatsAvailable:0,fare:0}) }) }, [id]);
  const navigate = useNavigate();
  const save = async () => {
    await fetch(`${API}/trains/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });
    navigate('/admin/trains');
  };
  if (!form) return <div className="p-6">Loading...</div>;
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h3 className="text-2xl font-semibold">Edit Train</h3>
      <div className="mt-4 grid gap-3">
        <input className="rounded-2xl border p-3" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="rounded-2xl border p-3" placeholder="Source" value={form.source} onChange={e=>setForm({...form,source:e.target.value})} />
        <input className="rounded-2xl border p-3" placeholder="Destination" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} />
        <input type="number" className="rounded-2xl border p-3" placeholder="Seats" value={form.seatsAvailable} onChange={e=>setForm({...form,seatsAvailable:Number(e.target.value)})} />
        <input type="number" className="rounded-2xl border p-3" placeholder="Fare" value={form.fare} onChange={e=>setForm({...form,fare:Number(e.target.value)})} />
        <div className="flex justify-end"><button onClick={save} className="rounded-2xl bg-blue-600 px-4 py-2 text-white">Save</button></div>
      </div>
    </div>
  );
}

function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((r) => r.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h3 className="text-2xl font-semibold">Manage Users</h3>
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 text-sm text-slate-600"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Actions</th></tr></thead>
          <tbody>{users.map(u=> (<tr key={u._id} className="border-t"><td className="p-4">{u.name}</td><td className="p-4">{u.email}</td><td className="p-4"><button className="text-red-600">Remove</button></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function ManageBookings() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${API}/bookings`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]));
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h3 className="text-2xl font-semibold">Manage Bookings</h3>
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 text-sm text-slate-600"><tr><th className="p-4">PNR</th><th className="p-4">User</th><th className="p-4">Train</th><th className="p-4">Status</th></tr></thead>
          <tbody>{list.map(b=> (<tr key={b._id} className="border-t"><td className="p-4">{b.pnr}</td><td className="p-4">{b.user?.name}</td><td className="p-4">{b.trainName}</td><td className="p-4">{b.status}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentRecords() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${API}/payments`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]));
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h3 className="text-2xl font-semibold">Payment Records</h3>
      <div className="mt-6 space-y-3">
        {list.map(p=> (<div key={p._id} className="rounded-2xl bg-white p-4 shadow">Txn: {p.transactionId} • Amount: ₹{p.amount}</div>))}
      </div>
    </div>
  );
}

function Reports() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h3 className="text-2xl font-semibold">Reports</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">Bookings (30d): <div className="mt-2 text-2xl font-bold">3,542</div></div>
        <div className="rounded-2xl bg-white p-6 shadow">Revenue (30d): <div className="mt-2 text-2xl font-bold">₹1,24,000</div></div>
        <div className="rounded-2xl bg-white p-6 shadow">Refunds: <div className="mt-2 text-2xl font-bold">12</div></div>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadTrains = async () => {
    const res = await fetch(`${API}/trains`);
    const data = await res.json();
    setTrains(data);
  };

  const loadBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`${API}/bookings/my`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    loadTrains();
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API}/auth/profile`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json()).then((data) => setUser(data));
      loadBookings();
    }
  }, []);

  const logout = () => {
    setLogoutConfirmOpen(true);
  };

  const performLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLogoutConfirmOpen(false);
    navigate('/');
  };

  const handleRegister = async (form) => {
    const res = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setError('');
      setSuccessMessage('Successfully registered!');
      navigate('/dashboard');
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  const handleLogin = async (form) => {
    try {
      const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setError('');
        setSuccessMessage('Successfully logged in!');
        navigate('/dashboard');
      } else {
        setError(data?.message || `Login failed (${res.status})`);
      }
    } catch (error) {
      setError(`Login error: ${error.message}`);
    }
  };

  const handleAdminLogin = async (form) => {
    try {
      const res = await fetch(`${API}/auth/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setError('');
        setSuccessMessage('Successfully logged in as admin!');
        navigate('/admin');
      } else {
        setError(data?.message || `Admin login failed (${res.status})`);
      }
    } catch (error) {
      setError(`Admin login error: ${error.message}`);
    }
  };

  const handleBook = (train) => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }
    setSelectedTrain(train);
    navigate('/booking');
  };

  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/bookings/${bookingId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      setSuccessMessage('Booking cancelled successfully');
      loadBookings();
    } else {
      const data = await res.json();
      setError(data.message || 'Cancellation failed');
    }
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handlePay = async (info) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/bookings`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...info, trainId: selectedTrain._id }) });
    const data = await res.json();
    if (data.booking) {
      setBookingInfo({ ...info, amount: data.booking.amount, pnr: data.booking.pnr, train: selectedTrain });
      setTicket(data.booking);
      navigate('/ticket');
    }
  };

  const handlePaymentFinish = async (method) => {
    await fetch(`${API}/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ booking: bookingInfo?._id, method, amount: bookingInfo?.amount, transactionId: `TXN${Date.now()}` }) });
    setBookingInfo({ ...bookingInfo, method });
    navigate('/payment/success');
  };

  const handleUpdateProfile = async (form) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API}/auth/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data) setUser(data);
  };

  return (
    <>
      <TopSuccessToast message={successMessage} />
      <LoginRequiredModal
        open={loginModalOpen}
        onClose={handleCloseLoginModal}
        onLogin={() => {
          setLoginModalOpen(false);
          navigate('/login');
        }}
      />
      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={performLogout}
      />
      <Routes>
        <Route path="/" element={<Layout user={user} logout={logout}><HomePage user={user} /></Layout>} />
      <Route path="/login" element={<Layout user={user} logout={logout}><div className="mx-auto max-w-5xl px-6 py-16"><AuthForm type="login" error={error} onSubmit={handleLogin} /></div></Layout>} />
      <Route path="/admin/login" element={<Layout user={user} logout={logout}><div className="mx-auto max-w-5xl px-6 py-16"><AuthForm type="admin" error={error} onSubmit={handleAdminLogin} /></div></Layout>} />
      <Route path="/register" element={<Layout user={user} logout={logout}><div className="mx-auto max-w-5xl px-6 py-16"><AuthForm type="register" error={error} onSubmit={handleRegister} /></div></Layout>} />
      <Route path="/trains" element={<Layout user={user} logout={logout}><SearchTrainPage trains={trains} onBook={handleBook} /></Layout>} />
      <Route path="/booking" element={<Layout user={user} logout={logout}><BookingPage selectedTrain={selectedTrain} onPay={handlePay} /></Layout>} />
      <Route path="/payment" element={<Layout user={user} logout={logout}><PaymentPage bookingInfo={bookingInfo} onFinish={handlePaymentFinish} /></Layout>} />
      <Route path="/ticket" element={<Layout user={user} logout={logout}><TicketPage booking={ticket} /></Layout>} />
      <Route path="/payment/success" element={<Layout user={user} logout={logout}><PaymentSuccessPage bookingInfo={bookingInfo} ticket={ticket} /></Layout>} />
      <Route path="/history" element={<Layout user={user} logout={logout}><BookingHistoryPage bookings={bookings} onCancel={handleCancelBooking} /></Layout>} />
      {/* Admin routes */}
      <Route path="/admin" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><AdminDashboard /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/profile" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><AdminProfilePage user={user} /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/trains" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><ManageTrains /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/trains/add" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><AddTrain /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/trains/:id/edit" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><EditTrain /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/users" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><ManageUsers /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/bookings" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><ManageBookings /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/payments" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><PaymentRecords /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/reports" element={<RequireAdmin user={user}><AdminLayout user={user} logout={logout}><Reports /></AdminLayout></RequireAdmin>} />
      <Route path="/bookings" element={<Layout user={user} logout={logout}><MyBookingsPage bookings={bookings} onCancel={handleCancelBooking} /></Layout>} />
      <Route path="/dashboard" element={<Layout user={user} logout={logout}><PassengerDashboard user={user} bookings={bookings} trains={trains} /></Layout>} />
      <Route path="/profile" element={<RequireAuth user={user}><Layout user={user} logout={logout}><ProfilePage user={user} onUpdate={handleUpdateProfile} /></Layout></RequireAuth>} />
      <Route path="/about" element={<Layout user={user} logout={logout}><AboutPage /></Layout>} />
      <Route path="/contact" element={<Layout user={user} logout={logout}><ContactPage /></Layout>} />
      <Route path="*" element={<Layout user={user} logout={logout}><NotFoundPage /></Layout>} />
    </Routes>
    </>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;

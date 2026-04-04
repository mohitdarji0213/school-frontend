import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Principal from './pages/Principal';
import History from './pages/History';
import Vision from './pages/Vision';
import Gallery from './pages/Gallery';
import Staff from './pages/Staff';
import Admissions from './pages/Admissions';
import Register from './pages/Register';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Academics from './pages/Academics';
import Curriculum from './pages/Curriculum';
import Timetable from './pages/Timetable';
import FeeStructure from './pages/FeeStructure';
import Results from './pages/Results';
import Achievements from './pages/Achievements';
import Sports from './pages/Sports';
import Infrastructure from './pages/Infrastructure';
import Library from './pages/Library';
import Rules from './pages/Rules';
import Uniform from './pages/Uniform';
import Transport from './pages/Transport';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminGallery from './pages/admin/AdminGallery';
import AdminStaff from './pages/admin/AdminStaff';
import AdminNotices from './pages/admin/AdminNotices';
import AdminEvents from './pages/admin/AdminEvents';
import AdminResults from './pages/admin/AdminResults';
import AdminFees from './pages/admin/AdminFees';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminTimetable from './pages/admin/AdminTimetable';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ duration: 4000, style: { fontFamily: 'DM Sans, sans-serif' } }} />
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/principal-message" element={<Principal />} />
            <Route path="/about/history" element={<History />} />
            <Route path="/about/vision-mission" element={<Vision />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admissions/register" element={<Register />} />
            <Route path="/admissions/fee-structure" element={<FeeStructure />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/curriculum" element={<Curriculum />} />
            <Route path="/academics/timetable" element={<Timetable />} />
            <Route path="/academics/results" element={<Results />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/events" element={<Events />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/library" element={<Library />} />
            <Route path="/rules-regulations" element={<Rules />} />
            <Route path="/uniform" element={<Uniform />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/staff" element={<AdminStaff />} />
              <Route path="/admin/notices" element={<AdminNotices />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/results" element={<AdminResults />} />
              <Route path="/admin/fees" element={<AdminFees />} />
              <Route path="/admin/achievements" element={<AdminAchievements />} />
              <Route path="/admin/timetable" element={<AdminTimetable />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

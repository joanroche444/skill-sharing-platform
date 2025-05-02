import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePlan from './pages/CreatePlan';
import LearningPlans from './pages/LearningPlans';
import CreateProgressUpdate from './pages/CreateProgressUpdate';
import ProgressUpdates from './pages/ProgressUpdates';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex space-x-4">
        <Link to="/plans">Plans</Link>
        <Link to="/create-plan">Create Plan</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/create-progress">New Update</Link>
      </nav>
      <Routes>
        <Route path="/plans" element={<LearningPlans />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/create-progress" element={<CreateProgressUpdate />} />
        <Route path="/progress" element={<ProgressUpdates />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

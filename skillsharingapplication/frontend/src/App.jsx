import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePlan from './pages/CreatePlan';
import LearningPlans from './pages/LearningPlans';
import EditLearningPlan from './pages/EditLearningPlan';
import CreateProgressUpdate from './pages/CreateProgressUpdate';
import ProgressUpdates from './pages/ProgressUpdates';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function App() {
  return (
    <Router>
      <nav className="sticky top-0 z-50 bg-gray-700 text-white shadow-md">
  <div className="container mx-auto flex justify-center space-x-8 py-4">
    <Link
      to="/plans"
      className="hover:bg-gray-700 px-4 py-2 rounded transition duration-200"
    >
      Learning Plans
    </Link>
    <Link
      to="/create-plan"
      className="hover:bg-gray-700 px-4 py-2 rounded transition duration-200"
    >
      Create New Learning Plan
    </Link>
    <Link
      to="/progress"
      className="hover:bg-gray-700 px-4 py-2 rounded transition duration-200"
    >
      Progress Updates
    </Link>
    <Link
      to="/create-progress"
      className="hover:bg-gray-700 px-4 py-2 rounded transition duration-200"
    >
      Update Progress
    </Link>
  </div>
</nav>


      <Routes>
        <Route path="/plans" element={<LearningPlans />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/create-progress" element={<CreateProgressUpdate />} />
        <Route path="/progress" element={<ProgressUpdates />} />
        <Route path="/edit-plan/:id" element={<EditLearningPlan />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

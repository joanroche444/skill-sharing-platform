// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import CreatePlan from './pages/CreatePlan';
import LearningPlans from './pages/LearningPlans';
import EditLearningPlan from './pages/EditLearningPlan';
import CreateProgressUpdate from './pages/CreateProgressUpdate';
import ProgressUpdates from './pages/ProgressUpdates';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';


export default function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/home" element={<HomePage />} />
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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Homepage';
import CreatePlan from './pages/CreatePlan';
import LearningPlans from './pages/LearningPlans';
import EditLearningPlan from './pages/EditLearningPlan';
import CreateProgressUpdate from './pages/CreateProgressUpdate';
import ProgressUpdates from './pages/ProgressUpdates';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import PythonPage from './pages/PythonPage';
import WebDevPage from './pages/WebDevelopment';
import DataSciencePage from './pages/DataScience';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function App() {
  return (
      <Router>
        <NavBar />
        
        <Routes>
          <Route path="/home" element={<Layout><HomePage /></Layout>} />
          <Route path="/python" element={<Layout><PythonPage /></Layout>} />
          <Route path="/web-development" element={<Layout><WebDevPage /></Layout>} />
          <Route path="/data-science" element={<Layout><DataSciencePage /></Layout>} />
          <Route path="/plans" element={<Layout><LearningPlans /></Layout>} />
          <Route path="/create-plan" element={<Layout><CreatePlan /></Layout>} />
          <Route path="/create-progress" element={<Layout><CreateProgressUpdate /></Layout>} />
          <Route path="/progress" element={<Layout><ProgressUpdates /></Layout>} />
          <Route path="/edit-plan/:id" element={<Layout><EditLearningPlan /></Layout>} />
        </Routes>

        <Footer />
        <ToastContainer /> {/* For toast notifications */}
      </Router>
    
  );
}

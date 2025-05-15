import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddPostForm from './Addpost';
import Myposts from './Myposts';

// Dummy component to avoid error for /community route
const Page = () => (
  <div>
    <h2 className="text-xl font-bold">Community Page</h2>
    <p className="mt-2">This is a placeholder for the community section.</p>
  </div>
);

// UsersPage component
const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul className="list-disc pl-5">
        {users.map(user => (
          <li key={user.id}>{user.firstname}</li>
        ))}
      </ul>
    </div>
  );
};

// HomePage component
const HomePage = () => (
  <div>
    <h2 className="text-xl font-bold">Welcome to the Skill Sharing Platform</h2>
    <p className="mt-2">Use the navigation to explore different sections.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="p-6">
        <nav className="mb-6 space-x-4">
          <Link to="/" className="text-purple-600 hover:underline">Home</Link>
          <Link to="/community" className="text-purple-600 hover:underline">Community</Link>
          <Link to="/myposts" className="text-purple-600 hover:underline">My posts</Link>
          <Link to="/addpost" className="text-purple-600 hover:underline">Create post</Link>
          <Link to="/addpost" className="text-purple-600 hover:underline">My comments</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/community" element={<Page />} />
          <Route path="/addpost" element={<AddPostForm />} />
          <Route path="/myposts" element={<Myposts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

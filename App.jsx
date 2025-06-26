import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainLayout from './components/MainLayout';
import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<MainLayout>
							<Home />
						</MainLayout>
					}
				/>
				<Route
					path="/login"
					element={
						<MainLayout>
							<Login />
						</MainLayout>
					}
				/>
				<Route
					path="/signup"
					element={
						<MainLayout>
							<Signup />
						</MainLayout>
					}
				/>
				<Route path="/about" element={<div>About Page</div>} />
				<Route path="/contact" element={<div>Contact Page</div>} />
				<Route path="/terms" element={<div>Terms Page</div>} />
				<Route path="/privacy" element={<div>Privacy Page</div>} />
			</Routes>
		</Router>
	);
}

export default App;

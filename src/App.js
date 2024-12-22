import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AlertState from './contexts/alerts/AlertState';
import LoadingState from './contexts/loadingBar/LoadingState';
import Loader from './components/Loader';

function App() {
  
  return (
    <>
      <LoadingState>
        <AlertState>
          <NoteState>
            <Router>
              <Navbar />
              <Loader />
              <Alert />
              <div className="container my-3">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </div>
            </Router>
          </NoteState>
        </AlertState>
      </LoadingState>
    </>
  );
}

export default App;
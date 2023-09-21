import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import About from './pages/About';
import Login from './pages/Login';
import Main from './pages/Main';
import Home from './pages/Home';
import { ListProvider } from './contexts/ListContext';
import Protected from './components/Protected';
import Footer from './components/Footer';
import { LoginProvider } from './contexts/LoginContext';
import Favorites from './pages/Favorites';
import SignUp from './pages/SignUp';
import Applications from './pages/Applications';
import { ThemeProvider } from './contexts/ThemeContext';
import MyCards from './pages/MyCards';
import Profile from './pages/Profile';
import UserManagement from './pages/UserManagement';

function App() {

  return (
    <Router>
      <ThemeProvider>
        <LoginProvider>
          <ListProvider>
            <NavBar />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/aboutus' element={<About />} />
              <Route path='/home' element={<Protected><Home /> </Protected>} />
              <Route path='/favorites' element={<Protected><Favorites /></Protected>} />
              <Route path='/myapplications' element={<Protected><Applications /></Protected>} />
              <Route path='/mycards' element={<Protected><MyCards /></Protected>} />
              <Route path='/profile' element={<Protected><Profile /></Protected>} />
              <Route path='/usermanagement' element={<Protected><UserManagement /></Protected>} />
            </Routes>
            <Footer />
          </ListProvider>
        </LoginProvider>
      </ThemeProvider>
    </Router >
  );
}

export default App;

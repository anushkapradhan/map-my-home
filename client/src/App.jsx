import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import Blog from './pages/Blog';
import Chatbot from './pages/Chatbot';
import Explore from './components/Explore';
import Favourites from './pages/Favourites';
import Tools from './pages/Tools';
import Settings from './pages/Settings';


function App() {
  return (
    <BrowserRouter>
    <NavBar />
  {/* <Header /> */}
  <Routes>
    <Route path='/' element={<Home />} /> 
    <Route path='/sign-in' element={<SignIn />} /> 
    <Route path='/sign-up' element={<SignUp />} /> 
    <Route path='/about' element={<About />} /> 
    <Route path='/Profile' element={<Profile />} />
    <Route path='/Settings' element={<Settings/>} /> 


    <Route path="/Explore" element={<Explore />} />
    <Route path="/Favourites" element={<Favourites/>} />
    <Route path="/Tools" element={<Tools/>} />
    <Route path="/Blog" element={<Blog/>} />
    <Route path="/Chatbot" element={<Chatbot/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App

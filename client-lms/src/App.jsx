import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import GetAllBooks from './Pages/GetAllBooks';
import CreateBookDetails from './Pages/Admin Page/CreateBookDetails';
import NotFoundPage from './Pages/NotFoundPage';
import IsLoggedInAuth from './Components/Auth/IsLoggedInAuth';
import Profile from './Pages/Profile';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/logIn' element={<Login/>} />
      <Route
          path="/library/books"
          element={<IsLoggedInAuth>{<GetAllBooks/>}</IsLoggedInAuth>}
      />
      <Route
          path="/library/"
          element={<IsLoggedInAuth>{<CreateBookDetails/>}</IsLoggedInAuth>}
      />
      <Route
          path="/profile"
          element={<IsLoggedInAuth>{<Profile/>}</IsLoggedInAuth>}
      />
      <Route path='/*' element={<NotFoundPage/>} />
    </Routes>
     
    </>
  )
}

export default App;

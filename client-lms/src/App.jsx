import './App.css'
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import GetAllBooks from './Pages/GetAllBooks';
import CreateBookDetails from './Pages/Admin Page/CreateBookDetails';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/logIn' element={<Login/>} />
      <Route path='/library/books' element={<GetAllBooks/>} />
      <Route path='/library/' element={<CreateBookDetails/>} />
      <Route path='/*' element={<ErrorPage/>} />
    </Routes>
     
    </>
  )
}

export default App;

import './App.css';
import Quiz from './component/Quiz';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Result from './component/Result';

function App() {
  return (


    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Quiz/>} path='/' />
          <Route element={<Result />} path='/Result' />
        </Routes>

      </BrowserRouter>

    </div>

  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecondPage from './component/SecondPage';
import FormPage from './component/FormPage';

function App(){
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<FormPage/>} />
        <Route  path="/second" element={<SecondPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
 
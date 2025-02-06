
import FormCard from './components/FormCard';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import FormCardupdate from './components/FormCardupdate';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
const App=() =>{
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route
      path='/'
      element={<Notes/>}
      />
      <Route
      path='/add'
      element={<FormCard/>}
      />
      <Route
      path='/update'
      element={<FormCardupdate/>}
      />

    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;

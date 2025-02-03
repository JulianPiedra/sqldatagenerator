//import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerationPage from './pages/GenerationPage.tsx';

function App() {


  return (
    <BrowserRouter basename='/sqldatagenerator'>
      <Routes>
        {/*<Route  index element={<LandingPage />} />*/}
        <Route index element={<GenerationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

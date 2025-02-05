import Index from './pages/Index.tsx';
import { Routes, Route } from "react-router-dom";
import GenerationPage from './pages/GenerationPage.tsx';

function App() {


  return (
    <>
        <Routes>
          <Route path="/" index element={<Index />} />
          <Route path="/data-generation" element={<GenerationPage />} />
        </Routes>
    </>
  );
}

export default App;

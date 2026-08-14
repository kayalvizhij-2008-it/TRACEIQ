import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CommandCenter from './pages/CommandCenter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/case/:id" element={<CommandCenter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import FileViewer from "./pages/FileViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Workspace />} />
        <Route path="/file/:id" element={<FileViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

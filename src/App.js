import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import QuestionsScreenPage from "./pages/QuestionsScreenPage";
import FinalScreenPage from "./pages/FinalScreenPage";
import Timer from './components/Timer';
import Signin from "./components/LoginComponent";
import SelectionScreenPage from "./pages/SelectionScreenPage";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Box>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/start" element={<SelectionScreenPage />} />
            <Route path="/questions" element={<QuestionsScreenPage />} />
            <Route path="/score" element={<FinalScreenPage />} />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;

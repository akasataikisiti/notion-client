import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {

  const theme = createTheme({
    palette: { mode: "dark" },
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider >
  )
}

export default App

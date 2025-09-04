import Home from "./components/HomePage/Home"
import Dashboard from "./components/DashboardPage/Dashbord"
import { Routes , Route } from "react-router-dom"
function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
    </>
  )
}

export default App

import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";


function App() {
  return (
    <>
      <Navbar />
      <div className="main-page">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
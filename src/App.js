import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import RouteChangeTracker from "./RouteChangeTracker";

function App() {
  RouteChangeTracker()

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
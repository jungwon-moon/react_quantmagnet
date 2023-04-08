import AppRoutes from "./AppRoutes";
// import Navbar from "./components/Navbar";
import RouteChangeTracker from "./RouteChangeTracker";

function App() {
  RouteChangeTracker()

  return (
    <>
      {/* <Navbar /> */}
      <div className="main-page">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
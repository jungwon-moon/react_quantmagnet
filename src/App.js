import AppRoutes from "./AppRoutes";
import RouteChangeTracker from "./RouteChangeTracker";
import "./styles.scss"

function App() {
  // Google Analytics 트래커
  RouteChangeTracker()

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App

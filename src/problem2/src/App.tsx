import Header from "./component/header";
import LandingPage from "./component/landing-page";
import ExchangeWorldCurrency from "./component/exchange-world-currency";
import TaskManager from "./component/task-manager";
import UserManager from "./component/user-manager";
import Footer from "./component/footer";

import "./App.sass";

function App() {
  return (
    <>
      <header className="py-10">
        <Header />
      </header>

      <main>
        <LandingPage />
        <ExchangeWorldCurrency />
        <TaskManager />
        <UserManager />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;

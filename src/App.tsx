import { Route, Switch } from "react-router-dom";
import { ConverterPage } from "./pages/converter";
import { HomePage } from "./pages/home";

function App() {
  return (
    <Switch>
      <Route exact path="/convert" component={ConverterPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}

export default App;

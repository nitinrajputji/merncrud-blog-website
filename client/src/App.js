import "./App.css";
import Account from "./component/Account/Account";

import Header from "./component/Header/Header";
import Createpost from "./component/Createpost/Createpost";
import Allpost from "./component/Allpost/Allpost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Updatepost from "./component/Updatepost/Updatepost";
import Errorpage from "./component/Errorpage/Errorpage";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Account}></Route>
          <Route path="/home">
            <Header />
            <Allpost />
          </Route>
          <Route path="/createpost" component={Createpost}></Route>
          <Route path="/updatepost/:id" component={Updatepost}></Route>
          <Route>
            <Errorpage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

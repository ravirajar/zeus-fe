import { BrowserRouter, Switch, Route } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

import SellOldDevice from "../page/SellOldDevice";
import QuestionComponent from "../components/QuestionComponent";
import RepairService from "../page/RepairService";
import RepairQuestionComponent from "../components/RepairQuestionComponent";

const AppRouter = () => (
  <BrowserRouter>
    <HeaderComponent />
    <Switch>
      <Route exact={true} path="/" component={SellOldDevice} />
      <Route exact={true} path="/sell-device" component={SellOldDevice} />
      <Route
        exact={true}
        path="/sell-device/:device"
        component={SellOldDevice}
      />
      <Route
        exact={true}
        path="/sell-device/:device/:brand"
        component={SellOldDevice}
      />
      <Route
        exact={true}
        path="/sell-device/:device/:brand/:model"
        component={SellOldDevice}
      />
      <Route
        exact={true}
        path="/sell-device/:device/:brand/:model/question"
        component={QuestionComponent}
      />
      <Route exact={true} path="/repair" component={RepairService} />
      <Route exact={true} path="/repair/:device" component={RepairService} />
      <Route
        exact={true}
        path="/repair/:device/:brand"
        component={RepairService}
      />
      <Route
        exact={true}
        path="/repair/:device/:brand/:model"
        component={RepairService}
      />
      <Route
        exact={true}
        path="/repair/:device/:brand/:model/question"
        component={RepairQuestionComponent}
      />
    </Switch>
    {/* <FooterComponent /> */}
  </BrowserRouter>
);

export default AppRouter;

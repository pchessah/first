import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ServicesList from "./pages/ServiceList";
import SubscriptionsList from "./pages/SubscriptionList";

setupIonicReact();

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/signup" component={SignUp} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/services-list"
            component={ServicesList}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/subscriptions-list"
            component={SubscriptionsList}
            isAuthenticated={isAuthenticated}
          />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

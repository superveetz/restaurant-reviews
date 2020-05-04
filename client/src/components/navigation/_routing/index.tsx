import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// src
import HomeView from "components/pages/home/container";
import AuthView from "components/pages/auth/container";
import FourZeroFourView from "components/pages/404/container";
import RestaurantDetailsView from "components/pages/restaurants/details/container";

export interface RoutingProps {}

const Routing: React.FC<RoutingProps> = (props) => {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/" component={HomeView} exact />
        <Route path="/auth" component={AuthView} />
        <Route
          path="/restaurants/:restaurantId"
          component={RestaurantDetailsView}
        />
        {/* <Route path="/restaurants/list" component={RestaurantListView} />
        <Route
          path="/restaurants/save/:restaurantId"
          component={RestaurantSaveView}
        />
        <Route
          path="/restaurants/details/:restaurantId"
          component={RestaurantDetailsView}
        />
        <Route
          path="/restaurants/owners-dashboard"
          component={RestaurantOwnersDashboardView}
        /> */}
        <Route path="/404" component={FourZeroFourView} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default Routing;

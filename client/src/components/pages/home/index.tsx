import React from "react";
import { useHistory } from "react-router-dom";

// src
import Spinner from "components/ui/spinner";
import DataTable, {
  FilterInputTypes,
  FilterInputOptionsValue,
} from "components/ui/data-table";
import { RestaurantModel } from "models/Restaurant";

export interface HomePageProps {
  fetchRestaurantList: () => void;
  restauntListLoading: boolean;
  restaurantList: RestaurantModel[];
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const {
    restauntListLoading,
    fetchRestaurantList,
    restaurantList = [],
  } = props;
  console.log("restaurantList: ", restaurantList);
  const history = useHistory();

  const onLoadFetchRestaurants = async () => {
    fetchRestaurantList();
  };

  const renderRestaurantListTable = (): JSX.Element => {
    if (restauntListLoading) {
      return <Spinner />;
    }

    const tableHeaders = [
      {
        text: "Name",
        tableDataKeyName: "name",
      },
      {
        text: "Address",
        tableDataKeyName: "address",
        conditionalDataCellRender: (dataCell: any) => (
          <address>
            {dataCell.street}, <br />
            {dataCell.city}, {dataCell.country} <br />
            {dataCell.postalZip}
          </address>
        ),
      },
      {
        text: "Average Rating",
        tableDataKeyName: "averageRating",
        conditionalDataCellRender: (dataCell: any) =>
          dataCell.averageRating === 0
            ? "No Reviews Yet"
            : dataCell.averageRating,
        filterOptions: {
          isFilterable: true,
          label: "Avg Rating",
          inputType: {
            type: FilterInputTypes.DROPDOWN,
            options: {
              values: FilterInputOptionsValue.UNIQUE,
            },
          },
        },
      },
      {
        text: "No. of Reviews",
        tableDataKeyName: "numberOfReviews",
      },
    ];

    const tableData = restaurantList.map((resto, idx) => {
      return {
        _id: resto._id,
        name: resto.name,
        street: resto.street,
        city: resto.city,
        provState: resto.provState,
        postalZip: resto.postalZip,
        country: resto.country,
        address: `${resto.street} ${resto.city} ${resto.country} ${resto.provState}`,
        averageRating: resto.averageRating,
        numberOfReviews: (resto.reviews && resto.reviews.length) || 0,
      };
    });

    return (
      <DataTable
        tableTitle="Restaurants"
        tableHeaders={tableHeaders}
        tableData={tableData}
        isDataSortable
        onLoadSortDataByKey="averageRating"
        tableDataActionsMenu={[
          {
            icon: <i className="fas fa-info-circle"></i>,
            text: "View Details",
            onClick: (resto: RestaurantModel) =>
              history.push(`/restaurants/${resto._id}`, {
                param: {
                  restaurantId: resto._id,
                },
              }),
          },
        ]}
      />
    );
  };

  // cdm
  React.useEffect(() => {
    // fetch restaurants
    onLoadFetchRestaurants();
  }, []);

  return (
    <div className="HomePage container">{renderRestaurantListTable()}</div>
  );
};

export default HomePage;

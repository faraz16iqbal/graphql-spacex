import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Segment>
                  <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                  </Dimmer>
                </Segment>
              );
            if (error) console.log(error);
            console.log(data);
            return (
              <Fragment>
                {data.launches.map((launch) => (
                  <LaunchItem key={launch.fligh_number} launch={launch} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;

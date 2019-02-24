import React from 'react';
import { Query } from 'react-apollo';
import { LIST_QUESTION } from '../../queries/Question';
import { regionToPolygon } from '../../utils/geo';
import { initialRegion } from '../../config/appConfig';

import MapViewComponent from './MapViewComponent';

class MapViewContainer extends React.Component {
  static navigationOptions = { header: null }

  state = {
    region: initialRegion
  }

  render() {
    return (
      <Query query={LIST_QUESTION} variables={{
        region: {
          type: 'Polygon',
          coordinates: regionToPolygon(this.state.region)
        }
      }}>
      {({ loading, error, data }) => (
        <MapViewComponent
          questions={data.questions}
          region={this.state.region}
          changeRegion={region => this.setState({ region })}
          {...this.props}
        />
      )}
      </Query>
    );
  }
}

MapViewContainer.navigationOptions = MapViewComponent.navigationOptions;

export default MapViewContainer;

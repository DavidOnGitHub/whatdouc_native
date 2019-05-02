import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Map from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import TargetOverlay from './TargetOverlay';
import NumberedMarker from '../../components/NumberedMarker';
import Callout from '../../components/Callout';
import { regionToPolygon } from '../../utils/geo';
import { navigate } from '../../utils/navigator';
import { initialRegion, consolidateThreshold } from '../../config/appConfig';
import { colors } from '../../styles';

class MapView extends React.Component {
  static navigationOptions = { header: null };

  state = {
    selectLocation: false
  };

  onAddPressed = () => {
    this.setState({ selectLocation: true });
  };

  setLocation = () => {
    this.setState({ selectLocation: false });
    this.props.navigation.navigate('AddQuestion', {
      location: { longitude: this.props.region.longitude, latitude: this.props.region.latitude },
      variables: {
        region: {
          type: 'Polygon',
          coordinates: regionToPolygon(this.props.region)
        }
      }
    });
  };

  cancelSetLocation = () => {
    this.setState({ selectLocation: false });
  };

  consolidateCloseQuestions = questions => {
    const consolidatedQuestions = [];

    questions.forEach(question => {
      const [longitude, latitude] = question.location.coordinates;
      const consolidatedQuestion = consolidatedQuestions.find(consolidated => {
        const lngDiff = Math.abs(consolidated.location.longitude - longitude);
        const latDiff = Math.abs(consolidated.location.latitude - latitude);
        return (
          lngDiff < this.props.region.longitudeDelta * consolidateThreshold.longitude &&
          latDiff < this.props.region.latitudeDelta * consolidateThreshold.latitude
        );
      });
      if (consolidatedQuestion) {
        consolidatedQuestion.questions.push(question);
      } else {
        consolidatedQuestions.push({
          key: question._id,
          questions: [question],
          location: { longitude, latitude }
        });
      }
    });

    return consolidatedQuestions;
  };

  renderMarkers = questions => {
    const consolidatedQuestions = this.consolidateCloseQuestions(questions);
    return consolidatedQuestions.map(consolidated => {
      let markerRef;
      return (
        <NumberedMarker
          key={consolidated.key}
          coordinate={consolidated.location}
          number={consolidated.questions.length}
          setRef={ref => (markerRef = ref)}
          onPress={() => markerRef.showCallout()}
        >
          <Callout>
            {consolidated.questions.map(question => ({
              display: question.subject,
              onPress: () => {
                markerRef.hideCallout();
                console.log('callout pressed');
                navigate(this.props.navigation, 'QuestionDetails', { question });
              }
            }))}
          </Callout>
        </NumberedMarker>
      );
    });
  };

  render() {
    const { selectLocation } = this.state;
    const { questions } = this.props;

    return (
      <View style={styles.container}>
        <Map
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChangeComplete={this.props.changeRegion}
        >
          {questions && this.renderMarkers(questions)}
        </Map>
        {!selectLocation && (
          <TouchableHighlight style={styles.addBtn} onPress={this.onAddPressed}>
            <Icon name="plus" size={30} />
          </TouchableHighlight>
        )}
        {selectLocation && <TargetOverlay />}
        {selectLocation && (
          <View style={styles.setLocationBtns}>
            <TouchableHighlight
              style={[styles.setLocationBtn, styles.cancelBtn]}
              onPress={this.cancelSetLocation}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.setLocationBtn, styles.setBtn]}
              onPress={this.setLocation}
            >
              <Text style={styles.btnText}>Set Location</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  addBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 40,
    right: 40
  },
  setLocationBtns: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  setLocationBtn: {
    borderRadius: 5,
    width: 140,
    height: 40,
    marginVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 18
  }
});

export default MapView;

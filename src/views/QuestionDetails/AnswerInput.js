import React from 'react';
import AnswerForm from '../../components/AnswerForm';

class AnswerInput extends React.Component {
  postAnswer = ({ content }) => {
    navigator.geolocation.getCurrentPosition(async geolocation => {
      const { coords } = geolocation;
      const answer = {
        questionId: this.props.questionId,
        content,
        location: {
          type: 'Point',
          coordinates: [coords.longitude, coords.latitude]
        }
      };
      try {
        await this.props.postAnswer({ variables: { answer } });
        this.props.navigation.setParams({ isAddingAnswer: false });
      } catch (error) {
        if (error.graphQLErrors && error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
          this.props.navigation.navigate('Login');
        }
      }
    });
  };

  render() {
    return (
      <AnswerForm
        setSubmitMethod={submitMethod => this.props.navigation.setParams({ postAnswer: submitMethod })}
        submitAction={this.postAnswer}
        initialValues={this.props.answer}
      />
    );
  }
}

export default AnswerInput;

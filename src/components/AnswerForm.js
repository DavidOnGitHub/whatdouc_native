import React from 'react';
import { View, StyleSheet } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import Input from './common/Input';
import { colors } from '../styles';
import Validation from '../utils/Validation';

class AnswerForm extends React.Component {
  state = {
    answerInputHeight: 150
  };

  adjustAnswerInput = ({
    nativeEvent: {
      contentSize: { height }
    }
  }) => {
    this.setState({ answerInputHeight: height });
  };

  componentDidMount() {
    this.props.setSubmitMethod(this.props.handleSubmit(this.props.submitAction));
    this.contentInput.focus();
  }

  render() {
    return (
      <View style={styles.answerSection}>
        <Field
          name="content"
          component={Input}
          placeholder="Your answer here..."
          multiline
          uiStyle="bright"
          setRef={ref => (this.contentInput = ref)}
          style={[styles.answerInput, { height: Math.max(60, this.state.answerInputHeight + 20) }]}
          onContentSizeChange={this.adjustAnswerInput}
        />
      </View>
    );
  }
}

const validate = values =>
  new Validation(values).require('content', 'Content cannot be empty.').getErrors();

export default reduxForm({
  form: 'AnswerForm',
  validate
})(AnswerForm);

const styles = StyleSheet.create({
  answerInput: {
    paddingHorizontal: 20
  },
  answerSection: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: colors.borderGrey
  }
});

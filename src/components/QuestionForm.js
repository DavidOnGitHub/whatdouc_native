import React from 'react';
import { View, StyleSheet } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import Input from './common/Input';
import { colors } from '../styles';
import Validation from '../utils/Validation';

class QuestionForm extends React.Component {
  componentDidMount() {
    this.props.setSubmitMethod(this.props.handleSubmit(this.props.submitAction));
    this.contentInput.focus();
  }

  render() {
    return (
      <View style={styles.questionSection}>
        <Field
          name="subject"
          component={Input}
          placeholder="subject"
          uiStyle="bright"
          style={styles.questionSubject}
        />
        <View style={styles.divider} />
        <Field
          name="content"
          component={Input}
          placeholder="content"
          multiline={true}
          uiStyle="bright"
          style={styles.questionContent}
          setRef={ref => this.contentInput = ref}
        />
      </View>
    );
  }
}

const validate = (values) => new Validation(values)
  .require('subject', 'Subject cannot be empty.')
  .require('content', 'Content cannot be empty.')
  .getErrors();

export default reduxForm({
  form: 'QuestionForm',
  validate,
})(QuestionForm);

const styles = StyleSheet.create({
  questionSection: {
    backgroundColor: 'white',
    // shadowOffset: {
    //   width: 3,
    //   height: 3
    // },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // shadowColor: colors.borderGrey,
  },
  questionSubject: {
    padding: 10,
  },
  divider: {
    borderWidth: 0,
    borderBottomColor: colors.lightestGrey,
    borderBottomWidth: 1,
  },
  questionContent: {
    padding: 10
  },
});

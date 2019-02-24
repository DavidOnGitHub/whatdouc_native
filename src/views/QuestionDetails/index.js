import React, { Fragment } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import { getItem } from '../../utils/storage';
import headerRight from './headerRight';
import AnswerInput from './AnswerInputContainer';
import QuestionInput from './QuestionInputContainer';
import AnswerList from './AnswerListContainer';
import { colors } from '../../styles';
import { commonNavBar } from '../../components/common/navigationOptions';

class QuestionDetails extends React.Component {
  state = {
    isEditingQuestion: false
  }
  
  static navigationOptions = ({ navigation }) => ({ ...commonNavBar(navigation), headerRight: headerRight(navigation) })

  async componentDidMount() {
    const question = this.props.navigation.getParam('question');
    const user = await getItem('user');

    this.setState({ isOwnQuestion: user && _.get(question, 'user._id') === _.get(user, '_id') });

    this.props.navigation.setParams({
      addAnswer: this.addAnswer,
      cancelAdd: this.cancelAdd,
      saveQuestion: this.saveQuestion,
      isAddingAnswer: false,
    });
  }

  addAnswer = () => {
    // this.scrollView.scrollToEnd();
    this.props.navigation.setParams({ isAddingAnswer: true });
  }

  cancelAdd = () => this.props.navigation.setParams({ isAddingAnswer: false });
  cancelEdit = () => this.setState({ isEditingQuestion: false })
  editQuestion = () => this.setState({ isEditingQuestion: true })

  render() {
    const question = this.props.navigation.getParam('question');
    const queryVariables = { questionId: question._id };
    return (
      <ScrollView>
        { this.state.isEditingQuestion ?
        <QuestionInput question={question} navigation={this.props.navigation} cancelEdit={this.cancelEdit}/>
        : <View style={styles.questionSection}>
            <Text style={styles.questionSubject}>{question.subject}</Text>
            <View style={styles.divider} />
            <Text style={styles.questionContent}>{question.content}</Text>
            <View style={styles.divider} />
            <View style={styles.questionInfoSection}>
              <View style={styles.questionActions}>
                <TouchableHighlight onPress={this.editQuestion}>
                  <Icon name="edit" size={20} />
                </TouchableHighlight>
              </View>
              <View style={styles.questionInfo}>
                <Text>{question.user.username}</Text>
                <Text>{` ${moment(question.created).format('YYYY-MM-DD HH:mm')}`}</Text>
              </View>
            </View>
          </View>
        }
        <View>
        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={40}  style={styles.container}>
          <AnswerList queryVariables={queryVariables} />
          { this.props.navigation.getParam('isAddingAnswer') &&
          <AnswerInput queryVariables={queryVariables} navigation={this.props.navigation} />
          }
        </KeyboardAvoidingView>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  questionSection: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: colors.borderGrey,
  },
  questionSubject: {
    fontSize: 20,
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
  questionInfoSection: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionInfo: {
    flexDirection: 'row',
  }
});

export default QuestionDetails;

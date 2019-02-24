import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import AnswerForm from '../../components/AnswerForm';

class AnswerCard extends React.Component {
  state = { isEditingAnswer: false }

  saveAnswer = async ({ content }) => {
    try {
      await this.props.saveAnswer({ variables: {
        answer: {
          _id: this.props.answer._id,
          content,
        }
      } });
      this.setState({ isEditingAnswer: false });
    } catch (error) {
      console.log(error);
    }
  }

  deleteAnswer = async () => {
    try {
      await this.props.deleteAnswer();
    } catch (error) {
      console.log(error);
    }
  }

  confirmDeleteAnswer = () => {
    Alert.alert('Delete Answer', 'Confirm delete answer?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: this.deleteAnswer }
    ]);
  }

  render() {
    const { answer } = this.props;
    return this.state.isEditingAnswer ?
    (
      <View style={styles.answerCard} key={answer._id}>
        <AnswerForm
          setSubmitMethod={submitMethod => this.submitAnswerForm = submitMethod}
          submitAction={this.saveAnswer}
          initialValues={answer}
        />
        <View style={styles.answerActions}>
          <TouchableHighlight onPress={() => this.setState({ isEditingAnswer: false })}>
            <Text style={styles.info}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.submitAnswerForm()}>
            <Text style={styles.info}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    ) : (
      <View style={styles.answerCard} key={answer._id}>
        <Text>{answer.content}</Text>
        <View style={styles.answerActions}>
          <TouchableHighlight onPress={() => this.setState({ isEditingAnswer: true })}>
            <Icon name="edit" size={20} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.confirmDeleteAnswer}>
            <Icon name="trash-2" size={20} />
          </TouchableHighlight>
          <View style={styles.answerInfo}>
            <Text style={styles.info}>{answer.user.username}</Text>
            <Text style={styles.info}>{moment(answer.created).format('YYYY-MM-DD HH:mm')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  answerCard: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  answerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  answerInfo: {
    flexDirection: 'row',
  },
  info: {
    padding: 5,
  },
});

export default AnswerCard;

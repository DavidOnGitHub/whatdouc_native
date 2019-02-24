import React from 'react';
import { Mutation } from 'react-apollo';
import { LIST_QUESTION, POST_QUESTION } from '../../queries/Question';
import AddQuestion from './AddQuestion';

const AddQuestionContainer = (props) => (
  <Mutation
    mutation={POST_QUESTION}
    update={(cache, { data: { postQuestion } }) => {
      const variables = props.navigation.getParam('variables');
      const { questions } = cache.readQuery({ query: LIST_QUESTION, variables });
      cache.writeQuery({
        query: LIST_QUESTION,
        variables,
        data: { questions: questions.concat([postQuestion]) }
      });
    }}
  >
    {(postQuestion, { loading, error, data }) => (
      <AddQuestion
        postQuestion={postQuestion} {...props}
      />
    )}
  </Mutation>
);

AddQuestionContainer.navigationOptions = AddQuestion.navigationOptions;

export default AddQuestionContainer;

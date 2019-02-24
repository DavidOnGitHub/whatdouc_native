import React from 'react';
import { Mutation } from 'react-apollo';
import { SAVE_QUESTION } from '../../queries/Question';
import QuestionInput from './QuestionInput';

const QuestionInputContainer = (props) => (
  <Mutation
    mutation={SAVE_QUESTION}
    update={(cache, { data: { saveQuestion } }) => {
      // const variables = props.queryVariables;
      // const { answersByQuestionId } = cache.readQuery({ query: LIST_ANSWER, variables });
      // cache.writeQuery({
      //   query: LIST_ANSWER,
      //   variables,
      //   data: { answersByQuestionId: answersByQuestionId.concat([postAnswer]) }
      // });
    }}
  >
    {(saveQuestion, { loading, error, data }) => <QuestionInput saveQuestion={saveQuestion} {...props}/>}
  </Mutation>
);

export default QuestionInputContainer;

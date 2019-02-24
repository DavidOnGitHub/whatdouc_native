import React from 'react';
import { Mutation } from 'react-apollo';
import { POST_ANSWER, LIST_ANSWER } from '../../queries/Answer';
import AnswerInput from './AnswerInput';

const AnswerInputContainer = (props) => (
  <Mutation
    mutation={POST_ANSWER}
    update={(cache, { data: { postAnswer } }) => {
      const variables = props.queryVariables;
      const { answersByQuestionId } = cache.readQuery({ query: LIST_ANSWER, variables });
      cache.writeQuery({
        query: LIST_ANSWER,
        variables,
        data: { answersByQuestionId: answersByQuestionId.concat([postAnswer]) }
      });
    }}
  >
    {(postAnswer, { loading, error, data }) => <AnswerInput postAnswer={postAnswer} questionId={props.queryVariables.questionId} {...props}/>}
  </Mutation>
);

export default AnswerInputContainer;

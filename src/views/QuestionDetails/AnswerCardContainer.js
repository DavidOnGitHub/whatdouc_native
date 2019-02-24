import React from 'react';
import { Mutation } from 'react-apollo';
import { SAVE_ANSWER, LIST_ANSWER, DELETE_ANSWER } from '../../queries/Answer';
import AnswerCard from './AnswerCard';

const AnswerCardContainer = (props) => (
  <Mutation
    mutation={SAVE_ANSWER}
    update={(cache, { data: { saveAnswer } }) => {
      const variables = props.queryVariables;
      const { answersByQuestionId } = cache.readQuery({ query: LIST_ANSWER, variables });
      cache.writeQuery({
        query: LIST_ANSWER,
        variables,
        data: { answersByQuestionId: answersByQuestionId.concat([saveAnswer]) }
      });
    }}
  >
    {(saveAnswer, { loading, error, data }) => (
      <Mutation
        mutation={DELETE_ANSWER}
        variables={{ answerId: props.answer._id }}
        update={(cache, { data: { deleteAnswer } }) => {
          const variables = props.queryVariables;
          const { answersByQuestionId } = cache.readQuery({ query: LIST_ANSWER, variables });
          const deletedAnswerIndex = answersByQuestionId.findIndex(answer => answer._id === deleteAnswer._id);
          const newAnswers = [...answersByQuestionId];
          newAnswers.splice(deletedAnswerIndex, 1);

          cache.writeQuery({
            query: LIST_ANSWER,
            variables,
            data: { answersByQuestionId: deletedAnswerIndex >= 0 ? newAnswers : answersByQuestionId }
          });
        }}
      >
        {(deleteAnswer, { deleteLoading, deleteError, deleteData }) => (
          <AnswerCard saveAnswer={saveAnswer} deleteAnswer={deleteAnswer} {...props}/>
        )}
      </Mutation>
    )}
  </Mutation>
);

export default AnswerCardContainer;

import React from 'react';
import { Query } from 'react-apollo';
import { LIST_ANSWER } from '../../queries/Answer';
import AnswerList from './AnswerList';

const AnswerListContainer = (props) => (
  <Query query={LIST_ANSWER} variables={props.queryVariables}>
    {({ loading, error, data }) => {
      return loading ? null : <AnswerList answers={data.answersByQuestionId} queryVariables={props.queryVariables}/>;
    }}
  </Query>
);

export default AnswerListContainer;

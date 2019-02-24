import gql from 'graphql-tag';

const LIST_ANSWER = gql`
  query answersByQuestionId($questionId: String!) {
    answersByQuestionId(questionId: $questionId) {
      _id
      content
      location {
        type
        coordinates
      }
      question {
        _id
      }
      user {
        _id
        username
      }
    }
  }
`;

const POST_ANSWER = gql`
  mutation postAnswer($answer: AnswerInput!) {
    postAnswer(answer: $answer) {
      _id
      content
      location {
        type
        coordinates
      }
      question {
        _id
      }
      user {
        _id
        username
      }
    }
}`;

const SAVE_ANSWER = gql`
  mutation saveAnswer($answer: AnswerInput!) {
    saveAnswer(answer: $answer) {
      _id
      content
      location {
        type
        coordinates
      }
      question {
        _id
      }
      user {
        _id
        username
      }
    }
}`;

const DELETE_ANSWER = gql`
  mutation deleteAnswer($answerId: String!) {
    deleteAnswer(answerId: $answerId) {
      _id
    }
  }
`;

export { LIST_ANSWER, POST_ANSWER, SAVE_ANSWER, DELETE_ANSWER };

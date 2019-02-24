import gql from 'graphql-tag';

const LIST_QUESTION = gql`
  query questions($region: RegionInput) {
    questions(region: $region) {
      _id
      subject
      content
      location {
        type
        coordinates
      }
      user {
        _id
        username
      }
    }
  }
`;

const POST_QUESTION = gql`
mutation postQuestion($question: QuestionInput) {
  postQuestion(question: $question) {
    _id
    subject
    content
    location {
      type
      coordinates
    }
    user {
      _id
      username
    }
  }
}`;

const SAVE_QUESTION = gql`
mutation saveQuestion($questionId: String, $question: QuestionInput) {
  saveQuestion(questionId: $questionId, question: $question) {
    _id
    subject
    content
    location {
      type
      coordinates
    }
    user {
      _id
      username
    }
  }
}
`;

export { LIST_QUESTION, POST_QUESTION, SAVE_QUESTION };

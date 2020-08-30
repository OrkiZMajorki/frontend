import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const createReactClass = require('create-react-class');

const Card = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 80px auto;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.greyDark};

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(
      to left,
      #7231b5,
      #4c5dd4,
      #007ee7,
      #009bef,
      #00b5f1,
      #32bdf2,
      #4bc4f2,
      #60ccf3,
      #60c6f5,
      #63bff6,
      #6ab8f6,
      #73b1f4
    );
  }
`;

const CardTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  margin-bottom: 32px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-right: 16px;
`;

const Form = styled.form`
  display: flex;
  margin-top: 24px;
`;

const ChatMessage = createReactClass({
  render() {
    return (
      <p style={{ marginBottom: 0 }}>
        {this.props.message}
        <br />
        <small>{this.props.timestamp}</small>
      </p>
    );
  },
});

const ChatMessageHistory = createReactClass({
  render() {
    const createMessage = function (message, index) {
      const liStyles = {
        backgroundColor: index % 2 === 1 ? '#ddd' : '#efefef',
        padding: '1rem',
        borderBottom: '1px solid #ddd',
      };

      return (
        <li style={liStyles}>
          <ChatMessage message={message.message} timestamp={message.timestamp} />
        </li>
      );
    };

    const ulStyles = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };

    return <ul style={ulStyles}>{this.props.messages.map(createMessage)}</ul>;
  },
});

const MESSAGES = [
  { message: 'Hi Josh', timestamp: 'Tuesday' },
  { message: 'How are you?', timestamp: 'Wednesday' },
];

const Messages = createReactClass({
  getInitialState() {
    return {
      messages: MESSAGES,
      inputText: '',
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    const nextMessages = this.state.messages.concat([{ message: this.state.inputText, timestamp: 'Thursday' }]);
    const nextInputText = '';
    this.setState({ messages: nextMessages, inputText: nextInputText });
  },
  onChange(e) {
    this.setState({ inputText: e.target.value });
  },
  render() {
    return (
      <Card>
        <CardTitle>Your messages</CardTitle>
        <ChatMessageHistory messages={this.state.messages} />
        <Form onSubmit={this.handleSubmit}>
          <StyledInput type="text" onChange={this.onChange} value={this.state.inputText} />
          <Button content="Send" />
        </Form>
      </Card>
    );
  },
});

export default Messages;

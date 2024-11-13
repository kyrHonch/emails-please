import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Email from './Email/Email';
import Controls from './Controls/Controls';

function App() {
  const handleBlock = () => console.log('Email Blocked!');
  const handleSend = () => console.log('Email Sent!');

  return (
      <div className="app-container">
        <Sidebar
            criteria={['Sender', 'Subject', 'Attachments', 'Body']}
            onSelect={(criterion) => console.log(`Selected: ${criterion}`)}
        />
        <div className="content-container">
          <Email />
          <Controls onBlock={handleBlock} onSend={handleSend} />
        </div>
      </div>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import YulduzchaliBaholash from './YulduzchaliBaholagich';
// import './index.css';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <YulduzchaliBaholash maxSize={10}/>
  </React.StrictMode>
);

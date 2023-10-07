import { useState, useEffect } from 'react';
import { Button, FormControl, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core'
import FlipMove from 'react-flip-move';

import './App.css';
import { db, auth } from './firebase';
import Message from './Message';
import firebase from 'firebase';
import messenger from './Facebook-Messenger-PNG-Download-Image.png';
function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null)

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMessages([
      ...messages, { username: username, message: input }
    ]);
    setInput('');
  }

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, [])

  // useEffect(() => {
  //   setUsername(prompt('Enter your name: '));
  // }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setUser(authUser)
        console.log(user)
      } else {
        //user has logged out
        setUser(null);
      }
    })
    return () => {
      //perform some cleanup functions before refiring the useEffect.
      unsubscribe();
    }
  }, [user])

  // signUp
  const signUp = (event) => {
    event.preventDefault();

    let email = prompt('Enter your email address: ')
    let password = prompt('Enter your password: ')
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
                  let nameStr;
                  let nameMatch;
                  let username;
                  nameStr = email
                  nameMatch = nameStr.match(/^([^@]*)@/)
                  username = nameMatch ? nameMatch[1] : null

                  authUser.user.updateProfile({
                    displayName: username,
                  })
      })
      .catch((error) => alert(error.message))
  }

  //sign in
  const signIn = (event) => {
    event.preventDefault();

    let email = prompt('Enter your email address: ')
    let password = prompt('Enter your password: ')
    console.log(email, 'email')
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
  }

  return (
    <div className="App">
      <div className="app__welcome">
        <img src={messenger} alt="messenger_logo" height="100px" />
        <h1>Welcome {username}!</h1>
        
        <div className="app__signInMethods">
          {user? (
            <Button variant="outlined" color="primary" onClick={() => (auth.signOut())}>
              sign out
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={signIn}>
              sign in
            </Button>
          )}
          
          <Button variant="outlined" color="primary" onClick={signUp}>
            sign up
          </Button>
        </div>
      </div>
      
      {user? (
        <div>
          <form className="app__form">
            <FormControl className="app__formControl">
              {/* <Input className="app__formInput" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} /> */}
              <TextField
                id="outlined-textarea"
                // label="Multiline Placeholder"
                variant="outlined"
                className="app__formInput"
                placeholder="Enter a message..."
                value={input}
                onChange={event => setInput(event.target.value)}
              />
              <IconButton className="app__formIconButton" type='submit' variant="contained" color="primary" disabled={!input} onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </FormControl>
          </form>

          <FlipMove>
            {
              messages.map(({ id, message }) => (
                <Message key={id} username={username} message={message} />
              ))
            }
          </FlipMove>
        </div>
      ): (
        <h1>Please sign in to see the messages.</h1>
      )}
      
      <h4 className="footer">developed by <a href="https://www.facebook.com/HasibAhmadKhaliqi">Hasib</a></h4>
    </div>
  );
}

export default App;

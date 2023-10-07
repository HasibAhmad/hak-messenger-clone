import React, { forwardRef } from 'react'
import { Avatar, Card, CardContent, Typography } from '@material-ui/core'

import './Message.css'

const Message = forwardRef(({username, message}, ref) => {

  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography className="message__avatarAndMessage" color="textPrimary" variant="h5" component="h2">
            {/* <span className="message__messages">{!isUser && `${message.username || 'Unkown user'}:`}</span> {message.message} */}
            {!isUser && <Avatar title={message.username} className="message__avatar">`${message.username || 'Unkown user'}`</Avatar>}
            <span className="message__message">
              {message.message}
            </span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
})

export default Message

import React from 'react'
import { showNotification } from "@mantine/notifications"

import { AiOutlineCheck, AiOutlineExclamation } from 'react-icons/ai'

function Notify() {

  const success = (title, message) => showNotification({
    title: title,
    message: message,
    icon: <AiOutlineCheck/>,
    color: 'green',
  })

  const error = (title, message) => showNotification({
    title: title,
    message: message,
    icon: <AiOutlineExclamation/>,
    color: 'red',
  })

  const info = (title, message) => showNotification({
    title: title,
    message: message,
    icon: <AiOutlineCheck/>,
    color: 'blue',
  })

  const warning = (title, message) => showNotification({
    title: title,
    message: message,
    icon: <AiOutlineCheck/>,
    color: 'yellow',
  })

  return {
    success,
    error,
    info,
    warning,
  }
}

export default Notify
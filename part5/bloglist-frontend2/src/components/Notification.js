const Notification = ({ message, type }) => {
  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === null) {
    return null
  }

  if(type === 'error') notifStyle.color = 'red'

  return (
    <div className='notification' style={notifStyle}>
      {message}
    </div>
  )
}

export default Notification
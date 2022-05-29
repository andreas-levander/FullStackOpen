import { connect } from 'react-redux'

const Notification = ({ notif }) => {
  const notification = notif.text

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  style.display = notif.display

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default connect((state) => ({ notif: state.notif }))(Notification)
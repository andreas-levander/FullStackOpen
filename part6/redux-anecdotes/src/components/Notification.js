import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notif.text)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  style.display = useSelector(state => state.notif.display)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
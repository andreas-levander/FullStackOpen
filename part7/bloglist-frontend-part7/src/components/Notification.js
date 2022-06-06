import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => state.notif);

  const notifStyle = {};
  let variant = "success";

  notifStyle.display = notif.display;

  if (notif.type === "error") variant = "danger";

  return (
    <div className="notification" style={notifStyle}>
      <Alert variant={variant}>{notif.text}</Alert>
    </div>
  );
};

export default Notification;

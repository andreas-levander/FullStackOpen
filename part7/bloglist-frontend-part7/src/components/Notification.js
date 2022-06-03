import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => state.notif);

  const notifStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  notifStyle.display = notif.display;

  if (notif.type === "error") notifStyle.color = "red";

  return (
    <div className="notification" style={notifStyle}>
      {notif.text}
    </div>
  );
};

export default Notification;

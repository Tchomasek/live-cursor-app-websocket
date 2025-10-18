import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";

import { Cursor } from "./components/Cursor";

interface Users {
  [uuid: string]: { username: string; state: { x: number; y: number } };
}

const renderCursors = (users: Users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const renderUsersList = (users: Users) => {
  return (
    <div>
      <h3>Users online:</h3>
      <ul>
        {Object.keys(users).map((uuid) => {
          const user = users[uuid];
          return <li key={uuid}>{user.username}</li>;
        })}
      </ul>
    </div>
  );
};

const Home = ({ username }: { username: string }) => {
  const WS_URL = "ws://127.0.0.1:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, [sendJsonMessage]);

  if (lastJsonMessage) {
    return (
      <>
        {renderUsersList(lastJsonMessage as Users)}
        {renderCursors(lastJsonMessage as Users)}
      </>
    );
  }
  return <>Hello, {username}</>;
};

export default Home;

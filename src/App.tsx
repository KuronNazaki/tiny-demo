import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import ParsLogo from "/pars.svg";
import "./App.css";
import { usePullToRefresh } from "use-pull-to-refresh";
import { RotateCw } from "lucide-react";

const MAXIMUM_PULL_LENGTH = 240;
const REFRESH_THRESHOLD = 180;

const handleRefresh = () => {
  if (typeof window !== "undefined") {
    window.location.reload();
  }
};
// const sendMessageNative = () => {
//   if (navigator.serviceWorker && navigator.serviceWorker.controller) {
//     navigator.serviceWorker.controller.postMessage({
//       type: "SKIP_WAITING",
//       data: { key: "value" },
//     });
//   } else {
//     console.error("Service worker controller not active or found.");
//   }
// };

function App() {
  const { isRefreshing, pullPosition } = usePullToRefresh({
    onRefresh: handleRefresh,
    maximumPullLength: MAXIMUM_PULL_LENGTH,
    refreshThreshold: REFRESH_THRESHOLD,
  });

  const [count, setCount] = useState(() =>
    Number.parseInt(localStorage.getItem("count") ?? "0")
  );

  const [offlineStatus, setOfflineStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newWorkerWaiting, setNewWorkerWaiting] = useState<string | null>(null);
  const [newWorker, setNewWorker] = useState<ServiceWorker | null>(null);
  const [currentWorker, setCurrentWorker] = useState<ServiceWorker | null>(
    null
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && registration.waiting) {
                console.log("New service worker installed and waiting.");
                setNewWorkerWaiting("A new version is available");
                setNewWorker(newWorker);
              }
            });
          }
        });

        // 3. Optional: Initial check if a worker is already waiting (e.g., after a fresh page load)
        if (registration.waiting) {
          console.log("Service worker is waiting.");
        }
        if (registration.active) {
          setOfflineStatus("Đã sẵn sàng ngoại tuyến.");
          setCurrentWorker(registration.active);
        }
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "SKIP_WAITING_ACK") {
          handleRefresh();
          return;
        }

        console.log("Message from service worker:", event.data);
        setMessage(event.data);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", String(count));
  }, [count]);

  const skip = () => {
    if (newWorker) {
      newWorker.postMessage({ type: "SKIP_WAITING", data: { key: "value" } });
    }
  };
  const sendMessage = () => {
    if (currentWorker) {
      currentWorker.postMessage("Hello from the main app!");
    }
  };

  return (
    <main className="flex flex-col items-center w-full h-dvh overflow-hidden bg-white">
      <div
        style={{
          top: (isRefreshing ? REFRESH_THRESHOLD : pullPosition) / 3,
          opacity: isRefreshing || pullPosition > 0 ? 1 : 0,
        }}
        className="bg-rose-50 fixed inset-x-1/2 z-30 h-8 w-8 -translate-x-1/2 rounded-full p-2 shadow"
      >
        <div
          className={`h-full w-full flex justify-center text-rose-600 items-center ${
            isRefreshing ? "animate-spin" : ""
          }`}
          style={
            !isRefreshing ? { transform: `rotate(${pullPosition}deg)` } : {}
          }
        >
          <RotateCw />
        </div>
      </div>
      <div className="h-40 shrink-0 bg-black w-full flex flex-col justify-center items-center text-white font-semibold text-center">
        <div>{offlineStatus || "No status"}</div>
        <div>{message || "No message"}</div>
        <div>{newWorkerWaiting || "No worker"}</div>
        {newWorkerWaiting === "A new version is available" && (
          <button className="ml-4 text-black bg-black" onClick={skip}>
            Update now
          </button>
        )}
      </div>
      <div className="grow flex flex-col items-center overflow-y-scroll p-10">
        <div className="flex gap-5 justify-center">
          <a href="https://vite.dev" target="_blank">
            <img src={ParsLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="font-semibold">The Particles</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={sendMessage}>Trigger message</button>
        </div>
        <p className="mt-10">
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc. What is Lorem Ipsum? Lorem Ipsum is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum. Why do we use it? It is a long established
          fact that a reader will be distracted by the readable content of a
          page when looking at its layout. The point of using Lorem Ipsum is
          that it has a more-or-less normal distribution of letters, as opposed
          to using 'Content here, content here', making it look like readable
          English. Many desktop publishing packages and web page editors now use
          Lorem Ipsum as their default model text, and a search for 'lorem
          ipsum' will uncover many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes
          on purpose (injected humour and the like). Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham. Where can I get
          some? There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </p>
      </div>
    </main>
  );
}

export default App;

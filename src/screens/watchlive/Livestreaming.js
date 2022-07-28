import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk";
import { Button } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
function LiveVideoStreaming(props) {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const [finishStatus, setfinishStatus] = useState(false);
  const [enable, setenable] = useState(false);

  const navigate = useNavigate();
  var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {},
  };

  // Options for joining a channel
  var option = {
    appID: "50c7493877764c85aa44d921a68f2b38",
    channel: props.data.requirementID,
    uid: null,
    token: props.data.token,
  };

  function joinChannel(role) {
    setLoading(true);
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    // Initialize the client
    rtc.client.init(
      option.appID,
      function () {
        console.log("init success");

        // Join a channel
        rtc.client.join(
          option.token ? option.token : null,
          option.channel,
          option.uid ? +option.uid : null,
          function (uid) {
            console.log(
              "join channel: " + option.channel + " success, uid: " + uid
            );
            rtc.params.uid = uid;
            if (role === "host") {
              rtc.client.setClientRole("host");
              // Create a local stream
              rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
              });

              // Initialize the local stream
              rtc.localStream.init(
                function () {
                  console.log("init local stream success");
                  rtc.localStream.play("local_stream");
                  rtc.client.publish(rtc.localStream, function (err) {
                    console.log("publish failed");
                    console.error(err);
                  });
                },
                function (err) {
                  console.error("init local stream failed ", err);
                }
              );
              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });
            }
            if (role === "audience") {
              setenable(true);
              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });
              rtc.client.on("stream-added", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                if (id !== rtc.params.uid) {
                  rtc.client.subscribe(remoteStream, function (err) {
                    console.log("stream subscribe failed", err);
                  });
                }
                console.log("stream-added remote-uid: ", id);
              });

              rtc.client.on("stream-removed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                console.log("stream-removed remote-uid: ", id);
              });

              rtc.client.on("stream-subscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.play("remote_video_");
                console.log("stream-subscribed remote-uid: ", id);
              });

              rtc.client.on("stream-unsubscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.pause("remote_video_");
                console.log("stream-unsubscribed remote-uid: ", id);
              });
            }
          },
          function (err) {
            console.error("client join failed", err);
            console.log("hema");
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  function leaveEventHost(params) {
    rtc.client.unpublish(rtc.localStream, function (err) {
      console.log("publish failed");
      console.error(err);
    });
    rtc.client.leave(function (ev) {
      console.log(ev);
    });
  }

  function leaveEventAudience(params) {
    rtc.client.leave(
      function () {
        console.log("client leaves channel");
        navigate("/watchlive");

        //……
      },
      function (err) {
        console.log("client leave failed ", err);
        //error handling
      }
    );
  }
  //reload the page
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        setfinishStatus(true);
        leaveEventAudience("audience");
        // leaveEventHost("host");
        // your logic
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };

  const goback = () => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  };
  return (
    <div>
      {/* <Button size="xs" colorScheme="teal" onClick={() => joinChannel("host")}>Join Channel as Host</Button> */}
      <Button
        size="xs"
        colorScheme="teal"
        onClick={() => {
          joinChannel("audience");
          goback();
        }}
        disabled={loading}
      >
        Audience
      </Button>
      <div id="remote_video_" style={{ width: "auto", height: "200px" }} />
      {enable && (
        <Button
          colorScheme="red"
          onClick={() => {
            leaveEventAudience("audience");
            navigate("/watchlive");
          }}
        >
          Leave
        </Button>
      )}
    </div>
  );
}

export default LiveVideoStreaming;

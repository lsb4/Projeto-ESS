import { RWebShare } from "react-web-share";

const shareMusic = () => {
  var URL =
    window.location.protocol + "//" +
    window.location.host + "/" +
    window.location.pathname;

  return (
    <div>
      <RWebShare
        
        data={{
          text: "Venha para o lado negro da força :)" + "  " + 
                 "Ouça e essa pérola e se divirta",
          url: URL,
          title: "Share",
        }}
      >
        <button>Compartilhar </button>
      </RWebShare>
    </div>
  );
};

export default shareMusic;

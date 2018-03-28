import React, { useState } from "react";
import AppButtons from "./components/Pansophy/AppButtons";
import PansophyModal from "./components/Pansophy/Partials/PansophyModal";
import { __ } from "@wordpress/i18n";
import PansophySubmit from "./components/Pansophy/PansophySubmit";
import PansophyContent from "./components/Pansophy/PansophyContent";
import PansophyAssistant from "./components/Pansophy/PansophyAssistant";

const App = () => {
  const [open, setOpen] = useState(null);
  const [image, setImage] = useState(false);
  const [typing, setTyping] = useState(false);
  const getImagePrompt = (imagePrompt) => {
    setImage(imagePrompt);
  };
  const getTyping = (typing) => {
    setTyping(typing);
  };

  return (
    <div className="relative z-[999999]">
      <PansophyModal
        open={open === "modal"}
        onClose={() => setOpen(null)}
        title={__("Pansophy", "pansophy")}
      >
        <PansophyContent image={image} typing={typing} />
        <div className="p-4">
          <PansophySubmit
            onClose={() => setOpen(null)}
            getImagePrompt={getImagePrompt}
            getTyping={getTyping}
          />
        </div>
      </PansophyModal>
      {open && open === "chat" && (
        <PansophyAssistant onClose={() => setOpen(null)} />
      )}
      <AppButtons
        open={open}
        handleOpen={(type) => setOpen(type)}
        handleClose={(type) => setOpen(type)}
      />
    </div>
  );
};

export default App;

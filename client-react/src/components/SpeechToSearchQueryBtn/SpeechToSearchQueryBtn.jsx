import React from "react";
import classes from "./SpeechToSearchQueryBtn.module.css";
import MicrophoneIcon from "@/components/icons/MicrophoneIcon";
import { useSpeechRecognition } from "@/hooks/useSpeechRecongition";
import { SearchContext } from "../context/SearchContext";
import { useEffect } from "react";
import MicrophoneSettingsIcon from "../icons/MicrophoneSettingsIcon";
import { useCallback } from "react";

function SpeechToSearchQueryBtn() {
  const { searchQuery, setSearchQuery } = React.useContext(SearchContext);
  const { startRecording, stopRecording, isRecording, recordedPhrase } = useSpeechRecognition();
  const btnClasses = classes.microphoneBtn + (isRecording ? (' ' + classes.microphoneBtnRecording) : '');

  const handleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      setSearchQuery('');
      startRecording();
    }
  }, []);

  useEffect(() => {
    if (!isRecording && recordedPhrase.length) {
      setSearchQuery(searchQuery + ' ' + recordedPhrase);
    }
  }, [recordedPhrase, isRecording]);

  return (
    <button className={btnClasses} onClick={handleRecording}>
      {isRecording
        ? <MicrophoneSettingsIcon />
        : <MicrophoneIcon />
      }
    </button>
  );
}

export default SpeechToSearchQueryBtn;

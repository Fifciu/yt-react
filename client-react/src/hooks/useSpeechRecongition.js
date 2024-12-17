import React, { useEffect } from "react";
import { LANG } from "../const";
import { useRef } from "react";
import { useCallback } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;  

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordedPhrase, setRecordedPhrase] = React.useState('');

  const recognitionRef = useRef(null);

  const appendRecordedPhrase = useCallback((phrase) => {
    setRecordedPhrase(recordedPhrase + phrase);
  }, []);

  const resetRecordedPhrase = useCallback(() => {
    setRecordedPhrase('');
  }, []);

  useEffect(() => {
    if (!SpeechRecognition) {
      return;
    }

    const r = new SpeechRecognition();
    r.continuous = true;
    r.interimResults = true;
    r.lang = LANG;
  
    r.onstart = () => {
      setIsRecording(true);
      resetRecordedPhrase();
      console.log('Recording started');
    };
  
    r.onresult = (event) => {
      let result = '';
  
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          result += event.results[i][0].transcript + ' ';
        } else {
          result += event.results[i][0].transcript;
        }
      }
  
      if (result.toLowerCase().includes('stop recording')) {
        appendRecordedPhrase(result.replace(/stop recording/gi, ''));
        stopRecording();
      } else {
        appendRecordedPhrase(result);
      }
    };
  
    r.onerror = (event) => {
      setIsRecording(false);
      console.error('Speech recognition error:', event.error);
    };
  
    r.onend = () => {
      setIsRecording(false);
      console.log('Speech recognition ended');
    };

    recognitionRef.current = r;
  
    return () => {
      r.stop();
    };
  });

  const startRecording = useCallback(() => {
    if (!recognitionRef.current) {
      console.log('Recording not supported');
      return;
    }
    recognitionRef.current.start();
  }, []);

  const stopRecording = useCallback(() => {
    if (!recognitionRef.current) {
      console.log('Recording not supported');
      return;
    }
    recognitionRef.current.stop();
  }, []);

  return {
    isSupported: Boolean(SpeechRecognition),
    startRecording,
    recordedPhrase,
    isRecording,
    stopRecording
  }
}
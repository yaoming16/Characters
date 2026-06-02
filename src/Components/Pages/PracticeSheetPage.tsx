import { useEffect } from "react";

import { Buffer } from "buffer";

import PracticePageContent from "../PraticeSheetComp/PracticePageContent";
import { usePracticeSheet } from "../../context/PracticePageContext";

import {calculateDivWidth} from "../../Aux/practiceSheetFunctions";

function PracticeSheetPage() {
  (window as any).Buffer = Buffer;

  const ps = usePracticeSheet();

  const {
    numberOfRowsPerCharacter,
    numberOfPracticeLines,
    setWarningNumberOfPracticeLines,
    changeToPreviewer,
    showPreviewer,
    numberOfSquaresPerRow,
    numberColumnSpacing,
    numberMarginLeft,
    numberMarginRight,
    openModal,
    setShowPreviewer,
  } = ps;

  // Remove practice lines warnig if rows per character increases to a value equal or higher than practice lines
  useEffect(() => {
    if (
      numberOfRowsPerCharacter >= numberOfPracticeLines &&
      numberOfPracticeLines >= 1
    ) {
      setWarningNumberOfPracticeLines(false);
    }
  }, [numberOfRowsPerCharacter, numberOfPracticeLines]);

  // Update width when previewer visibility changes or relevant props change
  useEffect(() => {
    calculateDivWidth(ps);
  }, [
    changeToPreviewer,
    showPreviewer,
    numberOfSquaresPerRow,
    numberColumnSpacing,
    numberMarginLeft,
    numberMarginRight,
  ]);

  useEffect(() => {
    // We only want to resize when the modal is not open
    const handler = () => {
      if (!openModal) {
        calculateDivWidth(ps);
      }
    };
    window.addEventListener("resize", handler);
    // Cleanup function
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [openModal]);

  // If screen is less than 1024px when the page loads we want the preview to start closed
  useEffect(() => {
    let viewportWidth = window.innerWidth;
    if (viewportWidth < 1024) {
      setShowPreviewer(false);
    }
  }, []);

  return (
      <PracticePageContent />
  );
}

export default PracticeSheetPage;

//https://github.com/skishore/makemeahanzi

export // Fuction to check if there are no warnings and show the final previewer
function changeStateIfNoWarnings(
  warningsArr: boolean[],
  setFunction: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  if (warningsArr.some((warning) => warning)) {
    console.error("Cannot generate PDF due to warnings.");
    return;
  }
  setFunction(true);
}

import { PracticeSheetContextType } from "../Types/types";

export function calculateNewWidth(
  maxWidth: number,
  ps: PracticeSheetContextType,
): number {
  const spaceBetweenSquares =
    ps.numberColumnSpacing * (ps.numberOfSquaresPerRow - 1);
  const newWidth = Math.floor(
    (maxWidth -
      spaceBetweenSquares -
      ps.numberMarginRight -
      ps.numberMarginLeft) /
      ps.numberOfSquaresPerRow,
  );
  return newWidth;
}

export function getDivWidth(id: string): number {
  const previewDivContainer = document.getElementById(id)?.offsetWidth;
  if (previewDivContainer) {
    return previewDivContainer;
  }
  return 0;
}

// Function to recalculate the width of the squares when the user resizes the window or changes the number of boxes per row or the margins or the spacing between columns
export function calculateDivWidth(ps: PracticeSheetContextType) {
  if (ps.showPreviewer) {
    // Wait a moment for the element to be visible, then recalculate
    const timer = setTimeout(() => {
      const previewDivContainer = getDivWidth("previewer-container");
      if (previewDivContainer) {
        const newWidth = calculateNewWidth(previewDivContainer, ps);
        if (newWidth > 0) {
          ps.setWidthOfTheSquaresInPx(newWidth);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }
}

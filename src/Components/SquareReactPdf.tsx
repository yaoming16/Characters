import { Text, View, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

interface SquareReactPdfType {
  character: string;
  firstCharacter: boolean;
  font: string;
  columnSpacing: number;
  gridName: string;
  widthInPx: number;
  letterOpacity: number;
}

function SquareReactPdf({
  character = "",
  firstCharacter = false,
  font,
  columnSpacing,
  gridName,
  widthInPx,
  letterOpacity,
}: SquareReactPdfType) {
  // Convert CSS font stack to registered font family name for @react-pdf/renderer
  const getFontFamily = (fontStack: string): string => {
    if (fontStack.includes("FangSong")) return "FangSong";
    if (fontStack.includes("KaiTi")) return "KaiTi";
    if (fontStack.includes("SimSun")) return "SimSun";
    return "FangSong"; // Default fallback
  };

  return (
    <View
      style={{
        marginRight: columnSpacing,
        width: widthInPx,
        height: widthInPx,
      }}
    >
      <Image
        src={gridName}
        style={{
          width: widthInPx,
          height: widthInPx,
          ...tw("absolute opacity-50"),
        }}
      ></Image>
      <View
        style={{
          width: widthInPx,
          height: widthInPx,
          ...tw("flex relative justify-center items-center"),
        }}
      >
        <Text
          style={{
            fontSize: Math.floor(widthInPx * 0.7),
            fontFamily: getFontFamily(font),
            fontWeight: firstCharacter ? "400" : "normal",
            color: firstCharacter
              ? "#000000"
              : `rgba(200, 200, 200, ${letterOpacity / 100})`,
            ...tw("leading-none ml-auto mr-auto mt-0 mb-0"),
          }}
        >
          {character}
        </Text>
      </View>
    </View>
  );
}

export default SquareReactPdf;

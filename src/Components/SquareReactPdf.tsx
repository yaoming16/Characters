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
          width: widthInPx ,
          height: widthInPx ,
          position: "absolute",
          opacity: 0.5,
        }}
      ></Image>
      <View
        style={{
          /* fontFamily: font, */
          width: widthInPx ,
          height: widthInPx ,
          ...tw("flex relative "),
        }}
      >
        <Text
          style={{
            fontSize: Math.floor(widthInPx * 0.7),
            /* fontFamily: font, */
            fontWeight: firstCharacter ? "400" : "",
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

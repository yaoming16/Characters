import { Text, View, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { SquareReactType } from "../../Types/types";
import {usePracticeSheet} from "../../context/PracticePageContext";

const tw = createTw({});

function SquareReactPdf({
  character = "",
  firstCharacter = false,
}: SquareReactType) {
  const ps = usePracticeSheet();

  const {
    font,
    columnSpacing,
    gridName,
    letterOpacity,
    widthOfTheSquaresInPx,
  } = ps;

  return (
    <View
      style={{
        marginRight: columnSpacing,
        width: widthOfTheSquaresInPx,
        height: widthOfTheSquaresInPx,
      }}
    >
      <Image
        src={gridName}
        style={{
          width: widthOfTheSquaresInPx,
          height: widthOfTheSquaresInPx,
          ...tw("absolute opacity-50"),
        }}
      ></Image>
      <View
        style={{
          width: widthOfTheSquaresInPx,
          height: widthOfTheSquaresInPx,
          ...tw("flex relative justify-center items-center"),
        }}
      >
        <Text
          style={{
            fontSize: Math.floor(widthOfTheSquaresInPx * 0.7),
            fontFamily: font,
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

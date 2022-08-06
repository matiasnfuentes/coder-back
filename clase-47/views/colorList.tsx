import { React } from "../deps.ts";
import Color from "./color.tsx";

interface Proptypes {
  colors: string[];
}

const ColorList = ({ colors }: Proptypes) => {
  return (
    <div className="d-flex flex-row">
      {colors.map((c, i) => (
        <Color color={c} key={i} />
      ))}
    </div>
  );
};

export default ColorList;

import { React } from "../deps.ts";

interface PropTypes {
  color: string;
}

const Color = ({ color }: PropTypes) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center me-2 rounded-pill"
      style={{
        width: "100px",
        height: "50px",
        background: color,
      }}
    >
      {color}
    </div>
  );
};

export default Color;

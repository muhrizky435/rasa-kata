import { BounceLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div style={{ marginTop: '25%' }} className="">
      <BounceLoader
        color="#355FBF"
        size={60}
        cssOverride={{
          display: "block",
          margin: "0 auto",
        }}/>
    </div>
  );
}
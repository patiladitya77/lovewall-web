import { useSelector } from "react-redux";

const OverView = () => {
  const stats = useSelector((store) => store?.user);
  console.log(stats);
  if (!stats) return;
  const { totalVideos, totalSpaces, plan } = stats;
  return (
    <div className="">
      <h1 className="font-bold text-3xl mx-25 my-4 p-2">Overview</h1>
      <div className="flex m-4 p-4 justify-center">
        <div className="card w-96 bg-base-100 card-xs shadow-sm  m-2 p-4 mx-8 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">Total vidoes</h2>
            <p className="text-lg font-bold text-gray-300">{totalVideos}</p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 card-xs shadow-sm   m-2 p-4 mx-8 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">Total spaces</h2>
            <p className="text-lg font-bold  text-gray-300">{totalSpaces}</p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 card-xs shadow-sm   m-2 p-4 mx-8 h-30 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">current plan</h2>
            <div className="flex">
              <p className="text-lg font-bold  text-gray-300">{plan}</p>
              <button className="bg-white text-black px-4 py-2 cursor-pointer text-md rounded-md">
                upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverView;

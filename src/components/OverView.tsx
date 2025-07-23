const OverView = () => {
  return (
    <div className="">
      <h1 className="font-bold text-3xl mx-25 my-4 p-2">Overview</h1>
      <div className="flex m-4 p-4 justify-center">
        <div className="card w-96 bg-base-300 card-xs shadow-sm  m-2 p-4 mx-8 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">Total vidoes</h2>
            <p></p>
          </div>
        </div>
        <div className="card w-96 bg-base-300 card-xs shadow-sm   m-2 p-4 mx-8 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">Total spaces</h2>
            <p></p>
          </div>
        </div>
        <div className="card w-96 bg-base-300 card-xs shadow-sm   m-2 p-4 mx-8 h-30 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-lg">current plan</h2>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverView;

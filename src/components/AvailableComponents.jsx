// import DraggableButton from "./DraggableButton";

// const AvailableComponents = () => {
//   const buttons = [...Array(10).keys(), "+", "-", "*", "/"];

//   return (
//     <div className="p-4 border rounded bg-gray-100 flex flex-wrap gap-2 shadow-md relative">
//       {buttons.map((btn) => (
//         <DraggableButton key={btn} id={`btn-${btn}`} label={btn} />
//       ))}
//     </div>
//   );
// };

// export default AvailableComponents; 



 
import DraggableButton from "./DraggableButton";

const AvailableComponents = () => {
  const buttons = [...Array(10).keys(), "+", "-", "*", "/"];

  return (
    <div className="p-4 border rounded bg-gray-100 flex flex-wrap gap-2 shadow-md relative">
      {buttons.map((btn) => (
        <DraggableButton key={btn} id={`btn-${btn}`} label={btn} />
      ))}
    </div>
  );
};

export default AvailableComponents;
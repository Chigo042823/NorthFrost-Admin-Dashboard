import { useAlert } from "../contexts/alertContext";
import { DialogHeader } from "./dialogHeader";

export function Alert({ children }) {
  const { title, isVisible, setIsVisible, text } = useAlert();

  if (!isVisible) {return};

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
      <div
        className={`text-stone-800 relative rounded-xl bg-white overflow-y-auto p-4 w-[50vw] h-[30vh]`}
      >
        <DialogHeader title={title} closeFn={() => {
          setIsVisible(false);
          } }/>
        <p className="mt-2">
          {text}
        </p>
        {children}
      </div>
    </div>
  );
}
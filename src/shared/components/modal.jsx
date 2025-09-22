import { useModal } from "@/shared/contexts/modalContext";
import { DialogHeader } from "./dialogHeader";

export function MediumModal({ name, children, size = "md" }) {
  const { currentModal, title, setCurrentModal } = useModal();

  if (currentModal !== name) return null;
  

  const sizeClasses = {
    sm: "w-[60vw] max-h-[40vh]",
    md: "w-[80vw] max-h-[88vh]",
  };

  return (
    <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
      <div
        className={`relative rounded-xl bg-white overflow-y-auto p-4 ${sizeClasses[size]}`}
      >
        {/* close button */}
        <DialogHeader title={title} closeFn={() => setCurrentModal(null)}/>

        {children}
      </div>
    </div>
  );
}

export function SmallModal({ children }) {
  const { title, text, setCurrentModal } = useModal();

  return (
    <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-stone-500/50 flex justify-center items-center">
      <div
        className={`text-stone-800 relative rounded-xl bg-white overflow-y-auto p-4 w-[85vw] md:w-[50vw] h-[20vh] md:h-[30vh]`}
      >
        <DialogHeader title={title} closeFn={() => {
          setCurrentModal(null)
          } }/>
        <p className="mt-2">
          {text}
        </p>
        {children}
      </div>
    </div>
  );
}
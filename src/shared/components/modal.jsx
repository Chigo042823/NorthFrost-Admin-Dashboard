import { useModal } from "@/shared/contexts/modalContext";
import { DialogHeader } from "./dialogHeader";

export function Modal({ name, children, size = "md" }) {
  const { currentModal, title, setCurrentModal } = useModal();

  if (currentModal !== name) return null;

  const sizeClasses = {
    sm: "w-[60vw] h-[40vh]",
    md: "w-[80vw] h-[88vh]",
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-stone-500/50 z-10 flex justify-center items-center">
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
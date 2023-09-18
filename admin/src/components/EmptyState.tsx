import { MdContentPasteSearch } from "react-icons/md";

const EmptyState = ({ message }: { message: string }) => {
  return (
    <>
      <MdContentPasteSearch className="text-9xl text-gray-500" />
      <h1 className="text-xl text-gray-500">{message}</h1>
    </>
  );
};

export default EmptyState;

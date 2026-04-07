import MessageWrapper from "./MessageWrapper";

const EmptyTableMessage = () => {
  return (
    <MessageWrapper>
      <p className="text-gray-500 dark:text-gray-400 text-lg">No tables found in the schema.</p>
    </MessageWrapper>
  );
};

export default EmptyTableMessage;

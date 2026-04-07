import MessageWrapper from "./MessageWrapper";

const NoSchemaMessage = () => {
  return (
    <MessageWrapper>
      <p className="text-gray-500 dark:text-gray-400 text-lg">Open a Prisma schema file and run the preview command.</p>
    </MessageWrapper>
  );
};

export default NoSchemaMessage;

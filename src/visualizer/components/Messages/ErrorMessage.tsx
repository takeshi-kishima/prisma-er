import MessageWrapper from "./MessageWrapper";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <MessageWrapper>
      <p className="text-red-500 text-lg font-semibold">Schema Error</p>
      <p className="text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">{message}</p>
    </MessageWrapper>
  );
};

export default ErrorMessage;

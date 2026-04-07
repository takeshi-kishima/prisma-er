import { type ReactNode } from "react";

interface MessageWrapperProps {
  children: ReactNode;
}

const MessageWrapper = ({ children }: MessageWrapperProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white dark:bg-gray-900">
      <div className="text-center p-8">
        {children}
      </div>
    </div>
  );
};

export default MessageWrapper;

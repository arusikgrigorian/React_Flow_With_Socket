"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error }: Props) {
  return (
    <div className={"flex-centered flex-col h-screen bg-gray-1 text-gray-6"}>
      <h3> {error.message} </h3>
    </div>
  );
}

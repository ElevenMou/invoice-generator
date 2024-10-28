
const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-20">
      <div className="animate-spin rounded-full border-8 border-gray-200 border-t-primary_5 h-14 w-14"></div>
    </div>
  );
};

export default Loading;

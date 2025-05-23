// @ts-nocheck : JS compatible
function SearchButton({ className, width, height, onClick }:
  {
    className?: string,
    width?: number,
    height?: number,
    onClick?: () => void,
  }) {

  return (
    //<button className={className + ' btn-primary right-3 top-1/2 transform -translate-y-1/2 text-white p-1 rounded-full'}>
    <button
      className={`${className} right-3 top-1/2 transform -translate-y-1/2 text-gray-400 p-1 rounded-full`}
      onClick={(e) => { onClick() }}
    >
      <svg xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-search">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </button>
  );
}

export default SearchButton;
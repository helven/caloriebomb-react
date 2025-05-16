// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Component imports

const ArrowProps = ({
  type,
  disabled = false,
  onClick,
  variant = 'default'
}) => {
  // Define different path patterns for each arrow type
  const paths = {
    left: "m15 18-6-6 6-6",
    right: "m9 18 6-6-6-6",
    up: "m18 15-6-6-6 6",
    down: "m6 9 6 6 6-6"
  };

  // Define different button styles based on variant
  const buttonStyles = {
    default: "p-2 rounded-md",
    circle: "p-2 rounded-full",
    square: "p-2 w-10 h-10"
  };

  // Different HTML structure based on variant
  if (variant === 'circle') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${buttonStyles.circle} ${disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={paths[type]}></path>
        </svg>
      </button>
    );
  }

  // Default button structure
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyles[variant]} ${disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={paths[type]}></path>
      </svg>
    </button>
  );
};

export default ArrowProps;
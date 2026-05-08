import {
  FaStar,
} from "react-icons/fa";

const StarRating = ({
  rating,
  setRating,
  interactive = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <FaStar
            key={star}
            onClick={() => {
              if (
                interactive
              ) {
                setRating(
                  star
                );
              }
            }}
            className={`text-2xl ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300"
            } ${
              interactive
                ? "cursor-pointer"
                : ""
            }`}
          />
        )
      )}
    </div>
  );
};

export default StarRating;
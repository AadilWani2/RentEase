import {
  useEffect,
  useState,
} from "react";

import {
  createReview,
  getProductReviews,
} from "../../features/reviews/reviewService";

import {
  useAuth,
} from "../../features/auth/AuthContext";

import StarRating from "./StarRating";
import toast from "react-hot-toast";

const ReviewsSection = ({
  productId,
}) => {
  const { user } =
    useAuth();

  const [reviews,
    setReviews] =
    useState([]);

  const [rating,
    setRating] =
    useState(5);

  const [comment,
    setComment] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews =
    async () => {
      try {
        const data =
          await getProductReviews(
            productId
          );

        setReviews(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createReview(
          productId,
          {
            rating,
            comment,
          }
        );

        setComment("");

        setRating(5);

        fetchReviews();

        toast.success(
          "Review submitted successfully"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to submit review"
        );
      }
    };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (acc, review) =>
              acc +
              review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="mt-20">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="mt-20">
      
      <div className="flex items-center gap-6 mb-10">
        
        <h2 className="text-4xl font-bold">
          Reviews
        </h2>

        <div className="flex items-center gap-3">
          
          <StarRating
            rating={Math.round(
              averageRating
            )}
          />

          <span className="text-xl font-semibold">
            {averageRating}
            {" "}
            (
            {
              reviews.length
            }
            )
          </span>
        </div>
      </div>

      {/* Review Form */}
      {user && (
        <div className="bg-white rounded-2xl shadow p-8 mb-10">
          
          <h3 className="text-2xl font-bold mb-6">
            Write a Review
          </h3>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            <StarRating
              rating={rating}
              setRating={
                setRating
              }
              interactive
            />

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl h-32"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Reviews */}
      {reviews.length ===
      0 ? (
        <div className="text-gray-600 text-lg">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-6">
          
          {reviews.map(
            (review) => (
              <div
                key={
                  review._id
                }
                className="bg-white rounded-2xl shadow p-8"
              >
                <div className="flex justify-between items-start">
                  
                  <div>
                    
                    <h4 className="text-xl font-bold">
                      {
                        review.user
                          ?.name ||
                        "User"
                      }
                    </h4>

                    <div className="mt-3">
                      
                      <StarRating
                        rating={
                          review.rating
                        }
                      />
                    </div>
                  </div>

                  <span className="text-gray-500">
                    {
                      new Date(
                        review.createdAt
                      ).toLocaleDateString()
                    }
                  </span>
                </div>

                <p className="mt-6 text-gray-700 text-lg">
                  {
                    review.comment
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
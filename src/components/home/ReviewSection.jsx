import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Emily R.",
    image: "https://i.ibb.co.com/pLjN8Dm/pexels-photo-3763188.jpg",
    comment:
      "HRMpro has made managing employee information so much easier. The interface is user-friendly, and the automation saves me a lot of time. Highly recommended for any HR department!",
    rating: 5,
  },
  {
    name: "Michael B.",
    image: "https://i.ibb.co.com/PCk7sdJ/pexels-photo-1462980.jpg",
    comment:
      "The workflow tracking feature is seamless. HRMpro allows me to efficiently track employee progress and streamline administrative tasks. It's been a game-changer for our team!",
    rating: 4,
  },
  {
    name: "Sophia C.",
    image: "https://i.ibb.co.com/kyPwLD1/pexels-photo-1687675.jpg",
    comment:
      "HRMpro is an incredible tool for any organization. It's comprehensive, reliable, and offers great support. As an HR professional, it makes managing staff incredibly easy.",
    rating: 5,
  },
  {
    name: "Rajesh P.",
    image: "https://i.ibb.co.com/92M1HNM/pexels-photo-1861594.jpg",
    comment:
      "This software truly elevates the employee management process. From payroll to performance tracking, HRMpro handles it all. Very intuitive and well-designed.",
    rating: 4,
  },
];

const ReviewSection = () => {
  return (
    <section
      className="relative bg-cover bg-center py-28 text-white bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-center mb-12 max-w-lg mx-auto">
          Don’t just take our word for it—hear what our clients have to say
          about our exceptional service!
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-lg shadow-lg p-6 space-y-4 transform hover:scale-105 transition-transform"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <FiStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;

import React ,{useState,useEffect} from 'react';

const Testimonial=()=>{

      const testimonials = [
        {
          text: "This platform helped me land a great opportunity through alumni referrals!",
          author: "Riya Sharma, MCA 2018",
        },
        {
          text: "Love how easy it is to stay connected with my batchmates and join events.",
          author: "Arjun Verma, MSC 2019",
        },
        {
          text: "Love how easy it is to stay connected with my batchmates and join events.",
          author: "Chandan Sahu, MCA 2021",
        },
      ];
      const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setAnimate(true);
      }, 400); // match the animation duration
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
    return (
        <section className="py-12 bg-white text-center">
          <h2 className="text-2xl font-bold mb-8">What Alumni Say</h2>
          <div className="max-w-2xl mx-auto relative">
            <div
              className={`p-6 border rounded shadow-sm bg-gray-50 min-h-[140px] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
              style={{ willChange: "opacity, transform" }}
            >
              <p className="italic text-lg">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="mt-4 text-sm font-semibold text-blue-700">
                - {testimonials[currentTestimonial].author}
              </p>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAnimate(false);
                    setTimeout(() => {
                      setCurrentTestimonial(idx);
                      setAnimate(true);
                    }, 400);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentTestimonial ? "bg-blue-700" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
    );
};
export default Testimonial;
"use client"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const FaqPage = () => {
  return (
    <div>
        <Navbar home={false} />
      <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions - FAQs</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. What is Roast My Code?</h2>
          <p>Roast My Code is a platform that allows developers to receive constructive criticism and feedback on their code snippets. Using AI-powered critiques, developers can submit their code and receive valuable insights on how to improve their coding skills.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How does Roast My Code work?</h2>
          <p>Users can simply paste their code snippet into the platform and select a personality for the critique, such as Andrew Tate or David Goggins. The AI critic then analyzes the code and provides feedback, highlighting areas for improvement and suggesting best practices.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Is Roast My Code free to use?</h2>
          <p>Yes, Roast My Code is currently available for free to all users. Simply sign up for an account and start receiving feedback on your code snippets right away.</p>
        </div>

      </div>
      <section className="bg-gray-100">
        <Footer />
      </section>
    </div>
  );
};

export default FaqPage;

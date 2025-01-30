import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How can I schedule an appointment?",
    answer: "You can schedule an appointment by browsing our doctors list and clicking the 'Book Appointment' button on any doctor's card. Follow the simple booking process to select your preferred date and time."
  },
  {
    question: "What should I do in case of emergency?",
    answer: "For medical emergencies, please call emergency services (911) immediately. Our platform is designed for scheduled appointments only and cannot handle emergency situations."
  },
  {
    question: "How can I cancel or reschedule my appointment?",
    answer: "To cancel or reschedule an appointment, please go to 'My Appointments' and follow the instructions. We request at least 24 hours notice for any changes."
  },
  {
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans. Please contact your insurance provider to verify coverage or reach out to our support team for specific questions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




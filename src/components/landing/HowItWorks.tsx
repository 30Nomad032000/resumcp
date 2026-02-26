"use client";

const steps = [
  {
    number: "1",
    title: "Fill or Connect AI",
    description: "Use the forms to enter your info manually, or connect your AI agent via WebMCP to populate everything automatically.",
  },
  {
    number: "2",
    title: "Pick a Template",
    description: "Choose from Professional, Modern, or Minimal. Customize further with your own CSS if you want.",
  },
  {
    number: "3",
    title: "Download PDF",
    description: "Hit download to get an ATS-friendly PDF with real selectable text. No rasterized images.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex-1 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

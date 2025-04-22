// File: src/components/sections/TraditionalWeddingSection.js
export default function TraditionalWeddingSection() {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Traditional Wedding</h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-teal-700 text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">June 14th, 2025</h3>
            <p className="text-lg">2:00 PM - 8:00 PM</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-teal-800 mb-2">Venue</h4>
              <p className="text-gray-700">The Palm Gardens<br />123 Evergreen Avenue<br />Seattle, WA 98101</p>
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-teal-800 mb-2">Schedule</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-teal-700">2:00 PM - 3:00 PM</p>
                  <p className="text-gray-700">Guest Arrival & Welcome Drinks</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">3:00 PM - 4:30 PM</p>
                  <p className="text-gray-700">Traditional Ceremony</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">4:30 PM - 5:30 PM</p>
                  <p className="text-gray-700">Cocktail Hour</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">5:30 PM - 8:00 PM</p>
                  <p className="text-gray-700">Traditional Dinner & Celebrations</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-teal-800 mb-2">Dress Code</h4>
              <p className="text-gray-700">Traditional Attire</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
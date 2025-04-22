// File: src/components/sections/ChurchWeddingSection.js
export default function ChurchWeddingSection() {
    return (
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Church Wedding</h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-teal-700 text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">June 15th, 2025</h3>
            <p className="text-lg">11:00 AM - 10:00 PM</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-teal-800 mb-2">Ceremony</h4>
              <p className="text-gray-700">St. Mary&apos;s Cathedral<br />789 Faith Street<br />Seattle, WA 98102</p>
              <p className="text-gray-700 mt-2"><strong>Time:</strong> 11:00 AM - 12:30 PM</p>
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-teal-800 mb-2">Reception</h4>
              <p className="text-gray-700">The Grand Ballroom<br />456 Celebration Road<br />Seattle, WA 98103</p>
              <p className="text-gray-700 mt-2"><strong>Time:</strong> 1:30 PM - 10:00 PM</p>
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-teal-800 mb-2">Schedule</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-teal-700">11:00 AM - 12:30 PM</p>
                  <p className="text-gray-700">Wedding Ceremony</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">1:30 PM - 3:00 PM</p>
                  <p className="text-gray-700">Cocktail Hour & Photos</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">3:00 PM - 5:00 PM</p>
                  <p className="text-gray-700">Dinner</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">5:00 PM - 5:30 PM</p>
                  <p className="text-gray-700">Speeches</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">5:30 PM - 6:00 PM</p>
                  <p className="text-gray-700">Cake Cutting</p>
                </div>
                <div>
                  <p className="font-bold text-teal-700">6:00 PM - 10:00 PM</p>
                  <p className="text-gray-700">Dancing & Celebrations</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-teal-800 mb-2">Dress Code</h4>
              <p className="text-gray-700">Formal Attire</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
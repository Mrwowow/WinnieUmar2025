import { Heart, Calendar, Clock, MapPin, Users, Music, Book, Gift } from 'lucide-react';

export default function WeddingProgrammeSection() {
  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-teal-50 to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-800 mb-4">Wedding Programme</h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">The Order of Service for Our Sacred Union</p>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">THE OLIVE BROOK CHURCH</h3>
            <h4 className="text-xl text-gray-700 mb-6">MARRIAGE CEREMONY</h4>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Date: Sat 28 Jun 2025</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">Time: 12:00 PM</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Venue:Top Rank Hotel Galaxy, Utako</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-teal-600" />
                <span className="text-gray-700">Couple: Winnie & Omar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order of Service */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-teal-700 mb-6 flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Order of Service
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">1. Processional</h4>
                <p className="text-sm text-gray-600">Congregation stands for the bridal procession</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">2. Giving of the Bride</h4>
                <p className="text-sm text-gray-600">Father presents the bride</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">3. Charge to the Couple</h4>
                <p className="text-sm text-gray-600">Reading from Ephesians 5:22-33</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">4. Profession of Vows</h4>
                <p className="text-sm text-gray-600">Exchange of marriage vows</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">5. Exchange of Rings</h4>
                <p className="text-sm text-gray-600">Presentation and blessing of rings</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">6. Pronouncement</h4>
                <p className="text-sm text-gray-600">Declaration of marriage</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">7. The Kiss</h4>
                <p className="text-sm text-gray-600">You may kiss the bride</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">8. Holy Communion</h4>
                <p className="text-sm text-gray-600">Sacred communion for the couple</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">9. Blessing of the Union</h4>
                <p className="text-sm text-gray-600">Pastoral blessing over the marriage</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">10. Family Acknowledgement</h4>
                <p className="text-sm text-gray-600">Recognition of families</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">11. Signing of Register</h4>
                <p className="text-sm text-gray-600">Official documentation</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">12. Presentation</h4>
                <p className="text-sm text-gray-600">Mr & Mrs Umaru Emmanuel Shaibu</p>
              </div>
              
              <div className="border-l-4 border-teal-600 pl-4">
                <h4 className="font-semibold text-gray-800">13. Benediction & Recessional</h4>
                <p className="text-sm text-gray-600">Closing prayer and exit processional</p>
              </div>
            </div>
          </div>

          {/* Special Elements */}
          <div className="space-y-6">
            {/* Scripture Reading */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-700 mb-4">Scripture Reading</h3>
              <div className="bg-teal-50 rounded-lg p-4">
                <h4 className="font-semibold text-teal-800 mb-2">Ephesians 5:22-33</h4>
                <p className="text-sm text-gray-700 italic">
                  &quot;For this cause shall a man leave his father and mother, and shall be joined unto his wife, and they two shall be one flesh. This is a great mystery: but I speak concerning Christ and the church.&quot;
                </p>
              </div>
            </div>

            {/* Wedding Vows */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Wedding Vows
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Omar&apos;s Vow</h4>
                  <p className="text-sm text-gray-700 italic">
                    &quot;I, Umaru Emmanuel Shaibu, according to the Word of God, leave my father and mother and join myself to you, to be a husband to you. From this moment forward, we shall be one, standing together against evil, sin, sickness and poverty as we both fulfill God&apos;s call for our lives.&quot;
                  </p>
                </div>
                
                <div className="bg-pink-50 rounded-lg p-4">
                  <h4 className="font-semibold text-pink-800 mb-2">Winnie&apos;s Vow</h4>
                  <p className="text-sm text-gray-700 italic">
                    &quot;I Winnie Ufedo Hassan, according to the Word of God, submit myself to you, to be a wife to you. From this moment forward, we shall be one, standing together against evil, sin, sickness and poverty as we both fulfill God&apos;s call for our lives.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Ring Exchange */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Ring Exchange
              </h3>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Omar:</strong> &quot;With this ring, I thee wed. It is a token of my love for you and a token of my faith that I release now, in Jesus name.&quot;
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Winnie:</strong> &quot;With this ring, I thee wed. I give it as a token of my faith; I believe with all my heart that this is forever. It is my love and my faith, in the name of Jesus.&quot;
                </p>
              </div>
            </div>

            {/* Special Music */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
                <Music className="h-5 w-5 mr-2" />
                Special Music
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Processional:</strong> [Processional Song]</p>
                <p><strong>During Ceremony:</strong> Special Songs</p>
                <p><strong>Recessional:</strong> [Recessional Song]</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
          <h3 className="text-xl font-bold text-teal-700 mb-4">A Sacred Union</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            &quot;Marriage is a blood covenant between a man and a woman with God as the first witness. This covenant is serious business and can only be successfully operated by knowledge, love and sacrifice.&quot;
          </p>
          <div className="mt-6">
            <p className="text-lg font-semibold text-teal-800">
              Mr & Mrs Umaru Emmanuel Shaibu
            </p>
            <p className="text-gray-600">United in Christ</p>
          </div>
        </div>
      </div>
    </div>
  );
}
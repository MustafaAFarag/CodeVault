/* eslint-disable react/no-unescaped-entities */
function Rules() {
  return (
    <div className="space-y-8 rounded-lg bg-gray-50 p-6 shadow-md">
      {/* English Rules Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-teal-600">
          📜 Rules and Policies
        </h1>
        <ul className="list-disc space-y-2 pl-6 text-xl">
          <li>
            Respect others in the community; hate speech and harassment are not
            tolerated.
          </li>
          <li>Share only college content or properly attributed works.</li>
          <li>No spamming or promotional content without permission.</li>
          <li>
            Maintain the privacy of others; do not share personal information
            without consent.
          </li>
          <li>Follow all applicable laws and regulations.</li>
        </ul>
      </div>

      {/* Arabic Rules Section */}
      <div className="space-y-4">
        <h1 className="text-right text-3xl font-bold text-teal-600">
          📜 القوانين والسياسات
        </h1>
        <ul className="space-y-2 pl-6 text-right text-2xl">
          <li>
            احترم الآخرين في المجتمع؛ لا يتم التسامح مع خطاب الكراهية والتحرش.
          </li>
          <li>شارك فقط المحتوى الأصلي أو الأعمال المنسوبة بشكل صحيح.</li>
          <li>لا رسائل غير مرغوب فيها أو محتوى ترويجي بدون إذن.</li>
          <li>احتفظ بخصوصية الآخرين؛ لا تشارك المعلومات الشخصية بدون إذن.</li>
          <li>اتبع جميع القوانين واللوائح المعمول بها.</li>
        </ul>
      </div>
    </div>
  );
}

export default Rules;

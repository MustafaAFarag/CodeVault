/* eslint-disable react/no-unescaped-entities */
function Updates() {
  return (
    <>
      <div className="space-y-8 rounded-lg bg-gray-50 p-6 shadow-md">
        {/* English Updates Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-teal-600">
            🚀 Latest Updates
          </h1>
          <ul className="list-disc space-y-2 pl-6 text-xl">
            <li>
              🎉 New pages are live! Check out "How to Use," "Rules/Policies,"
              and "Updates"!
            </li>
            <li>🐞 Fixed that avatar bug — Upload your picture!</li>
            <li>
              ⏳ Heads up: Notes upload is on pause until college kicks off!
            </li>
            <li>🔒 New restrictions on Full Name!</li>
            <li>
              👩‍🏫 Admin selections are now in place to smooth out the process!
            </li>
          </ul>
        </div>

        {/* Arabic Updates Section */}
        <div className="space-y-4">
          <h1 className="text-right text-3xl font-bold text-teal-600">
            🚀 آخر التحديثات
          </h1>
          <ul className="space-y-2 pl-6 text-right text-2xl">
            <li>
              🎉 الصفحات الجديدة شغالة! شوفوا "كيفية الاستخدام"،
              "القوانين/السياسات"، و"التحديثات"
            </li>
            <li>
              🐞 تم إصلاح المشكلة المزعجة في صورة البروفايل—ارفع صورتك بدون
              مشاكل
            </li>
            <li>⏳ خدوا بالكم: رفع الملاحظات متوقف لحد ما الكلية تبدأ!</li>
            <li>🔒 فيه قيود جديدة على الاسم الكامل—خلوها بسيطة يا جماعة!</li>
            <li>👩‍🏫 تم وضع اختيارات الادارة لتسهيل العملية!</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Updates;

/* eslint-disable react/no-unescaped-entities */
function RulesAndPermissions() {
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
          <li>If you Found a bug. Please Report it ASAP!</li>
          <li>Inappropriate names will result in suspension or even a ban! </li>
        </ul>

        {/* Cleaned up Roles & Permissions Section with Icons */}
        <h1 className="text-2xl font-bold text-teal-600">
          📜 Roles & Permissions
        </h1>
        <ul className="list-disc space-y-2 pl-6 text-xl">
          <li>
            <strong>🔑 Admin:</strong> Has full access to the platform.
            Permissions include:
            <ul className="list-disc pl-6">
              <li>Uploading Notes, Lectures, and Sections</li>
              <li>Creating To-Do Assignments</li>
              <li>Suspending Users</li>
              <li>Promoting Basic Users to Verified</li>
            </ul>
          </li>
          <li>
            <strong>📝 Verified:</strong> Can upload notes.
          </li>
          <li>
            <strong>👥 Basic:</strong> Has limited access, can view all sheets
            but cannot upload.
          </li>
        </ul>
        <p className="pl-6 text-lg text-red-600">
          <strong>Disclaimer:</strong> Only the Owner can promote users to
          Admin.
        </p>
      </div>

      {/* Arabic Rules and Permissions Section with Icons */}
      <div className="space-y-4">
        <h1 className="text-right text-3xl font-bold text-teal-600">
          📜 القوانين والسياسات
        </h1>
        <ul className="space-y-2 pl-6 text-right text-2xl">
          <li>احترم الآخرين في المجتمع؛ لا يتم التسامح مع خطاب الكراهية .</li>
          <li>شارك فقط المحتوى الجامعي أو الأعمال المنسوبة بشكل صحيح.</li>
          <li>لا رسائل غير مرغوب فيها أو محتوى ترويجي بدون إذن.</li>
          <li>احتفظ بخصوصية الآخرين؛ لا تشارك المعلومات الشخصية بدون إذن.</li>
          <li>إذا وجدت خطأ تقني. يرجى الإبلاغ عنه في أقرب وقت ممكن!</li>
          <li>الأسماء غير المناسبة ستؤدي إلى تعليق الحساب أو حتى حظره!</li>
        </ul>

        <h1 className="text-right text-3xl font-bold text-teal-600">
          📜 الأدوار والصلاحيات
        </h1>
        <ul className="space-y-2 pl-6 text-right text-2xl">
          <li>
            لديه وصول كامل إلى المنصة. يشمل الصلاحيات التالية
            <strong> : Admin 🔑</strong>
            <ul className="pr-6 text-right">
              <li>رفع الملاحظات، والمحاضرات، والأقسام •</li>
              <li>To-Do إنشاء مهام •</li>
              <li>تعليق المستخدمين •</li>
              <li>ترقية المستخدمين الأساسيين إلى "موثوق" •</li>
            </ul>
          </li>
          <li>
            يمكنه رفع الملاحظات <strong> : (Verified) 📝 </strong>
          </li>
          <li>
            لديه وصول محدود، يمكنه الوصول إلى جميع الأوراق لكنه لا يستطيع الرفع
            <strong> : (Basic) 👥 </strong>
          </li>
        </ul>
        <p className="text-right text-2xl text-red-600">
          (Admin) <strong>ملاحظة:</strong> المالك فقط يمكنه ترقية المستخدمين إلى
        </p>
      </div>
    </div>
  );
}

export default RulesAndPermissions;

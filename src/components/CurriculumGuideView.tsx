import React from 'react';
import { Download, CheckCircle, Calendar, Star, FileText } from 'lucide-react';
import { triggerDirectDownload } from '../utils/downloadHelper';

export const CurriculumGuideView: React.FC = () => {
  const handleDownloadStudyPlan = () => {
    triggerDirectDownload(
      {
        id: 'prep3-master-schedule',
        title: 'Prep 3 Ultimate Revision Schedule & Marks Scheme',
        titleAr: 'جدول المذاكرة الأسبوعي وتوزيع درجات الشهادة الإعدادية المعتمد',
        type: 'guide',
        pagesCount: 6,
        fileSize: '2.1 MB',
        description: 'خطة دراسية ذكية مقسمة على 4 أسابيع قبل امتحانات نصف ونهاية العام لضمان مجموع 280/280.',
        descriptionAr: 'خطة دراسية ذكية مقسمة على 4 أسابيع قبل امتحانات نصف ونهاية العام لضمان مجموع 280/280.',
        term: 1,
        downloadCount: 31000,
        contentHtml: `
          <div class="content-block">
            <h3>توزيع درجات مواد الشهادة الإعدادية الرسمية (المجموع الكلي: 280 درجة):</h3>
            <table class="styled-table">
              <thead>
                <tr>
                  <th>المادة الدراسية</th>
                  <th>درجة الترم الأول</th>
                  <th>درجة الترم الثاني</th>
                  <th>المجموع الكلي للمادة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>اللغة العربية والخط والإملاء</td>
                  <td>40 درجة</td>
                  <td>40 درجة</td>
                  <td><strong>80 درجة</strong></td>
                </tr>
                <tr>
                  <td>الرياضيات (الجبر والإحصاء 15 + الهندسة وحساب المثلثات 15)</td>
                  <td>30 درجة</td>
                  <td>30 درجة</td>
                  <td><strong>60 درجة</strong></td>
                </tr>
                <tr>
                  <td>اللغة الإنجليزية (New Hello!)</td>
                  <td>30 درجة</td>
                  <td>30 درجة</td>
                  <td><strong>60 درجة</strong></td>
                </tr>
                <tr>
                  <td>العلوم (الفيزياء، البصريات، الفضاء، الأحياء)</td>
                  <td>20 درجة</td>
                  <td>20 درجة</td>
                  <td><strong>40 درجة</strong></td>
                </tr>
                <tr>
                  <td>الدراسات الاجتماعية (الجغرافيا والتاريخ)</td>
                  <td>20 درجة</td>
                  <td>20 درجة</td>
                  <td><strong>40 درجة</strong></td>
                </tr>
                <tr style="background-color: #f1f5f9; font-weight: bold;">
                  <td>المجموع الكلي المضاف للمجموع</td>
                  <td>140 درجة</td>
                  <td>140 درجة</td>
                  <td><strong>280 درجة</strong></td>
                </tr>
              </tbody>
            </table>

            <h3>نصائح أوائل المحافظات الذهبية للشهادة الإعدادية:</h3>
            <ol>
              <li>حل امتحانات المحافظات السابقة بعد الانتهاء من كل وحدة دراسية مباشرة للتعود على صياغة واضعي الأسئلة.</li>
              <li>الاهتمام بالمسائل ذات الخطوات (Math & Science) وتوضيح القانون قبل التعويض.</li>
              <li>حفظ مواطن الجمال وقواعد النحو بدقة دون الاكتفاء بالقراءة السريعة.</li>
              <li>التدريب على كتابة البراجراف باللغة الإنجليزية في زمن محدد مع استخدام روابط الجمل الصحيحة.</li>
            </ol>
          </div>
        `,
      },
      'الشهادة الإعدادية العامة'
    );
  };

  return (
    <section id="curriculum-guide" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
              <span>دليل تفوق الشهادة الإعدادية</span>
              <span aria-hidden="true">·</span>
              <span>وزارة التربية والتعليم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              توزيع الدرجات المعتمد وخطة المذاكرة الذكية
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              تعرف على الوزن النسبي لكل مادة في المجموع النهائي (280 درجة) وكيف تنظم وقتك للوصول للدرجة النهائية.
            </p>
          </div>

          <button
            onClick={handleDownloadStudyPlan}
            className="self-start md:self-auto px-4 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>تحميل جدول المذاكرة وتوزيع الدرجات (PDF)</span>
          </button>
        </div>

        {/* Marks Table & Study Tips Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Marks Table */}
          <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>جدول توزيع درجات الشهادة الإعدادية (كنترول الوزارة):</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 px-3">المادة الدراسية</th>
                    <th className="py-2.5 px-3">الترم الأول</th>
                    <th className="py-2.5 px-3">الترم الثاني</th>
                    <th className="py-2.5 px-3">المجموع الكلي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-100/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">اللغة العربية والخط والإملاء</td>
                    <td className="py-2.5 px-3 tabular-nums">40 درجة</td>
                    <td className="py-2.5 px-3 tabular-nums">40 درجة</td>
                    <td className="py-2.5 px-3 font-bold text-sky-800 tabular-nums">80 درجة</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">الرياضيات (الجبر 15 + الهندسة 15)</td>
                    <td className="py-2.5 px-3 tabular-nums">30 درجة</td>
                    <td className="py-2.5 px-3 tabular-nums">30 درجة</td>
                    <td className="py-2.5 px-3 font-bold text-sky-800 tabular-nums">60 درجة</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">اللغة الإنجليزية (New Hello!)</td>
                    <td className="py-2.5 px-3 tabular-nums">30 درجة</td>
                    <td className="py-2.5 px-3 tabular-nums">30 درجة</td>
                    <td className="py-2.5 px-3 font-bold text-sky-800 tabular-nums">60 درجة</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">العلوم (Science)</td>
                    <td className="py-2.5 px-3 tabular-nums">20 درجة</td>
                    <td className="py-2.5 px-3 tabular-nums">20 درجة</td>
                    <td className="py-2.5 px-3 font-bold text-sky-800 tabular-nums">40 درجة</td>
                  </tr>
                  <tr className="hover:bg-slate-100/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">الدراسات الاجتماعية</td>
                    <td className="py-2.5 px-3 tabular-nums">20 درجة</td>
                    <td className="py-2.5 px-3 tabular-nums">20 درجة</td>
                    <td className="py-2.5 px-3 font-bold text-sky-800 tabular-nums">40 درجة</td>
                  </tr>
                  <tr className="bg-sky-50 font-bold text-slate-900">
                    <td className="py-3 px-3">إجمالي المجموع النهائي</td>
                    <td className="py-3 px-3 tabular-nums">140 درجة</td>
                    <td className="py-3 px-3 tabular-nums">140 درجة</td>
                    <td className="py-3 px-3 text-sky-700 text-sm tabular-nums">280 درجة</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 mt-3">
              * ملحوظة: مواد التربية الدينية، والتربية الفنية، والكمبيوتر مواد نجاح ورسوب ولا تضاف للمجموع الكلي.
            </p>
          </div>

          {/* Study Routine Tips */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>برنامج المذاكرة اليومي الفعّال (طريقة 3+1):</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>المذاكرة بالوحدات:</strong> لا تتنقل بين الدروس عشوائياً؛ أتمم الوحدة كاملة، ثم شاهد فيديو الشرح، ثم خض الاختبار الدوري التفاعلي.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>الرياضيات يومياً:</strong> خصص 45 دقيقة يومياً لحل 5 مسائل جبر وهندسة بالورقة والقلم، فالرياضيات مهارة تراكمية تعتمد على الممارسة.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>مراجعة الأخطاء:</strong> بعد إنهاء كل اختبار تفاعلي في المنصة، دوّن الأسئلة التي أخطأت فيها في كشكول مخصص "كشكول التميز".
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
              <strong className="block text-amber-950 font-bold mb-1">
                تذكير هام لطلاب الشهادة الإعدادية:
              </strong>
              <p className="leading-relaxed">
                مجموع الشهادة الإعدادية هو الذي يحدد تنسيق دخولك لمدارس المتفوقين في العلوم والتكنولوجيا (STEM) ومدارس التكنولوجيا التطبيقية والثانوي العام. اغتنم كل درجة!
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

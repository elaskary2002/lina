import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

interface FooterProps {
  onSelectSubject: (subjectId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSubject,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>منصة التفوق 3Prep</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المنصة التعليمية الأولى المتخصصة لطلاب الشهادة الإعدادية في جمهورية مصر العربية للمسار الحكومي ومدارس اللغات والتجريبي.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">أقسام المنصة</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('subjects')}
                  className="hover:text-white transition-colors"
                >
                  المواد الدراسية المقررة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('downloads')}
                  className="hover:text-white transition-colors"
                >
                  المذكرات والتحميل المباشر
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('quizzes')}
                  className="hover:text-white transition-colors"
                >
                  الاختبارات الدورية التفاعلية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('exams')}
                  className="hover:text-white transition-colors"
                >
                  بنك امتحانات المحافظات الرسمية
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">المواد الأساسية</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectSubject('english')}
                  className="hover:text-white transition-colors"
                >
                  English (New Hello! Prep 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('math')}
                  className="hover:text-white transition-colors"
                >
                  Mathematics (Algebra & Geometry)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('science')}
                  className="hover:text-white transition-colors"
                >
                  Science (Force, Optics, Universe)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSubject('arabic')}
                  className="hover:text-white transition-colors"
                >
                  اللغة العربية وقصة طموح جارية
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditation Note */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">المعايير المعتمدة</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              جميع المحتويات ونماذج الأسئلة متوافقة مع مواصفات الورقة الامتحانية الصادرة عن المركز القومي للامتحانات والتقويم التربوي بوزارة التربية والتعليم المصرية.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} منصة التفوق التعليمية للشهادة الإعدادية · جمهورية مصر العربية
          </div>
          <div className="flex items-center gap-1">
            <span>صُنعت بكل</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>لدعم طلاب مصر نحو التفوق والدرجة النهائية</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

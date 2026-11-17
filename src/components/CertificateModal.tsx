import React from 'react';
import { X, Printer, Download, Award } from 'lucide-react';

interface CertificateModalProps {
  studentName: string;
  score: number;
  totalMarks: number;
  quizTitle: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentName,
  score,
  totalMarks,
  quizTitle,
  onClose,
}) => {
  const percentage = Math.round((score / totalMarks) * 100);
  const currentDate = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <Award className="w-4 h-4" />
            <span>شهادة تفوق إلكترونية معتمدة</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة كملف PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-8 sm:p-12 bg-radial from-amber-50/40 via-white to-slate-50 relative border-8 border-double border-amber-300 m-4 rounded-xl text-center">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 right-3 text-amber-600/40 text-xs font-serif">❖ ❖ ❖</div>
          <div className="absolute top-3 left-3 text-amber-600/40 text-xs font-serif">❖ ❖ ❖</div>
          <div className="absolute bottom-3 right-3 text-amber-600/40 text-xs font-serif">❖ ❖ ❖</div>
          <div className="absolute bottom-3 left-3 text-amber-600/40 text-xs font-serif">❖ ❖ ❖</div>

          {/* Golden Badge Image */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border-2 border-amber-300">
              <img
                src="/src/assets/images/cert_badge_gold_1791657739619.jpg"
                alt="وسام التفوق الأكاديمي"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-xs font-bold text-amber-800 tracking-widest uppercase mb-1">
            جمهورية مصر العربية · منصة التفوق التعليمية
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            شهادة تفوق وإتقان أكاديمي
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            شهادة إتمام الاختبار الدوري التفاعلي للشهادة الإعدادية (الصف الثالث الإعدادي)
          </p>

          {/* Certificate Body Text */}
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            تُشهد منصة التفوق التعليمية للمسار المصري ومدارس اللغات بأن الطالب / الطالبة:
          </p>
          
          <div className="inline-block border-b-2 border-amber-500 pb-1 px-8 mb-4">
            <span className="text-xl sm:text-2xl font-extrabold text-sky-800">
              {studentName || 'طالب متميز'}
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed max-w-xl mx-auto mb-6">
            قد اجتاز بنجاح وتفوق باهر الاختبار الدوري المقرر في:
            <br />
            <strong className="text-slate-900 font-bold text-base">{quizTitle}</strong>
            <br />
            وحصل على مجموع <span className="font-bold text-sky-700">{score}</span> من <span className="font-bold text-slate-900">{totalMarks}</span> درجة بنسبة مئوية بلغت <span className="font-extrabold text-amber-600">({percentage}%)</span>.
          </p>

          {/* Footer Meta & Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200 text-xs text-slate-600 items-end">
            <div>
              <p className="text-slate-400 mb-1">تاريخ الاجتياز:</p>
              <p className="font-bold text-slate-800">{currentDate}</p>
            </div>
            
            <div>
              <p className="text-slate-400 mb-1">الرقم المرجعي:</p>
              <p className="font-mono text-slate-700 font-bold">PREP3-EG-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>

            <div>
              <p className="text-slate-400 mb-1">اعتماد المنصة:</p>
              <p className="font-bold text-amber-800">لجنة التقييم والمناهج</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

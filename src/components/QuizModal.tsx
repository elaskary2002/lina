import React, { useState, useEffect } from 'react';
import { UnitQuiz, QuizQuestion } from '../types';
import { X, Clock, AlertCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizModalProps {
  quiz: UnitQuiz;
  onClose: () => void;
  onViewCertificate: (studentName: string, score: number, total: number, quizTitle: string) => void;
  onQuizCompleted?: (quizId: string, score: number, total: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  quiz,
  onClose,
  onViewCertificate,
  onQuizCompleted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(quiz.timeLimitMinutes * 60);
  const [studentName, setStudentName] = useState('طالب متفوق');

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQuestion: QuizQuestion = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const correct = quiz.questions.reduce((acc, q, idx) => {
      return selectedAnswers[idx] === q.correctAnswerIndex ? acc + 1 : acc;
    }, 0);
    const marks = Math.round((correct / quiz.questions.length) * quiz.totalMarks);
    if (onQuizCompleted) {
      onQuizCompleted(quiz.id, marks, quiz.totalMarks);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeLeftSeconds(quiz.timeLimitMinutes * 60);
  };

  // Calculate score
  const correctCount = quiz.questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswerIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  const scoreMarks = Math.round((correctCount / quiz.questions.length) * quiz.totalMarks);

  // Format time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-xl overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
              <span>{quiz.unitTitleAr}</span>
              <span aria-hidden="true">·</span>
              <span>الاختبار الدوري التفاعلي</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {quiz.titleAr}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            /* Active Quiz Interface */
            <div className="space-y-6">
              
              {/* Question Navigation Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>
                  السؤال <strong className="text-slate-900">{currentQuestionIndex + 1}</strong> من <strong className="text-slate-900">{quiz.questions.length}</strong>
                </span>
                <span>
                  تمت الإجابة على <strong className="text-sky-700">{Object.keys(selectedAnswers).length}</strong> أسئلة
                </span>
              </div>

              {/* Question Progress Dots */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {quiz.questions.map((_, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = idx === currentQuestionIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-sky-600 text-white ring-2 ring-sky-300'
                          : isAnswered
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Question Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug" dir="auto">
                    {currentQuestion.questionAr || currentQuestion.question}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                    {currentQuestion.difficulty === 'easy' ? 'مستوى مباشر' : currentQuestion.difficulty === 'medium' ? 'مستوى متوسط' : 'مستويات عليا'}
                  </span>
                </div>

                {/* Subtitle in English if available */}
                {currentQuestion.questionAr && currentQuestion.question && (
                  <p className="text-xs text-slate-500 mb-4" dir="ltr">
                    {currentQuestion.question}
                  </p>
                )}

                {/* Options List */}
                <div className="space-y-2.5">
                  {(currentQuestion.optionsAr || currentQuestion.options).map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-right p-3.5 rounded-lg border text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-white border-sky-600 text-sky-900 shadow-xs ring-1 ring-sky-500'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span dir="auto">{option}</span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation & Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>السؤال السابق</span>
                </button>

                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
                    className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>السؤال التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
                  >
                    تسليم الإجابات وإنهاء الاختبار
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Results & Review Mode */
            <div className="space-y-6">
              
              {/* Score Highlight Box */}
              <div className="text-center p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sky-100 text-sky-700 font-extrabold text-xl mb-3">
                  {percentage}%
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-1">
                  {percentage >= 85
                    ? 'ممتاز جداً! أداء بطولي يؤهلك للمركز الأول'
                    : percentage >= 65
                    ? 'جيد جداً! راجع النقاط غير الصحيحة لضمان الدرجة النهائية'
                    : 'محاولة مقبولة! ننصح بإعادة قراءة مذكرة الشرح وخوض الاختبار ثانية'}
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  حققت <strong className="text-slate-900">{correctCount}</strong> إجابات صحيحة من أصل <strong className="text-slate-900">{quiz.questions.length}</strong> أسئلة (الدرجة: {scoreMarks} من {quiz.totalMarks}).
                </p>

                {/* Student Name Input for Certificate */}
                {percentage >= 70 && (
                  <div className="max-w-md mx-auto mb-4 p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-right">
                    <label className="block text-xs font-bold text-amber-950 mb-1">
                      اكتب اسمك الثلاثي لإصدار شهادة التفوق الرسمية:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="اسم الطالب / الطالبة..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => onViewCertificate(studentName, scoreMarks, quiz.totalMarks, quiz.titleAr)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1 shadow-2xs"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>عرض وطباعة الشهادة</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleRetake}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة الاختبار</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
                  >
                    العودة لصفحة المادة
                  </button>
                </div>
              </div>

              {/* Answers Breakdown with Explanations */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 mb-3">
                  مراجعة تفصيلية للإجابات مع نموذج الحل والشرح:
                </h5>
                <div className="space-y-4">
                  {quiz.questions.map((q, idx) => {
                    const userAnswer = selectedAnswers[idx];
                    const isCorrect = userAnswer === q.correctAnswerIndex;
                    const optionsList = q.optionsAr || q.options;

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border text-xs ${
                          isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                            <span className="font-bold text-slate-900">
                              س{idx + 1}: {q.questionAr || q.question}
                            </span>
                          </div>
                          <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة'}
                          </span>
                        </div>

                        <div className="space-y-1 mb-2 pr-6">
                          <p className="text-slate-700">
                            <strong>إجابتك:</strong>{' '}
                            {userAnswer !== undefined ? optionsList[userAnswer] : 'لم تتم الإجابة'}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-800">
                              <strong>الإجابة الصحيحة المعتمدة:</strong>{' '}
                              {optionsList[q.correctAnswerIndex]}
                            </p>
                          )}
                        </div>

                        <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 pr-6 text-slate-600">
                          <strong className="text-slate-900 block mb-0.5">توضيح القاعدة ونموذج الإجابة:</strong>
                          <p>{q.explanationAr || q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

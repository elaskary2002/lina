import React, { useState } from 'react';
import { Subject, TermType, StudyUnit } from '../types';
import { ProgressData } from '../utils/progressTracker';
import { Calendar, Clock, CheckCircle2, Printer, Sparkles, BookOpen, BellRing } from 'lucide-react';

interface StudySchedulePlannerProps {
  subjects: Subject[];
  currentTerm: TermType;
  progress: ProgressData;
}

interface ScheduleDay {
  dayName: string;
  dayNameEn: string;
  tasks: {
    subjectName: string;
    unitTitle: string;
    duration: string;
    type: 'theory' | 'exercises' | 'revision';
    completed: boolean;
  }[];
}

export const StudySchedulePlanner: React.FC<StudySchedulePlannerProps> = ({
  subjects,
  currentTerm,
  progress,
}) => {
  const [intensity, setIntensity] = useState<'balanced' | 'intensive'>('balanced');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [notificationStatus, setNotificationStatus] = useState<string>('');
  const [customTasks, setCustomTasks] = useState<Record<number, { id: string; subjectName: string; unitTitle: string; duration: string; type: 'theory' | 'exercises' | 'revision'; completed: boolean }[]>>({});
  const [activeDayForAdd, setActiveDayForAdd] = useState<number | null>(null);
  const [newSubject, setNewSubject] = useState('اللغة العربية');
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('ساعة واحدة');
  const [newType, setNewType] = useState<'theory' | 'exercises' | 'revision'>('theory');

  // Gather all uncompleted units across subjects for the current term
  const remainingUnits: { subjectName: string; subjectId: string; unit: StudyUnit }[] = [];
  subjects.forEach((subj) => {
    const termUnits = subj.units.filter((u) => u.term === currentTerm);
    termUnits.forEach((unit) => {
      const isDone = progress.completedUnits[`${subj.id}_${unit.id}`];
      if (!isDone) {
        remainingUnits.push({
          subjectName: subj.nameAr,
          subjectId: subj.id,
          unit,
        });
      }
    });
  });

  // Generate 7-day schedule based on remaining units
  const daysOfWeek = [
    { dayName: 'السبت', dayNameEn: 'Saturday' },
    { dayName: 'الأحد', dayNameEn: 'Sunday' },
    { dayName: 'الإثنين', dayNameEn: 'Monday' },
    { dayName: 'الثلاثاء', dayNameEn: 'Tuesday' },
    { dayName: 'الأربعاء', dayNameEn: 'Wednesday' },
    { dayName: 'الخميس', dayNameEn: 'Thursday' },
    { dayName: 'الجمعة', dayNameEn: 'Friday (مراجعة أسبوعية وتثبيت)' },
  ];

  // Distribute remaining units across the first 6 days (Friday is reserved for weekly review)
  const scheduleDays: (ScheduleDay & { customTasksList: typeof customTasks[0] })[] = daysOfWeek.map((day, dayIdx) => {
    const tasks: ScheduleDay['tasks'] = [];

    if (dayIdx === 6) {
      // Friday review day
      tasks.push({
        subjectName: 'مراجعة شاملة',
        unitTitle: 'حل اختبارات المحافظات السابقة وتثبيت القواعد',
        duration: 'ساعتان',
        type: 'revision',
        completed: Boolean(completedTasks[`day_6_0`]),
      });
    } else {
      // Assign 1 or 2 units per day depending on intensity and availability
      const unitsPerDay = intensity === 'intensive' ? 2 : 1;
      const startIndex = (dayIdx * unitsPerDay) % Math.max(1, remainingUnits.length);
      
      for (let i = 0; i < unitsPerDay; i++) {
        const item = remainingUnits[(startIndex + i) % remainingUnits.length];
        if (item) {
          tasks.push({
            subjectName: item.subjectName,
            unitTitle: item.unit.titleAr,
            duration: intensity === 'intensive' ? 'ساعة ونصف' : 'ساعة واحدة',
            type: i === 0 ? 'theory' : 'exercises',
            completed: Boolean(completedTasks[`day_${dayIdx}_${i}`]),
          });
        }
      }

      // If no remaining units, add a general review task
      if (tasks.length === 0) {
        tasks.push({
          subjectName: 'تثبيت ومراجعة',
          unitTitle: 'أتممت جميع الوحدات! قم بحل اختبارات شاملة لضمان التفوق.',
          duration: 'ساعة واحدة',
          type: 'revision',
          completed: Boolean(completedTasks[`day_${dayIdx}_0`]),
        });
      }
    }

    return {
      ...day,
      tasks,
      customTasksList: customTasks[dayIdx] || [],
    };
  });

  const toggleTaskCompletion = (dayIdx: number, taskIdx: number) => {
    const key = `day_${dayIdx}_${taskIdx}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCustomTaskCompletion = (dayIdx: number, customTaskId: string) => {
    setCustomTasks((prev) => {
      const list = prev[dayIdx] || [];
      return {
        ...prev,
        [dayIdx]: list.map((t) => (t.id === customTaskId ? { ...t, completed: !t.completed } : t)),
      };
    });
  };

  const handleAddCustomTask = (dayIdx: number) => {
    if (!newTitle.trim()) return;
    const newTask = {
      id: `custom-${Date.now()}`,
      subjectName: newSubject,
      unitTitle: newTitle.trim(),
      duration: newDuration,
      type: newType,
      completed: false,
    };
    setCustomTasks((prev) => ({
      ...prev,
      [dayIdx]: [...(prev[dayIdx] || []), newTask],
    }));
    setNewTitle('');
    setActiveDayForAdd(null);
  };

  const handleDeleteCustomTask = (dayIdx: number, customTaskId: string) => {
    setCustomTasks((prev) => ({
      ...prev,
      [dayIdx]: (prev[dayIdx] || []).filter((t) => t.id !== customTaskId),
    }));
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  const mapJsDayToScheduleIdx = (jsD: number) => {
    if (jsD === 6) return 0; // Saturday
    if (jsD === 0) return 1; // Sunday
    if (jsD === 1) return 2; // Monday
    if (jsD === 2) return 3; // Tuesday
    if (jsD === 3) return 4; // Wednesday
    if (jsD === 4) return 5; // Thursday
    return 6; // Friday
  };

  const handleEnableNotifications = async () => {
    if (!('Notification' in window)) {
      alert('متصفحك لا يدعم إشعارات المتصفح.');
      return;
    }

    if (Notification.permission === 'granted') {
      sendStudyNotification();
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        sendStudyNotification();
      } else {
        setNotificationStatus('تم رفض إذن إشعارات المتصفح.');
        setTimeout(() => setNotificationStatus(''), 4000);
      }
    } else {
      setNotificationStatus('إشعارات المتصفح معطلة. يرجى تفعيلها من إعدادات المتصفح.');
      setTimeout(() => setNotificationStatus(''), 4000);
    }
  };

  const sendStudyNotification = () => {
    const todayIdx = mapJsDayToScheduleIdx(new Date().getDay());
    const todaySchedule = scheduleDays[todayIdx];
    const taskTitles = todaySchedule?.tasks.map((t) => `${t.subjectName}: ${t.unitTitle}`).join('، ') || 'لا توجد مهام اليوم';

    try {
      new Notification('منصة التفوق | موعد جدول المذاكرة اليومي 📚', {
        body: `جدولك اليوم (${todaySchedule.dayName}): ${taskTitles}. استعد لتحقيق التفوق والتميز!`,
        icon: '/favicon.ico'
      });
      setNotificationStatus('تم تفعيل وإرسال إشعار التذكير بالمذاكرة بنجاح!');
      setTimeout(() => setNotificationStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setNotificationStatus(`موعدك اليوم (${todaySchedule.dayName}): ${taskTitles}`);
    }
  };

  return (
    <section id="study-schedule" className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
              <Calendar className="w-4 h-4" />
              <span>تنظيم الوقت الذكي وتعديل الجدول</span>
              <span aria-hidden="true">·</span>
              <span>الشهادة الإعدادية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              جدول المذاكرة الأسبوعي القابل للتعديل والإدارة الشخصية
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              نظام ذكي يوزع الوحدات تلقائياً مع إمكانية إضافة أو تعديل المهام الدراسية وتخصيص جدولك اليومي بحرية تامة.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Intensity Switcher */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setIntensity('balanced')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  intensity === 'balanced' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                نسق متوازن (وحدة يومياً)
              </button>
              <button
                onClick={() => setIntensity('intensive')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  intensity === 'intensive' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                نسق مكثف (وحدتان يومياً)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEnableNotifications}
                className="px-3.5 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                title="تفعيل إشعارات المتصفح للتذكير بمواعيد المذاكرة"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>تذكير المذاكرة</span>
              </button>

              <button
                onClick={handlePrintSchedule}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة الجدول</span>
              </button>
            </div>
          </div>

          {/* Notification Feedback Banner */}
          {notificationStatus && (
            <div className="mt-3 p-3 rounded-xl bg-sky-600 text-white text-xs font-bold flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 animate-bounce" />
                <span>{notificationStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* 7-Day Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scheduleDays.map((day, dayIdx) => (
            <div
              key={dayIdx}
              className={`rounded-xl border p-5 bg-white transition-all shadow-2xs flex flex-col justify-between ${
                dayIdx === 6 ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {day.dayName}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      {day.dayNameEn}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveDayForAdd(dayIdx)}
                    className="px-2.5 py-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-md border border-sky-200 transition-colors"
                  >
                    + إضافة مهمة
                  </button>
                </div>

                {/* Add Custom Task Form Inline for this day */}
                {activeDayForAdd === dayIdx && (
                  <div className="mb-3 p-3 rounded-lg bg-sky-50/90 border border-sky-200 text-xs space-y-2">
                    <div className="font-bold text-sky-900">إضافة مهمة مذاكرة جديدة:</div>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded-md"
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.nameAr}>{s.nameAr}</option>
                      ))}
                      <option value="مراجعة شاملة">مراجعة شاملة</option>
                      <option value="حل امتحانات">حل امتحانات المحافظات</option>
                    </select>
                    <input
                      type="text"
                      placeholder="عنوان الدرس أو المنهج..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-1.5 text-xs bg-white border border-slate-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        className="w-1/2 p-1 text-[11px] bg-white border border-slate-300 rounded-md"
                      >
                        <option value="ساعة واحدة">ساعة واحدة</option>
                        <option value="ساعة ونصف">ساعة ونصف</option>
                        <option value="ساعتان">ساعتان</option>
                      </select>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="w-1/2 p-1 text-[11px] bg-white border border-slate-300 rounded-md"
                      >
                        <option value="theory">شرح ومذاكرة</option>
                        <option value="exercises">حل تمارين</option>
                        <option value="revision">مراجعة</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-1.5 pt-1">
                      <button
                        onClick={() => setActiveDayForAdd(null)}
                        className="px-2.5 py-1 text-[11px] text-slate-600 bg-white border border-slate-300 rounded-md"
                      >
                        إلغاء
                      </button>
                      <button
                        onClick={() => handleAddCustomTask(dayIdx)}
                        className="px-3 py-1 text-[11px] font-bold text-white bg-sky-600 rounded-md"
                      >
                        حفظ المهمة
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Generated Tasks */}
                  {day.tasks.map((task, taskIdx) => {
                    const isTaskDone = task.completed;

                    return (
                      <div
                        key={taskIdx}
                        onClick={() => toggleTaskCompletion(dayIdx, taskIdx)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isTaskDone
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-sky-800">
                            {task.subjectName}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.duration}
                          </span>
                        </div>

                        <p className={`text-xs leading-relaxed mb-2 ${isTaskDone ? 'line-through text-emerald-800' : 'text-slate-700'}`}>
                          {task.unitTitle}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 text-[11px]">
                          <span className="text-slate-500 capitalize">
                            {task.type === 'theory' ? '📖 شرح ومذاكرة' : task.type === 'exercises' ? '✏️ حل تمارين' : '⭐ مراجعة شاملة'}
                          </span>
                          <span className={`font-semibold flex items-center gap-1 ${isTaskDone ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                            <CheckCircle2 className={`w-3.5 h-3.5 ${isTaskDone ? 'text-emerald-600' : 'text-slate-300'}`} />
                            {isTaskDone ? 'تم الإنجاز' : 'وضع علامة إنجاز'}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom Added Tasks */}
                  {day.customTasksList.map((ct) => (
                    <div
                      key={ct.id}
                      className={`p-3 rounded-lg border transition-all ${
                        ct.completed
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : 'bg-sky-50/50 hover:bg-sky-50 border-sky-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-purple-800 flex items-center gap-1">
                          <span>{ct.subjectName}</span>
                          <span className="text-[9px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded-sm">مهمة مخصصة</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500">{ct.duration}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomTask(dayIdx, ct.id);
                            }}
                            className="text-rose-500 hover:text-rose-700 text-[10px]"
                            title="حذف المهمة"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <p
                        onClick={() => toggleCustomTaskCompletion(dayIdx, ct.id)}
                        className={`text-xs leading-relaxed mb-2 cursor-pointer ${ct.completed ? 'line-through text-emerald-800' : 'text-slate-700'}`}
                      >
                        {ct.unitTitle}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 text-[11px]">
                        <span className="text-slate-500 capitalize">
                          {ct.type === 'theory' ? '📖 شرح ومذاكرة' : ct.type === 'exercises' ? '✏️ حل تمارين' : '⭐ مراجعة شاملة'}
                        </span>
                        <span
                          onClick={() => toggleCustomTaskCompletion(dayIdx, ct.id)}
                          className={`font-semibold flex items-center gap-1 cursor-pointer ${ct.completed ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${ct.completed ? 'text-emerald-600' : 'text-slate-300'}`} />
                          {ct.completed ? 'تم الإنجاز' : 'إنجاز'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

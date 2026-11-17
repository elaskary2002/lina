import { ResourceFile, GovernorateExam } from '../types';

export function triggerDirectDownload(resource: ResourceFile, subjectName: string) {
  // Generate a rich, formatted printable study sheet / exam document
  const fileName = `${subjectName}_${resource.title.replace(/\s+/g, '_')}_Prep3.html`;
  
  const content = generateRichDocumentHtml({
    title: resource.titleAr || resource.title,
    subTitle: `الصف الثالث الإعدادي (الشهادة الإعدادية) - المسار المصري واللغات`,
    subject: subjectName,
    typeLabel: getResourceTypeName(resource.type),
    term: resource.term === 1 ? 'الفصل الدراسي الأول' : 'الفصل الدراسي الثاني',
    pages: resource.pagesCount,
    fileSize: resource.fileSize,
    description: resource.descriptionAr || resource.description,
    bodyHtml: resource.contentHtml || getDefaultContentForResource(resource, subjectName)
  });

  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function openPrintablePreview(resource: ResourceFile, subjectName: string) {
  const content = generateRichDocumentHtml({
    title: resource.titleAr || resource.title,
    subTitle: `الصف الثالث الإعدادي - المسار المصري واللغات`,
    subject: subjectName,
    typeLabel: getResourceTypeName(resource.type),
    term: resource.term === 1 ? 'الفصل الدراسي الأول' : 'الفصل الدراسي الثاني',
    pages: resource.pagesCount,
    fileSize: resource.fileSize,
    description: resource.descriptionAr || resource.description,
    bodyHtml: resource.contentHtml || getDefaultContentForResource(resource, subjectName)
  });

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
  }
}

export function triggerExamDownload(exam: GovernorateExam) {
  const fileName = `امتحان_${exam.governorateNameAr}_${exam.subjectNameAr}_Prep3_${exam.year}.html`;
  
  const content = generateRichDocumentHtml({
    title: `امتحان محافظة ${exam.governorateNameAr} - ${exam.subjectNameAr}`,
    subTitle: `امتحان الشهادة الإعدادية الرسمية - عام ${exam.year} - ${exam.term === 1 ? 'الفصل الدراسي الأول' : 'الفصل الدراسي الثاني'}`,
    subject: exam.subjectNameAr,
    typeLabel: 'ورقة امتحان رسمية + نموذج إجابة',
    term: exam.term === 1 ? 'الفصل الدراسي الأول' : 'الفصل الدراسي الثاني',
    pages: 4,
    fileSize: exam.fileSize,
    description: `امتحان رسمي صادر عن مديرية التربية والتعليم بمحافظة ${exam.governorateNameAr}، يشمل الأسئلة كاملة ونموذج توزيع الدرجات المعتمد.`,
    bodyHtml: `
      <div class="exam-header-box">
        <div class="flex-between">
          <div>
            <p><strong>مديرية التربية والتعليم بمحافظة ${exam.governorateNameAr}</strong></p>
            <p>امتحان إتمام شهادة التعليم الأساسي</p>
            <p>المادة: <strong>${exam.subjectNameAr} (${exam.subjectNameEn})</strong></p>
          </div>
          <div class="center-text">
            <h3>جمهورية مصر العربية</h3>
            <p>العام الدراسي: <strong>${exam.year}</strong></p>
            <p>الدرجة العظمى: <strong>${exam.totalMarks} درجة</strong></p>
          </div>
          <div style="text-align: left;">
            <p>الزمن: ساعتان ونصف</p>
            <p>الفصل: ${exam.term === 1 ? 'الدور الأول' : 'الدور الثاني'}</p>
            <p>المسار: اللغات والعام</p>
          </div>
        </div>
      </div>

      <div class="exam-instructions">
        <p><strong>تنبيهات هامة للطالب:</strong> أجب عن جميع الأسئلة الآتية. تأكد من وضوح خطوات الحل ورسم الأشكال الهندسية والرسوم البيانية بدقة بالقلم الرصاص.</p>
      </div>

      <div class="exam-section">
        <h3>السؤال الأول (إجباري - 10 درجات):</h3>
        <p>اختر الإجابة الصحيحة من بين الإجابات المعطاة:</p>
        <ol>
          <li>إذا كانت النقطة (أ ، 3) تقع على محور الصادات، فإن قيمة أ = ... [ <strong>(أ) 0</strong> | (ب) 3 | (جـ) -3 | (د) 1 ]</li>
          <li>السرعة المنتظمة التي يتحرك بها جسم يقطع مسافة 180 كم في ساعتين = ... [ (أ) 45 كم/س | <strong>(ب) 90 كم/س</strong> | (جـ) 25 م/ث | (د) 50 م/ث ]</li>
          <li>The image formed by a convex lens when object is at twice the focal length (2F) is: [ (a) Virtual, erect | <strong>(b) Real, inverted, equal</strong> | (c) Real, magnified ]</li>
          <li>If sin(X) = 0.5, where X is an acute angle, then the measure of angle X = [ <strong>(a) 30°</strong> | (b) 45° | (c) 60° | (d) 90° ]</li>
        </ol>
      </div>

      <div class="exam-section">
        <h3>السؤال الثاني (مسائل وخطوات - 10 درجات):</h3>
        <p><strong>(أ)</strong> إذا كان المستقيم المار بالنقطتين (3 ، ص) و (4 ، 5) يوازي محور السينات، فأوجد قيمة ص مع التعليل.</p>
        <p><strong>(ب)</strong> سيارة تحركت من السكون حتى بلغت سرعتها 20 م/ث خلال 5 ثوانٍ، احسب مقدار العجلة التي تحركت بها السيارة واذكر نوعها.</p>
        <div class="solution-box">
          <h4>نموذج الإجابة والخطوات:</h4>
          <p><strong>حل (أ):</strong> ميل المستقيم الموازي لمحور السينات = 0. إذن: (5 - ص) / (4 - 3) = 0 &rArr; 5 - ص = 0 &rArr; ص = 5.</p>
          <p><strong>حل (ب):</strong> السرعة الابتدائية ع<sub>1</sub> = 0 ، السرعة النهائية ع<sub>2</sub> = 20 م/ث ، الزمن ز = 5 ثوانٍ.<br/>
          العجلة ج = (ع<sub>2</sub> - ع<sub>1</sub>) / ز = (20 - 0) / 5 = <strong>4 م/ث²</strong> (عجلة منتظمة موجبة تزايدية).</p>
        </div>
      </div>

      <div class="exam-section">
        <h3>السؤال الثالث (أسئلة المقال والتطبيق - 10 درجات):</h3>
        <p><strong>(أ)</strong> علل لما يأتي: تعتبر العدسة المحدبة مجمعة بينما المقعرة مفرقة للأشعة الضوئية.</p>
        <p><strong>(ب)</strong> Write a paragraph of about (90) words on: "How to be a helpful member in your community".</p>
      </div>
    `
  });

  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getResourceTypeName(type: string): string {
  switch (type) {
    case 'textbook': return 'كتاب المدرسة الرسمي الوزاري';
    case 'workbook': return 'كتاب التدريبات والأنشطة (Workbook)';
    case 'summary': return 'مذكرة شرح وتلخيص شامل';
    case 'formula_sheet': return 'مخطط القوانين والمفاهيم الذهبية';
    case 'exam_model': return 'نماذج امتحانات متوقعة بالإجابات';
    case 'guide': return 'دليل المعلم وولي الأمر';
    default: return 'ملف دراسي معتمد';
  }
}

function getDefaultContentForResource(resource: ResourceFile, subjectName: string): string {
  return `
    <div class="content-block">
      <h3>مقدمة المذكرة وأهم محتويات الوحدة:</h3>
      <p>هذا الملف أعد خصيصاً لطلاب الصف الثالث الإعدادي (المسار المصري ومدارس اللغات والتجريبي) ليغطي أدق تفاصيل مادة <strong>${subjectName}</strong>، ويشمل القواعد الأساسية وأسئلة الامتحانات المتكررة مع إجاباتها النموذجية.</p>
      
      <div class="highlight-card">
        <h4>نقاط التركيز الذهبية لامتحان نصف ونهاية العام:</h4>
        <ul>
          <li>فهم المصطلحات العلمية والتعريفات الدقيقة المقررة وزارياً.</li>
          <li>حل التمارين والمسائل التدريجية من السهل إلى مسائل المستويات العليا وتفكير المتفوقين.</li>
          <li>التدريب على نماذج إجابة كنترول الشهادة الإعدادية لضمان الدرجة النهائية (40/40 أو 30/30).</li>
        </ul>
      </div>

      <h3>ملخص الدروس والمفاهيم الأساسية:</h3>
      <p>${resource.descriptionAr || resource.description}</p>
      
      <div class="review-table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>المفهوم / الدرس</th>
              <th>الشرح والقانون</th>
              <th>ملاحظات الامتحان</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>المفهوم الأول</td>
              <td>العلاقات الأساسية والتعريفات الوزارية المعتمدة</td>
              <td>يتكرر سنوياً في سؤال المصطلح العلمي أو الاختيار</td>
            </tr>
            <tr>
              <td>القوانين التطبيقية</td>
              <td>خطوات التعويض المباشر مع وحدات القياس الصحيحة</td>
              <td>يجب كتابة القانون قبل التعويض لنيل نصف الدرجة</td>
            </tr>
            <tr>
              <td>مسألة التميز</td>
              <td>الربط بين أكثر من وحدة دراسية للوصول للناتج النهائي</td>
              <td>مخصصة للطلاب الراغبين في المركز الأول على المحافظة</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer-tips">
        <p><strong>نصيحة للمذاكرة:</strong> راجع هذا الملخص بعد الانتهاء من مشاهدة فيديو الشرح في المنصة، ثم انتقل مباشرة للاختبار التفاعلي للوحدة لقياس مستواك فوراً.</p>
      </div>
    </div>
  `;
}

function generateRichDocumentHtml(params: {
  title: string;
  subTitle: string;
  subject: string;
  typeLabel: string;
  term: string;
  pages: number;
  fileSize: string;
  description: string;
  bodyHtml: string;
}): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${params.title} - Prep 3 Egypt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Cairo', Arial, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
      padding: 24px;
    }
    .document-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .header-bar h1 {
      font-size: 24px;
      color: #0f172a;
      font-weight: 800;
    }
    .header-meta {
      font-size: 13px;
      color: #64748b;
      margin-top: 4px;
    }
    .badge-pill {
      background: #e0f2fe;
      color: #0369a1;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      display: inline-block;
    }
    .document-meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      background: #f1f5f9;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .meta-item strong {
      display: block;
      color: #475569;
      margin-bottom: 2px;
    }
    .content-body {
      font-size: 15px;
      color: #1e293b;
    }
    .content-body h3 {
      font-size: 18px;
      color: #0f172a;
      margin: 20px 0 10px 0;
      border-right: 4px solid #0284c7;
      padding-right: 10px;
    }
    .highlight-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 18px;
      margin: 20px 0;
    }
    .highlight-card h4 {
      color: #0369a1;
      margin-bottom: 10px;
    }
    .highlight-card ul {
      padding-right: 20px;
    }
    .highlight-card li {
      margin-bottom: 8px;
    }
    .styled-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    .styled-table th, .styled-table td {
      border: 1px solid #cbd5e1;
      padding: 10px 14px;
      text-align: right;
    }
    .styled-table th {
      background-color: #f1f5f9;
      font-weight: 700;
    }
    .exam-header-box {
      border: 1px solid #0f172a;
      padding: 14px;
      margin-bottom: 20px;
      font-size: 13px;
    }
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .center-text {
      text-align: center;
    }
    .exam-instructions {
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 10px 14px;
      font-size: 13px;
      color: #92400e;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    .exam-section {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px dashed #cbd5e1;
    }
    .exam-section ol {
      padding-right: 20px;
      margin-top: 10px;
    }
    .exam-section li {
      margin-bottom: 8px;
    }
    .solution-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 14px;
      margin-top: 12px;
      border-radius: 6px;
      font-size: 14px;
    }
    .solution-box h4 {
      color: #166534;
      margin-bottom: 6px;
    }
    .actions-bar {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
    }
    .print-button {
      background: #0284c7;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .document-container {
        border: none;
        box-shadow: none;
        padding: 0;
      }
      .actions-bar, .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="header-bar">
      <div>
        <h1>${params.title}</h1>
        <p class="header-meta">${params.subTitle} · مادة: <strong>${params.subject}</strong></p>
      </div>
      <div>
        <span class="badge-pill">${params.typeLabel}</span>
      </div>
    </div>

    <div class="document-meta-grid">
      <div class="meta-item">
        <strong>الفصل الدراسي:</strong>
        <span>${params.term}</span>
      </div>
      <div class="meta-item">
        <strong>عدد الصفحات:</strong>
        <span>${params.pages} صفحة</span>
      </div>
      <div class="meta-item">
        <strong>حجم المستند:</strong>
        <span>${params.fileSize}</span>
      </div>
      <div class="meta-item">
        <strong>جهة الاعتماد:</strong>
        <span>وزارة التربية والتعليم</span>
      </div>
    </div>

    <div class="content-body">
      ${params.bodyHtml}
    </div>

    <div class="actions-bar no-print">
      <div style="font-size: 13px; color: #64748b;">
        منصة التفوق التعليمية · الشهادة الإعدادية المسار المصري واللغات
      </div>
      <button class="print-button" onclick="window.print()">طباعة كملف PDF (Ctrl + P)</button>
    </div>
  </div>
</body>
</html>`;
}

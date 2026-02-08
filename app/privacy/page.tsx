'use client'

import { useLocale } from '@/context/LocaleContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FadeInUp } from '@/components/animations/FadeInUp'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'

export default function PrivacyPolicy() {
  const { locale } = useLocale()
  const isRtl = locale === 'ar'

  const content = locale === 'ar' ? contentAr : contentEn

  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-gradient-to-b from-base via-primary/[0.02] to-base">
        {/* Background pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.015]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <pattern
              id="privacy-pattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 8 L112 60 L60 112 L8 60 Z"
                fill="none"
                stroke="rgb(11 70 52)"
                strokeWidth="0.25"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacy-pattern)" />
        </svg>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-28">
          <FadeInUp>
            <div className="text-center">
              <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
              <h1 className="mt-6 text-4xl font-bold tracking-royal text-primary sm:text-5xl">
                {content.title}
              </h1>
              <p className="mt-4 text-lg text-primary/70">
                {content.lastUpdated}
              </p>
            </div>
          </FadeInUp>

          <StaggerChildren className="mt-14 space-y-10">
            {content.sections.map((section, i) => (
              <StaggerItem key={i}>
                <div className="rounded-2xl border border-accent/20 bg-white p-8 shadow-lg sm:p-10">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10 text-lg font-bold text-primary">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-primary">
                        {section.heading}
                      </h2>
                      <div className="mt-4 space-y-4 text-[15px] text-primary/80 leading-relaxed">
                        {section.content.map((paragraph, j) => (
                          <p key={j}>{paragraph}</p>
                        ))}
                      </div>
                      {section.list && (
                        <ul className="mt-4 space-y-2">
                          {section.list.map((item, k) => (
                            <li key={k} className="flex gap-3 text-[15px] text-primary/80">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.additionalContent && (
                        <div className="mt-4 space-y-4 text-[15px] text-primary/80 leading-relaxed">
                          {section.additionalContent.map((paragraph, m) => (
                            <p key={m}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {/* Contact section */}
          <div className="mt-14 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-8 text-center shadow-lg">
            <h2 className="text-xl font-bold text-primary">
              {content.contact.title}
            </h2>
            <p className="mt-3 text-[15px] text-primary/80">
              {content.contact.text}
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@velocrux.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-primary shadow-md transition-all hover:bg-accent/90 hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              kauser@velocrux.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

const contentEn = {
  title: 'Privacy Policy',
  lastUpdated: 'Last Updated: February 7, 2026',
  sections: [
    {
      heading: 'Introduction',
      content: [
        'ArabAudit ("we," "our," or "us") is committed to protecting the privacy and security of your information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our AI-powered audit compliance platform.',
        'As a Saudi-native platform serving organizations subject to NCA ECC-2024, SAMA CSF, and PDPL regulations, we understand the critical importance of data protection and regulatory compliance.',
      ],
    },
    {
      heading: 'Information We Collect',
      content: [
        'We collect information that you provide directly to us, as well as information automatically collected when you use our platform:',
      ],
      list: [
        'Account Information: Name, email address, organization details, role, and contact information',
        'Audit Evidence: Documents, log files, screenshots, configurations, and other evidence you upload for compliance analysis',
        'Technical Data: IP addresses, browser type, device information, and usage patterns',
        'Communication Data: Messages, support requests, and feedback you provide',
        'Framework Selections: Your chosen regulatory frameworks (NCA, SAMA, PDPL) and compliance requirements',
      ],
    },
    {
      heading: 'How We Use Your Information',
      content: [
        'We use the information we collect to provide, maintain, and improve our services:',
      ],
      list: [
        'AI Analysis: Process your evidence through our AI engine to validate compliance against NCA, SAMA, and PDPL requirements',
        'Regulatory Export: Generate official audit-ready reports and regulatory export templates',
        'Platform Operation: Provide access to dashboards, control mappings, and compliance tracking',
        'Communication: Send service updates, security alerts, and support responses',
        'Improvement: Analyze usage patterns to enhance platform functionality and user experience',
        'Security: Detect and prevent fraudulent activity, security breaches, and unauthorized access',
      ],
    },
    {
      heading: 'Data Processing and AI',
      content: [
        'Our AI engine processes your audit evidence to provide deep technical validation. This includes:',
      ],
      list: [
        'Reading and analyzing uploaded documents, log files, and configurations',
        'Mapping evidence to specific NCA, SAMA, and PDPL control requirements',
        'Identifying compliance gaps and non-compliant configurations',
        'Generating recommendations and actionable remediation steps',
      ],
      additionalContent: [
        'Your evidence data is processed securely and used solely for your compliance analysis. We do not use your proprietary evidence to train our AI models or share it with other customers.',
      ],
    },
    {
      heading: 'Data Storage and Security',
      content: [
        'We implement industry-leading security measures to protect your information:',
      ],
      list: [
        'Encryption: All data is encrypted in transit (TLS 1.3) and at rest (AES-256)',
        'Access Controls: Role-based access controls and multi-factor authentication',
        'Data Residency: Saudi-based data storage options available for Kingdom-specific requirements',
        'Audit Trails: Comprehensive logging of all access and modifications',
        'Regular Security Audits: Ongoing security assessments and penetration testing',
        'Compliance: Our infrastructure meets NCA, SAMA, and PDPL security standards',
      ],
    },
    {
      heading: 'Data Sharing and Disclosure',
      content: [
        'We do not sell your personal information. We may share your information only in the following circumstances:',
      ],
      list: [
        'Service Providers: Trusted third-party vendors who assist in platform operations (cloud hosting, analytics) under strict confidentiality agreements',
        'Legal Requirements: When required by Saudi Arabian law, regulatory authorities, or valid legal processes',
        'Business Transfers: In connection with mergers, acquisitions, or asset sales (with advance notice)',
        'With Your Consent: When you explicitly authorize us to share specific information',
      ],
    },
    {
      heading: 'Your Rights and Choices',
      content: [
        'Under PDPL and applicable Saudi regulations, you have the following rights:',
      ],
      list: [
        'Access: Request access to your personal information and audit evidence',
        'Correction: Request correction of inaccurate or incomplete information',
        'Deletion: Request deletion of your information (subject to legal retention requirements)',
        'Export: Download your data in portable formats',
        'Objection: Object to certain processing activities',
        'Withdrawal: Withdraw consent for optional data processing',
      ],
      additionalContent: [
        'To exercise these rights, please contact us at kauser@velocrux.com. We will respond within the timeframes required by Saudi law.',
      ],
    },
    {
      heading: 'Data Retention',
      content: [
        'We retain your information for as long as necessary to provide our services and comply with legal obligations:',
      ],
      list: [
        'Active Accounts: Data retained while your account is active',
        'Audit Evidence: Retained according to regulatory requirements (typically 3-7 years for financial/critical infrastructure sectors)',
        'Legal Compliance: Extended retention when required by SAMA, NCA, or other Saudi authorities',
        'Deletion Requests: Honored within 30 days, except where retention is legally required',
      ],
    },
    {
      heading: 'International Data Transfers',
      content: [
        'While we prioritize Saudi-based data storage, some service providers may process data outside the Kingdom. When this occurs:',
      ],
      list: [
        'We ensure adequate protection through contractual safeguards',
        'We comply with PDPL cross-border transfer requirements',
        'We provide transparency about data locations upon request',
        'We offer Saudi-only data residency options for sensitive organizations',
      ],
    },
    {
      heading: 'Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to enhance platform functionality:',
      ],
      list: [
        'Essential Cookies: Required for platform operation and security',
        'Analytics: Usage patterns to improve user experience (anonymized)',
        'Preferences: Remember your language and dashboard settings',
      ],
      additionalContent: [
        'You can control cookies through your browser settings, though this may affect platform functionality.',
      ],
    },
    {
      heading: 'Children\'s Privacy',
      content: [
        'Our platform is designed for business use and is not intended for individuals under 18 years of age. We do not knowingly collect information from children.',
      ],
    },
    {
      heading: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of material changes via email or prominent platform notices at least 30 days before the changes take effect.',
      ],
    },
  ],
  contact: {
    title: 'Questions or Concerns?',
    text: 'For privacy-related inquiries, data subject requests, or security concerns, please contact our Data Protection Officer:',
  },
}

const contentAr = {
  title: 'سياسة الخصوصية',
  lastUpdated: 'آخر تحديث: ٧ فبراير ٢٠٢٦',
  sections: [
    {
      heading: 'مقدمة',
      content: [
        'تلتزم ArabAudit ("نحن" أو "خاصتنا") بحماية خصوصية وأمان معلوماتك. تصف سياسة الخصوصية هذه كيفية جمعنا واستخدامنا والكشف عن معلوماتك وحمايتها عند استخدام منصة الامتثال للتدقيق المدعومة بالذكاء الاصطناعي.',
        'كمنصة سعودية تخدم المؤسسات الخاضعة للوائح NCA ECC-2024 وSAMA CSF وPDPL، ندرك الأهمية الحاسمة لحماية البيانات والامتثال التنظيمي.',
      ],
    },
    {
      heading: 'المعلومات التي نجمعها',
      content: [
        'نجمع المعلومات التي تقدمها لنا مباشرة، بالإضافة إلى المعلومات التي يتم جمعها تلقائياً عند استخدام منصتنا:',
      ],
      list: [
        'معلومات الحساب: الاسم، عنوان البريد الإلكتروني، تفاصيل المؤسسة، الدور، ومعلومات الاتصال',
        'أدلة التدقيق: المستندات، ملفات السجل، لقطات الشاشة، التكوينات، والأدلة الأخرى التي تحملها لتحليل الامتثال',
        'البيانات الفنية: عناوين IP، نوع المتصفح، معلومات الجهاز، وأنماط الاستخدام',
        'بيانات الاتصال: الرسائل، طلبات الدعم، والملاحظات التي تقدمها',
        'اختيارات الإطار: الأطر التنظيمية المختارة (NCA، SAMA، PDPL) ومتطلبات الامتثال',
      ],
    },
    {
      heading: 'كيف نستخدم معلوماتك',
      content: [
        'نستخدم المعلومات التي نجمعها لتقديم خدماتنا وصيانتها وتحسينها:',
      ],
      list: [
        'تحليل الذكاء الاصطناعي: معالجة أدلتك من خلال محرك الذكاء الاصطناعي للتحقق من الامتثال لمتطلبات NCA وSAMA وPDPL',
        'التصدير التنظيمي: إنشاء تقارير جاهزة للتدقيق الرسمي وقوالب التصدير التنظيمي',
        'تشغيل المنصة: توفير الوصول إلى لوحات المعلومات، تعيينات التحكم، وتتبع الامتثال',
        'الاتصال: إرسال تحديثات الخدمة، تنبيهات الأمان، وردود الدعم',
        'التحسين: تحليل أنماط الاستخدام لتعزيز وظائف المنصة وتجربة المستخدم',
        'الأمان: الكشف عن النشاط الاحتيالي والانتهاكات الأمنية والوصول غير المصرح به ومنعها',
      ],
    },
    {
      heading: 'معالجة البيانات والذكاء الاصطناعي',
      content: [
        'يعالج محرك الذكاء الاصطناعي الخاص بنا أدلة التدقيق لتوفير التحقق الفني العميق. ويشمل ذلك:',
      ],
      list: [
        'قراءة وتحليل المستندات المحملة، ملفات السجل، والتكوينات',
        'تعيين الأدلة لمتطلبات التحكم المحددة في NCA وSAMA وPDPL',
        'تحديد فجوات الامتثال والتكوينات غير المتوافقة',
        'إنشاء التوصيات وخطوات الإصلاح القابلة للتنفيذ',
      ],
      additionalContent: [
        'يتم معالجة بيانات أدلتك بشكل آمن وتستخدم فقط لتحليل الامتثال الخاص بك. لا نستخدم أدلتك الخاصة لتدريب نماذج الذكاء الاصطناعي أو مشاركتها مع عملاء آخرين.',
      ],
    },
    {
      heading: 'تخزين البيانات والأمان',
      content: [
        'نطبق تدابير أمنية رائدة في الصناعة لحماية معلوماتك:',
      ],
      list: [
        'التشفير: جميع البيانات مشفرة أثناء النقل (TLS 1.3) وأثناء الراحة (AES-256)',
        'ضوابط الوصول: ضوابط الوصول القائمة على الدور والمصادقة متعددة العوامل',
        'إقامة البيانات: خيارات تخزين البيانات في المملكة متاحة لمتطلبات المملكة المحددة',
        'سجلات التدقيق: تسجيل شامل لجميع الوصول والتعديلات',
        'عمليات تدقيق أمنية منتظمة: تقييمات أمنية مستمرة واختبار الاختراق',
        'الامتثال: تلبي بنيتنا التحتية معايير الأمان لـ NCA وSAMA وPDPL',
      ],
    },
    {
      heading: 'مشاركة البيانات والإفصاح',
      content: [
        'نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك فقط في الظروف التالية:',
      ],
      list: [
        'مقدمو الخدمات: بائعو الطرف الثالث الموثوق بهم الذين يساعدون في عمليات المنصة (استضافة السحابة، التحليلات) بموجب اتفاقيات سرية صارمة',
        'المتطلبات القانونية: عندما يتطلب القانون السعودي، السلطات التنظيمية، أو الإجراءات القانونية الصحيحة',
        'التحويلات التجارية: فيما يتعلق بعمليات الدمج، الاستحواذ، أو مبيعات الأصول (مع إشعار مسبق)',
        'بموافقتك: عندما تأذن لنا صراحة بمشاركة معلومات محددة',
      ],
    },
    {
      heading: 'حقوقك واختياراتك',
      content: [
        'بموجب PDPL واللوائح السعودية السارية، لديك الحقوق التالية:',
      ],
      list: [
        'الوصول: طلب الوصول إلى معلوماتك الشخصية وأدلة التدقيق',
        'التصحيح: طلب تصحيح المعلومات غير الدقيقة أو غير الكاملة',
        'الحذف: طلب حذف معلوماتك (مع مراعاة متطلبات الاحتفاظ القانونية)',
        'التصدير: تنزيل بياناتك بتنسيقات محمولة',
        'الاعتراض: الاعتراض على أنشطة معالجة معينة',
        'السحب: سحب الموافقة على معالجة البيانات الاختيارية',
      ],
      additionalContent: [
        'لممارسة هذه الحقوق، يرجى الاتصال بنا على kauser@velocrux.com. سنرد خلال الأطر الزمنية المطلوبة بموجب القانون السعودي.',
      ],
    },
    {
      heading: 'الاحتفاظ بالبيانات',
      content: [
        'نحتفظ بمعلوماتك طالما كان ذلك ضرورياً لتقديم خدماتنا والامتثال للالتزامات القانونية:',
      ],
      list: [
        'الحسابات النشطة: يتم الاحتفاظ بالبيانات أثناء نشاط حسابك',
        'أدلة التدقيق: يتم الاحتفاظ بها وفقاً للمتطلبات التنظيمية (عادةً 3-7 سنوات للقطاعات المالية/البنية التحتية الحرجة)',
        'الامتثال القانوني: الاحتفاظ الممتد عندما تطلبه SAMA أو NCA أو السلطات السعودية الأخرى',
        'طلبات الحذف: يتم تنفيذها خلال 30 يوماً، إلا عند الاحتفاظ القانوني المطلوب',
      ],
    },
    {
      heading: 'النقل الدولي للبيانات',
      content: [
        'بينما نعطي الأولوية لتخزين البيانات في المملكة، قد يعالج بعض مقدمي الخدمات البيانات خارج المملكة. عند حدوث ذلك:',
      ],
      list: [
        'نضمن الحماية الكافية من خلال الضمانات التعاقدية',
        'نلتزم بمتطلبات النقل عبر الحدود لـ PDPL',
        'نوفر الشفافية حول مواقع البيانات عند الطلب',
        'نقدم خيارات إقامة البيانات في المملكة فقط للمؤسسات الحساسة',
      ],
    },
    {
      heading: 'ملفات تعريف الارتباط والتتبع',
      content: [
        'نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتعزيز وظائف المنصة:',
      ],
      list: [
        'ملفات تعريف الارتباط الأساسية: مطلوبة لتشغيل المنصة والأمان',
        'التحليلات: أنماط الاستخدام لتحسين تجربة المستخدم (مجهولة المصدر)',
        'التفضيلات: تذكر إعدادات اللغة ولوحة المعلومات',
      ],
      additionalContent: [
        'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح، على الرغم من أن ذلك قد يؤثر على وظائف المنصة.',
      ],
    },
    {
      heading: 'خصوصية الأطفال',
      content: [
        'تم تصميم منصتنا للاستخدام التجاري وليست مخصصة للأفراد الذين تقل أعمارهم عن 18 عاماً. نحن لا نجمع عن علم معلومات من الأطفال.',
      ],
    },
    {
      heading: 'التغييرات على هذه السياسة',
      content: [
        'قد نقوم بتحديث سياسة الخصوصية هذه لتعكس التغييرات في ممارساتنا أو المتطلبات القانونية. سنخطرك بالتغييرات الجوهرية عبر البريد الإلكتروني أو إشعارات المنصة البارزة قبل 30 يوماً على الأقل من دخول التغييرات حيز التنفيذ.',
      ],
    },
  ],
  contact: {
    title: 'أسئلة أو مخاوف؟',
    text: 'للاستفسارات المتعلقة بالخصوصية، طلبات موضوع البيانات، أو المخاوف الأمنية، يرجى الاتصال بمسؤول حماية البيانات:',
  },
}

import './_group.css';
import {
  ArrowLeft,
  ArrowUpLeft,
  HandHeart,
  HeartHandshake,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from 'lucide-react';

const categories = [
  { title: 'خدمات منزلية', detail: 'سباكة، كهرباء وأكثر', icon: Wrench, color: '#e8dfc4' },
  { title: 'رعاية ومرافقة', detail: 'لكل يوم أسهل', icon: HandHeart, color: '#dfe8d6' },
  { title: 'نقل ومساعدة', detail: 'معك في مشاويرك', icon: UsersRound, color: '#e2e4d4' },
  { title: 'دروس ومهارات', detail: 'تعلّم من أهل الخبرة', icon: Sparkles, color: '#eaded3' },
];

function Logo() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{ position: 'relative', display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
        <HeartHandshake size={21} />
        <span style={{ position: 'absolute', bottom: -4, left: -4, width: 10, height: 10, borderRadius: 999, background: 'hsl(var(--accent))' }} />
      </span>
      <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'hsl(var(--primary))' }}>مُعُون</span>
    </div>
  );
}

export function Current() {
  return (
    <div dir="rtl" style={{ minHeight: '100vh', overflow: 'hidden', background: 'hsl(var(--background))' }}>
      <header style={{ display: 'flex', maxWidth: 1152, margin: '0 auto', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'none', fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>منصة محلية، بقلب إنساني</span>
          <a href="#access" style={{ display: 'inline-flex', minHeight: 40, alignItems: 'center', justifyContent: 'center', border: '1px solid hsl(var(--primary) / .2)', borderRadius: 16, padding: '0 16px', color: 'hsl(var(--primary))', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>دخول</a>
        </div>
      </header>

      <main>
        <section style={{ display: 'grid', maxWidth: 1152, margin: '0 auto', alignItems: 'center', gap: 48, padding: '32px 20px 64px' }}>
          <div style={{ order: 2 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid hsl(var(--primary) / .1)', borderRadius: 999, background: 'hsl(var(--secondary))', padding: '6px 12px', color: 'hsl(var(--primary))', fontSize: 12, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'hsl(var(--accent))' }} />أقرب مما تتوقع
            </span>
            <h1 className="font-display" style={{ maxWidth: 560, margin: '20px 0 0', color: 'hsl(var(--primary))', fontSize: 45, lineHeight: 1.23, letterSpacing: '-.02em' }}>
              المساعدة التي تحتاجها، <span style={{ color: '#9c6d32' }}>تبدأ من هنا</span>
            </h1>
            <p style={{ maxWidth: 520, margin: '24px 0 0', color: 'hsl(var(--muted-foreground))', fontSize: 18, lineHeight: 2 }}>مُعُون يقرّبك من أشخاص موثوقين في حيك. اطلب ما تحتاج، أو شارك خبرتك مع من حولك.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
              <a href="#access" style={{ display: 'inline-flex', minHeight: 48, alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>ابدأ رحلتك <ArrowUpLeft size={18} /></a>
              <a href="#how" style={{ display: 'inline-flex', minHeight: 48, alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, color: 'hsl(var(--muted-foreground))', textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>كيف تعمل المنصة؟ <ArrowLeft size={17} /></a>
            </div>
          </div>

          <div style={{ position: 'relative', order: 1, minHeight: 390 }}>
            <div style={{ position: 'absolute', inset: 32, borderRadius: '42% 58% 55% 45% / 43% 44% 56% 57%', background: '#dfe8d6' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 'min(88%, 390px)', transform: 'rotate(2deg)', border: '1px solid hsl(var(--primary) / .1)', borderRadius: 32, background: 'hsl(var(--card))', padding: 16, boxShadow: '0 20px 50px hsl(35 25% 17% / .13)' }}>
                <div style={{ borderRadius: 22, background: 'hsl(var(--primary))', padding: 20, color: 'hsl(var(--primary-foreground))' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div><p style={{ margin: 0, fontSize: 12, opacity: .65 }}>صباح الخير يا نوره</p><p className="font-display" style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700 }}>كيف نعاونك اليوم؟</p></div>
                    <span style={{ borderRadius: 12, background: 'hsl(var(--primary-foreground) / .1)', padding: 8 }}><Sparkles size={18} color="hsl(var(--accent))" /></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, borderRadius: 16, background: 'hsl(var(--primary-foreground) / .1)', padding: '12px 16px', fontSize: 14, opacity: .7 }}><Search size={17} /><span>اختر خدمة قريبة</span></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, padding: '20px 8px 8px' }}>
                  {categories.map(({ title, icon: Icon, color }) => <div key={title} style={{ border: '1px solid hsl(var(--primary) / .12)', borderRadius: 16, background: 'hsl(var(--background))', padding: 12 }}><span style={{ display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderRadius: 12, background: color, color: 'hsl(var(--primary))' }}><Icon size={17} /></span><p style={{ margin: 0, color: 'hsl(var(--primary))', fontSize: 12, fontWeight: 700 }}>{title}</p></div>)}
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 12, left: 0, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid hsl(var(--primary) / .12)', borderRadius: 16, background: 'hsl(var(--card))', padding: 12, boxShadow: '0 8px 24px hsl(35 25% 17% / .08)' }}>
              <span style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: '#d9e5d2', color: 'hsl(var(--primary))' }}><ShieldCheck size={20} /></span>
              <span><strong style={{ display: 'block', color: 'hsl(var(--primary))', fontSize: 14 }}>موثوقون في حيك</strong><small style={{ color: 'hsl(var(--muted-foreground))', fontSize: 12 }}>خطوة بخطوة</small></span>
            </div>
          </div>
        </section>

        <section id="how" style={{ background: 'hsl(var(--primary))', padding: '56px 20px', color: 'hsl(var(--primary-foreground))' }}>
          <div style={{ maxWidth: 1152, margin: '0 auto' }}>
            <h2 className="font-display" style={{ margin: '0 0 40px', fontSize: 28 }}>كيف تعمل المنصة؟</h2>
            <div style={{ display: 'grid', gap: 40 }}>
              {[{ n: '١', title: 'انضم إلى جيران يقدّمون المساعدة بصدق', text: '' }, { n: '٢', title: 'اختر ما يناسبك', text: 'تصفح الخدمات أو عرّفنا بخبرتك.' }, { n: '٣', title: 'تواصل بوضوح', text: 'اطلع على الملف والخبرة قبل أي خطوة.' }, { n: '٤', title: 'ابدأ على راحتك', text: 'لا التزامات مخفية. القرار لك دائماً.' }].map((item) => <div key={item.n} style={{ display: 'flex', gap: 16, borderBottom: '1px solid hsl(var(--primary-foreground) / .15)', paddingBottom: 28 }}><span className="font-display" style={{ color: 'hsl(var(--accent))', fontSize: 40 }}>{item.n}</span><div><h3 className="font-display" style={{ margin: 0, fontSize: 18 }}>{item.title}</h3>{item.text && <p style={{ margin: '8px 0 0', color: 'hsl(var(--primary-foreground) / .65)', fontSize: 14, lineHeight: 2 }}>{item.text}</p>}</div></div>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
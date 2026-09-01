import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  CircleHelp,
  FileText,
  HandHeart,
  HeartHandshake,
  Home,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserCircle,
  UserRound,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import './index.css';

const queryClient = new QueryClient();

type Role = 'beneficiary' | 'provider';
type Profile = { name: string; city: string; phone: string; bio: string };

const defaultProfile: Profile = { name: 'زائر جديد', city: 'الرياض', phone: '', bio: '' };

const getStored = (key: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  return window.localStorage.getItem(key) ?? fallback;
};

const categories = [
  { title: 'خدمات منزلية', detail: 'سباكة، كهرباء وأكثر', icon: Wrench, color: 'bg-[#e8dfc4]' },
  { title: 'رعاية ومرافقة', detail: 'لكل يوم أسهل', icon: HandHeart, color: 'bg-[#dfe8d6]' },
  { title: 'نقل ومساعدة', detail: 'معك في مشاويرك', icon: UsersRound, color: 'bg-[#e2e4d4]' },
  { title: 'دروس ومهارات', detail: 'تعلّم من أهل الخبرة', icon: Sparkles, color: 'bg-[#eaded3]' },
];

const providers = [
  { id: '1', name: 'سارة الحربي', service: 'تنسيق وترتيب المنازل', location: 'حي النخيل، الرياض', initials: 'سح', tone: 'bg-[#d9e5d2]', rating: '4.9', jobs: '27' },
  { id: '2', name: 'ماجد العتيبي', service: 'صيانة كهربائية منزلية', location: 'حي الياسمين، الرياض', initials: 'مع', tone: 'bg-[#eadfc4]', rating: '4.8', jobs: '41' },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" data-testid="link-logo">
      <span className="relative flex size-10 items-center justify-center rounded-[14px] bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
        <HeartHandshake size={21} strokeWidth={2.3} />
        <span className="absolute -bottom-1 -left-1 size-2.5 rounded-full bg-accent" />
      </span>
      {!compact && <span className="font-display text-xl font-bold tracking-tight text-primary">مُعُون</span>}
    </Link>
  );
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-11 items-center justify-center rounded-2xl border border-border bg-card text-primary transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm active:translate-y-0" data-testid={`button-${label}`}>
      {children}
    </button>
  );
}

function Button({ children, onClick, href, variant = 'primary', className = '', type = 'button', testId, disabled = false }: { children: ReactNode; onClick?: () => void; href?: string; variant?: 'primary' | 'outline' | 'ghost' | 'accent'; className?: string; type?: 'button' | 'submit'; testId?: string; disabled?: boolean }) {
  const styles = {
    primary: 'bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md',
    outline: 'border border-primary/20 bg-card text-primary hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm',
    ghost: 'text-muted-foreground hover:bg-secondary hover:text-primary',
    accent: 'bg-accent text-accent-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md',
  };
  const classNames = `inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition-all active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={classNames} data-testid={testId ?? `link-${href.replaceAll('/', '-')}`}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classNames} data-testid={testId ?? 'button-action'}>{children}</button>;
}

function Avatar({ initials, tone = 'bg-secondary', size = 'size-11' }: { initials: string; tone?: string; size?: string }) {
  return <span className={`inline-flex ${size} shrink-0 items-center justify-center rounded-2xl ${tone} text-sm font-bold text-primary`} data-testid={`avatar-${initials}`}>{initials}</span>;
}

function TopBar({ profile, onMenu }: { profile: Profile; onMenu?: () => void }) {
  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-3">
        {onMenu && <IconButton label="فتح القائمة" onClick={onMenu}><Menu size={20} /></IconButton>}
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <IconButton label="الإشعارات"><Bell size={19} /></IconButton>
        <Link href="/profile" className="hidden items-center gap-2 rounded-2xl p-1.5 pr-3 transition-colors hover:bg-secondary sm:flex" data-testid="link-profile-top">
          <span className="text-right"><span className="block text-xs text-muted-foreground">مرحباً</span><span className="block text-sm font-bold text-primary">{profile.name}</span></span>
          <Avatar initials={profile.name.slice(0, 1)} />
        </Link>
      </div>
    </header>
  );
}

function BottomNav({ role }: { role: Role }) {
  const items = role === 'provider'
    ? [{ href: '/provider/home', label: 'الرئيسية', icon: Home }, { href: '/profile', label: 'ملفي', icon: UserCircle }]
    : [{ href: '/beneficiary/home', label: 'الرئيسية', icon: Home }, { href: '/profile', label: 'ملفي', icon: UserCircle }];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-xl items-center justify-around border-t border-border bg-card/95 px-5 py-3 backdrop-blur-md md:hidden" aria-label="التنقل الرئيسي">
      {items.map(({ href, label, icon: Icon }) => (
        <Link href={href} key={href} className="flex min-w-20 flex-col items-center gap-1 rounded-xl py-1 text-xs font-bold text-muted-foreground transition-colors hover:text-primary" data-testid={`link-bottom-${label}`}>
          <Icon size={20} /><span>{label}</span>
        </Link>
      ))}
      <Link href="/profile" className="flex min-w-20 flex-col items-center gap-1 rounded-xl py-1 text-xs font-bold text-muted-foreground transition-colors hover:text-primary" data-testid="link-bottom-settings">
        <Settings2 size={20} /><span>الإعدادات</span>
      </Link>
    </nav>
  );
}

function AppShell({ children, role, profile }: { children: ReactNode; role: Role; profile: Profile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const signOut = () => {
    localStorage.removeItem('marketplace-demo-session');
    localStorage.removeItem('marketplace-role');
    setLocation('/');
  };
  return (
    <div className="app-noise min-h-[100dvh] bg-background">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1440px]">
        <aside className={`fixed inset-y-0 right-0 z-50 w-[280px] border-l border-sidebar-border bg-sidebar p-6 text-sidebar-foreground shadow-lg transition-transform md:sticky md:top-0 md:flex md:h-[100dvh] md:w-[240px] md:translate-x-0 md:flex-col md:shadow-none ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between md:justify-center"><Logo compact /><span className="font-display text-lg font-bold text-sidebar-foreground md:hidden">مُعُون</span><IconButton label="إغلاق القائمة" onClick={() => setMenuOpen(false)}><X size={19} /></IconButton></div>
          <div className="mt-12 rounded-3xl border border-sidebar-border bg-sidebar-accent p-4">
            <div className="flex items-center gap-3"><Avatar initials={profile.name.slice(0, 1)} tone="bg-sidebar-primary" /><div><p className="text-xs text-sidebar-foreground/60">حسابك</p><p className="font-bold">{profile.name}</p></div></div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-sidebar-foreground/60"><MapPin size={13} />{profile.city}</div>
          </div>
          <nav className="mt-8 space-y-2">
            <Link href={role === 'provider' ? '/provider/home' : '/beneficiary/home'} className="flex items-center gap-3 rounded-2xl bg-sidebar-primary px-4 py-3.5 font-bold text-sidebar-primary-foreground" data-testid="link-sidebar-home"><Home size={19} />الرئيسية</Link>
            <Link href="/profile" className="flex items-center gap-3 rounded-2xl px-4 py-3.5 font-bold text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground" data-testid="link-sidebar-profile"><UserCircle size={19} />الملف الشخصي</Link>
          </nav>
          <div className="mt-auto space-y-2">
            <button type="button" onClick={() => setLocation('/profile')} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground" data-testid="button-help"><CircleHelp size={18} />مركز المساعدة</button>
            <button type="button" onClick={signOut} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-sidebar-primary/90 transition-colors hover:bg-sidebar-accent" data-testid="button-signout"><LogOut size={18} />تسجيل الخروج</button>
          </div>
        </aside>
        {menuOpen && <button type="button" aria-label="إغلاق الخلفية" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-primary/25 md:hidden" data-testid="button-close-overlay" />}
        <main className="min-w-0 flex-1 px-5 pb-24 md:px-10 md:pb-10 lg:px-16">
          <TopBar profile={profile} onMenu={() => setMenuOpen(true)} />
          <div className="page-enter">{children}</div>
        </main>
      </div>
      <BottomNav role={role} />
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="app-noise min-h-[100dvh] overflow-hidden bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8 md:py-7">
        <Logo />
        <div className="flex items-center gap-2"><span className="hidden text-xs text-muted-foreground sm:inline">منصة محلية، بقلب إنساني</span><Button href="/access" variant="outline" className="min-h-10 px-4" testId="link-welcome-access">دخول</Button></div>
      </header>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-24 md:pt-16">
          <div className="float-in order-2 md:order-1">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-secondary px-3 py-1.5 text-xs font-bold text-primary"><span className="size-2 rounded-full bg-accent" />أقرب مما تتوقع</span>
            <h1 className="font-display max-w-xl text-[2.8rem] font-bold leading-[1.23] tracking-tight text-primary sm:text-6xl md:text-[4.3rem]">المساعدة التي تحتاجها، <span className="relative inline-block text-[#9c6d32]">تبدأ من هنا<span className="absolute -bottom-1 right-0 h-1 w-3/4 rounded-full bg-accent/70" /></span></h1>
            <p className="mt-6 max-w-lg text-lg leading-9 text-muted-foreground">مُعُون يقرّبك من أشخاص موثوقين في حيك. اطلب ما تحتاج، أو شارك خبرتك مع من حولك.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button href="/access" variant="accent" className="px-7" testId="link-welcome-start">ابدأ رحلتك <ArrowUpLeft size={18} /></Button><Button href="/account-type" variant="ghost" className="px-4" testId="link-welcome-learn">كيف تعمل المنصة؟ <ChevronLeft size={17} /></Button></div>
            <div className="mt-9 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex -space-x-2 space-x-reverse">{['م', 'ر', 'ن'].map((x, i) => <Avatar key={x} initials={x} size="size-8" tone={['bg-[#d9e5d2]', 'bg-[#eadfc4]', 'bg-[#eaded3]'][i]} />)}</div><span>انضم إلى جيران يقدّمون المساعدة بصدق</span></div>
          </div>
          <div className="relative order-1 min-h-[390px] md:order-2 md:min-h-[540px]">
            <div className="absolute inset-8 rounded-[42%_58%_55%_45%/43%_44%_56%_57%] bg-[#dfe8d6] md:inset-14" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[min(88%,390px)] rotate-2 rounded-[2rem] border border-primary/10 bg-card p-4 shadow-lg">
                <div className="rounded-[1.4rem] bg-primary p-5 text-primary-foreground">
                  <div className="flex items-start justify-between"><div><p className="text-xs text-primary-foreground/65">صباح الخير يا نوره</p><p className="mt-1 font-display text-2xl font-bold">كيف نعاونك اليوم؟</p></div><span className="rounded-xl bg-primary-foreground/10 p-2"><Sparkles size={18} className="text-accent" /></span></div>
                  <div className="mt-6 flex items-center gap-2 rounded-2xl bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/70"><Search size={17} /><span>اختر خدمة قريبة</span></div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-2 pt-5">{categories.slice(0, 4).map(({ title, icon: Icon, color }) => <div key={title} className="rounded-2xl border border-border/70 bg-background p-3"><span className={`mb-4 flex size-9 items-center justify-center rounded-xl ${color} text-primary`}><Icon size={17} /></span><p className="text-xs font-bold text-primary">{title}</p></div>)}</div>
              </div>
            </div>
            <div className="absolute bottom-3 left-0 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-md sm:left-3"><span className="flex size-10 items-center justify-center rounded-xl bg-[#d9e5d2] text-primary"><ShieldCheck size={20} /></span><span><strong className="block text-sm text-primary">موثوقون في حيك</strong><small className="text-xs text-muted-foreground">خطوة بخطوة</small></span></div>
            <div className="absolute right-0 top-4 flex size-16 rotate-12 items-center justify-center rounded-3xl bg-accent text-primary shadow-md md:right-4"><HeartHandshake size={27} /></div>
          </div>
        </section>
        <section className="bg-primary py-14 text-primary-foreground">
           <div className="mx-auto max-w-6xl px-5 md:px-8">
             <h2 className="mb-10 font-display text-2xl font-bold md:text-3xl">كيف تعمل المنصة؟</h2>
             <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
               {[{ n: '١', title: 'انضم إلى جيران يقدّمون المساعدة بصدق', text: '' }, { n: '٢', title: 'اختر ما يناسبك', text: 'تصفح الخدمات أو عرّفنا بخبرتك.' }, { n: '٣', title: 'تواصل بوضوح', text: 'اطلع على الملف والخبرة قبل أي خطوة.' }, { n: '٤', title: 'ابدأ على راحتك', text: 'لا التزامات مخفية. القرار لك دائماً.' }].map((item) => <div key={item.n} className="flex gap-4 border-b border-primary-foreground/15 pb-7 last:border-0 md:border-b-0 md:border-r md:pb-0 md:pr-8 md:last:border-0"><span className="font-display text-4xl text-accent">{item.n}</span><div><h3 className="font-display text-lg font-bold">{item.title}</h3>{item.text && <p className="mt-2 text-sm leading-7 text-primary-foreground/65">{item.text}</p>}</div></div>)}
             </div>
          </div>
        </section>
         <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24"><div className="grid items-end gap-6 md:grid-cols-[1fr_auto]"><div><p className="text-sm font-bold text-[#9c6d32]">أهل الخبرة حولك</p><h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">خدمات صغيرة، فرق كبير</h2></div><p className="max-w-sm text-sm leading-7 text-muted-foreground">من ترتيب المنزل إلى مهارة تتمنى تعلمها. هناك شخص قريب يمكنه أن يعاونك.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categories.map(({ title, detail, icon: Icon, color }) => <div key={title} className="rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md"><span className={`flex size-12 items-center justify-center rounded-2xl ${color} text-primary`}><Icon size={23} /></span><h3 className="mt-6 font-display font-bold text-primary">{title}</h3><p className="mt-1 text-sm text-muted-foreground">{detail}</p><ArrowLeft className="mt-6 text-primary/50" size={18} /></div>)}</div></section>
      </main>
      <footer className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground">مُعُون — نكبر حين نعاون بعضنا</footer>
    </div>
  );
}

function AccessPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('marketplace-demo-session', 'true');
    if (name.trim()) localStorage.setItem('marketplace-profile', JSON.stringify({ ...defaultProfile, name: name.trim(), phone }));
    setLocation('/account-type');
  };
  return (
    <div className="app-noise min-h-[100dvh] bg-primary px-5 py-5 text-primary-foreground md:px-10">
      <header className="mx-auto flex max-w-6xl items-center justify-between"><Logo /><Button href="/" variant="ghost" className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground" testId="link-access-back"><ArrowLeft size={18} />عودة</Button></header>
      <main className="mx-auto grid max-w-5xl items-center gap-10 py-12 md:grid-cols-[.85fr_1.15fr] md:py-20">
        <div className="hidden md:block"><span className="mb-6 inline-flex rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs text-primary-foreground/70">جلسة تجريبية محلية</span><h1 className="font-display text-5xl font-bold leading-tight">مكانك محفوظ<br /><span className="text-accent">بين أهلك.</span></h1><p className="mt-6 max-w-sm text-lg leading-8 text-primary-foreground/65">أنشئ حضورك في مُعُون خلال دقيقة. لا نطلب إلا ما يساعدك على البدء.</p><div className="mt-10 flex items-center gap-3 text-sm text-primary-foreground/60"><ShieldCheck className="text-accent" size={20} /> بياناتك تبقى على جهازك في هذا العرض</div></div>
        <div className="rounded-[2rem] bg-card p-5 text-foreground shadow-lg sm:p-8">
          <div className="mb-7 md:hidden"><span className="text-xs font-bold text-[#9c6d32]">جلسة تجريبية محلية</span><h1 className="mt-2 font-display text-3xl font-bold text-primary">أهلاً بك في مُعُون</h1></div>
          <div className="flex gap-1 rounded-2xl bg-secondary p-1"><button type="button" onClick={() => setMode('signup')} className={`flex-1 rounded-xl py-3 text-sm font-bold transition-colors ${mode === 'signup' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`} data-testid="button-tab-signup">إنشاء حساب</button><button type="button" onClick={() => setMode('login')} className={`flex-1 rounded-xl py-3 text-sm font-bold transition-colors ${mode === 'login' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`} data-testid="button-tab-login">تسجيل الدخول</button></div>
          <form onSubmit={submit} className="mt-7 space-y-5">
             {mode === 'signup' && <label className="block"><span className="mb-2 block text-sm font-bold text-primary">الاسم الكامل</span><div className="relative"><UserRound className="absolute right-4 top-3.5 text-muted-foreground" size={18} /><input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="مثال: نورة العتيبي" className="h-12 w-full rounded-2xl border border-input bg-background pr-11 pl-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" data-testid="input-access-name" /></div></label>}
             <label className="block"><span className="mb-2 block text-sm font-bold text-primary">رقم الجوال</span><div className="relative"><Phone className="absolute right-4 top-3.5 text-muted-foreground" size={18} /><input required autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="05X XXX XXXX" dir="ltr" className="h-12 w-full rounded-2xl border border-input bg-background pr-11 pl-4 text-left text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" data-testid="input-access-phone" /></div></label>
             <label className="block"><span className="mb-2 block text-sm font-bold text-primary">كلمة المرور</span><div className="relative"><LockKeyhole className="absolute right-4 top-3.5 text-muted-foreground" size={18} /><input required autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="h-12 w-full rounded-2xl border border-input bg-background pr-11 pl-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" data-testid="input-access-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-3 p-1 text-muted-foreground" aria-label="إظهار كلمة المرور" data-testid="button-toggle-password">{showPassword ? <X size={17} /> : <EyeIcon size={17} />}</button></div></label>
            <Button type="submit" className="w-full" testId="button-access-submit">{mode === 'signup' ? 'إنشاء حساب والبدء' : 'الدخول إلى حسابي'} <ArrowLeft size={18} /></Button>
          </form>
          <p className="mt-5 text-center text-xs leading-6 text-muted-foreground">بالاستمرار، أنت توافق على تجربة مُعُون المحلية. <br />لا يوجد اتصال بخدمة خارجية في هذا العرض.</p>
        </div>
      </main>
    </div>
  );
}

function EyeIcon({ size }: { size: number }) {
  return <span className="inline-block size-4 rounded-full border-2 border-current" style={{ transform: `scale(${size / 16})` }} />;
}

function AccountTypePage() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<Role | null>(() => {
    const stored = getStored('marketplace-role', '');
    return stored === 'provider' || stored === 'beneficiary' ? stored : null;
  });
  const choose = (role: Role) => { setSelected(role); localStorage.setItem('marketplace-role', role); };
  return (
    <div className="app-noise min-h-[100dvh] bg-background px-5 py-6">
      <header className="mx-auto flex max-w-5xl items-center justify-between"><Logo /><span className="text-xs text-muted-foreground">الخطوة ١ من ١</span></header>
      <main className="mx-auto max-w-3xl py-12 text-center md:py-20">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary"><Sparkles size={25} /></span>
        <h1 className="mt-7 font-display text-3xl font-bold text-primary md:text-5xl">كيف تحب أن تبدأ؟</h1><p className="mx-auto mt-4 max-w-md text-base leading-8 text-muted-foreground">اختر المساحة الأقرب لك الآن، ويمكنك تغييرها لاحقاً من ملفك.</p>
        <div className="mt-10 grid gap-4 text-right sm:grid-cols-2">
          {[{ role: 'beneficiary' as Role, title: 'أبحث عن مساعدة', text: 'أحتاج خدمة أو شخصاً يساعدني في شيء محدد.', icon: Search, tone: 'bg-[#e8dfc4]' }, { role: 'provider' as Role, title: 'أقدّم خدمة', text: 'لدي خبرة أو مهارة وأحب أن أشاركها مع حيي.', icon: BriefcaseBusiness, tone: 'bg-[#dfe8d6]' }].map(({ role, title, text, icon: Icon, tone }) => <button type="button" key={role} onClick={() => choose(role)} className={`group rounded-[1.7rem] border p-5 text-right transition-all hover:-translate-y-1 hover:shadow-md ${selected === role ? 'border-primary bg-card shadow-md ring-2 ring-primary/10' : 'border-border bg-card/60'}`} data-testid={`button-account-${role}`}><div className="flex items-start justify-between"><span className={`flex size-14 items-center justify-center rounded-2xl ${tone} text-primary`}><Icon size={25} /></span><span className={`flex size-7 items-center justify-center rounded-full border ${selected === role ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent'}`}><Check size={15} /></span></div><h2 className="mt-8 font-display text-xl font-bold text-primary">{title}</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p></button>)}
        </div>
        <Button onClick={() => selected && setLocation(selected === 'provider' ? '/provider/home' : '/beneficiary/home')} className="mt-8 w-full sm:w-auto" disabled={!selected} testId="button-confirm-account-type">متابعة <ArrowLeft size={18} /></Button>
      </main>
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="flex items-end justify-between gap-4"><div>{eyebrow && <p className="mb-2 text-xs font-bold text-[#9c6d32]">{eyebrow}</p>}<h2 className="font-display text-2xl font-bold text-primary md:text-3xl">{title}</h2></div>{action}</div>;
}

function BeneficiaryHome({ profile }: { profile: Profile }) {
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const visibleProviders = useMemo(() => providers.filter((provider) => !query || `${provider.name} ${provider.service}`.includes(query)), [query]);
  return (
    <AppShell role="beneficiary" profile={profile}>
      <section className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-11"><div className="relative z-10 max-w-xl"><p className="text-sm text-primary-foreground/65">صباح الخير يا نوره</p><h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">كيف نعاونك اليوم؟</h1><p className="mt-3 text-sm leading-7 text-primary-foreground/65">ابحث عن شخص قريب يفهم احتياجك.</p><div className="mt-7 flex items-center gap-3 rounded-2xl bg-primary-foreground/10 px-4 py-1"><Search size={19} className="shrink-0 text-accent" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="اختر خدمة قريبة" className="h-12 min-w-0 flex-1 bg-transparent text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/45" data-testid="input-search-services" /><SlidersHorizontal size={18} className="text-primary-foreground/60" /></div></div><div className="absolute -left-10 -top-16 size-64 rounded-full border-[22px] border-primary-foreground/5" /><div className="absolute -bottom-28 right-1/2 size-72 rounded-full border-[30px] border-accent/10" /></section>
        <section className="mt-12" id="service-categories"><SectionHeading eyebrow="استكشف" title="ما الذي تحتاجه؟" action={<button type="button" onClick={() => document.getElementById('service-categories')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-1 text-sm font-bold text-[#9c6d32]" data-testid="button-view-categories">عرض الكل <ChevronLeft size={16} /></button>} /><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">{categories.map(({ title, icon: Icon, color }) => <button type="button" onClick={() => document.getElementById('nearby-providers')?.scrollIntoView({ behavior: 'smooth' })} key={title} className="group rounded-3xl border border-border bg-card p-4 text-right transition-all hover:-translate-y-1 hover:shadow-sm" data-testid={`button-category-${title}`}><span className={`flex size-11 items-center justify-center rounded-2xl ${color} text-primary`}><Icon size={20} /></span><span className="mt-5 block text-sm font-bold text-primary">{title}</span><span className="mt-1 block text-xs text-muted-foreground">استكشف الخيارات</span></button>)}</div></section>
      <section className="mt-12" id="nearby-providers"><SectionHeading eyebrow="قريبون منك" title="أشخاص قد يعاونونك" action={<button type="button" onClick={() => setQuery('')} className="flex items-center gap-1 text-sm font-bold text-[#9c6d32]" data-testid="button-filter-providers">إظهار الجميع <SlidersHorizontal size={15} /></button>} /><div className="mt-5 grid gap-4 lg:grid-cols-2">{visibleProviders.map((provider) => <article key={provider.id} className="group rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-md" data-testid={`card-provider-${provider.id}`}><div className="flex items-start justify-between"><div className="flex items-center gap-3"><Avatar initials={provider.initials} tone={provider.tone} size="size-14" /><div><div className="flex items-center gap-1.5"><h3 className="font-display font-bold text-primary">{provider.name}</h3><BadgeCheck size={16} className="text-[#9c6d32]" /></div><p className="mt-1 text-sm text-muted-foreground">{provider.service}</p></div></div><button type="button" onClick={() => setSaved((current) => current.includes(provider.id) ? current.filter((id) => id !== provider.id) : [...current, provider.id])} className={`flex size-9 items-center justify-center rounded-xl transition-colors ${saved.includes(provider.id) ? 'bg-secondary text-[#9c6d32]' : 'text-muted-foreground hover:bg-secondary'}`} aria-label="حفظ مقدم الخدمة" data-testid={`button-save-provider-${provider.id}`}><HeartHandshake size={18} /></button></div><div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><MapPin size={14} />{provider.location}</span><span className="flex items-center gap-1 font-bold text-primary"><Star size={14} className="fill-accent text-accent" />{provider.rating} <span className="font-normal text-muted-foreground">({provider.jobs} تجربة)</span></span></div></article>)}</div>{visibleProviders.length === 0 && <div className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">لم نجد نتيجة بهذا الاسم. جرّب كلمة أخرى.</div>}</section>
      <section className="mt-12 rounded-3xl border border-[#d4dfc9] bg-[#e8efdf] p-6 md:flex md:items-center md:justify-between md:p-8"><div><span className="inline-flex rounded-full bg-card/70 px-3 py-1 text-xs font-bold text-primary">مساحتك أيضاً مهمة</span><h2 className="mt-4 font-display text-2xl font-bold text-primary">تعرف شخصاً يمكنه المساعدة؟</h2><p className="mt-2 text-sm leading-7 text-primary/70">دلّه على مُعُون، فالمهارات الجميلة تستحق أن تُعرف.</p></div><Button href="/account-type" variant="outline" className="mt-5 md:mt-0" testId="link-beneficiary-provider-cta">أقدّم خدمة <ArrowLeft size={17} /></Button></section>
    </AppShell>
  );
}

function ProviderHome({ profile }: { profile: Profile }) {
  return (
    <AppShell role="provider" profile={profile}>
      <section className="relative overflow-hidden rounded-[2rem] border border-[#d5dfcb] bg-[#e8efdf] px-6 py-8 md:px-10 md:py-10"><div className="relative z-10"><p className="text-sm text-primary/60">مساحتك المهنية</p><h1 className="mt-2 max-w-lg font-display text-3xl font-bold leading-tight text-primary md:text-4xl">خلّ الناس تعرف كيف تقدر تعاونهم.</h1><p className="mt-3 max-w-md text-sm leading-7 text-primary/70">ملف واضح وبسيط يكفي ليبدأ التعارف.</p><Button href="/profile" variant="primary" className="mt-6" testId="link-provider-edit-profile">تعديل الملف <Pencil size={16} /></Button></div><div className="absolute -left-9 -top-10 size-52 rounded-full bg-accent/20" /><BriefcaseBusiness className="absolute bottom-7 left-9 text-primary/10" size={110} /></section>
      <section className="mt-10 grid gap-4 sm:grid-cols-3">{[{ icon: EyeIcon, label: 'مشاهدة الملف', value: '—' }, { icon: HandHeart, label: 'طلبات مهتمة', value: '—' }, { icon: Star, label: 'التقييم', value: 'جديد' }].map(({ icon: Icon, label, value }) => <div className="rounded-3xl border border-border bg-card p-5" key={label}><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon size={19} /></span><span className="font-display text-2xl font-bold text-primary">{value}</span></div><p className="mt-5 text-sm text-muted-foreground">{label}</p></div>)}</section>
      <section className="mt-12"><SectionHeading eyebrow="خطوتك التالية" title="جهّز حضورك" /><div className="mt-5 grid gap-4 md:grid-cols-2"><article className="rounded-3xl border border-border bg-card p-6"><span className="flex size-11 items-center justify-center rounded-2xl bg-[#eadfc4] text-primary"><FileText size={21} /></span><h2 className="mt-5 font-display text-xl font-bold text-primary">أكمل معلوماتك الأساسية</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">أضف نبذة قصيرة عن خبرتك وموقعك ليجدك الناس بسهولة.</p><Link href="/profile" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#9c6d32]" data-testid="link-provider-profile-card">إكمال الملف <ArrowLeft size={16} /></Link></article><article className="rounded-3xl border border-dashed border-border bg-secondary/40 p-6"><span className="flex size-11 items-center justify-center rounded-2xl bg-card text-primary"><Plus size={21} /></span><h2 className="mt-5 font-display text-xl font-bold text-primary">أضف خدمة لاحقاً</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">هذه المساحة ستكبر معك. نبدأ الآن بملفك فقط، والباقي قريباً.</p><span className="mt-5 inline-flex rounded-full bg-card px-3 py-1 text-xs font-bold text-muted-foreground">قريباً</span></article></div></section>
    </AppShell>
  );
}

function ProfilePage({ profile, onSave }: { profile: Profile; onSave: (profile: Profile) => void }) {
  const role = getStored('marketplace-role', 'beneficiary') as Role;
  const [, setLocation] = useLocation();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const save = () => { onSave(draft); setEditing(false); };
  const signOut = () => { localStorage.removeItem('marketplace-demo-session'); localStorage.removeItem('marketplace-role'); setLocation('/'); };
  return (
    <AppShell role={role} profile={profile}>
      <div className="mx-auto max-w-3xl"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold text-[#9c6d32]">حسابي</p><h1 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">الملف الشخصي</h1></div>{!editing && <Button onClick={() => setEditing(true)} variant="outline" className="min-h-10 px-4" testId="button-edit-profile"><Pencil size={16} />تعديل</Button>}</div>
        <section className="mt-8 rounded-[2rem] bg-primary p-6 text-primary-foreground md:p-8"><div className="flex items-center gap-4"><Avatar initials={profile.name.slice(0, 1)} tone="bg-accent" size="size-20" /><div><h2 className="font-display text-2xl font-bold">{profile.name}</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-primary-foreground/60"><MapPin size={14} />{profile.city}</p></div></div><div className="mt-7 flex items-center gap-2 border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/65"><ShieldCheck size={16} className="text-accent" /> عضو في مُعُون — الملف المحلي</div></section>
        {editing ? <section className="mt-6 rounded-3xl border border-border bg-card p-6"><h2 className="font-display text-xl font-bold text-primary">تعديل المعلومات</h2><div className="mt-6 grid gap-5 sm:grid-cols-2"><label><span className="mb-2 block text-sm font-bold text-primary">الاسم</span><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm focus:outline-none" data-testid="input-profile-name" /></label><label><span className="mb-2 block text-sm font-bold text-primary">المدينة والحي</span><input value={draft.city} onChange={(event) => setDraft({ ...draft, city: event.target.value })} className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm focus:outline-none" data-testid="input-profile-city" /></label><label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-primary">رقم الجوال</span><input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} dir="ltr" className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-left text-sm focus:outline-none" data-testid="input-profile-phone" /></label><label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-primary">نبذة قصيرة</span><textarea value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} placeholder="اكتب سطراً يعرف بك..." rows={4} className="w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm leading-7 focus:outline-none" data-testid="input-profile-bio" /></label></div><div className="mt-6 flex gap-3"><Button onClick={save} testId="button-save-profile"><Check size={17} />حفظ التغييرات</Button><Button onClick={() => { setDraft(profile); setEditing(false); }} variant="ghost" testId="button-cancel-profile">إلغاء</Button></div></section> : <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border p-5"><div className="flex items-center gap-3"><Phone size={18} className="text-[#9c6d32]" /><div><p className="text-xs text-muted-foreground">رقم الجوال</p><p className="mt-1 font-bold text-primary" dir="ltr">{profile.phone || 'لم تتم الإضافة بعد'}</p></div></div><Check size={17} className="text-[#9c6d32]" /></div><div className="flex items-center justify-between border-b border-border p-5"><div className="flex items-center gap-3"><Mail size={18} className="text-[#9c6d32]" /><div><p className="text-xs text-muted-foreground">النبذة</p><p className="mt-1 max-w-md text-sm font-bold text-primary">{profile.bio || 'أضف نبذة بسيطة عنك لتظهر هنا.'}</p></div></div><ChevronLeft size={17} className="text-muted-foreground" /></div><button type="button" onClick={signOut} className="flex w-full items-center gap-3 p-5 text-right font-bold text-destructive transition-colors hover:bg-destructive/5" data-testid="button-profile-signout"><LogOut size={18} />تسجيل الخروج من الجلسة التجريبية</button></section>}
      </div>
    </AppShell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router({ profile, onSave }: { profile: Profile; onSave: (profile: Profile) => void }) {
  return <RoutedErrorBoundary><Switch><Route path="/" component={WelcomePage} /><Route path="/access" component={AccessPage} /><Route path="/account-type" component={AccountTypePage} /><Route path="/beneficiary/home"><BeneficiaryHome profile={profile} /></Route><Route path="/provider/home"><ProviderHome profile={profile} /></Route><Route path="/profile"><ProfilePage profile={profile} onSave={onSave} /></Route><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function App() {
  const [profile, setProfile] = useState<Profile>(() => {
    try { return JSON.parse(getStored('marketplace-profile', JSON.stringify(defaultProfile))) as Profile; } catch { return defaultProfile; }
  });
  useEffect(() => { document.documentElement.dir = 'rtl'; document.documentElement.lang = 'ar'; }, []);
  const saveProfile = (next: Profile) => { setProfile(next); localStorage.setItem('marketplace-profile', JSON.stringify(next)); };
  return <QueryClientProvider client={queryClient}><TooltipProvider><Router profile={profile} onSave={saveProfile} /><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
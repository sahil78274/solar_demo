import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Replace this editable placeholder with ATOMIC SOLAR's verified business number.
const WHATSAPP_NUMBER = '910000000000';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello ATOMIC SOLAR, I would like to discuss an energy solution.')}`;
const Arrow = ({ diagonal = false }) => <svg className="arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3 10h13m-5-5 5 5-5 5'} /></svg>;

const solutionGroups = [
  { no:'01', title:'Solar energy systems', eyebrow:'GENERATE', description:'Explore solar systems shaped around your site, application and energy requirements.', services:['On-Grid Solar Systems','Hybrid Solar Systems'], image:'/images/commercial-rooftop.jpg', alt:'Solar panels arranged across a commercial rooftop' },
  { no:'02', title:'Energy storage', eyebrow:'STORE', description:'Battery technologies for energy storage and backup requirements, from batteries to BESS.', services:['BESS (Battery Energy Storage Systems)','Battery Solutions'], image:'/images/battery-storage.jpg', alt:'Battery energy storage equipment in a facility' },
  { no:'03', title:'Power backup', eyebrow:'BACK UP', description:'Power backup systems for residential and commercial spaces, including lift applications.', services:['Home UPS','Lift UPS','Commercial UPS'], image:'/images/solar-installation.jpg', alt:'Power equipment within an electrical installation' },
  { no:'04', title:'Agricultural solutions', eyebrow:'GROW', description:'Solar-powered water pumping options for agricultural applications and site requirements.', services:['Solar Agricultural Water Pumps'], image:'/images/agri-pump.webp', alt:'Solar agricultural water pump installation' },
  { no:'05', title:'Outdoor & security solutions', eyebrow:'PROTECT', description:'Solar-powered outdoor lighting, surveillance and fencing options for a range of settings.', services:['Solar Street Lights','Solar CCTV','Solar Fencing'], image:'/images/solar-streetlight.jpg', alt:'Solar street light with photovoltaic panel' },
  { no:'06', title:'Renewable & electrical solutions', eyebrow:'CONNECT', description:'A broader range of renewable and electrical equipment for considered application needs.', services:['Biogas Solutions','Isolation Stabilizers / Transformers','Servo Stabilizers'], image:'/images/isolation-transformer.webp', alt:'Isolation transformer and electrical equipment' }
];
const sectors = [
  { name:'Residential', headline:'Smarter Energy for Your Home.', copy:'Thoughtfully selected solar, battery and backup options for residential energy requirements.', image:'/images/residential-solar.jpg', alt:'Solar panels on a residential rooftop' },
  { name:'Commercial', headline:'Reliable Solutions for Your Business.', copy:'Solar generation, energy storage and power backup options for commercial applications.', image:'/images/commercial-rooftop.jpg', alt:'Commercial rooftop solar system' },
  { name:'Industrial', headline:'Energy Solutions for Industrial Requirements.', copy:'Explore solar, storage and electrical solutions for industrial facilities and operations.', image:'/images/industrial-solar.jpg', alt:'Industrial rooftop solar panels' }
];
const projects = [
  { title:'Residential solar installations', label:'RESIDENTIAL', image:'/images/home-solar.jpg', className:'gallery-home' },
  { title:'Commercial rooftop systems', label:'COMMERCIAL', image:'/images/commercial-rooftop.jpg', className:'gallery-commercial' },
  { title:'Industrial solar projects', label:'INDUSTRIAL', image:'/images/solar-farm-aerial.jpg', className:'gallery-industrial' },
  { title:'Agricultural water pumps', label:'AGRICULTURE', image:'/images/agri-field.webp', className:'gallery-agri' },
  { title:'Battery energy storage', label:'ENERGY STORAGE', image:'/images/battery-storage.jpg', className:'gallery-battery' }
];
const processSteps = [
  ['01','Understand Your Requirements'],['02','Assess Your Energy Needs'],['03','Recommend Suitable Solutions'],['04','Discuss Implementation']
];
const serviceOptions = solutionGroups.flatMap(group => group.services);
const bookingServices = [
  { name:'On-Grid Solar Systems', note:'Grid-connected solar for residential, commercial or industrial use.', image:'/images/roof-panels.jpg' },
  { name:'Hybrid Solar Systems', note:'Solar with battery storage options, considered for your needs.', image:'/images/home-solar.jpg' },
  { name:'BESS & Battery Solutions', note:'Battery energy storage and battery options.', image:'/images/battery-storage.jpg' },
  { name:'Home, Lift & Commercial UPS', note:'UPS options for home, lift and commercial requirements.', image:'/images/solar-installation.jpg' },
  { name:'Solar Agricultural Water Pumps', note:'Solar-powered water pumping for agricultural applications.', image:'/images/agri-pump.webp' },
  { name:'Solar Street Lights & Solar CCTV', note:'Solar-powered outdoor lighting and CCTV options.', image:'/images/solar-streetlight.jpg' },
  { name:'Solar Fencing & Biogas Solutions', note:'Solar fencing and biogas solutions for suitable applications.', image:'/images/solar-fence.jpg' },
  { name:'Isolation & Servo Stabilizers', note:'Isolation Stabilizers / Transformers and Servo Stabilizers.', image:'/images/isolation-transformer.webp' }
];

function useReveal() {
  const root = useRef(null);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const targets = node.querySelectorAll('[data-reveal]');
    targets.forEach(target => target.classList.add('reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: '0px 0px -28px 0px' });
    targets.forEach((target, index) => {
      target.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  return root;
}

function Brand() {
  return <a href="#home" className="brand" aria-label="ATOMIC SOLAR home"><span className="brand-symbol" aria-hidden="true"><i/><i/><i/><i/></span><span>ATOMIC <b>SOLAR</b></span></a>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(previous => {
      const next = window.scrollY > 24;
      return previous === next ? previous : next;
    });
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const nav = [['Home','#home'],['About','#about'],['Solutions','#solutions'],['Projects','#projects'],['Contact','#contact']];
  return <header className={`site-header${scrolled?' is-scrolled':''}`}>
    <Brand />
    <button className={`menu-toggle${open?' is-open':''}`} type="button" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
    <nav className={`site-nav${open?' nav-open':''}`} aria-label="Main navigation">{nav.map(([label,href])=><a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#consultation" onClick={() => setOpen(false)}>Get a consultation <Arrow diagonal/></a></nav>
  </header>;
}
function Kicker({ children, light = false }) { return <div className={`kicker${light?' kicker-light':''}`}><span/>{children}</div>; }
function Hero() {
  return <section className="hero" id="home">
    <div className="hero-copy"><Kicker>POWERING A MORE SUSTAINABLE FUTURE</Kicker><h1>Energy that<br/>moves us <em>forward.</em></h1><p>Thoughtfully designed solar and energy solutions for homes, businesses and industries.</p><div className="hero-actions"><a className="button button-primary" href="#solutions">Explore our solutions <Arrow/></a><a className="quiet-link" href="#contact">Talk to our team <Arrow diagonal/></a></div></div>
    <div className="hero-visual"><img src="/images/commercial-rooftop.jpg" alt="Aerial view over a commercial rooftop solar installation" fetchPriority="high"/><span className="hero-caption">ATOMIC SOLAR <i/> INTELLIGENT ENERGY, CONSIDERED.</span></div>
    <a className="hero-scroll" href="#about"><span>SCROLL TO DISCOVER</span><i/></a>
  </section>;
}
function About() {
  return <section className="about section-wrap" id="about"><div className="about-photo reveal-image" data-reveal><img src="/images/solar-installation.jpg" alt="Solar equipment installed at a facility" loading="lazy"/><span className="photo-index">01 / ATOMIC SOLAR</span></div><div className="about-copy" data-reveal><Kicker>ABOUT ATOMIC SOLAR</Kicker><h2>Building a smarter<br/>energy <em>future.</em></h2><p>ATOMIC SOLAR is your trusted Solar Specialist &amp; Solution Provider. We provide smart and reliable energy solutions for Residential, Commercial and Industrial applications.</p><a className="text-link" href="#solutions">Discover more <Arrow/></a></div><div className="about-note">SMART ENERGY SOLUTIONS<br/>FOR EVERY APPLICATION</div></section>;
}
function Solutions() {
  return <section className="solutions section-wrap" id="solutions"><div className="section-heading" data-reveal><div><Kicker>WHAT WE DO</Kicker><h2>Energy solutions<br/>for every <em>need.</em></h2></div><p>Explore our range of solar, power backup and energy solutions designed for different applications.</p></div><div className="solution-groups">{solutionGroups.map((group,index)=><article className={`solution-group${index%2?' group-reverse':''}`} key={group.no} data-reveal><div className="group-image reveal-image"><img src={group.image} alt={group.alt} loading="lazy"/><span>{group.no} / 06</span></div><div className="group-copy"><div className="group-kicker"><span>{group.no}</span>{group.eyebrow}</div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.services.map((service,i)=><li key={service}><span>0{i+1}</span>{service}</li>)}</ul><a href="#contact" className="text-link">Enquire about this solution <Arrow/></a></div></article>)}</div></section>;
}
function Sectors() {
  return <section className="sectors section-wrap"><div className="section-heading" data-reveal><div><Kicker>BUILT AROUND YOUR WORLD</Kicker><h2>Energy for the way<br/>you <em>live and work.</em></h2></div><p>ATOMIC SOLAR serves residential, commercial and industrial energy requirements.</p></div><div className="sector-list">{sectors.map((sector,index)=><article className={`sector-row${index%2?' sector-reverse':''}`} key={sector.name} data-reveal><div className="sector-photo reveal-image"><img src={sector.image} alt={sector.alt} loading="lazy"/><span>0{index+1}</span></div><div className="sector-copy"><Kicker>{sector.name.toUpperCase()}</Kicker><h3>{sector.headline}</h3><p>{sector.copy}</p><a className="text-link" href="#contact">Discuss your requirements <Arrow/></a></div></article>)}</div></section>;
}
function Projects() {
  return <section className="projects section-wrap" id="projects"><div className="section-heading" data-reveal><div><Kicker>ENERGY IN CONTEXT</Kicker><h2>Exploring solar<br/>in <em>action.</em></h2></div><p>Applications across homes, businesses, industry, agriculture and energy storage.</p></div><div className="project-gallery">{projects.map(project=><a href="#contact" className={`project-item ${project.className}`} key={project.title}><img src={project.image} alt={project.title} loading="lazy"/><div className="project-caption"><span>{project.label}</span><h3>{project.title}</h3><b><Arrow diagonal/></b></div></a>)}</div><p className="gallery-note">Illustrative portfolio imagery only. These visuals are not represented as verified ATOMIC SOLAR installations.</p></section>;
}
function WhyAtomic() {
  const strengths=['Residential, Commercial & Industrial Solutions.','Multiple Solar Technology Options.','Battery and Energy Storage Solutions.','Power Backup and Electrical Solutions.','A Broad Range of Renewable Energy Products.'];
  return <section className="why section-wrap"><div className="why-image reveal-image" data-reveal><img src="/images/roof-panels.jpg" alt="Rows of solar panels across a rooftop" loading="lazy"/><span>SMARTER ENERGY, CONSIDERED.</span></div><div className="why-copy" data-reveal><Kicker>WHY ATOMIC SOLAR</Kicker><h2>Solutions designed<br/>around <em>your needs.</em></h2><p>Start with your requirements. Explore a broad range of technologies with options for different applications.</p><ul>{strengths.map((strength,index)=><li key={strength}><span>0{index+1}</span>{strength}</li>)}</ul><a className="text-link" href="#contact">Talk to our team <Arrow/></a></div></section>;
}
function Process() {
  return <section className="process section-wrap" id="approach"><div className="process-heading" data-reveal><Kicker>HOW WE WORK</Kicker><h2>A considered path<br/>to <em>what’s next.</em></h2></div><div className="process-list">{processSteps.map(([number,title])=><article className="process-step" key={number} data-reveal><span>{number}</span><h3>{title}</h3></article>)}</div></section>;
}
function ConsultationBooking() {
  const [selected,setSelected]=useState([]);
  const [stage,setStage]=useState('choose');
  const [step,setStep]=useState(1);
  const [messageUrl,setMessageUrl]=useState('');
  const [bookingData,setBookingData]=useState({});
  const formRef=useRef(null);
  const toggleService=(name)=>setSelected(current=>current.includes(name)?current.filter(item=>item!==name):[...current,name]);
  const todayLocal=()=>{const date=new Date();date.setMinutes(date.getMinutes()-date.getTimezoneOffset());return date.toISOString().slice(0,10)};
  const onSubmit=(event)=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(!form.reportValidity())return;
    const values=Object.fromEntries(new FormData(form).entries());
    const allData={...bookingData,...values};
    setBookingData(allData);
    if(step===1){setStep(2);return}
    if(step===2){if(!selected.length)return;setStep(3);return}
    const details=[
      'Hello ATOMIC SOLAR, I would like to book a consultation.',
      `Name: ${allData.bookingName}`,
      `Mobile: ${allData.bookingPhone}`,
      `Email: ${allData.bookingEmail}`,
      `Selected services: ${selected.join(', ')}`,
      `Property type: ${allData.propertyType}`,
      `City: ${allData.bookingCity}`,
      `Address: ${allData.bookingAddress}`,
      `Solar capacity requirement: ${allData.capacity||'Not specified'}`,
      `Preferred site visit date: ${allData.visitDate}`,
      `Additional message: ${allData.bookingMessage||'None'}`
    ].join('\\n');
    setMessageUrl(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details)}`);
    setStage('ready');
  };
  const startBooking=()=>{setStage('form');setStep(1);setTimeout(()=>document.getElementById('consultation-form')?.scrollIntoView({behavior:'smooth',block:'start'}),40)};
  return <section className="booking section-wrap" id="consultation">
    <div className="booking-heading" data-reveal><Kicker>PERSONALIZED ENERGY CONSULTATION</Kicker><h2>Choose Your Solar Solution</h2><p>Select one or more areas you’d like to discuss. We’ll help shape the conversation around your requirements.</p></div>
    {stage==='choose'&&<><div className="booking-services">{bookingServices.map((service,index)=><label className={`booking-card${selected.includes(service.name)?' is-selected':''}`} key={service.name} data-reveal><input type="checkbox" checked={selected.includes(service.name)} onChange={()=>toggleService(service.name)} aria-label={`Select ${service.name}`}/><span className="booking-card-image"><img src={service.image} alt="" loading="lazy"/><span className="booking-check" aria-hidden="true">✓</span></span><span className="booking-card-copy"><span className="booking-card-number">0{index+1}</span><strong>{service.name}</strong><small>{service.note}</small></span></label>)}</div><div className="booking-launch"><p>{selected.length?`${selected.length} solution${selected.length===1?'':'s'} selected`:'Choose one or more solutions to begin.'}</p><button className="button button-dark" type="button" onClick={startBooking} disabled={!selected.length}>Book a Consultation <Arrow/></button></div></>}
    {stage==='form'&&<div className="booking-panel" id="consultation-form" ref={formRef}>
      <div className="booking-panel-top"><div><span className="booking-overline">CONSULTATION REQUEST</span><h3>Let’s understand what you need.</h3></div><button type="button" className="booking-edit" onClick={()=>{const form=formRef.current?.querySelector('form');if(form)setBookingData(current=>({...current,...Object.fromEntries(new FormData(form).entries())}));setStage('choose')}}>Change solutions <Arrow diagonal/></button></div>
      <div className="booking-progress" aria-label={`Step ${step} of 3`}>{[['Your details','1'],['Your property','2'],['Visit preferences','3']].map(([label,num],index)=><div className={`progress-step${step===index+1?' current':''}${step>index+1?' complete':''}`} key={num}><span>{step>index+1?'✓':num}</span><b>{label}</b></div>)}</div>
      <form className="booking-form" onSubmit={onSubmit} noValidate>
        {step===1&&<div className="booking-fields"><label>Full name<input name="bookingName" autoComplete="name" defaultValue={bookingData.bookingName||''} placeholder="Your full name" required/></label><label>Mobile number<input name="bookingPhone" type="tel" autoComplete="tel" defaultValue={bookingData.bookingPhone||''} placeholder="+91" pattern="[+0-9()\\-\\s]{7,}" required/></label><label>Email address<input name="bookingEmail" type="email" autoComplete="email" defaultValue={bookingData.bookingEmail||''} placeholder="you@example.com" required/></label></div>}
        {step===2&&<><fieldset className="selected-services"><legend>Selected services <span>Select all that apply</span></legend><div>{bookingServices.map(service=><label key={service.name}><input type="checkbox" checked={selected.includes(service.name)} onChange={()=>toggleService(service.name)}/><span>{service.name}</span></label>)}</div>{!selected.length&&<small className="service-error">Select at least one service to continue.</small>}</fieldset><div className="booking-fields"><label>Property type<select name="propertyType" defaultValue={bookingData.propertyType||''} required><option value="" disabled>Select property type</option><option>Residential</option><option>Commercial</option><option>Industrial</option><option>Agricultural</option></select></label><label>City<input name="bookingCity" autoComplete="address-level2" defaultValue={bookingData.bookingCity||''} placeholder="City or town" required/></label><label className="field-wide">Address<input name="bookingAddress" autoComplete="street-address" defaultValue={bookingData.bookingAddress||''} placeholder="Site address or locality" required/></label></div></>}
        {step===3&&<div className="booking-fields"><label>Solar capacity requirement <span className="optional-label">OPTIONAL</span><input name="capacity" defaultValue={bookingData.capacity||''} placeholder="e.g. 5 kW, if known"/></label><label>Preferred site visit date<input name="visitDate" type="date" min={todayLocal()} defaultValue={bookingData.visitDate||''} required/></label><label className="field-wide">Additional message <span className="optional-label">OPTIONAL</span><textarea name="bookingMessage" defaultValue={bookingData.bookingMessage||''} rows="4" placeholder="Anything else we should know before we speak?"/></label></div>}
        <div className="booking-form-actions">{step>1?<button type="button" className="booking-back" onClick={event=>{const form=event.currentTarget.closest('form');if(form)setBookingData(current=>({...current,...Object.fromEntries(new FormData(form).entries())}));setStep(step-1)}}>← Back</button>:<span className="booking-privacy">Your details are used only to prepare your enquiry.</span>}<button className="button button-dark" type="submit">{step<3?'Continue':'Review WhatsApp Enquiry'} <Arrow/></button></div>
      </form>
    </div>}
    {stage==='ready'&&<div className="booking-ready" role="status"><span className="ready-mark">03 / 03</span><Kicker>YOUR DETAILS ARE READY</Kicker><h3>One final step<br/>to send your request.</h3><p>Your selected services and consultation details are ready in a WhatsApp message. Nothing has been sent to ATOMIC SOLAR yet. Open WhatsApp and tap <strong>Send</strong> to submit your enquiry.</p><div className="booking-ready-actions"><a className="button button-dark" href={messageUrl} target="_blank" rel="noreferrer">Open WhatsApp <Arrow diagonal/></a><button type="button" className="booking-back" onClick={()=>{setStage('form');setStep(1)}}>Edit consultation details</button></div><small>WhatsApp uses the editable placeholder business number. Update it before launch.</small></div>}
  </section>;
}

function Contact() {
  const [sent,setSent]=useState(false);
  const [status,setStatus]=useState('');
  return <section className="contact" id="contact"><div className="contact-intro"><Kicker light>START A CONVERSATION</Kicker><h2>Let’s discuss your<br/>energy <em>requirements.</em></h2><p>Tell us about your project and our team can help you explore suitable energy solutions.</p><a href={WHATSAPP_URL} className="whatsapp-link" target="_blank" rel="noreferrer"><span>↗</span> Enquire via WhatsApp <Arrow diagonal/></a><small>WhatsApp contact uses an editable placeholder number.</small></div><div className="contact-form-area"><div className="form-heading"><span>ENQUIRY FORM</span><span>ATOMIC SOLAR</span></div>{sent?<div className="form-success" role="status"><span className="success-mark">✓</span><h3>Thank you for getting in touch.</h3><p>This form is a website concept. No information was sent to ATOMIC SOLAR because no enquiry backend is connected.</p><button type="button" className="text-link" onClick={()=>setSent(false)}>Send another enquiry <Arrow/></button></div>:<form onSubmit={event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity()){setStatus('Please check the highlighted fields.');return}setStatus('');setSent(true);form.reset()}} onInvalid={()=>setStatus('Please complete the required fields.')}><div className="form-grid"><label>Full name<input name="name" autoComplete="name" placeholder="Your full name" required/></label><label>Phone number<input type="tel" name="phone" autoComplete="tel" placeholder="+91" pattern="[+0-9()\-\s]{7,}" required/></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required/></label><label>Location<input name="location" autoComplete="address-level2" placeholder="City or area" required/></label><label>Customer type<select name="customerType" defaultValue="" required><option value="" disabled>Select a category</option><option>Residential</option><option>Commercial</option><option>Industrial</option></select></label><label>Interested service<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{serviceOptions.map(service=><option key={service}>{service}</option>)}</select></label></div><label className="details-field">Project details<textarea name="details" rows="3" placeholder="Tell us a little about your project…" required/></label><div className="form-actions"><p>No information is transmitted or stored in this demo.</p><button type="submit" className="button button-dark">Submit enquiry <Arrow/></button></div>{status&&<p className="form-status" role="alert">{status}</p>}</form>}</div></section>;
}
function Footer() {
  return <footer className="footer"><div className="footer-main"><div className="footer-brand-col"><Brand/><p>Trusted Solar Specialist &amp;<br/>Solution Provider.</p><span>Smarter Energy. A Brighter Tomorrow.</span><a className="instagram" href="https://www.instagram.com/atomicsolars/" target="_blank" rel="noreferrer">INSTAGRAM <Arrow diagonal/></a></div><div className="footer-column"><span>EXPLORE</span><a href="#home">Home</a><a href="#about">About</a><a href="#solutions">Solutions</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div><div className="footer-column footer-services"><span>SERVICES</span>{solutionGroups.map(group=><a href="#solutions" key={group.no}><b>{group.title}</b><small>{group.services.join(' · ')}</small></a>)}</div><div className="footer-contact"><span>CONTACT</span><p>Phone, email and address details<br/>to be verified before launch.</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp enquiry <Arrow diagonal/></a><small>Business number is an editable placeholder.</small></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ATOMIC SOLAR</span><span>SMARTER ENERGY. A BRIGHTER TOMORROW.</span><a href="#home">BACK TO TOP ↑</a></div></footer>;
}
function App() {
  const reveal=useReveal();
  return <div ref={reveal}><Header/><main><Hero/><About/><Solutions/><ConsultationBooking/><Sectors/><Projects/><WhyAtomic/><Process/><Contact/></main><Footer/><a href={WHATSAPP_URL} className="floating-contact" target="_blank" rel="noreferrer" aria-label="Contact ATOMIC SOLAR on WhatsApp"><span>↗</span><i>WhatsApp enquiry</i></a></div>;
}

createRoot(document.getElementById('root')).render(<App/>);

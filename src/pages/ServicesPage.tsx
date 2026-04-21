import { Link } from 'react-router-dom';
import SectionLabel from '@/components/SectionLabel';
import { Truck, Globe, Warehouse, TrendingUp, Check, GlassWater } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'PREMIUM DISTRIBUTION',
    description:
      'We manage the complete distribution of premium beverage brands across Lebanon and regional markets, ensuring products reach the right channels.',
    features: [
      'Coverage across Lebanon and export markets',
      'Direct relationships with hospitality and retail partners',
      'HORECA specialization',
      'Duty-free distribution support',
    ],
  },
  {
    icon: Globe,
    title: 'IMPORT & EXPORT',
    description:
      'We handle customs, compliance, and international logistics for seamless movement of goods between producers and markets.',
    features: [
      'Full customs clearance and documentation',
      'Regulatory compliance',
      'Temperature-controlled shipping',
      'Shipment tracking and reporting',
    ],
  },
  {
    icon: Warehouse,
    title: 'WAREHOUSING & STORAGE',
    description:
      'Secure storage and logistics solutions ensuring product integrity and efficient delivery.',
    features: [
      'Controlled storage facilities',
      'Inventory management system',
      'Bonded warehousing',
      'Pick & pack services',
    ],
  },
  {
    icon: TrendingUp,
    title: 'BRAND DEVELOPMENT',
    description:
      'We help brands enter and grow in the market through strategic positioning and marketing support.',
    features: [
      'Market research',
      'Launch planning',
      'Trade marketing',
      'Brand positioning',
    ],
  },
  {
    icon: GlassWater,
    title: 'EVENT SERVICES',
    description:
      'Complete beverage solutions for private and corporate events — from supply to full service coordination.',
    features: [
      'Alcohol & beverage supply for events',
      'Custom packages based on guest count',
      'Weddings, parties, and corporate events',
      'Optional bar setup & logistics',
    ],
  },
];

const steps = [
  { num: '01', title: 'Connect', desc: 'We discuss your needs, whether distribution or event planning.' },
  { num: '02', title: 'Plan', desc: 'We build a tailored solution for your brand or event.' },
  { num: '03', title: 'Execute', desc: 'We handle logistics, supply, and delivery.' },
  { num: '04', title: 'Support', desc: 'We ensure smooth operations and long-term success.' },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0B0B0C] text-white">

      {/* ───── HERO ───── */}
      <section className="relative min-h-[50vh] md:min-h-[45vh] flex items-center">
        <div className="absolute inset-0">
          <img src="/images/services-hero.jpg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80 md:bg-black/75" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 md:py-24">
          <SectionLabel text="WHAT WE DO" />

          <h1 className="text-3xl md:text-6xl uppercase tracking-[0.15em] md:tracking-[0.2em] mt-6 leading-tight">
            SERVICES
          </h1>

          <p className="text-gray-400 mt-6 max-w-[600px] text-base md:text-lg leading-relaxed">
            From distribution to event supply, STONEBRIDGE delivers premium beverage solutions across Lebanon and beyond.
          </p>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section className="py-20 md:py-28 bg-[#111]">
        <div className="max-w-[1200px] mx-auto px-6">

          <div className="text-center mb-16 md:mb-20">
            <SectionLabel text="CORE SERVICES" centered />
            <h2 className="text-2xl md:text-5xl uppercase mt-6 tracking-wider">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative p-8 md:p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 rounded-sm"
              >
                <service.icon className="text-[#D4AF37] w-6 h-6" />

                <h3 className="mt-6 text-lg md:text-xl uppercase tracking-[0.1em] font-medium">
                  {service.title}
                </h3>

                <p className="mt-4 text-gray-400 text-sm md:text-base leading-[1.7]">
                  {service.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[13px] md:text-sm text-gray-300 items-start">
                      <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="absolute inset-0 border border-transparent hover:border-[#D4AF37]/20 transition pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section className="py-20 md:py-28 bg-[#0B0B0C] border-y border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 text-center">

          <SectionLabel text="OUR PROCESS" centered />

          <h2 className="text-2xl md:text-5xl uppercase mt-6 mb-16 tracking-wider">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-10">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-[#D4AF37] text-4xl md:text-3xl font-serif">
                  {step.num}
                </div>
                <h3 className="mt-4 text-lg uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-[200px] md:max-w-none">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative min-h-[450px] md:min-h-[400px] flex items-center justify-center py-20">
        <div className="absolute inset-0">
          <img src="/images/services-cta.jpg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/80 md:bg-black/75" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h2 className="text-2xl md:text-5xl uppercase leading-tight tracking-wide max-w-[800px] mx-auto">
            Need Distribution or <br className="md:hidden" /> Event Supply?
          </h2>

          <p className="text-gray-400 mt-6 text-sm md:text-base max-w-[500px] mx-auto leading-relaxed">
            Whether you're launching a brand or planning an event, we provide complete beverage solutions tailored to your scale.
          </p>

          <Link
            to="/contact"
            className="inline-block mt-10 px-8 md:px-12 py-4 bg-white text-black uppercase text-[12px] md:text-sm font-bold tracking-[0.1em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>

          <p className="mt-8 text-[#D4AF37] font-medium tracking-widest text-sm md:text-base">
            +961 79 467 530
          </p>
        </div>
      </section>

    </div>
  );
}
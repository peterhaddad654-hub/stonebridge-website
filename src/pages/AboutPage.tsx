import SectionLabel from '@/components/SectionLabel';
import { Award, Shield, Lightbulb, Handshake } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'EXCELLENCE',
    description:
      'We represent only the finest brands and maintain the highest standards in every aspect of our operations — from warehouse conditions to delivery timelines.',
  },
  {
    icon: Shield,
    title: 'INTEGRITY',
    description:
      'Trust is the foundation of every relationship we build. We operate with complete transparency, honoring our commitments to partners and clients alike.',
  },
  {
    icon: Lightbulb,
    title: 'INNOVATION',
    description:
      'We constantly seek smarter ways to move products, manage inventory, and serve our markets — leveraging technology to stay ahead of industry trends.',
  },
  {
    icon: Handshake,
    title: 'PARTNERSHIP',
    description:
      "We don't just distribute — we collaborate. Our success is measured by the growth and satisfaction of every brand and client in our network.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0B0B0C] text-white">

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-hero.jpg"
            className="w-full h-full object-cover scale-105"
            alt=""
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <SectionLabel text="ABOUT US" />

          <h1 className="font-display text-white text-4xl md:text-6xl font-medium uppercase tracking-[0.2em] mt-6">
            STONEBRIDGE
          </h1>

          <p className="text-gray-400 mt-6 max-w-[600px] text-lg leading-[1.7]">
            A Lebanon-based beverage distribution company focused on reliability,
            strong partnerships, and delivering premium products to the market.
          </p>
        </div>
      </section>

      {/* ───────────────── STORY ───────────────── */}
      <section className="py-28 md:py-[140px] bg-[#111]">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="overflow-hidden border border-white/10">
            <img
              src="/images/about-hero.jpg"
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
              alt=""
            />
          </div>

          {/* Text */}
          <div>
            <SectionLabel text="OUR JOURNEY" />

            <h2 className="font-display text-3xl md:text-5xl uppercase mt-6 leading-tight">
              Building Bridges
              <br />
              <span className="text-[#D4AF37]">Across Markets</span>
            </h2>

            <div className="space-y-6 mt-8 text-gray-400 leading-[1.8] text-lg">
              <p>
                STONEBRIDGE Distribution was founded with a clear vision: to provide
                reliable and professional beverage distribution services across Lebanon.
              </p>

              <p>
                We specialize in sourcing and supplying a carefully selected range of
                alcoholic and non-alcoholic beverages, ensuring consistent availability
                and efficient logistics.
              </p>

              <p>
                As a growing company, we are committed to expanding our network,
                strengthening partnerships, and becoming a trusted name in the industry.
              </p>
            </div>

            <p className="mt-10 text-white italic">— The STONEBRIDGE Team</p>
          </div>
        </div>
      </section>

      {/* ───────────────── STATS (NEW PREMIUM SECTION) ───────────────── */}
      <section className="py-24 bg-[#0B0B0C] border-y border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {[
            { number: '100+', label: 'Products' },
            { number: '50+', label: 'Clients' },
            { number: '10+', label: 'Categories' },
            { number: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl md:text-5xl font-serif text-white">
                {stat.number}
              </h3>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-[0.1em]">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ───────────────── VALUES ───────────────── */}
      <section className="py-28 md:py-[140px] bg-[#111]">
        <div className="max-w-[1200px] mx-auto px-6">

          <SectionLabel text="OUR VALUES" />

          <h2 className="font-display text-3xl md:text-5xl uppercase mt-6 mb-16">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {values.map((v) => (
              <div
                key={v.title}
                className="relative p-10 border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition duration-500"
              >
                <v.icon className="text-[#D4AF37] w-6 h-6" />

                <h3 className="mt-6 text-xl uppercase tracking-[0.1em]">
                  {v.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-[1.7]">
                  {v.description}
                </p>

                {/* subtle glow */}
                <div className="absolute inset-0 border border-transparent hover:border-[#D4AF37]/20 pointer-events-none transition" />
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
}
import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import SectionLabel from '@/components/SectionLabel';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { toast } from 'sonner';

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const { createMessage } = useData();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in required fields');
      return;
    }

    setSending(true);

    setTimeout(() => {
      createMessage({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.subject,
        message: form.message,
      });

      setSending(false);
      setSent(true);

      toast.success('Message sent successfully');

      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'General Inquiry',
        message: '',
      });

      setTimeout(() => setSent(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-[#0F0F10] text-white">

      {/* HERO */}
      <section className="relative min-h-[280px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/contact-hero.jpg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-[1344px] mx-auto px-6 py-24">
          <SectionLabel text="CONTACT US" />
          <h1 className="text-3xl md:text-5xl font-medium uppercase tracking-[0.15em] mt-4">
            Get In Touch
          </h1>
          <p className="text-gray-400 mt-4 max-w-[600px]">
            We reply within 24 hours for all business inquiries.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-[1344px] mx-auto px-6 grid lg:grid-cols-12 gap-16">

          {/* FORM */}
          <div className="lg:col-span-7">

            <h2 className="text-xl uppercase tracking-widest mb-8">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {[
                { name: 'name', label: 'Full Name *', type: 'text' },
                { name: 'email', label: 'Email *', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'text' },
                { name: 'company', label: 'Company', type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs text-gray-400 uppercase">
                    {field.label}
                  </label>

                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name as keyof FormState]}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              ))}

              {/* SUBJECT */}
              <div>
                <label className="text-xs text-gray-400 uppercase">
                  Subject
                </label>

                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-black border-b border-white/10 py-3"
                >
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                  <option>Product Request</option>
                  <option>Wholesale</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-xs text-gray-400 uppercase">
                  Message *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* BUTTON */}
              <button
                disabled={sending}
                className="w-full bg-[#D4AF37] text-black py-3 font-medium hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {sending ? 'Sending...' : sent ? 'Sent ✓' : 'Send Message'}
              </button>

            </form>
          </div>

          {/* INFO */}
          <div className="lg:col-span-5 space-y-8">

            {[
              { icon: Phone, text: '+961 79 467 530' },
              { icon: Mail, text: 'stonebridgedistribution@gmail.com' },
              { icon: MessageCircle, text: 'WhatsApp Chat', link: 'https://wa.me/96179467530' },
              { icon: MapPin, text: 'Baabda, Lebanon' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">

                <item.icon className="w-4 h-4 text-[#D4AF37] mt-1" />

                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-white hover:text-[#D4AF37]"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-white">{item.text}</span>
                )}

              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/96179467530"
              target="_blank"
              className="block text-center bg-[#D4AF37] text-black py-3 font-medium"
            >
              Chat on WhatsApp
            </a>

          </div>
        </div>
      </section>

      {/* MAP */}
      <iframe
        src="https://www.google.com/maps?q=Baabda,+Lebanon&output=embed"
        className="w-full h-[300px]"
      />
    </div>
  );
}
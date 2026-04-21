interface SectionLabelProps {
  text: string;
  centered?: boolean;
}

export default function SectionLabel({ text, centered = false }: SectionLabelProps) {
  return (
    <div className={`flex flex-col items-start gap-2 ${centered ? 'items-center' : ''}`}>
      <div className="w-[1px] h-8 bg-[#D4AF37]" />
      <span className={`font-body text-[11px] font-medium tracking-[0.12em] uppercase text-[#D4AF37] ${centered ? 'text-center' : ''}`}>
        {text}
      </span>
    </div>
  );
}

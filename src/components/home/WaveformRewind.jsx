import { motion, useTransform } from 'framer-motion';

const waveformBars = [44, 72, 96, 58, 118, 86, 132, 76, 108, 62, 124, 94, 54, 102, 70, 116, 84, 48];

function WaveformBar({ height, index, progress }) {
  const scaleY = useTransform(progress, [0, 1], [1, 0.22 + (index % 4) * 0.05]);
  const opacity = useTransform(progress, [0, 0.75, 1], [0.95, 0.58, 0.28]);
  const y = useTransform(progress, [0, 1], [0, 16 + (index % 3) * 5]);

  return (
    <motion.span
      style={{ height, scaleY, opacity, y, transformOrigin: 'bottom' }}
      className="w-1.5 rounded-full bg-[linear-gradient(180deg,#f8fafc,#22d3ee_44%,#ec4899)] shadow-[0_0_18px_rgba(34,211,238,0.45)] md:w-2"
    />
  );
}

export default function WaveformRewind({ progress, compact = false }) {
  return (
    <div className={`flex items-end justify-center gap-1.5 ${compact ? 'h-20' : 'h-36'} md:gap-2`} aria-hidden="true">
      {waveformBars.map((height, index) => (
        <WaveformBar
          key={`${height}-${index}`}
          height={compact ? Math.max(22, height * 0.55) : height}
          index={index}
          progress={progress}
        />
      ))}
    </div>
  );
}

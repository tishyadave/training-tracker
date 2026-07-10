import { cn } from '@/lib/utils';

const IDENTITY_COLORS = [
    { bg: '#E1EBF5', fg: '#185FA5' }, // blue
    { bg: '#E1F5EE', fg: '#0F6E56' }, // forest
    { bg: '#F5E5DD', fg: '#993C1D' }, // rust
    { bg: '#F1E1E8', fg: '#72243E' }, // plum
    { bg: '#E7E5F7', fg: '#534AB7' }, // violet
    { bg: '#F3E8D6', fg: '#854F0B' }, // ochre
];

export function Avatar({ name, colorIndex = 0, size = 32, className }) {
    const { bg, fg } = IDENTITY_COLORS[colorIndex % IDENTITY_COLORS.length];
    const initial = name?.charAt(0)?.toUpperCase() ?? '?';

    return (
        <div
            className={cn('flex shrink-0 items-center justify-center rounded-full font-display font-semibold', className)}
            style={{ width: size, height: size, backgroundColor: bg, color: fg, fontSize: size * 0.4 }}
        >
            {initial}
        </div>
    );
}

export { IDENTITY_COLORS };
import { Handle } from 'reactflow';

export default function BaseNode({ id, title, handles = [], body, styleOverrides = {}, gradientColors = ['#3b82f6', '#2563eb'] }) {
    return (
        <div
            className="node-container"
            style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '16px',
                minWidth: '220px',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${gradientColors[0]}20`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                ...styleOverrides
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${gradientColors[0]}40`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${gradientColors[0]}20`;
            }}
        >
            {/* Animated gradient border on top */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                opacity: 0.8
            }} />

            {/* Glowing orb indicator */}
            <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${gradientColors[0]}20, transparent 70%)`,
                filter: 'blur(20px)',
                pointerEvents: 'none'
            }} />

            {/* Title with animated dot */}
            <div style={{
                fontWeight: 600,
                fontSize: '14px',
                color: '#f8fafc',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                    boxShadow: `0 0 10px ${gradientColors[0]}`,
                    animation: 'pulse 2s ease-in-out infinite'
                }} />
                {title}
            </div>

            {/* Body content */}
            <div style={{
                color: '#cbd5e1',
                fontSize: '13px',
                position: 'relative',
                zIndex: 1
            }}>
                {body}
            </div>

            {/* Connection handles with glow effect */}
            {handles.map((h, i) => (
                <Handle
                    key={i}
                    type={h.type}
                    position={h.position}
                    id={h.id}
                    style={{
                        width: '12px',
                        height: '12px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        background: h.type === 'source'
                            ? `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
                            : '#1e293b',
                        boxShadow: `0 0 15px ${gradientColors[0]}80`,
                        transition: 'all 0.3s ease',
                        zIndex: 10,
                        ...h.style
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.5)';
                        e.target.style.boxShadow = `0 0 25px ${gradientColors[0]}`;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = `0 0 15px ${gradientColors[0]}80`;
                    }}
                />
            ))}

            <style>{`
                @keyframes pulse {
                    0%, 100% { 
                        opacity: 1; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 0.6; 
                        transform: scale(1.2); 
                    }
                }
            `}</style>
        </div>
    );
}
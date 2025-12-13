// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  // Map node types (lowercase) to their gradient colors
  const getGradientForType = (nodeType) => {
    const gradientMap = {
      'input': ['#10b981', '#059669'],
      'output': ['#3b82f6', '#2563eb'],
      'llm': ['#a855f7', '#7c3aed'],
      'text': ['#ec4899', '#db2777'],
      'math': ['#f97316', '#ea580c'],
      'condition': ['#eab308', '#ca8a04'],
      'delay': ['#6366f1', '#4f46e5'],
      'merge': ['#06b6d4', '#0891b2'],
      'number': ['#14b8a6', '#0d9488']
    };

    return gradientMap[nodeType.toLowerCase()] || ['#3b82f6', '#2563eb'];
  };

  const gradient = getGradientForType(type);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.target.style.transform = 'scale(0.95)';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
    event.target.style.transform = 'scale(1)';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
        e.currentTarget.style.boxShadow = `0 8px 25px ${gradient[0]}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 4px 15px ${gradient[0]}40`;
      }}
      style={{
        cursor: 'grab',
        minWidth: '140px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        color: '#fff',
        fontWeight: 600,
        fontSize: '13px',
        boxShadow: `0 4px 15px ${gradient[0]}40`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
      draggable
    >
      {/* Shine effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '50%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        animation: 'shine 3s infinite',
        pointerEvents: 'none'
      }} />

      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>

      <style>{`
                @keyframes shine {
                    0% { left: -100%; }
                    50%, 100% { left: 200%; }
                }
            `}</style>
    </div>
  );
};
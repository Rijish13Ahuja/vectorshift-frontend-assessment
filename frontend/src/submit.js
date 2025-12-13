import { useState } from 'react';
import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        const nodes = getNodes();
        const edges = getEdges();

        try {
            const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nodes, edges })
            });

            const data = await res.json();

            setModalData(data);
            setIsError(false);
            setShowModal(true);
        } catch (error) {
            setModalData({ error: 'Failed to connect to the server. Please check your connection.' });
            setIsError(true);
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '32px',
                paddingBottom: '32px'
            }}>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        padding: '16px 48px',
                        background: isHovered
                            ? 'linear-gradient(135deg, #a855f7, #ec4899, #3b82f6)'
                            : 'linear-gradient(135deg, #3b82f6, #a855f7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        boxShadow: isHovered
                            ? '0 12px 35px rgba(59, 130, 246, 0.4), 0 0 40px rgba(168, 85, 247, 0.3)'
                            : '0 8px 25px rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isHovered && !isLoading ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                        backgroundSize: '200% 200%',
                        animation: isHovered ? 'gradient-shift 3s ease infinite' : 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {!isLoading && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: isHovered ? '-100%' : '-200%',
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                            transition: 'left 0.6s ease',
                            pointerEvents: 'none'
                        }} />
                    )}

                    <span style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {isLoading ? (
                            <>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid #fff',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                                Processing...
                            </>
                        ) : (
                            <>
                                🚀 Submit Pipeline
                            </>
                        )}
                    </span>
                </button>
            </div>

            {/* Custom Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    animation: 'fadeIn 0.3s ease'
                }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                            border: `2px solid ${isError ? '#ef4444' : '#10b981'}`,
                            borderRadius: '20px',
                            padding: '32px',
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${isError ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                            position: 'relative',
                            animation: 'slideUp 0.3s ease'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with icon */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '24px'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: isError
                                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                    : 'linear-gradient(135deg, #10b981, #059669)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                boxShadow: isError
                                    ? '0 4px 20px rgba(239, 68, 68, 0.4)'
                                    : '0 4px 20px rgba(16, 185, 129, 0.4)'
                            }}>
                                {isError ? '❌' : '✅'}
                            </div>
                            <div>
                                <h2 style={{
                                    margin: 0,
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: '#f8fafc',
                                    background: isError
                                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                        : 'linear-gradient(135deg, #10b981, #059669)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {isError ? 'Error' : 'Pipeline Summary'}
                                </h2>
                                <p style={{
                                    margin: '4px 0 0 0',
                                    fontSize: '13px',
                                    color: '#94a3b8'
                                }}>
                                    {isError ? 'Submission failed' : 'Successfully analyzed'}
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        {isError ? (
                            <div style={{
                                padding: '16px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '12px',
                                marginBottom: '24px'
                            }}>
                                <p style={{
                                    margin: 0,
                                    color: '#fca5a5',
                                    fontSize: '14px',
                                    lineHeight: '1.6'
                                }}>
                                    {modalData?.error}
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                marginBottom: '24px'
                            }}>
                                {/* Nodes Count */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    borderRadius: '10px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{ fontSize: '20px' }}>📦</span>
                                        <span style={{
                                            color: '#cbd5e1',
                                            fontSize: '14px',
                                            fontWeight: 500
                                        }}>
                                            Total Nodes
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        color: '#3b82f6'
                                    }}>
                                        {modalData?.num_nodes}
                                    </span>
                                </div>

                                {/* Edges Count */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    background: 'rgba(168, 85, 247, 0.1)',
                                    border: '1px solid rgba(168, 85, 247, 0.3)',
                                    borderRadius: '10px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{ fontSize: '20px' }}>🔗</span>
                                        <span style={{
                                            color: '#cbd5e1',
                                            fontSize: '14px',
                                            fontWeight: 500
                                        }}>
                                            Total Edges
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        color: '#a855f7'
                                    }}>
                                        {modalData?.num_edges}
                                    </span>
                                </div>

                                {/* DAG Status */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    background: modalData?.is_dag
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'rgba(239, 68, 68, 0.1)',
                                    border: modalData?.is_dag
                                        ? '1px solid rgba(16, 185, 129, 0.3)'
                                        : '1px solid rgba(239, 68, 68, 0.3)',
                                    borderRadius: '10px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{ fontSize: '20px' }}>
                                            {modalData?.is_dag ? '✓' : '⚠️'}
                                        </span>
                                        <span style={{
                                            color: '#cbd5e1',
                                            fontSize: '14px',
                                            fontWeight: 500
                                        }}>
                                            DAG Status
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: modalData?.is_dag ? '#10b981' : '#ef4444',
                                        padding: '4px 12px',
                                        background: modalData?.is_dag
                                            ? 'rgba(16, 185, 129, 0.2)'
                                            : 'rgba(239, 68, 68, 0.2)',
                                        borderRadius: '6px'
                                    }}>
                                        {modalData?.is_dag ? 'Valid' : 'Invalid'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: isError
                                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                    : 'linear-gradient(135deg, #10b981, #059669)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '15px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: isError
                                    ? '0 4px 15px rgba(239, 68, 68, 0.3)'
                                    : '0 4px 15px rgba(16, 185, 129, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = isError
                                    ? '0 8px 25px rgba(239, 68, 68, 0.4)'
                                    : '0 8px 25px rgba(16, 185, 129, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = isError
                                    ? '0 4px 15px rgba(239, 68, 68, 0.3)'
                                    : '0 4px 15px rgba(16, 185, 129, 0.3)';
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
};
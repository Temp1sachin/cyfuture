import { FileText, KeyRound, ShieldAlert } from 'lucide-react';

const typeStyles = {
  summary: {
    title: 'Summary',
    color: 'text-green-700',
    border: 'border-green-400',
    icon: <FileText className="inline mr-2 text-green-600" size={22} />,
    bg: 'bg-green-50',
  },
  terms: {
    title: 'Key Terms',
    color: 'text-yellow-700',
    border: 'border-yellow-400',
    icon: <KeyRound className="inline mr-2 text-yellow-600" size={22} />,
    bg: 'bg-yellow-50',
  },
  risks: {
    title: 'Risks Identified',
    color: 'text-red-700',
    border: 'border-red-400',
    icon: <ShieldAlert className="inline mr-2 text-red-600" size={22} />,
    bg: 'bg-red-50',
  }
};

const AnalysisResult = ({ result }) => {
  if (!result || !result.text) return null;

  // Use the type from the result prop, fallback to summary
  const type = result.type || 'summary';
  const { title, color, border, icon, bg } = typeStyles[type] || typeStyles.summary;

  return (
    <div className={`mt-6 p-6 rounded-lg shadow-lg max-w-3xl mx-auto whitespace-pre-wrap border-2 ${border} ${bg}`} style={{ background: '#FFFDEB' }}>
      <h2 className={`text-2xl font-extrabold mb-2 flex items-center gap-2 ${color}`}>{icon} {title}</h2>
      <p className="text-black text-lg leading-relaxed">{result.text}</p>
    </div>
  );
};

export default AnalysisResult;

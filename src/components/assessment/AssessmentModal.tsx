import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { apiService } from '../../services/api';
import { Assessment, AssessmentQuestion } from '../../types';

export const AssessmentModal: React.FC = () => {
  const { 
    activeAssessmentSkill, 
    closeAssessment, 
    onAssessmentCompleted 
  } = useApp();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (activeAssessmentSkill) {
      setAnswers({});
      setCurrentQuestionIdx(0);
      setResult(null);
      apiService.getAssessment(activeAssessmentSkill).then(data => {
        setAssessment(data);
      });
    }
  }, [activeAssessmentSkill]);

  if (!activeAssessmentSkill || !assessment) return null;

  const currentQ: AssessmentQuestion = assessment.questions[currentQuestionIdx];
  const totalQuestions = assessment.questions.length;
  const isLastQuestion = currentQuestionIdx === totalQuestions - 1;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const grading = await apiService.submitAssessment(activeAssessmentSkill, answers);
      setResult(grading);
      onAssessmentCompleted(activeAssessmentSkill, grading);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl glass-panel shadow-2xl border border-purple-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 gradient-brand flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">
                {assessment.title}
              </h3>
              <p className="text-xs text-brand-100">
                Verified Skill Benchmark • {assessment.timeLimit} Mins Limit
              </p>
            </div>
          </div>

          <button
            onClick={closeAssessment}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!result ? (
            /* Quiz Questions View */
            <div className="space-y-6">
              {/* Question Index Progress */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Question {currentQuestionIdx + 1} of {totalQuestions}</span>
                <span>{Object.keys(answers).length} Answered</span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-600 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h4>

                {currentQ.code && (
                  <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800">
                    {currentQ.code}
                  </pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50 dark:bg-brand-950/70 border-brand-500 text-brand-900 dark:text-brand-200 font-bold shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                >
                  Previous
                </button>

                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || answers[currentQ.id] === undefined}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs gradient-brand shadow-lg shadow-brand-500/20 hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Grading...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Submit Assessment</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
                    disabled={answers[currentQ.id] === undefined}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-3xl gradient-brand flex items-center justify-center text-white shadow-xl shadow-brand-500/30">
                {result.passed ? (
                  <Sparkles className="w-8 h-8 animate-pulse" />
                ) : (
                  <Award className="w-8 h-8" />
                )}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Assessment Completed
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Score: {result.score} / {result.total} ({result.percentage}%)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {result.feedback}
                </p>
              </div>

              {/* Verified Proficiency Badge */}
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Status: <strong>{result.proficiency} in {result.skill}</strong></span>
              </div>

              {/* Explanations Breakdown */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Detailed Answer Explanations
                </h4>
                <div className="space-y-2">
                  {result.breakdown.map((item: any, idx: number) => (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        item.isCorrect 
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50' 
                          : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>Q{idx + 1}: {item.question}</span>
                        {item.isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Correct</span>
                        ) : (
                          <span className="text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Review</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={closeAssessment}
                className="w-full py-3 rounded-2xl font-bold text-xs gradient-brand text-white shadow-lg hover:scale-[1.01] transition-all"
              >
                Close & Sync with Learning Path
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

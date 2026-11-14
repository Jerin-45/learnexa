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
  HelpCircle,
  Check
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl panel shadow-modal dark:shadow-modal-dark overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50/50 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white leading-tight">
                {assessment.title}
              </h3>
              <p className="text-[11px] text-neutral-500 font-mono">
                Skill Benchmark • {assessment.timeLimit} Mins Limit
              </p>
            </div>
          </div>

          <button
            onClick={closeAssessment}
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {!result ? (
            /* Quiz Questions View */
            <div className="space-y-5">
              {/* Question Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Question {currentQuestionIdx + 1} of {totalQuestions}</span>
                  <span>{Object.keys(answers).length} answered</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-neutral-900 dark:bg-white h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">
                  {currentQ.question}
                </h4>

                {currentQ.code && (
                  <pre className="p-3.5 rounded-xl bg-neutral-900 text-neutral-100 text-[11px] font-mono overflow-x-auto border border-neutral-800">
                    {currentQ.code}
                  </pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-900 font-medium'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-[#121212]'
                      }`}
                    >
                      <span className="text-neutral-800 dark:text-neutral-200">{option}</span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        isSelected 
                          ? 'border-neutral-900 bg-neutral-900 dark:border-white dark:bg-white' 
                          : 'border-neutral-300 dark:border-neutral-700'
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="btn-ghost disabled:opacity-30"
                >
                  Previous
                </button>

                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || answers[currentQ.id] === undefined}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Grading...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Assessment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
                    disabled={answers[currentQ.id] === undefined}
                    className="btn-primary disabled:opacity-40"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 text-center py-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
                result.passed 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' 
                  : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
              }`}>
                {result.passed ? <CheckCircle2 className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
              </div>

              <div className="space-y-1">
                <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                  result.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {result.passed ? 'Assessment Passed • Competency Verified' : 'Practice Recommended'}
                </span>
                <h3 className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                  {result.percentage}% ({result.score} / {result.maxScore})
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  {result.feedback}
                </p>
              </div>

              {result.recommendations && result.recommendations.length > 0 && (
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-left border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
                    Recommended Study Focus
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {result.recommendations.map((rec: string, rIdx: number) => (
                      <li key={rIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={closeAssessment}
                className="btn-primary w-full py-2.5"
              >
                Close & Return to Dashboard
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

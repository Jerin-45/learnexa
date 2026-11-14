import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  User,
  CheckCircle2,
  ArrowRight,
  Zap,
  HelpCircle
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { apiService } from '../../services/api';

export const MentorChatbot: React.FC = () => {
  const {
    currentUser,
    currentCareer,
    isChatOpen,
    toggleChat,
    agentData,
    openAssessment,
    setCareerGoal,
    setActiveTab
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'mentor',
      text: `Hello ${currentUser.name.split(' ')[0]}! I'm your dedicated Learnexa AI Career Mentor. I have full context on your target career as a ${currentCareer.title} and your ${currentUser.skills.length} verified competencies.\n\nHow can I accelerate your learning journey today?`,
      timestamp: 'Just now',
      suggestedActions: [
        "Explain my skill gaps",
        "What project should I build next?",
        "Switch career goal to AI Engineer",
        "Take a skill assessment quiz"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const userContext = {
        name: currentUser.name,
        careerGoal: currentCareer.title,
        skills: currentUser.skills,
        missingSkills: agentData?.careerMatch?.missingSkills || [],
        completionRate: agentData?.progressEvaluation?.completionRate || 25
      };

      const response = await apiService.sendChatMessage(text, userContext);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'mentor',
        text: response.reply,
        timestamp: 'Just now',
        suggestedActions: response.suggestedActions
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'mentor',
          text: "I am actively recalibrating roadmap data. Please try your question again in a moment.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: string) => {
    const lower = action.toLowerCase();
    if (lower.includes("skill gaps") || lower.includes("missing")) {
      setActiveTab("skills");
    } else if (lower.includes("ai engineer")) {
      setCareerGoal("ai-engineer");
    } else if (lower.includes("quiz") || lower.includes("assessment")) {
      openAssessment("JavaScript");
    } else if (lower.includes("roadmap") || lower.includes("curriculum")) {
      setActiveTab("roadmap");
    } else {
      handleSend(action);
    }
  };

  if (!isChatOpen) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-200 shadow-modal dark:shadow-modal-dark ${
        isExpanded
          ? 'inset-4 sm:inset-10 rounded-2xl panel flex flex-col'
          : 'bottom-4 right-4 sm:right-6 w-full max-w-[400px] h-[540px] rounded-2xl panel flex flex-col'
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 rounded-t-2xl border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-xs text-neutral-900 dark:text-white">
                Learnexa AI Mentor
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] font-mono text-neutral-400">
              {currentCareer.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleChat}
            className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`space-y-1.5 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap text-xs ${
                    isUser
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-tr-none'
                      : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {msg.suggestedActions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleActionClick(action)}
                        className="btn-secondary py-1 px-2 text-[10px] font-medium"
                      >
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] font-mono text-neutral-400 block px-0.5">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-neutral-400 text-xs italic p-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
            <span>Mentor synthesizing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center gap-2"
      >
        <input 
          type="text"
          placeholder="Ask about roadmaps, missing skills, or career pivots..."
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          className="input-field py-2 text-xs flex-1"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="btn-primary py-2 px-3 text-xs shrink-0 disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

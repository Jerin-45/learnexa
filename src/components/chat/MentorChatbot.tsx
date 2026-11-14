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
      text: `Hello ${currentUser.name.split(' ')[0]}! 👋 I'm your dedicated SkillPath AI Career Mentor. I have full context on your target career as a **${currentCareer.title}** and your ${currentUser.skills.length} verified skills.\n\nHow can I help accelerate your learning journey today?`,
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
          text: `I'm analyzing your profile for ${currentCareer.title}. Based on your latest milestones, focusing on hands-on practical exercises will yield the fastest results!`,
          timestamp: 'Just now',
          suggestedActions: ["Review roadmap", "Take a quiz"]
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Action chips handler
  const handleActionClick = (action: string) => {
    const lower = action.toLowerCase();
    if (lower.includes("switch") && lower.includes("ai")) {
      setCareerGoal("ai-engineer");
      handleSend("I would like to explore the AI Engineer roadmap.");
    } else if (lower.includes("switch") && lower.includes("data")) {
      setCareerGoal("data-scientist");
      handleSend("I would like to explore Data Science.");
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
      className={`fixed z-50 transition-all duration-300 shadow-2xl ${
        isExpanded
          ? 'inset-4 sm:inset-10 rounded-3xl glass-panel flex flex-col'
          : 'bottom-4 right-4 sm:right-6 w-full max-w-[420px] h-[580px] rounded-3xl glass-panel flex flex-col border border-purple-500/30'
      }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-t-3xl gradient-brand flex items-center justify-between text-white select-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                SkillPath AI Mentor
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-brand-100 font-medium">
              Target: {currentCareer.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors"
            title={isExpanded ? "Collapse Window" : "Expand Full Screen"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleChat}
            className="p-1.5 rounded-xl hover:bg-white/20 transition-colors"
            title="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div 
              key={msg.id} 
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-xl gradient-brand flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`space-y-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-brand-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleActionClick(action)}
                        className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/70 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold text-[11px] border border-purple-200 dark:border-purple-800 transition-colors flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 text-purple-500" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
            <div className="w-6 h-6 rounded-lg gradient-brand flex items-center justify-center text-white">
              <Sparkles className="w-3 h-3 animate-spin" />
            </div>
            <span>Mentor is typing guidance...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 rounded-b-3xl flex items-center gap-2"
      >
        <input
          type="text"
          placeholder={`Ask about ${currentCareer.title}, skills, or projects...`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="p-2.5 rounded-xl gradient-brand text-white shadow-md disabled:opacity-50 hover:scale-105 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

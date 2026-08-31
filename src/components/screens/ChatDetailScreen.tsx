import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Phone,
  Send,
  Image,
  Paperclip,
  Check,
  CheckCheck,
  Info,
  Calendar,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Conversation, ChatMessage, Caregiver, AppScreen } from '../../types';

interface ChatDetailScreenProps {
  conversation: Conversation;
  caregiver?: Caregiver;
  onBack: () => void;
  onViewProfile: (caregiverId: string) => void;
}

export const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({
  conversation,
  caregiver,
  onBack,
  onViewProfile,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Lockbox code is 4829 at the front porch',
    'Mom is resting in the living room',
    'Please call my phone when you arrive',
    'Tea and water bottles are on the counter',
    'Thank you so much!'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user-1',
      senderName: 'You',
      text: text.trim(),
      timestamp: 'Just now',
      isMe: true,
      status: 'sent'
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputValue('');

    // Simulate caregiver automated reply after 1.5s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: conversation.caregiverId,
        senderName: conversation.caregiverName,
        text: 'Received! Thank you so much for the update. I will make sure everything is taken care of with the utmost warmth and attention.',
        timestamp: 'Just now',
        isMe: false,
        status: 'read'
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <div className="flex-1 pb-20 bg-[#F8F9F8] min-h-screen flex flex-col justify-between">
      {/* Top Chat App Bar */}
      <div className="bg-white px-4 py-3 border-b border-[#E8EEE8] sticky top-0 z-30 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-[#F2F4F2] text-neutral-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>

          <div
            onClick={() => caregiver && onViewProfile(caregiver.id)}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="relative">
              <img
                src={conversation.caregiverPhoto}
                alt={conversation.caregiverName}
                className="w-9 h-9 rounded-full object-cover border border-[#E8EEE8]"
              />
              {conversation.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#1A1C1A] leading-tight">
                {conversation.caregiverName}
              </h3>
              <span className="text-[10px] text-[#4E6E5D] font-medium">
                {conversation.isOnline ? 'Online now' : 'Replies in <10 mins'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {caregiver && (
            <a
              href="tel:+15553498821"
              className="w-8 h-8 rounded-full bg-[#F2F4F2] hover:bg-[#E8EEE8] active:scale-95 text-[#4E6E5D] flex items-center justify-center transition-colors cursor-pointer border border-[#E8EEE8]"
              aria-label="Call Caregiver"
            >
              <Phone size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Booking Context Banner */}
      {conversation.bookingContext && (
        <div className="bg-[#4E6E5D] text-white px-4 py-2 text-[11px] flex items-center justify-between border-b border-[#3E584A]">
          <span className="flex items-center gap-1.5 truncate">
            <Calendar size={12} className="text-white/80 shrink-0" />
            <strong className="text-white">Active Session:</strong> {conversation.bookingContext}
          </span>
          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-mono">
            PIN: 4829
          </span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto max-w-md mx-auto w-full">
        {/* Safety Note */}
        <div className="p-2.5 bg-[#F2F4F2] rounded-xl text-center text-[10px] text-neutral-500 max-w-xs mx-auto border border-[#E8EEE8]">
          🔒 Messages and phone calls are protected under the HavenCare Privacy Policy.
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                msg.isMe
                  ? 'bg-[#4E6E5D] text-white rounded-br-xs'
                  : 'bg-white text-[#1A1C1A] rounded-bl-xs border border-[#E8EEE8]'
              }`}
            >
              {msg.text}
            </div>

            <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-1 px-1">
              <span>{msg.timestamp}</span>
              {msg.isMe && (
                <CheckCheck size={11} className="text-[#4E6E5D]" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips */}
      <div className="bg-white/90 backdrop-blur-xs border-t border-[#E8EEE8] px-4 py-2">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(reply)}
              className="py-1 px-2.5 rounded-full bg-[#F2F4F2] hover:bg-[#E8EEE8] text-neutral-700 text-[11px] font-medium shrink-0 transition-colors cursor-pointer border border-[#E8EEE8]"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white px-4 py-3 border-t border-[#E8EEE8] flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3.5 bg-[#F8F9F8] border border-[#E8EEE8] rounded-full text-xs text-[#1A1C1A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4E6E5D] focus:border-[#4E6E5D] transition-all"
        />

        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="w-9 h-9 rounded-full bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
          aria-label="Send Message"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

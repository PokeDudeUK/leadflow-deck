import type { SlideProps } from '../slides';
import { useState, useEffect, useRef } from 'react';

// ─── Conversation script ──────────────────────────────────
interface Message {
  role: 'user' | 'assistant';
  text: string;
  // For assistant: optional structured data block
  data?: {
    label: string;
    rows: { name: string; score: number; note: string }[];
  };
}

interface QAPair {
  user: string;
  assistant: string;
  data?: Message['data'];
}

const CONVERSATIONS: QAPair[] = [
  {
    user: 'What are my strongest gritting leads in Leeds this week?',
    assistant: 'Found 14 strong gritting leads in Leeds (score ≥ 70) in the last 7 days. Top 3:',
    data: {
      label: 'TOP 3 — GRITTING · LEEDS · LAST 7 DAYS',
      rows: [
        { name: 'Yorkshire Cold Chain Ltd',     score: 92, note: 'LS10 · Tender source · STRONG' },
        { name: 'Northern Frozen Logistics',    score: 85, note: 'LS15 · Companies House · STRONG' },
        { name: 'Aire Valley Distribution',     score: 78, note: 'LS11 · Companies House · STRONG' },
      ],
    },
  },
  {
    user: 'Why is Yorkshire Cold Chain scored 92?',
    assistant: 'Score breakdown for LD-000038 — Yorkshire Cold Chain Ltd. Sector match (cold-chain logistics, SIC 49410): +35. Cold-zone postcode (LS10): +25. Tender source (Contracts Finder, gritting-related): +45. Strong keywords ("loading bay", "winter contract"): +25. Raw 130 → capped at 100 → tier STRONG. All four signals fired.',
  },
  {
    user: 'How many wins does my team have this month?',
    assistant: '23 wins so far in May 2026 across the Yorkshire team. Sarah Jones leads with 8 wins (avg deal £4.2k). Pipeline value of £91,400 closing this month. Three deals are stage Quote awaiting decision.',
  },
  {
    user: 'Anything closing soon I should look at?',
    assistant: '⚠️ 1 critical — Leeds City Council winter gritting contract closes in 71h. £185,000 value, no quote drafted yet. Recommend opening this first. 2 warnings — Yorkshire Cold Chain follow-up overdue 2 days, Aire Valley Distribution stale 12 days.',
  },
];

const TYPE_SPEED = 18;        // ms per character — slightly faster, lots of text
const PAUSE_AFTER_USER = 600; // pause between user msg landing and thinking
const THINKING_MS = 700;
const PAUSE_AFTER_ASSISTANT = 1400; // pause between assistant msg done and next user
const HOLD_AFTER = 4500;      // hold after final message before looping
const FADE_MS = 400;

// State for what to render
interface ChatState {
  // index of the QA pair currently being typed/shown (or last completed)
  pairsShown: number;     // how many user messages have appeared
  thinkingFor: number;    // -1 if not thinking, otherwise pair index that is thinking
  typingText: Record<number, string>;  // per-pair partial assistant text
  showDataFor: Set<number>; // pair indices whose data block is revealed
  fading: boolean;
}

const initialState: ChatState = {
  pairsShown: 0,
  thinkingFor: -1,
  typingText: {},
  showDataFor: new Set(),
  fading: false,
};

export default function CopilotSlide({ isActive }: SlideProps) {
  const [state, setState] = useState<ChatState>(initialState);
  const timeoutsRef = useRef<number[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom whenever content updates
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [state]);

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => {
    if (!isActive) {
      clearAll();
      setState(initialState);
      return;
    }

    const runCycle = () => {
      // Reset
      setState({ ...initialState, typingText: {}, showDataFor: new Set() });

      let t = 600; // initial delay

      CONVERSATIONS.forEach((pair, i) => {
        // 1. User message appears
        schedule(() => {
          setState((s) => ({ ...s, pairsShown: i + 1, thinkingFor: -1 }));
        }, t);
        t += PAUSE_AFTER_USER;

        // 2. Thinking dots
        schedule(() => {
          setState((s) => ({ ...s, thinkingFor: i }));
        }, t);
        t += THINKING_MS;

        // 3. Assistant types out
        schedule(() => {
          setState((s) => ({ ...s, thinkingFor: -1 }));
        }, t);
        const text = pair.assistant;
        text.split('').forEach((_, c) => {
          schedule(() => {
            setState((s) => ({
              ...s,
              typingText: { ...s.typingText, [i]: text.slice(0, c + 1) },
            }));
          }, t + (c + 1) * TYPE_SPEED);
        });
        t += text.length * TYPE_SPEED + 200;

        // 4. Data block reveals (if present)
        if (pair.data) {
          schedule(() => {
            setState((s) => {
              const next = new Set(s.showDataFor);
              next.add(i);
              return { ...s, showDataFor: next };
            });
          }, t);
          t += 1000;
        }

        // 5. Pause before next conversation
        if (i < CONVERSATIONS.length - 1) {
          t += PAUSE_AFTER_ASSISTANT;
        }
      });

      // Hold final state, fade, loop
      t += HOLD_AFTER;
      schedule(() => setState((s) => ({ ...s, fading: true })), t);
      t += FADE_MS;
      schedule(runCycle, t);
    };

    runCycle();
    return clearAll;
  }, [isActive]);

  return (
    <div className="slide-content" style={{ background: '#0e1a12' }}>
      <div className="accent-top" />
      <style>{`
        .copilot-chat-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .copilot-chat-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '7vh 5vw 6vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="slide-eyebrow" style={{ fontSize: '0.95vw', marginBottom: '1.2vh' }}>
          Real product — AI Copilot
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: '3.4vw',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#eef3f0',
            marginBottom: '1.2vh',
          }}
        >
          Domain-aware. Grounded in your real pipeline.
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '1.05vw',
            lineHeight: 1.5,
            color: 'rgba(238, 243, 240, 0.65)',
            maxWidth: '82vw',
            marginBottom: '2.5vh',
          }}
        >
          The Copilot answers questions about your live pipeline by combining database queries with an OpenAI
          chat layer. It can also take actions on your behalf — assign, note, follow-up — without leaving the conversation.
        </p>

        {/* Browser frame containing the chat */}
        <div
          style={{
            flex: 1,
            background: '#0a0f0b',
            border: '1px solid rgba(22, 163, 74, 0.18)',
            borderRadius: '0.6vw',
            overflow: 'hidden',
            boxShadow: '0 1.2vh 4vw rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            opacity: state.fading ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease`,
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              padding: '0.9vh 1vw',
              background: '#141a15',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: '0.35vw' }}>
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '0.7vw', height: '0.7vw', borderRadius: '50%', background: '#16a34a' }} />
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                padding: '0.4vh 0.8vw',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '0.3vw',
                margin: '0 0.5vw',
              }}
            >
              <span style={{ fontSize: '0.85vw', color: '#16a34a' }}>🔒</span>
              <span
                className="font-mono"
                style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.7)' }}
              >
                leadflow-python-production.up.railway.app/help
              </span>
            </div>
          </div>

          {/* Copilot panel header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.1vh 1.5vw',
              background: '#0b1510',
              borderBottom: '1px solid rgba(22, 163, 74, 0.18)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
              <span style={{ fontSize: '1.1vw' }}>🤖</span>
              <div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '1vw',
                    fontWeight: 700,
                    color: '#eef3f0',
                  }}
                >
                  LeadFlow Assistant
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.7vw',
                    color: '#86efac',
                    marginTop: '0.15vh',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3vw',
                  }}
                >
                  <span
                    className="anim-pulse"
                    style={{
                      width: '0.4vw',
                      height: '0.4vw',
                      borderRadius: '50%',
                      background: '#22c55e',
                      display: 'inline-block',
                    }}
                  />
                  Connected to live database · v2.44
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5vw' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  color: 'rgba(238, 243, 240, 0.5)',
                  padding: '0.3vh 0.6vw',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '0.2vw',
                }}
              >
                ⚙ Settings
              </span>
            </div>
          </div>

          {/* Chat scroll area */}
          <div
            ref={chatScrollRef}
            className="copilot-chat-scroll"
            style={{
              flex: 1,
              padding: '2vh 4vw',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5vh',
              minHeight: 0,
              scrollBehavior: 'smooth',
            }}
          >
            {CONVERSATIONS.map((pair, i) => {
              const userVisible = state.pairsShown > i;
              const isThinking = state.thinkingFor === i;
              const typed = state.typingText[i];
              const assistantStarted = typed !== undefined;
              const fullyTyped = typed === pair.assistant;
              const dataVisible = state.showDataFor.has(i);

              return (
                <div key={i} style={{ display: 'contents' }}>
                  {/* User message */}
                  {userVisible && (
                    <ChatBubble role="user" text={pair.user} visible />
                  )}

                  {/* Thinking dots — only for the pair currently thinking */}
                  {isThinking && <ThinkingDots />}

                  {/* Assistant — visible once typing starts */}
                  {assistantStarted && (
                    <ChatBubble
                      role="assistant"
                      text={typed || pair.assistant}
                      visible
                      showCursor={!fullyTyped}
                      data={dataVisible ? pair.data : undefined}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Input box at bottom */}
          <div
            style={{
              padding: '1vh 1.5vw 1.2vh',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: '#0b1510',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                padding: '0.8vh 1vw',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '0.3vw',
              }}
            >
              <span style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.5)' }}>💬</span>
              <span
                className="font-body"
                style={{ fontSize: '0.85vw', color: 'rgba(238, 243, 240, 0.4)', flex: 1 }}
              >
                Ask about your pipeline, follow-ups, scoring…
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.7vw',
                  color: 'rgba(238, 243, 240, 0.4)',
                  padding: '0.15vh 0.5vw',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '0.2vw',
                }}
              >
                ⏎ Send
              </span>
            </div>
          </div>
        </div>

        {/* Honesty note */}
        <div
          style={{
            background: 'rgba(251, 191, 36, 0.06)',
            borderLeft: '3px solid #fbbf24',
            borderRadius: '0 0.3vw 0.3vw 0',
            padding: '1.2vh 1.5vw',
            marginTop: '1.5vh',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2vw',
            flexShrink: 0,
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.8vw',
              fontWeight: 700,
              color: '#fbbf24',
              letterSpacing: '0.22em',
              flexShrink: 0,
            }}
          >
            HONESTY NOTE
          </span>
          <span
            className="font-body"
            style={{
              fontSize: '0.9vw',
              color: 'rgba(238, 243, 240, 0.78)',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            Lead numbers, scores, and IDs come from live database queries (not the LLM); the LLM phrases the
            response. No hallucinated lead numbers, no made-up scores.
          </span>
        </div>
      </div>

      <div className="slide-foot">
        <span><strong>NURTURE LEADFLOW</strong> · CCO + IT BRIEFING</span>
        <span>14 / 18</span>
      </div>
    </div>
  );
}

// ═══════════ Chat bubble component ═══════════
function ChatBubble({
  role,
  text,
  visible,
  showCursor = false,
  data,
}: {
  role: 'user' | 'assistant';
  text: string;
  visible: boolean;
  showCursor?: boolean;
  data?: Message['data'];
}) {
  const isUser = role === 'user';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          background: isUser ? 'rgba(22, 163, 74, 0.18)' : 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${isUser ? 'rgba(22, 163, 74, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
          borderRadius: isUser ? '0.6vw 0.6vw 0.15vw 0.6vw' : '0.6vw 0.6vw 0.6vw 0.15vw',
          padding: '1.2vh 1.4vw',
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: '0.65vw',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: isUser ? '#86efac' : 'rgba(238, 243, 240, 0.45)',
            marginBottom: '0.5vh',
          }}
        >
          {isUser ? 'YOU' : 'LEADFLOW ASSISTANT'}
        </div>
        <div
          className="font-body"
          style={{
            fontSize: '1vw',
            lineHeight: 1.55,
            color: '#eef3f0',
          }}
        >
          {text}
          {showCursor && (
            <span
              style={{
                display: 'inline-block',
                width: '0.15vw',
                height: '1.4vh',
                background: '#22c55e',
                marginLeft: '0.2vw',
                verticalAlign: 'middle',
                animation: 'cursor-blink-msg 0.7s steps(2) infinite',
              }}
            />
          )}
        </div>

        {/* Optional data block (top 3 leads etc.) */}
        {data && (
          <div
            style={{
              marginTop: '1.2vh',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(22, 163, 74, 0.25)',
              borderRadius: '0.3vw',
              padding: '1vh 1vw',
              animation: 'data-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.65vw',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#fbbf24',
                marginBottom: '0.8vh',
              }}
            >
              {data.label}
            </div>
            {data.rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8vw',
                  padding: '0.5vh 0',
                  borderBottom: i < data.rows.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                  animation: `data-row-in 0.4s ${0.2 + i * 0.12}s cubic-bezier(0.22,1,0.36,1) both`,
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: '1.1vw',
                    fontWeight: 700,
                    color: '#fbbf24',
                    minWidth: '1.5vw',
                  }}
                >
                  {i + 1}.
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: '0.95vw',
                    fontWeight: 600,
                    color: '#eef3f0',
                    flex: 1,
                  }}
                >
                  {row.name}
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: '1.3vw',
                    fontWeight: 800,
                    color: '#22c55e',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {row.score}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7vw',
                    color: 'rgba(238, 243, 240, 0.55)',
                    minWidth: '14vw',
                    textAlign: 'right',
                  }}
                >
                  {row.note}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes cursor-blink-msg {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes data-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes data-row-in {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ═══════════ Thinking dots ═══════════
function ThinkingDots() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        animation: 'fade-in 0.3s ease both',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '0.6vw 0.6vw 0.6vw 0.15vw',
          padding: '1.2vh 1.4vw',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4vw',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '0.5vw',
              height: '0.5vw',
              borderRadius: '50%',
              background: '#86efac',
              animation: `thinking-dot 1.2s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes thinking-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

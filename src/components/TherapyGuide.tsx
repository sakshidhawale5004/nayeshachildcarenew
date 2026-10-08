import { useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Clipboard, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GuideResult = any;

export function TherapyGuide() {
  const suggest = async (data: any) => {
    return {
      options: [
        { slug: 'occupational-therapy', title: 'Occupational Therapy', reason: 'Mock reason', color: 'blue' }
      ],
      centerSummary: 'Mock summary'
    };
  };
  const [needs, setNeeds] = useState('');
  const [result, setResult] = useState<GuideResult | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSending(true); setError(''); setResult(null);
    try {
      const response = await suggest({ data: { needs, website: '' } });
      setResult(response);
    } catch (failure) {
      setError(failure instanceof Error && /unavailable|could not prepare/i.test(failure.message) ? failure.message : 'We couldn’t prepare suggestions right now. Please try again.');
    } finally { setSending(false); }
  }

  async function copySummary() {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.centerSummary); setCopied(true); }
    catch { setError('Copying is unavailable here. You can select the summary text instead.'); }
  }

  return <div className="guide-workspace">
    <form onSubmit={onSubmit} className="guide-form">
      <label htmlFor="child-needs">What would you like support with?</label>
      <textarea id="child-needs" required minLength={30} maxLength={2000} rows={7} value={needs} onChange={e => setNeeds(e.target.value)} placeholder="For example, tell us about play, communication, learning, daily routines, or feelings. What have you noticed, and what would you like your child to enjoy more?" />
      <div className="guide-form-bottom"><span>{needs.length} / 2000</span><Button type="submit" variant="brand" size="xl" disabled={sending}>{sending ? 'Finding options…' : 'Explore possible therapies'} <ArrowUpRight size={18}/></Button></div>
      <p className="guide-privacy">Please don’t include names, phone numbers, or sensitive medical details. Your description is used to generate these suggestions and is not saved to the center.</p>
    </form>
    {error && <p className="guide-error" role="alert">{error}</p>}
    {result && <div className="guide-results" aria-live="polite">
      <div className="guide-results-heading"><span className="eyebrow"><span className="eyebrow-dot"/> A PLACE TO START</span><h2>Options to <em>explore together.</em></h2><p>These are conversation starters, not a diagnosis or a recommendation for treatment. A qualified professional can help decide what fits your child.</p></div>
      <div className="guide-options">{result.options.map((option, i) => <Link key={option.slug} to="/services/$slug" params={{ slug: option.slug }} className={`guide-option ${option.color}`}><span className="guide-option-number">0{i + 1}</span><div><h3>{option.title}</h3><p>{option.reason}</p></div><ArrowUpRight size={21}/></Link>)}</div>
      <div className="guide-summary"><div><span className="eyebrow">FOR YOUR CONVERSATION WITH US</span><h3>A short summary</h3><p>{result.centerSummary}</p></div><Button type="button" variant="outlineBrand" onClick={copySummary}>{copied ? <Check size={16}/> : <Clipboard size={16}/>} {copied ? 'Copied' : 'Copy summary'}</Button></div>
      <div className="guide-next"><Button variant="brand" size="xl" asChild><Link to="/contact">Request a callback <ArrowUpRight size={18}/></Link></Button><Button type="button" variant="ghost" onClick={() => { setResult(null); setCopied(false); }}> <RotateCcw size={16}/> Start again</Button></div>
    </div>}
  </div>;
}
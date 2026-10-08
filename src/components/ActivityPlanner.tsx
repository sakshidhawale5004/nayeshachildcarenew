import { useState, type FormEvent } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/services';

type Result = any;
type AgeRange = '2–4 years' | '5–7 years' | '8–12 years' | '13+ years';

export function ActivityPlanner() {
  const plan = async (data: any) => {
    return {
      activities: [
        { title: "Mock Activity", materials: "None", steps: "Do this", goalConnection: "Connects", adaptation: "None" }
      ]
    };
  };
  const [therapy, setTherapy] = useState('');
  const [ageRange, setAgeRange] = useState<AgeRange>('5–7 years');
  const [goals, setGoals] = useState('');
  const [availableTools, setAvailableTools] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!services.some(service => service.slug === therapy)) {
      setError('Please select a therapy before generating activity ideas.');
      return;
    }
    if (goals.trim().length < 20) {
      setError('Please describe your session goals in at least 20 characters.');
      return;
    }
    if (!event.currentTarget.reportValidity()) {
      return;
    }
    setPending(true); setResult(null); setError('');
    try {
      const response = await plan({ data: { therapy, ageRange, goals, availableTools } });
      if ('error' in response && response.error) setError(response.error);
      else if (response.activities.length === 0) setError('No activity ideas were returned. Please try again.');
      else setResult(response);
    } catch (failure) {
      setError(failure instanceof Error && /unavailable/i.test(failure.message) ? failure.message : 'Could not prepare activity ideas. Please try again later.');
    } finally { setPending(false); }
  }

  return <div className="planner-workspace">
    <form className="planner-form" onSubmit={submit}>
      <div className="planner-fields">
        <label>Therapy <select aria-invalid={Boolean(error && !services.some(service => service.slug === therapy))} value={therapy} onChange={e => { setTherapy(e.target.value); setError(''); }}><option value="" disabled>Select a therapy</option>{services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></label>
        <label>Age range <select value={ageRange} onChange={e => setAgeRange(e.target.value as AgeRange)}>{(['2–4 years', '5–7 years', '8–12 years', '13+ years'] as const).map(value => <option key={value} value={value}>{value}</option>)}</select></label>
      </div>
      <label>Goals for the upcoming session <textarea aria-invalid={Boolean(error && goals.trim().length < 20)} minLength={20} maxLength={1500} rows={5} value={goals} onChange={e => { setGoals(e.target.value); setError(''); }} placeholder="For example, practice taking turns and expressing choices during shared play." /></label>
      <label>Materials available <input maxLength={400} value={availableTools} onChange={e => setAvailableTools(e.target.value)} placeholder="For example, balls, picture cards, puzzles, swing" /></label>
      <p className="planner-note">Please avoid names, identifying details and sensitive medical information. Ideas are not saved here and must be reviewed by a qualified therapist.</p>
      <Button variant="brand" size="xl" type="submit" disabled={pending}>{pending ? 'Preparing ideas…' : 'Generate activity ideas'} <ArrowUpRight size={18}/></Button>
      {pending && <p className="planner-note" role="status">Creating three activity ideas. This can take up to a minute.</p>}
    </form>
    {error && <p className="guide-error" role="alert">{error}</p>}
    {result && result.activities.length > 0 && <section className="planner-results" aria-live="polite"><div className="planner-results-head"><span className="eyebrow"><span className="eyebrow-dot"/> SESSION IDEAS</span><h2>Play with <em>purpose.</em></h2><p>Review each idea for the child, setting and equipment before using it.</p></div><div className="planner-ideas">{result.activities.map((activity, index) => <article className="planner-idea" key={`${index}-${activity.title}`}><span className="planner-idea-number">0{index + 1}</span><h3>{activity.title}</h3><dl><div><dt>Materials</dt><dd>{activity.materials}</dd></div><div><dt>How to play</dt><dd>{activity.steps}</dd></div><div><dt>Goal connection</dt><dd>{activity.goalConnection}</dd></div><div><dt>Adapt it</dt><dd>{activity.adaptation}</dd></div></dl></article>)}</div><Button variant="outlineBrand" type="button" onClick={() => { setResult(null); setError(''); }}><RotateCcw size={16}/> Plan another session</Button></section>}
  </div>;
}
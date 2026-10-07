import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Award, BookOpen, Check, ChevronDown, ChevronRight, Clock3, Compass, GraduationCap, Layers, RotateCcw, Search, Sparkles, Target, Trophy } from 'lucide-react'
import {
  dbqBank, examSkills, leqBank, mcqBank, saqBank, units,
  type CurriculumQuestion, type CurriculumTerm, type Unit,
} from './curriculum'

type UnitStats = { answered: number; correct: number; xp: number; masteredTerms: string[]; missedQuestions: string[] }
export type LearningProgress = {
  xp: number
  answered: number
  correct: number
  streak: number
  completed: string[]
  knownCards: string[]
  weekly: number[]
  unitStats?: Record<string, UnitStats>
}
export type RecordStudy = (correct: boolean, xp?: number, completion?: string, knownCard?: string, unitId?: string, questionId?: string, activityOnly?: boolean) => void
type PageProps = { progress: LearningProgress; record: RecordStudy }

const sections = [
  ['overview', 'Overview'], ['timeline', 'Timeline'], ['developments', 'Major developments'],
  ['concepts', 'Key concepts'], ['terms', 'Key terms'], ['flashcards', 'Flashcards'],
  ['lesson', 'Interactive lesson'], ['quiz', 'Practice quiz'], ['mcq', 'AP-style MCQs'],
  ['saq', 'SAQ practice'], ['leq', 'LEQ practice'], ['game', 'Review game'], ['progress', 'Unit progress'],
] as const

const getStats = (progress: LearningProgress, id: number): UnitStats =>
  progress.unitStats?.[String(id)] ?? { answered: 0, correct: 0, xp: 0, masteredTerms: [], missedQuestions: [] }

const visualGuides: Record<number, { title: string; label: string; stops: { name: string; note: string }[] }> = {
  1: { title: 'Regional centers of power', label: '1200–1450 · REGIONAL SYSTEMS', stops: [{ name: 'Song China', note: 'A large bureaucracy and commercial economy supported East Asian state power.' }, { name: 'Dar al-Islam', note: 'Shared belief, scholarship, and exchange linked politically diverse societies.' }, { name: 'West Africa', note: 'States drew influence from agriculture and control of regional trade.' }, { name: 'Europe & Japan', note: 'Landholding and warrior elites shaped decentralized political authority.' }] },
  2: { title: 'Follow the exchange routes', label: '1200–1450 · CONNECTED NETWORKS', stops: [{ name: 'Silk Roads', note: 'Caravan routes connected East Asia with Central Asia and Southwest Asia.' }, { name: 'Indian Ocean', note: 'Seasonal winds supported predictable travel among port cities.' }, { name: 'Trans-Saharan', note: 'Camel caravans connected North African markets with West African states.' }, { name: 'Mongol Eurasia', note: 'Imperial security and communications supported greater movement across the steppe.' }] },
  3: { title: 'Land-based empire reach', label: '1450–1750 · IMPERIAL CENTERS', stops: [{ name: 'Ottoman', note: 'Anatolian and Balkan power connected southeastern Europe and Southwest Asia.' }, { name: 'Safavid', note: 'Persian state identity was strengthened through Twelver Shiism.' }, { name: 'Mughal', note: 'Regional alliances and administration extended imperial rule across South Asia.' }, { name: 'Shared strategies', note: 'Military innovation, bureaucracy, and court culture supported imperial authority.' }] },
  4: { title: 'Transoceanic route web', label: '1450–1750 · ATLANTIC & INDIAN OCEANS', stops: [{ name: 'Iberian ports', note: 'Portuguese and Spanish states sponsored voyages and asserted overseas claims.' }, { name: 'West Africa', note: 'Coastal exchange became increasingly connected to the forced Atlantic slave trade.' }, { name: 'The Americas', note: 'Conquest and settlement connected American resources to imperial economies.' }, { name: 'Pacific links', note: 'Silver and maritime routes connected the Americas with Asian markets.' }] },
  5: { title: 'Political ideas in motion', label: '1750–1900 · REVOLUTIONARY CHANGE', stops: [{ name: 'Rights & sovereignty', note: 'Enlightenment ideas challenged inherited political authority.' }, { name: 'Atlantic revolutions', note: 'Revolutionaries challenged empire and monarchy, with unequal outcomes.' }, { name: 'Haiti', note: 'Enslaved people’s revolution abolished slavery and established independence.' }, { name: 'National movements', note: 'Nationalism and liberalism challenged old hierarchies and multinational empires.' }] },
  6: { title: 'Industrialization transforms society', label: '1750–1900 · CONCEPTUAL SEQUENCE', stops: [{ name: 'Mechanization', note: 'Machines and factories changed the organization and pace of production.' }, { name: 'New energy & transport', note: 'Steam power and railways expanded industrial capacity and movement.' }, { name: 'Global production', note: 'Industrial economies sought overseas resources, labor, and markets.' }, { name: 'Social responses', note: 'Workers organized and reformers challenged harsh labor conditions.' }] },
  7: { title: 'Global conflict theaters', label: '1900–PRESENT · WORLD WAR & AFTERMATH', stops: [{ name: 'Europe', note: 'Alliance systems and industrial warfare transformed political borders.' }, { name: 'Eastern Front', note: 'World war contributed to revolution and the collapse of empires.' }, { name: 'Asia-Pacific', note: 'World War II spread across Asia and the Pacific with immense civilian loss.' }, { name: 'Postwar institutions', note: 'The United Nations reflected efforts to improve international cooperation.' }] },
  8: { title: 'Cold War influence map', label: '1945–1991 · SCHEMATIC, NOT TO SCALE', stops: [{ name: 'United States & NATO', note: 'Western alliances and economic aid supported a US-led bloc.' }, { name: 'Soviet Union & Warsaw Pact', note: 'The USSR organized a rival military and political bloc in Eastern Europe.' }, { name: 'Newly independent states', note: 'Decolonizing countries sought autonomy and shaped diplomacy.' }, { name: 'Proxy conflict zones', note: 'Superpower competition influenced regional wars beyond Europe.' }] },
  9: { title: 'Globalization dashboard', label: '1900–PRESENT · INTERDEPENDENCE', stops: [{ name: 'Trade & production', note: 'Multinational firms and outsourcing connect production across borders.' }, { name: 'Digital networks', note: 'Internet communication accelerates the movement of ideas and information.' }, { name: 'People & culture', note: 'Migration and cultural diffusion create exchange and hybrid forms.' }, { name: 'Shared challenges', note: 'Climate change and pandemics cross borders and call for cooperation.' }] },
}

export function UnitCatalog({ progress }: Pick<PageProps, 'progress'>) {
  return <section className="curriculum-catalog">
    <div className="panel-heading"><div><span className="eyebrow">THE FULL COURSE · 9 UNITS</span><h3>Choose your next chapter</h3></div><Link className="text-link" to="/review">Exam review <ArrowRight size={14} /></Link></div>
    <div className="curriculum-unit-grid">{units.map(unit => {
      const stats = getStats(progress, unit.id)
      const mastery = stats.answered ? Math.round(stats.correct / stats.answered * 100) : 0
      return <Link className="curriculum-unit-card" to={`/unit/${unit.id}`} key={unit.id}>
        <div className="curriculum-card-top"><span>UNIT {String(unit.id).padStart(2, '0')}</span><small>{unit.period}</small></div>
        <h4>{unit.title}</h4><p>{unit.theme}</p>
        <div className="curriculum-card-progress"><i style={{ width: `${mastery}%` }} /></div>
        <small className="curriculum-card-foot">{stats.answered ? `${mastery}% practice accuracy` : `${unit.terms.length} vocabulary terms`}<ArrowRight size={14} /></small>
      </Link>
    })}</div>
  </section>
}

export function UnitPage({ progress, record }: PageProps) {
  const { unitId = '1', section = 'overview' } = useParams()
  const navigate = useNavigate()
  const unit = units.find(item => item.id === Number(unitId)) ?? units[0]
  const activeSection = sections.some(([id]) => id === section) ? section : 'overview'
  const showSection = (next: string) => navigate(`/unit/${unit.id}/${next}`)
  const stats = getStats(progress, unit.id)
  const mastery = stats.answered ? Math.round(stats.correct / stats.answered * 100) : 0

  return <div className="unit-page">
    <header className="unit-page-header">
      <div><span className="eyebrow">AP WORLD HISTORY: MODERN · UNIT {String(unit.id).padStart(2, '0')} · {unit.period} CE</span>
        <h1>{unit.title}</h1><p>{unit.overview}</p></div>
      <div className="unit-header-score"><span>{mastery}%</span><small>practice accuracy</small><div className="progress-track"><i style={{ width: `${mastery}%` }} /></div></div>
    </header>
    <div className="unit-switcher"><span className="eyebrow">COURSE MAP</span><div>{units.map(item => <Link aria-label={`Unit ${item.id}: ${item.title}`} title={item.title} className={item.id === unit.id ? 'selected' : ''} to={`/unit/${item.id}`} key={item.id}>{item.id}</Link>)}</div><Link className="text-link" to="/review">Exam review <ArrowRight size={14} /></Link></div>
    <nav className="unit-section-nav" aria-label={`${unit.title} study sections`}>{sections.map(([id, label]) =>
      <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => showSection(id)}>{label}</button>)}</nav>
    {unit.id === 2 && <div className="legacy-toolkit"><Sparkles size={15} /><span>Original Unit 2 study tools are still available.</span><Link to="/learn">Field guides</Link><Link to="/flashcards">Original flashcards</Link><Link to="/practice">Original question bank</Link><Link to="/games">Original games</Link><Link to="/exam">Original AP writing prompts</Link></div>}
    <UnitSection unit={unit} section={activeSection} stats={stats} record={record} />
  </div>
}

function UnitSection({ unit, section, stats, record }: { unit: Unit; section: string; stats: UnitStats; record: RecordStudy }) {
  if (section === 'overview') return <OverviewSection unit={unit} stats={stats} />
  if (section === 'timeline') return <TimelineSection unit={unit} record={record} />
  if (section === 'developments') return <CardList title="Major developments" intro={`The most important patterns shaping ${unit.period} are collected here as a quick review.`} items={unit.developments} />
  if (section === 'concepts') return <CardList title="Key concepts" intro="Use these ideas to build explanations, comparisons, and arguments." items={unit.concepts} />
  if (section === 'terms') return <VocabularySection unit={unit} record={record} />
  if (section === 'flashcards') return <TermStudy unit={unit} record={record} />
  if (section === 'lesson') return <InteractiveLesson unit={unit} record={record} />
  if (section === 'quiz') return <QuestionPractice unit={unit} record={record} mode="quiz" />
  if (section === 'mcq') return <QuestionPractice unit={unit} record={record} mode="ap" />
  if (section === 'saq') return <WritingPractice unit={unit} record={record} kind="SAQ" />
  if (section === 'leq') return <WritingPractice unit={unit} record={record} kind="LEQ" />
  if (section === 'game') return <TermStudy unit={unit} record={record} game />
  return <UnitProgressSection unit={unit} stats={stats} />
}

function OverviewSection({ unit, stats }: { unit: Unit; stats: UnitStats }) {
  const example = unit.timeline[unit.timeline.length - 1]
  return <div className="unit-overview-content">
    <div className="unit-overview-grid">
      <section className="curriculum-panel unit-big-question"><span className="eyebrow">UNIT THEME</span><h2>{unit.theme}</h2><p>{unit.overview}</p><span className="big-question-label">HISTORICAL LENS</span><strong>How did {unit.theme.toLowerCase()} reshape power and everyday life?</strong></section>
      <section className="curriculum-panel unit-snapshot"><span className="eyebrow">YOUR PROGRESS</span><strong className="snapshot-number">{stats.answered ? `${Math.round(stats.correct / stats.answered * 100)}%` : 'Start here'}</strong><p>{stats.answered ? `${stats.correct} correct out of ${stats.answered} practice responses` : 'Complete a lesson, review vocabulary, or try a practice set.'}</p><div className="progress-track"><i style={{ width: `${stats.answered ? Math.round(stats.correct / stats.answered * 100) : 0}%` }} /></div><small>{stats.masteredTerms.length} / {unit.terms.length} terms marked known</small></section>
    </div>
    <UnitVisualization unitId={unit.id} />
    <section className="curriculum-panel"><div className="panel-heading"><div><span className="eyebrow">WHAT TO LEARN</span><h3>Major developments</h3></div><Link to={`/unit/${unit.id}/developments`} className="text-link">All developments <ArrowRight size={14} /></Link></div><div className="development-list">{unit.developments.slice(0, 3).map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div></section>
    <section className="curriculum-panel next-event-panel"><div><span className="eyebrow">A MOMENT IN THE TIMELINE</span><h3>{example.title}</h3><p>{example.date} · {example.summary}</p><small>AP connection: {example.apConnection}</small></div><Link to={`/unit/${unit.id}/timeline`} className="button button-outline">Explore timeline <ArrowRight size={14} /></Link></section>
    <div className="unit-shortcuts">{sections.filter(([id]) => ['terms', 'flashcards', 'lesson', 'quiz', 'mcq', 'saq', 'leq', 'game'].includes(id)).map(([id, label]) => <Link key={id} to={`/unit/${unit.id}/${id}`}><span>{label}</span><ArrowRight size={14} /></Link>)}</div>
  </div>
}

function UnitVisualization({ unitId }: { unitId: number }) {
  const guide = visualGuides[unitId]
  const [selected, setSelected] = useState(0)
  const current = guide.stops[selected]
  return <section className={`curriculum-panel historical-visualization unit-visual-${unitId}`}>
    <div className="panel-heading"><div><span className="eyebrow">{guide.label}</span><h3>{guide.title}</h3></div><Compass size={18} /></div>
    <div className="visual-route-strip" aria-label={guide.title}>{guide.stops.map((stop, index) => <button key={stop.name} onClick={() => setSelected(index)} className={selected === index ? 'active' : ''}><span>{String(index + 1).padStart(2, '0')}</span><strong>{stop.name}</strong></button>)}</div>
    <div className="visualization-note"><Sparkles size={15} /><div><strong>{current.name}</strong><p>{current.note}</p></div></div>
  </section>
}

function CardList({ title, intro, items }: { title: string; intro: string; items: string[] }) {
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">UNIT STUDY GUIDE</span><h2>{title}</h2><p>{intro}</p></div><div className="development-card-grid">{items.map((item, index) => <article className="development-card" key={item}><span className="development-card-number">{String(index + 1).padStart(2, '0')}</span><p>{item}</p></article>)}</div></section>
}

function TimelineSection({ unit, record }: { unit: Unit; record: RecordStudy }) {
  const [active, setActive] = useState(0)
  const current = unit.timeline[active]
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">INTERACTIVE CHRONOLOGY · {unit.period}</span><h2>Timeline</h2><p>Select an event to examine its significance and AP exam connection.</p></div>
    <div className="timeline-explorer"><div className="timeline-event-list">{unit.timeline.map((item, index) => <button key={`${item.year}-${item.title}`} onClick={() => setActive(index)} className={active === index ? 'active' : ''}><span>{item.date}</span><strong>{item.title}</strong><ChevronRight size={15} /></button>)}</div><article className="timeline-detail-card"><span className="eyebrow">{current.date} · EVENT {String(active + 1).padStart(2, '0')}</span><h3>{current.title}</h3><p>{current.summary}</p><div><strong>Why it matters</strong><p>{current.significance}</p></div>    <div><strong>AP exam connection</strong><p>{current.apConnection}</p></div><button className="button button-dark" onClick={() => record(true, 3, `u${unit.id}-timeline-${active}`, undefined, String(unit.id), undefined, true)}>Mark event reviewed <Check size={14} /></button></article></div>
  </section>
}

function VocabularySection({ unit, record }: { unit: Unit; record: RecordStudy }) {
  const [search, setSearch] = useState('')
  const filtered = unit.terms.filter(item => `${item.term} ${item.definition}`.toLowerCase().includes(search.toLowerCase()))
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">UNIT {unit.id} · VOCABULARY</span><h2>Key terms, in context</h2><p>Definitions connect each term to its significance and show how to use it as AP evidence.</p></div>
    <div className="term-toolbar"><label className="term-search"><Search size={15} /><input aria-label="Search vocabulary" placeholder="Search terms or definitions" value={search} onChange={event => setSearch(event.target.value)} /></label><Link className="button button-outline" to="/vocabulary">All-unit vocabulary <ArrowRight size={14} /></Link></div>
    <TermCards terms={filtered.map(item => ({ ...item, unitId: unit.id }))} unitId={unit.id} record={record} />
  </section>
}

function TermCards({ terms, unitId, record }: { terms: (CurriculumTerm & { unitId?: number })[]; unitId: number; record: RecordStudy }) {
  if (!terms.length) return <p className="empty-state">No terms match that search.</p>
  return <div className="vocabulary-grid">{terms.map(item => { const termUnit = item.unitId ?? unitId; return <article className="vocabulary-card" key={`${termUnit}-${item.term}`}><div className="vocabulary-card-heading"><span>UNIT {termUnit}</span><button className="icon-button" title="Mark term known" aria-label={`Mark ${item.term} known`} onClick={() => record(true, 5, `u${termUnit}-term-${item.term}`, `u${termUnit}-${item.term}`, String(termUnit))}><Check size={16} /></button></div><h3>{item.term}</h3><p>{item.definition}</p><div><strong>Historical significance</strong><p>{item.significance}</p></div><div><strong>Why College Board cares</strong><p>{item.whyItMatters}</p></div><div className="term-ap-example"><strong>Example AP exam usage</strong><p>{item.apExample}</p></div></article> })}</div>
}

function TermStudy({ unit, record, game = false }: { unit: Unit; record: RecordStudy; game?: boolean }) {
  const [mode, setMode] = useState<'flashcards' | 'matching'>(game ? 'matching' : 'flashcards')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [selectedDefinition, setSelectedDefinition] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const current = unit.terms[index % unit.terms.length]
  const definitionChoices = useMemo(() => {
    const correct = unit.terms[index % unit.terms.length]
    const distractors = unit.terms.filter(term => term.term !== correct.term)
    return [correct, ...Array.from({ length: 3 }, (_, offset) => distractors[(index * 3 + offset) % distractors.length])]
  }, [index, unit])
  const resetMatching = () => { setSelectedDefinition(null); setFeedback(null); setMatched([]) }
  const chooseDefinition = (choice: CurriculumTerm) => {
    if (matched.includes(index) || selectedDefinition !== null) return
    const correct = choice.term === current.term
    record(correct, correct ? 8 : 2, correct ? `u${unit.id}-match-${current.term}` : undefined, undefined, String(unit.id))
    setFeedback(correct ? 'Correct match. Connect the term to its significance next.' : `Not quite. Review the definition of ${current.term}.`)
    if (correct) setMatched(previous => [...previous, index])
    setSelectedDefinition(unit.terms.indexOf(choice))
  }
  const next = () => { setIndex(value => (value + 1) % unit.terms.length); setFlipped(false); resetMatching() }

  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">{game ? 'ACTIVE RECALL CHALLENGE' : `UNIT ${unit.id} · VOCABULARY LAB`}</span><h2>{game ? 'Match the idea to the term' : 'Study the key terms'}</h2><p>Switch between active-recall flashcards and a definition-matching game. Every term includes historical significance and an AP example.</p></div>
    <div className="study-mode-tabs"><button className={mode === 'flashcards' ? 'active' : ''} onClick={() => { setMode('flashcards'); setFlipped(false) }}><Layers size={15} /> Flashcard mode</button><button className={mode === 'matching' ? 'active' : ''} onClick={() => { setMode('matching'); resetMatching() }}><Target size={15} /> Matching game</button></div>
    {mode === 'flashcards' ? <div className={`study-flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(value => !value)} role="button" tabIndex={0} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFlipped(value => !value) } }}>
      <span className="eyebrow">TERM {String(index + 1).padStart(2, '0')} / {unit.terms.length} · CLICK TO FLIP</span>{!flipped ? <><h3>{current.term}</h3><p>What does this term mean, and why is it historically significant?</p></> : <><p className="flashcard-definition">{current.definition}</p><small><strong>Significance:</strong> {current.significance}</small><small><strong>AP connection:</strong> {current.apExample}</small></>}
      <div className="flashcard-controls" onClick={event => event.stopPropagation()}><button className="button button-outline" onClick={() => setFlipped(value => !value)}><RotateCcw size={14} /> Flip card</button><button className="button button-dark" onClick={() => { record(true, 5, `u${unit.id}-flashcard-${current.term}`, `u${unit.id}-${current.term}`, String(unit.id)); next() }}>I know this <Check size={14} /></button><button className="button button-outline" onClick={() => { record(false, 1, undefined, undefined, String(unit.id)); next() }}>Review again <ArrowRight size={14} /></button></div>
      <div className="flashcard-progress"><i style={{ width: `${((index + 1) / unit.terms.length) * 100}%` }} /></div>
    </div> : <div className="matching-game"><div className="matching-game-prompt"><span className="eyebrow">MATCH THE DEFINITION</span><h3>{current.term}</h3><p>Choose its definition from the options.</p></div><div className="matching-options">{definitionChoices.map((choice, optionIndex) => <button key={choice.term} disabled={selectedDefinition !== null} className={selectedDefinition !== null && choice.term === current.term ? 'correct' : selectedDefinition === unit.terms.indexOf(choice) ? 'incorrect' : ''} onClick={() => chooseDefinition(choice)}><span>{String.fromCharCode(65 + optionIndex)}</span>{choice.definition}</button>)}</div>{feedback && <div className="matching-feedback">{feedback}<button className="button button-outline" onClick={next}>Next term <ArrowRight size={14} /></button></div>}<small>Term {index + 1} of {unit.terms.length} · {matched.length} matched</small></div>}
  </section>
}

function InteractiveLesson({ unit, record }: { unit: Unit; record: RecordStudy }) {
  const [step, setStep] = useState(0)
  const lessonSteps = unit.developments.map((text, index) => ({ title: `Field note ${String(index + 1).padStart(2, '0')}`, text, question: unit.concepts[index % unit.concepts.length] }))
  const current = lessonSteps[step]
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">GUIDED LEARNING · {unit.period}</span><h2>{unit.theme}</h2><p>Move through a short field guide, connect each development to a historical skill, and record the lesson when you finish.</p></div><div className="interactive-lesson-layout"><nav className="lesson-step-index" aria-label="Lesson steps">{lessonSteps.map((item, index) => <button key={item.title} className={step === index ? 'active' : ''} onClick={() => setStep(index)}><span>0{index + 1}</span>{item.title}</button>)}</nav><article className="interactive-lesson-card"><span className="eyebrow">FIELD GUIDE · {String(step + 1).padStart(2, '0')} / {lessonSteps.length}</span><h3>{current.title}</h3><p>{current.text}</p><div className="lesson-thinking-prompt"><Sparkles size={16} /><div><strong>Think like an AP historian</strong><p>{current.question}</p></div></div><div className="lesson-navigation"><button className="button button-outline" disabled={step === 0} onClick={() => setStep(value => value - 1)}><ArrowLeft size={14} /> Previous</button>{step < lessonSteps.length - 1 ? <button className="button button-dark" onClick={() => setStep(value => value + 1)}>Next field note <ArrowRight size={14} /></button> : <button className="button button-dark" onClick={() => record(true, 25, `u${unit.id}-lesson-complete`, undefined, String(unit.id), undefined, true)}>Complete lesson <Check size={14} /></button>}</div></article></div></section>
}

function QuestionPractice({ unit, record, mode, questions }: { unit: Unit; record: RecordStudy; mode: 'quiz' | 'ap'; questions?: CurriculumQuestion[] }) {
  const pool = questions ?? mcqBank.filter(question => question.unitId === unit.id)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const question = pool[index % pool.length]
  useEffect(() => { setIndex(0); setSelected(null); setRevealed(false) }, [unit.id, mode, questions])
  if (!question) return <p className="empty-state">No practice questions are available for this selection.</p>
  const check = () => {
    if (!selected || revealed) return
    const correct = selected === question.answer
    setRevealed(true)
    record(correct, correct ? 12 : 2, correct ? `practice-${question.id}` : undefined, undefined, String(question.unitId), question.id)
  }
  const next = () => { setIndex(value => value + 1); setSelected(null); setRevealed(false) }
  const heading = mode === 'quiz' ? 'Practice quiz' : 'AP Classroom-style MCQs'
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">{mode === 'quiz' ? 'PRACTICE · UNIT QUESTION BANK' : 'AP-STYLE · STIMULUS-BASED REASONING'}</span><h2>{heading}</h2><p>{pool.length} questions covering stimulus interpretation, maps, images, comparison, causation, and change over time.</p></div>
    <article className="curriculum-question-card"><div className="question-meta"><span>{question.type}</span><span>{index + 1} / {pool.length}</span></div><div className="question-stimulus">{question.stimulus}</div><h3>{question.prompt}</h3><div className="curriculum-answer-list">{question.choices.map((choice, choiceIndex) => <button key={choice} disabled={revealed} className={`${selected === choice ? 'selected' : ''} ${revealed && choice === question.answer ? 'correct' : ''} ${revealed && choice === selected && choice !== question.answer ? 'incorrect' : ''}`} onClick={() => setSelected(choice)}><span>{String.fromCharCode(65 + choiceIndex)}</span>{choice}{revealed && choice === question.answer && <Check size={16} />}</button>)}</div>{revealed && <div className={`curriculum-explanation ${selected === question.answer ? '' : 'review'}`}><strong>{selected === question.answer ? 'Correct reasoning.' : `Review ${question.topic}.`}</strong><p>{question.explanation}</p></div>}<div className="question-actions"><button className="button button-dark" disabled={!revealed && !selected} onClick={revealed ? next : check}>{revealed ? 'Next question' : 'Check answer'} <ArrowRight size={14} /></button></div></article>
  </section>
}

function WritingPractice({ unit, record, kind }: { unit: Unit; record: RecordStudy; kind: 'SAQ' | 'LEQ' }) {
  const prompts = (kind === 'SAQ' ? saqBank : leqBank).filter(item => item.unitId === unit.id)
  const [index, setIndex] = useState(0)
  const [response, setResponse] = useState('')
  const [showGuide, setShowGuide] = useState(false)
  const prompt = prompts[index % prompts.length]
  const leq = kind === 'LEQ' ? leqBank.find(item => item.id === prompt.id) : undefined
  const answerKey = kind === 'SAQ' ? saqBank.find(item => item.id === prompt.id)?.answerKey ?? [] : []
  useEffect(() => { setResponse(localStorage.getItem(`ap-modern-${kind.toLowerCase()}-${prompt.id}`) ?? '') }, [kind, prompt.id])
  const save = () => {
    localStorage.setItem(`ap-modern-${kind.toLowerCase()}-${prompt.id}`, response)
    record(true, kind === 'SAQ' ? 10 : 20, `u${unit.id}-${kind.toLowerCase()}-${prompt.id}`, undefined, String(unit.id), undefined, true)
  }
  const change = (next: number) => { setIndex((next + prompts.length) % prompts.length); setResponse(''); setShowGuide(false) }
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">{unit.title.toUpperCase()} · {kind} WRITING</span><h2>{kind === 'SAQ' ? 'Short-answer practice' : 'Long-essay practice'}</h2><p>{prompts.length} unit-specific prompts with answer guidance and locally saved responses.</p></div>
    <article className="writing-practice-card"><div className="question-meta"><span>PROMPT {String(index + 1).padStart(2, '0')} / {prompts.length}</span><button className="icon-button" title="Next prompt" onClick={() => change(index + 1)}><RotateCcw size={15} /></button></div><h3>{prompt.prompt}</h3>{kind === 'SAQ' && <p className="writing-instruction">Answer each part directly. Make a claim and support it with specific historical evidence.</p>}{kind === 'LEQ' && <p className="writing-instruction">Write a defensible thesis, establish broader context, support your argument with evidence, and explain the reasoning.</p>}
      <label className="response-label" htmlFor={`response-${prompt.id}`}>YOUR RESPONSE</label><textarea id={`response-${prompt.id}`} value={response} onChange={event => setResponse(event.target.value)} rows={kind === 'SAQ' ? 6 : 10} placeholder={kind === 'SAQ' ? 'Identify a specific historical development, then explain the connection…' : 'Start with a defensible thesis. Establish context, then use specific evidence…'} />
      <div className="writing-actions"><span>{response.trim().split(/\s+/).filter(Boolean).length} words</span><div><button className="button button-outline" onClick={() => setShowGuide(value => !value)}>{showGuide ? 'Hide' : 'Show'} answer guide</button><button className="button button-dark" disabled={!response.trim()} onClick={save}>Save response <Check size={14} /></button></div></div>
      {showGuide && <div className="answer-guide"><strong>{kind === 'SAQ' ? 'Possible answer elements' : 'Model planning guide'}</strong>{kind === 'SAQ' ? answerKey.map(item => <p key={item}>{item}</p>) : leq && <><p><strong>Thesis example:</strong> {leq.thesis}</p><p><strong>Contextualization example:</strong> {leq.contextualization}</p><p><strong>Evidence examples:</strong> {leq.evidence.join(' · ')}</p></>}</div>}
      <div className="prompt-navigation"><button className="button button-outline" onClick={() => change(index - 1)}><ArrowLeft size={14} /> Previous</button><button className="button button-outline" onClick={() => change(index + 1)}>Next prompt <ArrowRight size={14} /></button></div>
    </article>
  </section>
}

function UnitProgressSection({ unit, stats }: { unit: Unit; stats: UnitStats }) {
  const accuracy = stats.answered ? Math.round(stats.correct / stats.answered * 100) : 0
  const completed = stats.masteredTerms.length
  return <section className="curriculum-content-section"><div className="curriculum-section-heading"><span className="eyebrow">UNIT {unit.id} · MASTERY TRACKER</span><h2>Your unit progress</h2><p>Practice accuracy, activity completions, and vocabulary mastery are saved in this browser.</p></div>
    <div className="unit-metric-grid"><div className="curriculum-panel"><span className="eyebrow">PRACTICE ACCURACY</span><strong>{accuracy}%</strong><p>{stats.correct} correct out of {stats.answered} answers</p></div><div className="curriculum-panel"><span className="eyebrow">TERMS KNOWN</span><strong>{completed} / {unit.terms.length}</strong><p>Mark flashcards as known to track vocabulary.</p></div><div className="curriculum-panel"><span className="eyebrow">UNIT XP</span><strong>{stats.xp}</strong><p>Earn points through quizzes and study sessions.</p></div></div>
    <div className="curriculum-panel term-mastery-panel"><div className="panel-heading"><div><span className="eyebrow">VOCABULARY CHECKLIST</span><h3>Terms to revisit</h3></div><Link to={`/unit/${unit.id}/flashcards`} className="text-link">Study flashcards <ArrowRight size={14} /></Link></div><div className="term-checklist">{unit.terms.map(term => <div key={term.term}><span className={stats.masteredTerms.includes(term.term) ? 'known' : ''}>{stats.masteredTerms.includes(term.term) && <Check size={13} />}</span><strong>{term.term}</strong><small>{stats.masteredTerms.includes(term.term) ? 'Marked known' : 'Not reviewed yet'}</small></div>)}</div></div>
  </section>
}

export function VocabularyPage({ progress, record }: PageProps) {
  const [unitId, setUnitId] = useState('all')
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState<'browse' | 'flashcards' | 'matching'>('browse')
  const filteredUnits = useMemo(() => unitId === 'all' ? units : units.filter(unit => String(unit.id) === unitId), [unitId])
  const terms = useMemo(() => filteredUnits.flatMap(unit => unit.terms.map(term => ({ term, unitId: unit.id }))), [filteredUnits])
  const filteredTerms = useMemo(() => terms.filter(({ term }) => `${term.term} ${term.definition} ${term.significance}`.toLowerCase().includes(search.toLowerCase())), [search, terms])
  const displayTerms = useMemo(() => filteredTerms.map(item => ({ ...item.term, unitId: item.unitId })), [filteredTerms])
  return <div className="curriculum-content-section"><PageHeading eyebrow="ALL-UNIT VOCABULARY" title="The AP World glossary" description="Browse every unit’s key terms, study them as flashcards, or test recall with a matching game." />
    <div className="term-toolbar"><label className="select-wrap"><span className="sr-only">Choose a unit</span><select value={unitId} onChange={event => setUnitId(event.target.value)}><option value="all">All units · {terms.length} terms</option>{units.map(unit => <option key={unit.id} value={unit.id}>Unit {unit.id} · {unit.title}</option>)}</select><ChevronDown size={14} /></label><label className="term-search"><Search size={15} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find a term or concept" /></label></div>
    <div className="study-mode-tabs"><button className={mode === 'browse' ? 'active' : ''} onClick={() => setMode('browse')}><BookOpen size={15} /> Browse glossary</button><button className={mode === 'flashcards' ? 'active' : ''} onClick={() => setMode('flashcards')}><Layers size={15} /> Flashcard mode</button><button className={mode === 'matching' ? 'active' : ''} onClick={() => setMode('matching')}><Target size={15} /> Matching game</button></div>
    {mode === 'browse' ? <TermCards terms={displayTerms} unitId={0} record={record} /> : <MultiUnitTermStudy terms={displayTerms} record={record} mode={mode} />}
    <p className="vocab-progress-note"><Check size={14} /> {progress.knownCards.length} flashcards marked known across the course.</p>
  </div>
}

function MultiUnitTermStudy({ terms, record, mode }: { terms: (CurriculumTerm & { unitId: number })[]; record: RecordStudy; mode: 'flashcards' | 'matching' }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const current = terms[index % terms.length]
  const distractors = terms.filter(item => item.term !== current?.term)
  const choices = current ? [current, ...Array.from({ length: Math.min(3, distractors.length) }, (_, offset) => distractors[(index * 7 + offset) % distractors.length])] : []
  useEffect(() => { setIndex(0); setFlipped(false); setSelected(null) }, [terms])
  if (!current) return <p className="empty-state">No vocabulary terms match your search.</p>
  const next = () => { setIndex(value => (value + 1) % terms.length); setFlipped(false); setSelected(null) }
  if (mode === 'matching') return <div className="matching-game"><div className="matching-game-prompt"><span className="eyebrow">UNIT {current.unitId} · MATCH THE DEFINITION</span><h3>{current.term}</h3></div><div className="matching-options">{choices.map((choice, option) => <button key={`${choice.unitId}-${choice.term}`} disabled={selected !== null} onClick={() => { if (selected !== null) return; const right = choice.term === current.term; setSelected(choice.term); record(right, right ? 8 : 2, right ? `u${current.unitId}-global-match-${current.term}` : undefined, undefined, String(current.unitId)) }} className={selected !== null && choice.term === current.term ? 'correct' : selected === choice.term ? 'incorrect' : ''}><span>{String.fromCharCode(65 + option)}</span>{choice.definition}</button>)}</div>{selected !== null && <button className="button button-dark" onClick={next}>Next term <ArrowRight size={14} /></button>}</div>
  return <div className={`study-flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(value => !value)} role="button" tabIndex={0}><span className="eyebrow">UNIT {current.unitId} · TERM {index + 1} / {terms.length}</span>{flipped ? <><p>{current.definition}</p><small>{current.apExample}</small></> : <h3>{current.term}</h3>}<div className="flashcard-controls" onClick={event => event.stopPropagation()}><button className="button button-outline" onClick={() => setFlipped(value => !value)}>Flip</button><button className="button button-dark" onClick={() => { record(true, 5, `u${current.unitId}-global-card-${current.term}`, `u${current.unitId}-${current.term}`, String(current.unitId)); next() }}>Know it <Check size={14} /></button><button className="button button-outline" onClick={next}>Review again</button></div></div>
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <header className="section-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</header>
}

function countdownToExam() {
  const examDate = new Date('2027-05-07T08:00:00')
  return Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / 86400000))
}

export function ExamReviewPage({ progress, record }: PageProps) {
  const [tab, setTab] = useState<'skills' | 'adaptive' | 'dbq'>('skills')
  const totalAnswers = Object.values(progress.unitStats ?? {}).reduce((sum, stats) => sum + stats.answered, 0)
  const lowUnit = [...units].sort((a, b) => {
    const statsA = getStats(progress, a.id); const statsB = getStats(progress, b.id)
    return (statsA.answered ? statsA.correct / statsA.answered : 0) - (statsB.answered ? statsB.correct / statsB.answered : 0)
  })[0]
  const adaptiveQuestions = useMemo(() => {
    const missed = Object.values(progress.unitStats ?? {}).flatMap(stats => stats.missedQuestions)
    const missedQuestions = missed.map(id => mcqBank.find(question => question.id === id)).filter((question): question is CurriculumQuestion => Boolean(question))
    if (missedQuestions.length) return missedQuestions
    const weakUnit = lowUnit ?? units[0]
    return mcqBank.filter(question => question.unitId === weakUnit.id).slice(0, 30)
  }, [progress.unitStats, lowUnit])
  return <><PageHeading eyebrow="EXAM REVIEW · UNITS 1–9" title="Prepare for the full AP exam" description="Review historical thinking skills, target weak topics with adaptive questions, and practice document-based writing." action={<span className="content-count"><Clock3 size={15} /> {countdownToExam()} DAYS · ESTIMATED MAY 7, 2027</span>} />
    <div className="review-overview-strip"><div><span className="eyebrow">COURSE COVERAGE</span><strong>Units 1–9</strong><small>{mcqBank.length.toLocaleString()} AP-style questions · 225 SAQs · 135 LEQs · 10 DBQs</small></div><div><span className="eyebrow">YOUR REVIEW QUEUE</span><strong>{adaptiveQuestions.length} questions</strong><small>{totalAnswers ? `${totalAnswers} answers logged across the course` : 'Complete practice to personalize review'}</small></div><div><span className="eyebrow">LOWEST PRACTICE SCORE</span><strong>Unit {lowUnit.id}: {lowUnit.title}</strong><small>{getStats(progress, lowUnit.id).answered ? `${Math.round(getStats(progress, lowUnit.id).correct / getStats(progress, lowUnit.id).answered * 100)}% accuracy` : 'No attempts yet'}</small></div></div>
    <div className="study-mode-tabs"><button className={tab === 'skills' ? 'active' : ''} onClick={() => setTab('skills')}><Sparkles size={15} /> Thinking skills</button><button className={tab === 'adaptive' ? 'active' : ''} onClick={() => setTab('adaptive')}><Target size={15} /> Adaptive review</button><button className={tab === 'dbq' ? 'active' : ''} onClick={() => setTab('dbq')}><BookOpen size={15} /> DBQ practice</button></div>
    {tab === 'skills' ? <div className="exam-skill-grid">{examSkills.map((skill, index) => <article className="exam-skill-card" key={skill.title}><span>0{index + 1}</span><h3>{skill.title}</h3><p>{skill.description}</p><div><strong>Example</strong><p>{skill.example}</p></div></article>)}</div> : tab === 'adaptive' ? <QuestionPractice key={adaptiveQuestions.map(question => question.id).join('-')} unit={units[0]} questions={adaptiveQuestions} record={record} mode="ap" /> : <DBQPractice record={record} />}
    <div className="review-footer-links"><Link to="/practice-tests" className="button button-dark"><GraduationCap size={15} /> Start a full-length practice test <ArrowRight size={14} /></Link><Link to="/progress" className="button button-outline">View progress analytics</Link></div>
  </>
}

function DBQPractice({ record }: { record: RecordStudy }) {
  const [index, setIndex] = useState(0)
  const [response, setResponse] = useState('')
  const [showRubric, setShowRubric] = useState(false)
  const dbq = dbqBank[index % dbqBank.length]
  useEffect(() => { setResponse(localStorage.getItem(`ap-modern-dbq-${dbq.id}`) ?? '') }, [dbq.id])
  const save = () => { localStorage.setItem(`ap-modern-dbq-${dbq.id}`, response); record(true, 25, dbq.id, undefined, 'course', undefined, true) }
  const next = (value: number) => { setIndex((value + dbqBank.length) % dbqBank.length); setResponse(''); setShowRubric(false) }
  return <section className="dbq-practice-card"><div className="question-meta"><span>DBQ {index + 1} / {dbqBank.length} · PRACTICE DOCUMENT SUMMARIES</span><span>{dbq.title}</span></div><h2>{dbq.prompt}</h2><div className="dbq-context"><strong>Historical context</strong><p>{dbq.context}</p></div><div className="document-grid">{dbq.documents.map((document, docIndex) => <article key={document.attribution}><span>DOCUMENT {String.fromCharCode(65 + docIndex)}</span><h3>{document.attribution}</h3><p>{document.summary}</p><details><summary>Sourcing guidance</summary><p>{document.sourcing}</p></details></article>)}</div><button className="button button-outline" onClick={() => setShowRubric(value => !value)}>{showRubric ? 'Hide rubric' : 'Show rubric breakdown'} <ChevronDown size={14} /></button>{showRubric && <ul className="dbq-rubric">{dbq.rubric.map(item => <li key={item}>{item}</li>)}</ul>}<label className="response-label" htmlFor="dbq-response">YOUR DOCUMENT-BASED ARGUMENT</label><textarea id="dbq-response" rows={10} value={response} onChange={event => setResponse(event.target.value)} placeholder="Draft your thesis and explain how document evidence supports your argument…" /><div className="writing-actions"><span>{response.trim().split(/\s+/).filter(Boolean).length} words</span><div><button className="button button-dark" disabled={!response.trim()} onClick={save}>Save DBQ response <Check size={14} /></button></div></div><div className="prompt-navigation"><button className="button button-outline" onClick={() => next(index - 1)}><ArrowLeft size={14} /> Previous DBQ</button><button className="button button-outline" onClick={() => next(index + 1)}>Next DBQ <ArrowRight size={14} /></button></div></section>
}

export function PracticeTestsPage({ record }: { record: RecordStudy }) {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(95 * 60)
  const [finished, setFinished] = useState(false)
  const testQuestions = useMemo(() => Array.from({ length: 55 }, (_, index) => {
    const unit = units[index % units.length]
    const bank = mcqBank.filter(question => question.unitId === unit.id)
    return bank[Math.floor(index / units.length) % bank.length]
  }), [])
  const question = testQuestions[index]
  useEffect(() => {
    if (!started || finished || secondsLeft <= 0) return
    const timer = window.setInterval(() => setSecondsLeft(value => value - 1), 1000)
    return () => window.clearInterval(timer)
  }, [started, finished, secondsLeft])
  useEffect(() => { if (secondsLeft === 0 && started) setFinished(true) }, [secondsLeft, started])
  const answer = () => {
    if (!question || !selected || revealed) return
    const isCorrect = selected === question.answer
    setRevealed(true)
    if (isCorrect) setCorrect(value => value + 1)
    record(isCorrect, isCorrect ? 5 : 1, isCorrect ? `test-${question.id}` : undefined, undefined, String(question.unitId), question.id)
  }
  const next = () => {
    if (index === testQuestions.length - 1) { setFinished(true); record(true, 50, 'full-practice-test-complete', undefined, 'course', undefined, true); return }
    setIndex(value => value + 1); setSelected(null); setRevealed(false)
  }
  const restart = () => { setStarted(false); setFinished(false); setIndex(0); setCorrect(0); setSelected(null); setRevealed(false); setSecondsLeft(95 * 60) }
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0')
  const seconds = (secondsLeft % 60).toString().padStart(2, '0')
  return <><PageHeading eyebrow="PRACTICE TESTS · FULL-COURSE REVIEW" title="Test your AP World knowledge" description="Try a 55-question mixed-unit multiple-choice section with a 95-minute timer, immediate explanations, and progress saved by unit." action={<span className="content-count"><Clock3 size={15} /> 55 QUESTIONS · 95 MIN</span>} />
    {!started ? <section className="test-start-card"><span className="test-start-icon"><GraduationCap size={24} /></span><span className="eyebrow">FULL-LENGTH MCQ SECTION</span><h2>One course. Nine units. A timed set.</h2><p>This original practice set draws questions from all nine units. Each question includes a stimulus or source-style evidence and an explanation. Your results update unit-level progress and missed-question review.</p><div className="test-spec-grid"><div><strong>55</strong><small>questions</small></div><div><strong>95</strong><small>minutes</small></div><div><strong>9</strong><small>units included</small></div></div><button className="button button-dark" onClick={() => setStarted(true)}>Start practice test <ArrowRight size={15} /></button></section> : finished ? <section className="test-results-card"><Trophy size={30} /><span className="eyebrow">PRACTICE TEST COMPLETE</span><h2>{correct} / {testQuestions.length} correct</h2><p>{Math.round(correct / testQuestions.length * 100)}% accuracy · Review missed items in Exam Review.</p><div className="test-unit-results">{units.map(unit => { const count = testQuestions.filter(item => item.unitId === unit.id).length; return <div key={unit.id}><span>Unit {unit.id}</span><strong>{count} questions</strong></div> })}</div><button className="button button-dark" onClick={restart}>Start another test <RotateCcw size={14} /></button></section> : question ? <section className="curriculum-question-card test-question-card"><div className="test-progress-row"><span>QUESTION {index + 1} / {testQuestions.length}</span><span className="test-clock"><Clock3 size={14} /> {minutes}:{seconds}</span></div><div className="progress-track"><i style={{ width: `${(index / testQuestions.length) * 100}%` }} /></div><div className="question-meta"><span>UNIT {question.unitId} · {question.type}</span><span>{question.topic}</span></div><div className="question-stimulus">{question.stimulus}</div><h3>{question.prompt}</h3><div className="curriculum-answer-list">{question.choices.map((choice, choiceIndex) => <button key={choice} disabled={revealed} className={`${selected === choice ? 'selected' : ''} ${revealed && choice === question.answer ? 'correct' : ''} ${revealed && choice === selected && choice !== question.answer ? 'incorrect' : ''}`} onClick={() => setSelected(choice)}><span>{String.fromCharCode(65 + choiceIndex)}</span>{choice}{revealed && choice === question.answer && <Check size={15} />}</button>)}</div>{revealed && <div className="curriculum-explanation"><strong>{selected === question.answer ? 'Correct.' : 'Review this topic.'}</strong><p>{question.explanation}</p></div>}<div className="question-actions"><button className="button button-dark" disabled={!revealed && !selected} onClick={revealed ? next : answer}>{revealed ? index === testQuestions.length - 1 ? 'Finish test' : 'Next question' : 'Check answer'} <ArrowRight size={14} /></button></div></section> : null}
  </>
}

export function ProgressPage({ progress }: PageProps) {
  const totalUnitAnswers = Object.values(progress.unitStats ?? {}).reduce((sum, stats) => sum + stats.answered, 0)
  const totalUnitCorrect = Object.values(progress.unitStats ?? {}).reduce((sum, stats) => sum + stats.correct, 0)
  const overallAccuracy = totalUnitAnswers ? Math.round(totalUnitCorrect / totalUnitAnswers * 100) : 0
  const earnedUnitBadges = units.filter(unit => { const stats = getStats(progress, unit.id); return stats.answered >= 10 && stats.correct / stats.answered >= 0.8 })
  const achievements = [
    ...units.map(unit => ({ title: `Unit ${unit.id} Master`, detail: `Reach 80% accuracy after at least 10 answers in ${unit.title}.`, earned: earnedUnitBadges.some(item => item.id === unit.id) })),
    { title: 'AP World Scholar', detail: 'Earn 1,000 XP across all units.', earned: progress.xp >= 1000 },
    { title: 'DBQ Master', detail: 'Save a response to a document-based question.', earned: progress.completed.some(item => item.startsWith('dbq-')) },
    { title: 'LEQ Master', detail: 'Save a long-essay response.', earned: progress.completed.some(item => item.includes('leq')) },
    { title: 'Perfect Score', detail: 'Answer at least 20 questions with 100% accuracy.', earned: totalUnitAnswers >= 20 && overallAccuracy === 100 },
  ]
  return <><PageHeading eyebrow="PROGRESS · YOUR STUDY RECORD" title="See how far you’ve come" description="Track study activity, accuracy, vocabulary mastery, and milestones across the complete AP World course." />
    <div className="progress-summary-grid"><div className="curriculum-panel"><span className="eyebrow">COURSE ACCURACY</span><strong>{overallAccuracy}%</strong><small>{totalUnitCorrect} correct / {totalUnitAnswers} attempts</small></div><div className="curriculum-panel"><span className="eyebrow">TOTAL XP</span><strong>{progress.xp.toLocaleString()}</strong><small>Experience earned across study modes</small></div><div className="curriculum-panel"><span className="eyebrow">STUDY STREAK</span><strong>{progress.streak} days</strong><small>Keep your daily history habit going</small></div><div className="curriculum-panel"><span className="eyebrow">TERMS KNOWN</span><strong>{progress.knownCards.length}</strong><small>Flashcards marked known</small></div></div>
    <section className="curriculum-panel progress-unit-panel"><div className="panel-heading"><div><span className="eyebrow">UNIT-BY-UNIT ANALYTICS</span><h3>Practice accuracy</h3></div><Link className="text-link" to="/review">Build a review plan <ArrowRight size={14} /></Link></div><div className="progress-unit-list">{units.map(unit => { const stats = getStats(progress, unit.id); const accuracy = stats.answered ? Math.round(stats.correct / stats.answered * 100) : 0; return <div key={unit.id}><div><span>UNIT {unit.id}</span><strong>{unit.title}</strong><small>{stats.answered ? `${stats.correct} / ${stats.answered} correct` : 'No activity yet'}</small></div><div className="progress-track"><i style={{ width: `${accuracy}%` }} /></div><b>{stats.answered ? `${accuracy}%` : '—'}</b><Link to={`/unit/${unit.id}`} aria-label={`Open Unit ${unit.id}`}><ChevronRight size={15} /></Link></div> })}</div></section>
    <section className="curriculum-panel achievements-panel"><div className="panel-heading"><div><span className="eyebrow">GAMIFICATION · ACHIEVEMENTS</span><h3>Milestones</h3></div><span className="content-count"><Award size={14} /> {achievements.filter(item => item.earned).length} / {achievements.length} earned</span></div><div className="achievement-grid">{achievements.map(item => <article className={item.earned ? 'earned' : ''} key={item.title}><span>{item.earned ? <Trophy size={17} /> : <Award size={17} />}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div>{item.earned && <Check size={15} />}</article>)}</div></section>
    <div className="review-footer-links"><Link to="/vocabulary" className="button button-outline"><Layers size={15} /> Review vocabulary</Link><Link to="/practice-tests" className="button button-dark"><Target size={15} /> Practice test</Link></div>
  </>
}

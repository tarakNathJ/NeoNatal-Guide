import { TMessage ,Sections } from "@/types"

export const topicLabels: Record<string, string> = {
  feeding:'Feeding', sleep:'Sleep', fever:'Fever',
  growth:'Growth', vaccines:'Vaccines', crying:'Crying',
}

export function generateTitle(messages: TMessage[]): string {
  if (messages.length === 0) return 'New Chat'
  const first = messages[0].content
  return first.length > 35 ? first.substring(0, 35) + '...' : first
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const questionsByTopic: Record<string, Record<string, {icon:string, text:string}[]>> = {
  feeding: {
    '0-4w':  [
      { icon: '🍼', text: "My newborn won't latch properly" },
      { icon: '🤱', text: "How often should I feed my newborn?" },
      { icon: '😴', text: "Baby falls asleep while feeding" },
      { icon: '📊', text: "How do I know if baby is getting enough milk?" },
    ],
    '1-3m':  [
      { icon: '🍼', text: "How much formula for a 2-month-old?" },
      { icon: '🤱', text: "My milk supply seems low" },
      { icon: '😣', text: "Baby is gassy after every feeding" },
      { icon: '📊', text: "Is cluster feeding normal at 6 weeks?" },
    ],
    '3-6m':  [
      { icon: '🥣', text: "Can I start solids at 4 months?" },
      { icon: '🍼', text: "Baby is distracted during feeds" },
      { icon: '📊', text: "How much milk does a 4-month-old need?" },
      { icon: '😣', text: "Baby refuses bottle suddenly" },
    ],
    '6-12m': [
      { icon: '🥣', text: "What foods to start with at 6 months?" },
      { icon: '🥜', text: "How to introduce peanuts safely?" },
      { icon: '🍼', text: "When to stop formula?" },
      { icon: '😣', text: "Baby refuses all solid foods" },
    ],
  },
  sleep: {
    '0-4w':  [
      { icon: '😴', text: "How many hours should a newborn sleep?" },
      { icon: '🌙', text: "Baby only sleeps when held" },
      { icon: '😰', text: "Safe sleep rules for newborn" },
      { icon: '🔄', text: "Baby has day/night confusion" },
    ],
    '1-3m':  [
      { icon: '😴', text: "When will baby sleep longer stretches?" },
      { icon: '🌙', text: "How to create a sleep routine at 2 months?" },
      { icon: '😰', text: "Baby wakes every 45 minutes" },
      { icon: '🔄', text: "Is it okay to let baby sleep in swing?" },
    ],
    '3-6m':  [
      { icon: '😴', text: "4 month sleep regression — what to do?" },
      { icon: '🌙', text: "Can I start sleep training at 4 months?" },
      { icon: '😰', text: "Baby fights sleep every night" },
      { icon: '🔄', text: "How many naps at 5 months?" },
    ],
    '6-12m': [
      { icon: '😴', text: "When to drop to one nap?" },
      { icon: '🌙', text: "Baby wakes at night after sleeping well" },
      { icon: '😰', text: "9 month sleep regression signs" },
      { icon: '🔄', text: "Is sleep training safe at 6 months?" },
    ],
  },
  fever: {
    '0-4w':  [
      { icon: '🌡️', text: "Baby has 100.4°F fever — what do I do?" },
      { icon: '🤒', text: "How to take newborn temperature correctly" },
      { icon: '😰', text: "Baby feels warm but no thermometer" },
      { icon: '🏥', text: "When to go to ER with newborn fever?" },
    ],
    '1-3m':  [
      { icon: '🌡️', text: "Baby has 101°F fever at 2 months" },
      { icon: '🤒', text: "Can I give Tylenol to 2 month old?" },
      { icon: '😰', text: "Fever after vaccination at 2 months" },
      { icon: '🏥', text: "Fever with rash in young baby" },
    ],
    '3-6m':  [
      { icon: '🌡️', text: "Baby has 102°F fever at 4 months" },
      { icon: '🤒', text: "How much Tylenol for 4 month old?" },
      { icon: '😰', text: "Fever keeps coming back" },
      { icon: '🏥', text: "Fever with ear pulling — ear infection?" },
    ],
    '6-12m': [
      { icon: '🌡️', text: "Is 103°F dangerous for 9 month old?" },
      { icon: '🤒', text: "Can I give Motrin to 7 month old?" },
      { icon: '😰', text: "Teething fever — real or myth?" },
      { icon: '🏥', text: "Febrile seizure — what happened?" },
    ],
  },
  growth: {
    '0-4w':  [
      { icon: '📏', text: "How much should newborn gain per week?" },
      { icon: '⚖️', text: "Baby lost weight after birth — normal?" },
      { icon: '📊', text: "What milestones at 3 weeks old?" },
      { icon: '👁️', text: "When can newborn see clearly?" },
    ],
    '1-3m':  [
      { icon: '📏', text: "Baby's first smile — when?" },
      { icon: '⚖️', text: "Is my 2 month old gaining enough weight?" },
      { icon: '📊', text: "What should 2 month old be doing?" },
      { icon: '💪', text: "Tummy time tips for 2 month old" },
    ],
    '3-6m':  [
      { icon: '📏', text: "When do babies roll over?" },
      { icon: '⚖️', text: "Average weight at 4 months?" },
      { icon: '📊', text: "Baby not laughing yet at 4 months" },
      { icon: '💪', text: "When do babies sit up?" },
    ],
    '6-12m': [
      { icon: '📏', text: "Baby not crawling at 9 months" },
      { icon: '⚖️', text: "When do babies start walking?" },
      { icon: '📊', text: "First words — when to expect?" },
      { icon: '💪', text: "Baby not pulling to stand at 10 months" },
    ],
  },
  vaccines: {
    '0-4w':  [
      { icon: '💉', text: "What vaccines does newborn get at birth?" },
      { icon: '😢', text: "Baby cried a lot after Hep B shot" },
      { icon: '🤒', text: "Fever after birth vaccine — normal?" },
      { icon: '📋', text: "Vaccine schedule for first year" },
    ],
    '1-3m':  [
      { icon: '💉', text: "What to expect at 2 month vaccine visit?" },
      { icon: '😢', text: "How to soothe baby after shots?" },
      { icon: '🤒', text: "Hard lump at injection site" },
      { icon: '📋', text: "Can I delay the 2 month vaccines?" },
    ],
    '3-6m':  [
      { icon: '💉', text: "4 month vaccines — what are they?" },
      { icon: '😢', text: "Baby very sleepy after vaccines" },
      { icon: '🤒', text: "High fever after 4 month shots" },
      { icon: '📋', text: "Do vaccines cause autism?" },
    ],
    '6-12m': [
      { icon: '💉', text: "6 month flu shot — necessary?" },
      { icon: '😢', text: "Baby screams during shots — tips?" },
      { icon: '🤒', text: "Swollen leg after vaccine injection" },
      { icon: '📋', text: "12 month vaccines — what to expect?" },
    ],
  },
  crying: {
    '0-4w':  [
      { icon: '😢', text: "My newborn cries for hours — colic?" },
      { icon: '🔊', text: "How to use the 5 S's to calm baby" },
      { icon: '🌙', text: "Baby cries more at evening — why?" },
      { icon: '😰', text: "I feel overwhelmed by baby's crying" },
    ],
    '1-3m':  [
      { icon: '😢', text: "Crying peaks at 6 weeks — normal?" },
      { icon: '🔊', text: "Nothing soothes my 6 week old" },
      { icon: '🌙', text: "PURPLE crying — what is it?" },
      { icon: '😰', text: "How long does colic last?" },
    ],
    '3-6m':  [
      { icon: '😢', text: "Baby still crying a lot at 4 months" },
      { icon: '🔊', text: "Baby cries when I put them down" },
      { icon: '🌙', text: "Crying from overstimulation — signs?" },
      { icon: '😰', text: "Should colic be gone by 4 months?" },
    ],
    '6-12m': [
      { icon: '😢', text: "Baby cries when I leave the room" },
      { icon: '🔊', text: "Separation anxiety crying — tips" },
      { icon: '🌙', text: "Baby cries during diaper changes" },
      { icon: '😰', text: "Crying from teething — how to help?" },
    ],
  },
}

export function getGreeting() {
  const h = new Date().getHours()
  if (h < 6)  return { head: 'Up for a night feed? 🌙', sub: "I'm here with you." }
  if (h < 12) return { head: 'Good morning, new parent ✦', sub: 'Your baby questions, answered with care.' }
  if (h < 18) return { head: 'Good afternoon ✦', sub: 'How is your little one doing today?' }
  return            { head: 'Good evening ✦', sub: "Ask me anything — I'm here all night." }
}

export const chips = ['🍼 Feeding','😴 Sleep','🌡️ Fever','📏 Growth','💉 Vaccines','😢 Crying']


export function Tparse(text: string): Sections | null {
  const m = text.match(/WHAT THIS MIGHT BE[:\s]*([\s\S]*?)(?=WHAT YOU CAN DO|SEE A DOCTOR|$)/i)
  const d = text.match(/WHAT YOU CAN DO NOW[:\s]*([\s\S]*?)(?=SEE A DOCTOR|$)/i)
  const e = text.match(/SEE A DOCTOR IF[:\s]*([\s\S]*?)$/i)
  if (!m && !d && !e) return null
  return { might: m?.[1]?.trim(), doCan: d?.[1]?.trim(), doctor: e?.[1]?.trim() }
}



export const topics = [
  { id: 'feeding',  label: 'Feeding',  icon: '🍼' },
  { id: 'sleep',    label: 'Sleep',    icon: '😴' },
  { id: 'fever',    label: 'Fever',    icon: '🌡️' },
  { id: 'growth',   label: 'Growth',   icon: '📏' },
  { id: 'vaccines', label: 'Vaccines', icon: '💉' },
  { id: 'crying',   label: 'Crying',   icon: '😢' },
]


export const ageGroups = [
  { id: '0-4w',   label: '0–4w',   full: '0 to 4 weeks old newborn' },
  { id: '1-3m',   label: '1–3m',   full: '1 to 3 months old baby' },
  { id: '3-6m',   label: '3–6m',   full: '3 to 6 months old baby' },
  { id: '6-12m',  label: '6–12m',  full: '6 to 12 months old baby' },
]

 export const languages = [
  { id: 'english',  label: 'EN', full: 'English' },
  { id: 'hindi',    label: 'HI', full: 'Hindi' },
  { id: 'bengali',  label: 'BN', full: 'বাংলা' },
  { id: 'french',   label: 'FR', full: 'Français' },
  { id: 'mandarin', label: 'ZH', full: '中文' },
]

 export const tips = [
  "Skin-to-skin contact for at least 1 hour daily strengthens baby's immune system.",
  "Newborns have a strong rooting reflex — touch their cheek to help them latch.",
  "A baby's stomach is the size of a walnut in week 1. Small feeds are normal.",
  "White noise mimics the womb — a fan or app can calm a fussy newborn.",
]
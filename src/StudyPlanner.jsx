import { useState, useEffect, useCallback, useMemo } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(d) { if (!d) return ""; const p = d.split("-"); if (p.length===3) return `${parseInt(p[2])} ${MONTHS[parseInt(p[1])-1]} ${p[0]}`; return d; }

const INIT = [
  { code:"7007GIR", title:"Foreign Policy", color:"#E07A5F", mode:"Online", convenor:"Dr Tom Conley",
    keyDates:{start:"2026-03-02",lastAdd:"2026-03-15",census:"2026-03-30",lastDrop:"2026-05-03"},
    schedule:"Tue 11:00–11:50 (Lecture) + Tue 12:00–13:50 (Seminar), Wk 1–12, Online",
    assessments:[
      {id:"7007-a1",name:"Workshop Exercise",type:"Presentation",weight:20,due:"2026-03-09",ongoing:true,notes:"Must do exercise in the week of the question/reading",time:""},
      {id:"7007-a2",name:"Seminar Presentation",type:"Presentation",weight:30,due:"2026-03-16",ongoing:true,notes:"Must present in the week of your chosen topic",time:""},
      {id:"7007-a3",name:"Major Essay",type:"Written Assignment",weight:50,due:"2026-05-29",time:"4:00 pm"},
    ],
    learningOutcomes:["Critically evaluate literature, history and knowledge of Australia's foreign policy","Understand major problems and challenges confronting Australia regionally and globally","Assess how Indo-Pacific and international developments affect Australia's relations","Make critical assessments through analytical, writing and communication skills"],
    readings:[
      {title:"Introduction: Us and them",type:"Chapter",importance:"Required",partOf:"Fear of abandonment"},
      {title:"Chapter 2 Conceiving Foreign Policy",type:"Chapter",importance:"Required",partOf:"Making Australian Foreign Policy"},
      {title:"The Policy Process",type:"Chapter",importance:"Required",partOf:"Making Australian Foreign Policy"},
      {title:"Chapter 4: The making of foreign policy",type:"Chapter",importance:"Required",partOf:"Australia in international politics"},
      {title:"Dreams and nightmares: Australia's past, present and future in Asia",type:"Document",importance:"Required"},
      {title:"Plimsoll Address | Australian Minister for Foreign Affairs",type:"Webpage",importance:"Required"},
      {title:"Politics and the English Language | The Orwell Foundation",type:"Webpage",importance:"Required"},
      {title:"No, you're not entitled to your opinion",type:"Article",importance:"Required",partOf:"The Conversation"},
      {title:"Yes, you are entitled to your opinion … and I want to hear it",type:"Article",importance:"Required",partOf:"The Conversation"},
      {title:"Australia's AUKUS 'bet' on the United States",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Canberra, We Have a Problem: Interpreting Shifting American Grand Strategy",type:"Article",importance:"Required",partOf:"AJPH"},
      {title:"SECOND COMING: How to deal with Trump",type:"Article",importance:"Required",partOf:"Australian Foreign Affairs"},
      {title:"AUKUS: When naval procurement sets grand strategy",type:"Article",importance:"Required",partOf:"International Journal"},
      {title:"Plan B?: Reconsidering Australian Security",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"FATAL SHORES: AUKUS is a grave mistake",type:"Article",importance:"Required",partOf:"Australian Foreign Affairs"},
      {title:"Overcoming the Creswell–Foster divide in Australian strategy",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Ch 6 Lessons from the rise and fall of Chinese investment in Australia",type:"Chapter",importance:"Required",partOf:"Engaging China"},
      {title:"Ch 5 Australia-China trade: opportunity, risk, mitigation",type:"Chapter",importance:"Required",partOf:"Engaging China"},
      {title:"Global trade risks and opportunities – Parliament of Australia",type:"Webpage",importance:"Required"},
      {title:"Australia's International Development Policy",type:"Document",importance:"Required"},
      {title:"Global values or national interest? Public opinion towards foreign aid",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"The view from Solomon Islands",type:"Article",importance:"Required",partOf:"Australian Foreign Affairs"},
      {title:"Ch 8 Foreign aid: Australia's reputation at stake?",type:"Chapter",importance:"Required",partOf:"Lessons from History"},
      {title:"Can the Albanese government finally drive down Australia's emissions?",type:"Webpage",importance:"Required"},
      {title:"Climate change and Australia's national security",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"National Statement to the United Nations General Assembly",type:"Webpage",importance:"Required"},
      {title:"Australia's human rights record under scrutiny",type:"Webpage",importance:"Required"},
      {title:"Australia the 'good international citizen'?",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Existential threats, shared responsibility, and Australia's role",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Reflections on the three pillars of the responsibility to protect",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Australian Foreign Policy under the Abbott Government",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Ch 11: What Australian foreign policy?",type:"Chapter",importance:"Required",partOf:"Fear of abandonment"},
      {title:"The return of values in Australian foreign policy",type:"Article",importance:"Required",partOf:"AJIA"},
      {title:"Policy relevance: A sceptical view",type:"Article",importance:"Required",partOf:"AJIA"},
    ],
  },
  { code:"7010GIR", title:"Policymaking, Public Participation & Human Rights", color:"#3D8B7A", mode:"Online", convenor:"Dr Diego Leiva",
    keyDates:{start:"2026-03-02",lastAdd:"2026-03-15",census:"2026-03-30",lastDrop:"2026-05-03"},
    schedule:"Fri 17:00–19:50, Wk 1–12, Online",
    assessments:[
      {id:"7010-a1",name:"Class Activity Log",type:"Log of Learning Activities",weight:15,due:"2026-05-25",ongoing:true,time:""},
      {id:"7010-a2",name:"Case Study Report",type:"Written Assignment",weight:25,due:"2026-04-24",time:"5:00 pm"},
      {id:"7010-a3",name:"Major Research Essay",type:"Written Assignment",weight:60,due:"2026-05-22",time:"5:00 pm"},
    ],
    learningOutcomes:["Understand and apply theories regarding participation and social impact assessment","Understand how government and corporate policies shape participation opportunities","Identify impacts of major resource projects, especially for Indigenous peoples","Apply theoretical insights to specific development contexts via case study","Evaluate complex development issues involving multiple actors with divergent values"],
    readings:[
      {title:"Public participation and environmental impact assessment",type:"Article",importance:"Required",partOf:"EIA Review"},
      {title:"Unpacking 'Participation': models, meanings and practices",type:"Article",importance:"Required",partOf:"Community Development Journal"},
      {title:"Principles of Environmental Impact Assessment Best Practice",type:"Document",importance:"Required"},
      {title:"International Principles For Social Impact Assessment",type:"Article",importance:"Required",partOf:"Impact Assessment and Project Appraisal"},
      {title:"United Nations declaration on the rights of Indigenous peoples",type:"Document",importance:"Required"},
      {title:"International recognition of Indigenous rights",type:"Article",importance:"Required",partOf:"AJPS"},
      {title:"Indigenous peoples' relationships to large-scale mining",type:"Article",importance:"Required",partOf:"Extractive Industries and Society"},
      {title:"Shaping projects, shaping impacts: Community-controlled impact assessments",type:"Article",importance:"Required",partOf:"Third World Quarterly"},
      {title:"Tools for the disempowered? Indigenous leverage over mining companies",type:"Article",importance:"Required",partOf:"AJPS"},
      {title:"Aborigines, mining companies and the state in contemporary Australia",type:"Article",importance:"Required",partOf:"AJPS"},
      {title:"ESD and community participation: Kimberley LNG Precinct",type:"Article",importance:"Required",partOf:"AJEM"},
      {title:"When a river becomes a person",type:"Article",importance:"Required",partOf:"J of Human Development and Capabilities"},
      {title:"Litigating Indigenous peoples' rights in Africa",type:"Article",importance:"Required",partOf:"ICLQ"},
      {title:"Avoiding the resource curse: Indigenous communities and Canada's oil sands",type:"Article",importance:"Required",partOf:"World Development"},
      {title:"The two sides of Pascua Lama",type:"Article",importance:"Required",partOf:"European Review of Latin American Studies"},
    ],
  },
  { code:"7115IBA", title:"Managing Complex Projects", color:"#5B7CC5", mode:"Mixed Mode", convenor:"Dr Louis Sanzogni",
    keyDates:{start:"2026-02-28",lastAdd:"2026-03-13",census:"2026-03-28",lastDrop:"2026-04-24"},
    schedule:"Wed 16:00–17:50, Wk 1–12, Nathan (N56 0.07)",
    assessments:[
      {id:"7115-a1",name:"A1: Development of Project for Learning (PfL)",type:"Written Assignment",weight:40,due:"2026-04-02",time:"11:59 pm"},
      {id:"7115-a2",name:"A2: Critical Analysis of Project for Learning",type:"Practice-based Assignment",weight:60,due:"2026-05-15",time:"4:00 pm"},
    ],
    learningOutcomes:["Explain and assess key complexity dimensions underlying projects","Assess and map main uncertainties associated to complex projects","Apply advanced project management tools to deal with complex projects","Identify and apply organisational politics, change management and knowledge management concepts"],
    readings:[
      {title:"Ch 1 Making projects critical: An Introduction",type:"Chapter",importance:"Required",partOf:"Making projects critical"},
      {title:"Fundamental uncertainties in projects",type:"Article",importance:"Required",partOf:"IJPM"},
      {title:"Ch 2 Managing projects with high complexity",type:"Chapter",importance:"Required",partOf:"Aspects of complexity",notes:"Pages 17-26"},
      {title:"A leader's framework for decision making",type:"Article",importance:"Required",partOf:"Harvard Business Review"},
      {title:"Reinventing project management: the diamond approach",type:"Book",importance:"Required",notes:"Chapters 4, 5, 6 & 7"},
      {title:"Back to the future: revisiting Kotter's 1996 change model",type:"Article",importance:"Required",partOf:"J of Management Development"},
      {title:"Leading change: Why transformation efforts fail",type:"Article",importance:"Required",partOf:"Harvard Business Review"},
      {title:"Power, politics, and organizational change",type:"Book",importance:"Required"},
      {title:"Inter-project learning: Processes and outcomes of knowledge codification",type:"Article",importance:"Required",partOf:"Research Policy"},
      {title:"What's your strategy for managing knowledge?",type:"Article",importance:"Required",partOf:"Harvard Business Review"},
    ],
  },
  { code:"7012EHR", title:"Leading Policy & Organisational Change", color:"#9B72CF", mode:"Online", convenor:"Assoc Prof Alannah Rafferty",
    keyDates:{start:"2026-03-02",lastAdd:"2026-03-15",census:"2026-03-30",lastDrop:"2026-05-03"},
    schedule:"Tue 14:00–15:50, Wk 1–12, Online",
    assessments:[
      {id:"7012-a1",name:"Essay",type:"Written Assignment",weight:50,due:"2026-04-16",time:"5:00 pm"},
      {id:"7012-a2",name:"Take-home Case Study Exam",type:"Exam",weight:50,due:"2026-06-03",time:"9:00 am",notes:"Due Wednesday of Week 13"},
    ],
    learningOutcomes:["Apply concepts, theories and frameworks of change to real world situations","Appreciate the role of sustainable and ethical change strategies","Understand stages in a planned change process","Understand psychological factors influencing responses to change","Adopt a systemic approach to change across functions and levels"],
    readings:[
      {title:"Models of change agency: A fourfold classification",type:"Article",importance:"Required",partOf:"British J of Management"},
      {title:"Ethics and organizational change – Lewinian values",type:"Article",importance:"Required",partOf:"J of Change Management"},
      {title:"Towards a minimum conceptualisation of ethical organisational change",type:"Article",importance:"Required",partOf:"SA J of HRM"},
      {title:"Change management interventions: Taking stock and moving forward",type:"Article",importance:"Required",partOf:"HRM Review"},
      {title:"Employees' attitudes toward organizational change",type:"Article",importance:"Required",partOf:"Human Resource Management"},
      {title:"Case 11 Resistance to change: Technology implementation in public sector",type:"Chapter",importance:"Required"},
      {title:"Leading change: Why transformation efforts fail",type:"Article",importance:"Required",partOf:"Harvard Business Review"},
      {title:"The Strategic Management of Corporate Change",type:"Article",importance:"Required",partOf:"Human Relations"},
      {title:"Technique isn't everything, but it is a lot",type:"Chapter",importance:"Required",partOf:"Interviewing as qualitative research"},
      {title:"Organizational diagnosis: Its role in organizational learning",type:"Article",importance:"Required",partOf:"J of Counseling & Development"},
      {title:"Case Study 6: Bayrischer silicon products",type:"Chapter",importance:"Required"},
      {title:"Case 1 Contracting for success: Scoping large change efforts",type:"Chapter",importance:"Required"},
      {title:"There's a science for that: Team development interventions",type:"Article",importance:"Required",partOf:"Current Directions in Psychological Science"},
      {title:"Case 13 Where do we begin?: Selecting an intervention",type:"Chapter",importance:"Required"},
      {title:"Evaluation research in organizational change interventions",type:"Article",importance:"Required",partOf:"J of Applied Behavioral Science"},
    ],
  },
  { code:"7920IBA", title:"Sustainability & Systems Thinking", color:"#D4883E", mode:"Online", convenor:"Professor Nick Barter",
    keyDates:{start:"2026-03-02",lastAdd:"2026-03-15",census:"2026-03-30",lastDrop:"2026-05-03"},
    schedule:"Thu 18:00–20:50, Wk 1–12, Online",
    assessments:[
      {id:"7920-a1",name:"Organisation Reflection",type:"Written Assignment",weight:40,due:"2026-04-20",time:"9:00 am"},
      {id:"7920-a2",name:"Strategy for their Organization",type:"Written Assignment",weight:60,due:"2026-05-29",time:"8:00 pm"},
    ],
    learningOutcomes:["Discuss sustainable development challenging conventional business; cultural capability with First Australians","Develop and discuss paradigms, language impact, sustainability mindset","Recommend tools and strategies for more sustainable businesses","Develop organisational strategy to address a problem from a systems perspective"],
    readings:[
      {title:"Carl Sagan's Pale Blue Dot",type:"Audio-visual",importance:"Required"},
      {title:"Marketing myopia",type:"Article",importance:"Required",partOf:"Harvard Business Review"},
      {title:"Ch 4 Why systems surprise us",type:"Chapter",importance:"Required",partOf:"Thinking in systems: A primer"},
      {title:"Places to intervene in a system",type:"Article",importance:"Required",partOf:"Whole Earth"},
      {title:"Strategy textbooks and the environment construct",type:"Article",importance:"Required",partOf:"Organization & Environment"},
      {title:"Sustainable Development: A Review Using Two Snapshots",type:"Article",importance:"Required",partOf:"Asia Pacific Work in Progress"},
      {title:"Aboriginal principles for sustainable development",type:"Article",importance:"Required",partOf:"Sustainable Development"},
      {title:"Shifting Paradigms for Sustainable Development",type:"Article",importance:"Required",partOf:"Academy of Management Review"},
      {title:"Case 2: Starbucks corporation, April 2012",type:"Chapter",importance:"Required",partOf:"Contemporary strategy analysis"},
    ],
  },
];

const Chk = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Cal = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const Bk = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const Clip = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>;
const Plus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const Trash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
const Note = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const Chev = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const Tgt = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const Edit = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const Save = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const X = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const SK = "griffith-sp-v3";
const DEFAULT_APP_BG = "#0a0a1a";
function ld() { try { const r=localStorage.getItem(SK); if(r) return JSON.parse(r); } catch{} return null; }
function sv(s) { try { localStorage.setItem(SK, JSON.stringify(s)); } catch{} }
const I = {background:"#0d0d20",border:"1px solid #333355",borderRadius:8,padding:"8px 10px",color:"#e0e0e8",fontSize:13,fontFamily:"inherit"};

export default function StudyPlanner() {
  const saved = useMemo(()=>ld(),[]);
  const [tab,setTab]=useState("dash"); const [ac,setAc]=useState(null);
  const [cR,setCR]=useState(saved?.cR||{}); const [cA,setCA]=useState(saved?.cA||{});
  const [notes,setNotes]=useState(saved?.notes||{}); const [tasks,setTasks]=useState(saved?.tasks||[]);
  const [aEdits,setAEdits]=useState(saved?.aEdits||{}); const [custA,setCustA]=useState(saved?.custA||{});
  const [appBg,setAppBg]=useState(saved?.appBg||DEFAULT_APP_BG);
  const [ntT,setNtT]=useState(""); const [ntC,setNtC]=useState(""); const [ntD,setNtD]=useState(""); const [shT,setShT]=useState(false);
  const [nnT,setNnT]=useState(""); const [nnC,setNnC]=useState(""); const [shN,setShN]=useState(false);
  const [exp,setExp]=useState({}); const [editing,setEditing]=useState(null); const [ef,setEf]=useState({});

  const C = useMemo(()=>INIT.map(c=>{
    const m=c.assessments.map(a=>{const e=aEdits[a.id];return e?{...a,...e}:a;});
    return {...c,assessments:[...m,...(custA[c.code]||[])]};
  }),[aEdits,custA]);

  useEffect(()=>{sv({cR,cA,notes,tasks,aEdits,custA,appBg});},[cR,cA,notes,tasks,aEdits,custA,appBg]);

  const tglR=useCallback((cc,i)=>setCR(p=>({...p,[`${cc}-${i}`]:!p[`${cc}-${i}`]})),[]);
  const tglA=useCallback((id)=>setCA(p=>({...p,[id]:!p[id]})),[]);
  const tglS=useCallback((k)=>setExp(p=>({...p,[k]:!p[k]})),[]);
  const resetBg=useCallback(()=>setAppBg(DEFAULT_APP_BG),[]);

  const addTk=useCallback(()=>{if(!ntT.trim())return;setTasks(p=>[...p,{id:Date.now(),text:ntT,course:ntC,due:ntD,done:false}]);setNtT("");setNtC("");setNtD("");setShT(false);},[ntT,ntC,ntD]);
  const tglTk=useCallback((id)=>setTasks(p=>p.map(t=>t.id===id?{...t,done:!t.done}:t)),[]);
  const delTk=useCallback((id)=>setTasks(p=>p.filter(t=>t.id!==id)),[]);
  const addN=useCallback(()=>{if(!nnT.trim())return;const k=nnC||"general";setNotes(p=>({...p,[k]:[...(p[k]||[]),{id:Date.now(),text:nnT,date:new Date().toISOString().slice(0,10)}]}));setNnT("");setNnC("");setShN(false);},[nnT,nnC]);
  const delN=useCallback((k,id)=>setNotes(p=>({...p,[k]:(p[k]||[]).filter(n=>n.id!==id)})),[]);

  const startEd=useCallback((a)=>{setEditing(a.id);setEf({name:a.name,type:a.type,weight:a.weight,due:a.due||"",time:a.time||"",notes:a.notes||"",ongoing:!!a.ongoing});},[]);
  const saveEd=useCallback((id,cc)=>{if(id.startsWith("c-")){setCustA(p=>({...p,[cc]:(p[cc]||[]).map(a=>a.id===id?{...a,...ef}:a)}));}else{setAEdits(p=>({...p,[id]:{...ef}}));}setEditing(null);},[ef]);
  const cancelEd=useCallback(()=>{setEditing(null);setEf({});},[]);
  const addA=useCallback((cc)=>{const n={id:`c-${Date.now()}`,name:"New Assessment",type:"Written Assignment",weight:0,due:"",time:"",notes:""};setCustA(p=>({...p,[cc]:[...(p[cc]||[]),n]}));startEd(n);},[startEd]);
  const delA=useCallback((cc,id)=>{setCustA(p=>({...p,[cc]:(p[cc]||[]).filter(a=>a.id!==id)}));setCA(p=>{const n={...p};delete n[id];return n;});cancelEd();},[cancelEd]);

  const stats=useMemo(()=>{let tR=0,dR=0,tA=0,dA=0;C.forEach(c=>{c.readings.forEach((_,i)=>{tR++;if(cR[`${c.code}-${i}`])dR++;});c.assessments.forEach(a=>{tA++;if(cA[a.id])dA++;});});return{tR,dR,tA,dA};},[C,cR,cA]);

  const deadlines=useMemo(()=>{const it=[];C.forEach(c=>c.assessments.forEach(a=>{if(!a.ongoing&&a.due){const p=new Date(a.due);p.setDate(p.getDate()-3);it.push({...a,cc:c.code,col:c.color,pd:p.toISOString().slice(0,10),done:!!cA[a.id]});}}));
  tasks.forEach(t=>{if(t.due){const c=C.find(x=>x.code===t.course);it.push({name:t.text,due:t.due,pd:t.due,cc:t.course||"",col:c?.color||"#888",weight:null,custom:true,id:t.id,done:t.done});}});
  it.sort((a,b)=>(a.pd||"9").localeCompare(b.pd||"9"));return it;},[C,cA,tasks]);

  const prog=useCallback((cc)=>{const c=C.find(x=>x.code===cc);if(!c)return 0;let t=c.readings.length+c.assessments.length,d=0;c.readings.forEach((_,i)=>{if(cR[`${cc}-${i}`])d++;});c.assessments.forEach(a=>{if(cA[a.id])d++;});return t>0?Math.round(d/t*100):0;},[C,cR,cA]);

  const bar=(p,col,h=6)=><div style={{width:"100%",background:"#1a1a2e",borderRadius:h,height:h,overflow:"hidden"}}><div style={{width:`${p}%`,background:col,height:"100%",borderRadius:h,transition:"width 0.5s ease"}}/></div>;
  const chk=(on,fn,col)=><button onClick={fn} style={{width:22,height:22,borderRadius:6,border:`2px solid ${on?col:"#444"}`,background:on?col:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.2s",color:"#fff"}}>{on&&<Chk/>}</button>;

  // ─── DASHBOARD ──────────────────────────────────────────
  const renderDash=()=>{
    const p=stats.tR+stats.tA>0?Math.round((stats.dR+stats.dA)/(stats.tR+stats.tA)*100):0;
    return <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div style={{background:"#12122a",borderRadius:16,padding:28,border:"1px solid #222244"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h2 style={{margin:0,fontSize:18,color:"#e0e0e8",fontWeight:600}}>Overall Progress</h2><span style={{fontSize:28,fontWeight:700,color:"#7C83FF"}}>{p}%</span></div>
        {bar(p,"#7C83FF",10)}
        <div style={{display:"flex",gap:32,marginTop:16}}>
          <div><span style={{fontSize:13,color:"#888"}}>Readings</span><div style={{fontSize:20,fontWeight:600,color:"#e0e0e8"}}>{stats.dR}/{stats.tR}</div></div>
          <div><span style={{fontSize:13,color:"#888"}}>Assessments</span><div style={{fontSize:20,fontWeight:600,color:"#e0e0e8"}}>{stats.dA}/{stats.tA}</div></div>
          <div><span style={{fontSize:13,color:"#888"}}>Tasks</span><div style={{fontSize:20,fontWeight:600,color:"#e0e0e8"}}>{tasks.filter(t=>t.done).length}/{tasks.length}</div></div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
        {C.map(c=>{const cp=prog(c.code);return <button key={c.code} onClick={()=>{setAc(c.code);setTab("course");}} style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244",cursor:"pointer",textAlign:"left",transition:"all 0.2s",position:"relative",overflow:"hidden"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#222244";e.currentTarget.style.transform="translateY(0)";}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:c.color}}/>
          <div style={{fontSize:11,color:c.color,fontWeight:700,letterSpacing:1,marginBottom:6}}>{c.code}</div>
          <div style={{fontSize:15,fontWeight:600,color:"#e0e0e8",marginBottom:12,lineHeight:1.3}}>{c.title}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:12,color:"#888"}}>T1 2026 · {c.mode}</span><span style={{fontSize:13,fontWeight:600,color:c.color}}>{cp}%</span></div>
          {bar(cp,c.color)}
        </button>;})}
      </div>
      {/* Deadlines */}
      <div style={{background:"#12122a",borderRadius:16,padding:24,border:"1px solid #222244"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{margin:0,fontSize:18,color:"#e0e0e8",fontWeight:600,display:"flex",alignItems:"center",gap:8}}><Tgt/> Upcoming Deadlines</h2>
          <button onClick={()=>setShT(!shT)} style={{background:"#7C83FF22",border:"1px solid #7C83FF44",borderRadius:8,padding:"6px 12px",color:"#7C83FF",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600}}><Plus/> Add Task</button>
        </div>
        {shT&&<div style={{background:"#0d0d20",borderRadius:12,padding:16,marginBottom:16,border:"1px solid #333355"}}>
          <input value={ntT} onChange={e=>setNtT(e.target.value)} placeholder="Task description..." style={{...I,width:"100%",marginBottom:10,boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <select value={ntC} onChange={e=>setNtC(e.target.value)} style={{...I,flex:1,minWidth:140}}><option value="">No course</option>{C.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}</select>
            <input type="date" value={ntD} onChange={e=>setNtD(e.target.value)} style={{...I,flex:1,minWidth:140}}/>
            <button onClick={addTk} style={{background:"#7C83FF",border:"none",borderRadius:8,padding:"8px 18px",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600}}>Add</button>
          </div>
        </div>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {deadlines.map((d,i)=>{const urg=d.due>=new Date().toISOString().slice(0,10)&&d.pd<=new Date().toISOString().slice(0,10);return <div key={d.id||i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:d.done?"#0d0d1a":urg?"#2a1520":"#0d0d1a",borderRadius:10,border:`1px solid ${urg&&!d.done?"#663344":"#1a1a33"}`,opacity:d.done?0.5:1}}>
            {chk(d.done,()=>{if(d.custom)tglTk(d.id);else tglA(d.id);},d.col)}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,color:"#e0e0e8",fontWeight:500,textDecoration:d.done?"line-through":"none"}}>{d.name}</div>
              <div style={{fontSize:12,color:"#777",display:"flex",gap:8,marginTop:2,flexWrap:"wrap"}}>
                <span style={{color:d.col}}>{d.cc||"Custom"}</span>
                {d.weight!=null&&<span>{d.weight}%</span>}
                <span>Due: {fmtDate(d.due)}{d.time?`, ${d.time}`:""}</span>
                {!d.custom&&<span style={{color:urg?"#ff6b8a":"#666"}}>⚑ Start by: {fmtDate(d.pd)}</span>}
              </div>
            </div>
            {d.custom&&<button onClick={()=>delTk(d.id)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",padding:4}}><Trash/></button>}
          </div>;})}
          {deadlines.length===0&&<div style={{color:"#555",fontSize:14,textAlign:"center",padding:20}}>No deadlines yet</div>}
        </div>
      </div>
      {tasks.filter(t=>!t.due).length>0&&<div style={{background:"#12122a",borderRadius:16,padding:24,border:"1px solid #222244"}}>
        <h3 style={{margin:"0 0 12px",fontSize:16,color:"#e0e0e8"}}>Undated Tasks</h3>
        {tasks.filter(t=>!t.due).map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #1a1a33"}}>
          {chk(t.done,()=>tglTk(t.id),"#888")}
          <span style={{flex:1,fontSize:14,color:"#e0e0e8",textDecoration:t.done?"line-through":"none",opacity:t.done?0.5:1}}>{t.text}</span>
          <button onClick={()=>delTk(t.id)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",padding:4}}><Trash/></button>
        </div>)}
      </div>}
    </div>;
  };

  // ─── COURSE DETAIL ─────────────────────────────────────
  const renderCourse=()=>{
    const c=C.find(x=>x.code===ac);
    if(!c) return <div style={{color:"#888",padding:40,textAlign:"center"}}>Select a course from the dashboard</div>;
    const p=prog(c.code); const rD=c.readings.filter((_,i)=>cR[`${c.code}-${i}`]).length; const cn=notes[c.code]||[];
    return <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{background:"#12122a",borderRadius:16,padding:24,border:"1px solid #222244",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:c.color}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div><div style={{fontSize:12,color:c.color,fontWeight:700,letterSpacing:1}}>{c.code} · T1 2026</div><h2 style={{margin:"4px 0 8px",fontSize:22,color:"#e0e0e8",fontWeight:700}}>{c.title}</h2><div style={{fontSize:13,color:"#888"}}>{c.convenor} · {c.mode}</div><div style={{fontSize:13,color:"#777",marginTop:2}}>{c.schedule}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:32,fontWeight:700,color:c.color}}>{p}%</div><div style={{fontSize:12,color:"#888"}}>complete</div></div>
        </div>
        <div style={{marginTop:16}}>{bar(p,c.color,8)}</div>
      </div>
      {/* Key Dates */}
      <div style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <button onClick={()=>tglS(`${c.code}-d`)} style={{background:"none",border:"none",color:"#e0e0e8",cursor:"pointer",display:"flex",alignItems:"center",gap:8,width:"100%",justifyContent:"space-between",padding:0}}>
          <span style={{display:"flex",alignItems:"center",gap:8,fontSize:16,fontWeight:600}}><Cal/> Key Dates</span>
          <span style={{transform:exp[`${c.code}-d`]?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}><Chev/></span>
        </button>
        {exp[`${c.code}-d`]&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginTop:14}}>
          {Object.entries(c.keyDates).map(([k,v])=><div key={k} style={{background:"#0d0d1a",borderRadius:10,padding:12}}>
            <div style={{fontSize:11,color:"#777",textTransform:"capitalize",marginBottom:2}}>{k.replace(/([A-Z])/g,' $1')}</div>
            <div style={{fontSize:14,color:"#e0e0e8",fontWeight:500}}>{fmtDate(v)}</div>
          </div>)}
        </div>}
      </div>
      {/* Assessments */}
      <div style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><Clip/><span style={{fontSize:16,fontWeight:600,color:"#e0e0e8"}}>Assessments</span></div>
          <button onClick={()=>addA(c.code)} style={{background:`${c.color}22`,border:`1px solid ${c.color}44`,borderRadius:6,padding:"4px 10px",color:c.color,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:600}}><Plus/> Add</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {c.assessments.map(a=>{
            const done=!!cA[a.id]; const isEd=editing===a.id; const isCust=a.id.startsWith("c-");
            const dd=a.due?new Date(a.due):null; const pd=dd?new Date(dd):null; if(pd)pd.setDate(pd.getDate()-3);
            if(isEd) return <div key={a.id} style={{padding:16,background:"#0d0d1a",borderRadius:10,border:`1px solid ${c.color}44`}}>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <input value={ef.name} onChange={e=>setEf(f=>({...f,name:e.target.value}))} placeholder="Name" style={{...I,flex:2,minWidth:180}}/>
                  <input value={ef.type} onChange={e=>setEf(f=>({...f,type:e.target.value}))} placeholder="Type" style={{...I,flex:1,minWidth:120}}/>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12,color:"#888"}}>Weight:</span><input type="number" value={ef.weight} onChange={e=>setEf(f=>({...f,weight:parseInt(e.target.value)||0}))} style={{...I,width:60}}/><span style={{fontSize:12,color:"#888"}}>%</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12,color:"#888"}}>Due:</span><input type="date" value={ef.due} onChange={e=>setEf(f=>({...f,due:e.target.value}))} style={{...I,width:150}}/></div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:12,color:"#888"}}>Time:</span><input value={ef.time} onChange={e=>setEf(f=>({...f,time:e.target.value}))} placeholder="e.g. 5:00 pm" style={{...I,width:100}}/></div>
                  <label style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#888",cursor:"pointer"}}><input type="checkbox" checked={ef.ongoing||false} onChange={e=>setEf(f=>({...f,ongoing:e.target.checked}))}/> Ongoing</label>
                </div>
                <input value={ef.notes||""} onChange={e=>setEf(f=>({...f,notes:e.target.value}))} placeholder="Notes (optional)" style={{...I,width:"100%",boxSizing:"border-box"}}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>saveEd(a.id,c.code)} style={{background:c.color,border:"none",borderRadius:6,padding:"6px 14px",color:"#fff",cursor:"pointer",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Save/> Save</button>
                  <button onClick={cancelEd} style={{background:"#33335522",border:"1px solid #444",borderRadius:6,padding:"6px 14px",color:"#999",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:4}}><X/> Cancel</button>
                  {isCust&&<button onClick={()=>delA(c.code,a.id)} style={{background:"#ff4d4d22",border:"1px solid #ff4d4d44",borderRadius:6,padding:"6px 14px",color:"#ff6b6b",cursor:"pointer",fontSize:12,marginLeft:"auto",display:"flex",alignItems:"center",gap:4}}><Trash/> Delete</button>}
                </div>
              </div>
            </div>;
            return <div key={a.id} style={{display:"flex",alignItems:"flex-start",gap:12,padding:14,background:done?"#0a0a18":"#0d0d1a",borderRadius:10,border:`1px solid ${done?"#1a1a30":"#222244"}`,opacity:done?0.6:1}}>
              {chk(done,()=>tglA(a.id),c.color)}
              <div style={{flex:1}}>
                <div style={{fontSize:15,color:"#e0e0e8",fontWeight:500,textDecoration:done?"line-through":"none"}}>{a.name}</div>
                <div style={{fontSize:12,color:"#888",marginTop:3,display:"flex",gap:12,flexWrap:"wrap"}}>
                  <span style={{background:`${c.color}22`,color:c.color,padding:"2px 8px",borderRadius:4,fontWeight:600}}>{a.weight}%</span>
                  <span>{a.type}</span>
                  {a.due&&<span>Due: {fmtDate(a.due)}{a.time?`, ${a.time}`:""}</span>}
                  {a.ongoing&&<span style={{color:"#D4883E"}}>Ongoing</span>}
                </div>
                {!a.ongoing&&pd&&<div style={{fontSize:12,color:"#ff6b8a",marginTop:4}}>⚑ Personal deadline: {fmtDate(pd.toISOString().slice(0,10))}</div>}
                {a.notes&&<div style={{fontSize:12,color:"#999",marginTop:4,fontStyle:"italic"}}>{a.notes}</div>}
              </div>
              <button onClick={()=>startEd(a)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",padding:4,flexShrink:0}} title="Edit"><Edit/></button>
            </div>;
          })}
        </div>
      </div>
      {/* LOs */}
      <div style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <button onClick={()=>tglS(`${c.code}-lo`)} style={{background:"none",border:"none",color:"#e0e0e8",cursor:"pointer",display:"flex",alignItems:"center",gap:8,width:"100%",justifyContent:"space-between",padding:0}}>
          <span style={{display:"flex",alignItems:"center",gap:8,fontSize:16,fontWeight:600}}><Tgt/> Learning Outcomes</span>
          <span style={{transform:exp[`${c.code}-lo`]?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}><Chev/></span>
        </button>
        {exp[`${c.code}-lo`]&&<div style={{marginTop:14,display:"flex",flexDirection:"column",gap:8}}>
          {c.learningOutcomes.map((lo,i)=><div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid #1a1a30"}}><span style={{color:c.color,fontWeight:700,fontSize:13,minWidth:24}}>LO{i+1}</span><span style={{fontSize:13,color:"#ccc",lineHeight:1.5}}>{lo}</span></div>)}
        </div>}
      </div>
      {/* Readings */}
      <div style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <span style={{display:"flex",alignItems:"center",gap:8,fontSize:16,fontWeight:600,color:"#e0e0e8"}}><Bk/> Readings</span>
          <span style={{fontSize:13,color:"#888"}}>{rD}/{c.readings.length} completed</span>
        </div>
        <div style={{marginBottom:10}}>{bar(rD/Math.max(c.readings.length,1)*100,c.color)}</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {c.readings.map((r,i)=>{const done=!!cR[`${c.code}-${i}`];return <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",background:done?"#0a0a18":"transparent",borderRadius:8,opacity:done?0.55:1}}>
            {chk(done,()=>tglR(c.code,i),c.color)}
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:"#e0e0e8",fontWeight:500,textDecoration:done?"line-through":"none",lineHeight:1.4}}>{r.title}</div>
              <div style={{fontSize:11,color:"#777",marginTop:2,display:"flex",gap:8,flexWrap:"wrap"}}>
                <span style={{background:r.importance==="Required"?"#E07A5F22":"#3D8B7A22",color:r.importance==="Required"?"#E07A5F":"#3D8B7A",padding:"1px 6px",borderRadius:3,fontWeight:600}}>{r.importance}</span>
                <span>{r.type}</span>{r.partOf&&<span>in: {r.partOf}</span>}{r.notes&&<span style={{fontStyle:"italic"}}>{r.notes}</span>}
              </div>
            </div>
          </div>;})}
        </div>
      </div>
      {/* Notes */}
      <div style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <span style={{display:"flex",alignItems:"center",gap:8,fontSize:16,fontWeight:600,color:"#e0e0e8"}}><Note/> Notes</span>
          <button onClick={()=>{setShN(!shN);setNnC(c.code);}} style={{background:`${c.color}22`,border:`1px solid ${c.color}44`,borderRadius:6,padding:"4px 10px",color:c.color,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:600}}><Plus/> Add Note</button>
        </div>
        {shN&&nnC===c.code&&<div style={{marginBottom:14}}>
          <textarea value={nnT} onChange={e=>setNnT(e.target.value)} placeholder="Write your note..." style={{width:"100%",...I,minHeight:80,resize:"vertical",boxSizing:"border-box"}}/>
          <button onClick={addN} style={{marginTop:8,background:c.color,border:"none",borderRadius:8,padding:"8px 18px",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600}}>Save Note</button>
        </div>}
        {cn.length===0&&!shN&&<div style={{color:"#555",fontSize:13,textAlign:"center",padding:16}}>No notes yet</div>}
        {cn.map(n=><div key={n.id} style={{background:"#0d0d1a",borderRadius:8,padding:12,marginBottom:8,borderLeft:`3px solid ${c.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{fontSize:13,color:"#ccc",lineHeight:1.5,whiteSpace:"pre-wrap",flex:1}}>{n.text}</div><button onClick={()=>delN(c.code,n.id)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",padding:4,flexShrink:0}}><Trash/></button></div>
          <div style={{fontSize:11,color:"#666",marginTop:6}}>{fmtDate(n.date)}</div>
        </div>)}
      </div>
    </div>;
  };

  // ─── CALENDAR ──────────────────────────────────────────
  const renderCal=()=>{
    const mos={};const ev=[];
    C.forEach(c=>c.assessments.forEach(a=>{if(!a.ongoing&&a.due){const p=new Date(a.due);p.setDate(p.getDate()-3);ev.push({date:a.due,type:"due",name:a.name,course:c,weight:a.weight,time:a.time});ev.push({date:p.toISOString().slice(0,10),type:"pd",name:`⚑ ${a.name}`,course:c});}}));
    tasks.forEach(t=>{if(t.due){const c=C.find(x=>x.code===t.course);ev.push({date:t.due,type:"task",name:t.text,course:c||{code:"",color:"#888"}});}});
    ev.forEach(e=>{const m=e.date.slice(0,7);if(!mos[m])mos[m]=[];mos[m].push(e);});
    return <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <h2 style={{margin:0,fontSize:20,color:"#e0e0e8",fontWeight:700,display:"flex",alignItems:"center",gap:8}}><Cal/> Calendar View</h2>
      {Object.keys(mos).sort().map(m=>{const [y,mo]=m.split("-");const mn=new Date(+y,+mo-1).toLocaleDateString("en-AU",{month:"long",year:"numeric"});const evs=mos[m].sort((a,b)=>a.date.localeCompare(b.date));
      return <div key={m} style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <h3 style={{margin:"0 0 14px",fontSize:16,color:"#e0e0e8",fontWeight:600}}>{mn}</h3>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {evs.map((e,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:"#0d0d1a",borderRadius:8}}>
            <div style={{minWidth:56,textAlign:"center",padding:"4px 0",background:e.type==="due"?`${e.course.color}22`:e.type==="pd"?"#ff6b8a22":"#88888822",borderRadius:6}}>
              <div style={{fontSize:16,fontWeight:700,color:e.type==="due"?e.course.color:e.type==="pd"?"#ff6b8a":"#888"}}>{fmtDate(e.date).split(" ").slice(0,2).join(" ")}</div>
              <div style={{fontSize:10,color:"#888"}}>{new Date(e.date+"T00:00:00").toLocaleDateString("en-AU",{weekday:"short"})}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,color:"#e0e0e8",fontWeight:500}}>{e.name}</div>
              <div style={{fontSize:12,color:"#777",display:"flex",gap:8}}><span style={{color:e.course.color}}>{e.course.code}</span>{e.weight&&<span>{e.weight}%</span>}<span>{e.type==="pd"?"Personal deadline":e.type==="task"?"Task":`Due${e.time?` at ${e.time}`:""}`}</span></div>
            </div>
          </div>)}
        </div>
      </div>;})}
    </div>;
  };

  // ─── NOTES ─────────────────────────────────────────────
  const renderNotes=()=>{
    const keys=[...new Set([...Object.keys(notes),"general"])];
    return <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h2 style={{margin:0,fontSize:20,color:"#e0e0e8",fontWeight:700,display:"flex",alignItems:"center",gap:8}}><Note/> All Notes</h2>
        <button onClick={()=>{setShN(!shN);setNnC("");}} style={{background:"#7C83FF22",border:"1px solid #7C83FF44",borderRadius:8,padding:"6px 14px",color:"#7C83FF",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600}}><Plus/> New Note</button>
      </div>
      {shN&&tab==="notes"&&<div style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <textarea value={nnT} onChange={e=>setNnT(e.target.value)} placeholder="Write your note..." style={{width:"100%",...I,minHeight:80,resize:"vertical",boxSizing:"border-box"}}/>
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <select value={nnC} onChange={e=>setNnC(e.target.value)} style={{...I,flex:1}}><option value="">General</option>{C.map(c=><option key={c.code} value={c.code}>{c.code} – {c.title}</option>)}</select>
          <button onClick={addN} style={{background:"#7C83FF",border:"none",borderRadius:8,padding:"8px 18px",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:600}}>Save</button>
        </div>
      </div>}
      {keys.map(k=>{const ns=notes[k]||[];if(!ns.length)return null;const co=C.find(x=>x.code===k);const col=co?.color||"#7C83FF";
      return <div key={k} style={{background:"#12122a",borderRadius:14,padding:20,border:"1px solid #222244"}}>
        <h3 style={{margin:"0 0 12px",fontSize:15,color:col,fontWeight:600}}>{co?`${co.code} – ${co.title}`:"General Notes"}</h3>
        {ns.map(n=><div key={n.id} style={{background:"#0d0d1a",borderRadius:8,padding:12,marginBottom:8,borderLeft:`3px solid ${col}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div style={{fontSize:13,color:"#ccc",lineHeight:1.5,whiteSpace:"pre-wrap",flex:1}}>{n.text}</div><button onClick={()=>delN(k,n.id)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",padding:4}}><Trash/></button></div>
          <div style={{fontSize:11,color:"#666",marginTop:6}}>{fmtDate(n.date)}</div>
        </div>)}
      </div>;})}
      {Object.values(notes).every(a=>!a||!a.length)&&<div style={{background:"#12122a",borderRadius:14,padding:40,border:"1px solid #222244",textAlign:"center",color:"#555"}}>No notes yet.</div>}
    </div>;
  };

  // ─── LAYOUT ────────────────────────────────────────────
  const tabs=[{id:"dash",label:"Dashboard"},{id:"cal",label:"Calendar"},{id:"notes",label:"Notes"},{id:"course",label:ac?C.find(x=>x.code===ac)?.code||"Course":"Course"}];
  return <div style={{background:appBg,minHeight:"100vh",transition:"background 0.2s ease"}}>
    <div style={{fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",color:"#e0e0e8",maxWidth:900,margin:"0 auto",padding:"0 16px 40px"}}>
      <div style={{padding:"24px 0 8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div>
            <h1 style={{margin:0,fontSize:24,fontWeight:800,letterSpacing:-0.5,background:"linear-gradient(135deg,#7C83FF,#E07A5F)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Griffith Study Planner</h1>
            <p style={{margin:"4px 0 0",fontSize:13,color:"#666"}}>Master of Public Policy & Leadership</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"#12122a",border:"1px solid #222244",padding:"8px 10px",borderRadius:10}}>
            <span style={{fontSize:12,color:"#9aa0c3",fontWeight:600}}>Background</span>
            <input type="color" value={appBg} onChange={e=>setAppBg(e.target.value)} aria-label="Select app background color" style={{width:28,height:28,padding:0,border:"1px solid #333355",borderRadius:6,background:"transparent",cursor:"pointer"}}/>
            <button onClick={resetBg} style={{background:"#33335522",border:"1px solid #444",borderRadius:6,padding:"5px 10px",color:"#aaa",cursor:"pointer",fontSize:12}}>Reset</button>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:20,background:"#12122a",borderRadius:12,padding:4,overflowX:"auto"}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap",transition:"all 0.2s",background:tab===t.id?"#7C83FF":"transparent",color:tab===t.id?"#fff":"#888"}}>{t.label}</button>)}
      </div>
      {tab==="course"&&<div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {C.map(c=><button key={c.code} onClick={()=>setAc(c.code)} style={{padding:"8px 14px",borderRadius:8,border:`1px solid ${ac===c.code?c.color:"#222244"}`,cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",transition:"all 0.2s",background:ac===c.code?`${c.color}22`:"#12122a",color:ac===c.code?c.color:"#888"}}>{c.code}</button>)}
      </div>}
      {tab==="dash"&&renderDash()}
      {tab==="cal"&&renderCal()}
      {tab==="notes"&&renderNotes()}
      {tab==="course"&&renderCourse()}
    </div>
  </div>;
}

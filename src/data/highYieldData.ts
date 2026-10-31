import { PlantMonograph, HormoneSummary } from '../types';

export const PLANT_MONOGRAPHS: PlantMonograph[] = [
  {
    name: 'Digitalis (Foxglove)',
    botanicalSource: 'Digitalis purpurea / Digitalis lanata',
    family: 'Plantaginaceae (formerly Scrophulariaceae)',
    partUsed: 'Dried leaves (folia)',
    activeConstituents: 'Cardiac glycosides (cardenolides): Digitoxin, Digoxin, Gitoxin (Aglycone: Digitoxigenin)',
    mechanismOrAction: 'Inhibits myocardial Na⁺/K⁺-ATPase → increases intracellular Na⁺ → increases intracellular Ca²⁺ via Na⁺/Ca²⁺ exchanger',
    clinicalUse: 'Positive inotropic effect in congestive heart failure (CHF) and atrial fibrillation',
  },
  {
    name: 'Cinchona',
    botanicalSource: 'Cinchona succirubra / C. ledgeriana / C. calisaya',
    family: 'Rubiaceae',
    partUsed: 'Dried stem and root bark',
    activeConstituents: 'Quinoline alkaloids: Quinine, Quinidine, Cinchonine, Cinchonidine',
    mechanismOrAction: 'Inhibits hemozoin biocrystallization in intraerythrocytic Plasmodium, causing toxic free heme accumulation; Quinidine blocks cardiac Na⁺ channels (Class IA)',
    clinicalUse: 'Antimalarial (severe falciparum malaria); Quinidine used for cardiac arrhythmias',
  },
  {
    name: 'Senna',
    botanicalSource: 'Senna alexandrina (Cassia senna / Cassia angustifolia)',
    family: 'Fabaceae (Leguminosae)',
    partUsed: 'Dried leaflets and dried pods',
    activeConstituents: 'Dianthrone glycosides: Sennosides A, B, C, and D',
    mechanismOrAction: 'Colonic bacterial beta-glucosidases cleave sennosides into active rhein-9-anthrone → stimulates myenteric plexus and induces water/electrolyte secretion into lumen',
    clinicalUse: 'Stimulant purgative / laxative for acute constipation and diagnostic bowel evacuation',
  },
  {
    name: 'Belladonna (Deadly Nightshade)',
    botanicalSource: 'Atropa belladonna',
    family: 'Solanaceae',
    partUsed: 'Dried leaves and flowering/fruiting tops',
    activeConstituents: 'Tropane alkaloids: (-)-Hyoscyamine, Atropine (dl-hyoscyamine), Scopolamine (hyoscine)',
    mechanismOrAction: 'Competitive antagonist at muscarinic acetylcholine receptors (M1–M5), blocking parasympathetic neuro-effector sites',
    clinicalUse: 'Mydriatic/cycloplegic, antispasmodic in GI/urinary colic, premedication to reduce secretions, antidote for organophosphate poisoning',
  },
  {
    name: 'Opium Poppy',
    botanicalSource: 'Papaver somniferum',
    family: 'Papaveraceae',
    partUsed: 'Air-dried milky latex obtained by incising unripe capsules',
    activeConstituents: 'Morphinan/isoquinoline alkaloids: Morphine (10-15%), Codeine, Papaverine, Noscapine, Thebaine',
    mechanismOrAction: 'Potent agonist at central and spinal mu-opioid (MOR) receptors → inhibits adenylate cyclase, reduces Ca²⁺ influx and opens K⁺ channels, blocking pain neurotransmission',
    clinicalUse: 'Severe acute and chronic pain relief; Codeine for dry cough suppression; Papaverine as smooth muscle antispasmodic',
  },
  {
    name: 'Ipecacuanha',
    botanicalSource: 'Carapichea ipecacuanha (Cephaelis ipecacuanha)',
    family: 'Rubiaceae',
    partUsed: 'Dried rhizome and roots',
    activeConstituents: 'Isoquinoline alkaloids: Emetine and Cephaeline',
    mechanismOrAction: 'Direct local irritation of gastric mucosal sensory vagal receptors + central chemoreceptor trigger zone (CTZ) stimulation; Amebicidal against Entamoeba histolytica',
    clinicalUse: 'Emetic (Syrup of Ipecac for specific poisonings), expectorant in low doses, amoebicidal agent for amoebic dysentery',
  },
  {
    name: 'Rauwolfia (Indian Snakeroot)',
    botanicalSource: 'Rauvolfia serpentina',
    family: 'Apocynaceae',
    partUsed: 'Dried roots and rhizomes',
    activeConstituents: 'Indole alkaloids: Reserpine, Ajmaline, Ajmalicine, Deserpidine',
    mechanismOrAction: 'Reserpine irreversibly inhibits vesicular monoamine transporter 2 (VMAT-2) → depletes neuronal norepinephrine, dopamine, and serotonin in adrenergic nerve terminals',
    clinicalUse: 'Antihypertensive and psychiatric tranquilizer/sedative; Ajmaline as class IA antiarrhythmic',
  },
  {
    name: 'Aloe',
    botanicalSource: 'Aloe vera (Aloe barbadensis) / Aloe ferox',
    family: 'Asphodelaceae (formerly Liliaceae)',
    partUsed: 'Bitter dried latex of leaf bundle pericyclic tubules (Aloe drug); inner gel parenchyma (Aloe vera gel)',
    activeConstituents: 'C-glucosyl anthrones: Aloin A and B (barbaloin); Polysaccharides (Acemannan in inner gel)',
    mechanismOrAction: 'Aloin metabolized by colonic bacteria into aloe-emodin-9-anthrone, increasing mucosal chloride and water excretion and stimulating motility; Gel stimulates fibroblast wound healing',
    clinicalUse: 'Latex used as drastic stimulant purgative; Gel used topically for minor burns, wounds, and dermatological hydration',
  },
  {
    name: 'Turmeric',
    botanicalSource: 'Curcuma longa',
    family: 'Zingiberaceae',
    partUsed: 'Dried primary and secondary rhizomes',
    activeConstituents: 'Curcuminoids (Curcumin, demethoxycurcumin, bisdemethoxycurcumin) + Volatile oil (turmerone, zingiberene)',
    mechanismOrAction: 'Downregulates transcription factor NF-kB, suppresses cyclooxygenase-2 (COX-2) and 5-LOX, and scavenges reactive oxygen species (ROS)',
    clinicalUse: 'Anti-inflammatory, antioxidant, hepatoprotective, and digestive aid',
  },
  {
    name: 'Vinca (Madagascar Periwinkle)',
    botanicalSource: 'Catharanthus roseus (Vinca rosea)',
    family: 'Apocynaceae',
    partUsed: 'Dried whole plant / leaves',
    activeConstituents: 'Dimeric indole-indoline alkaloids: Vincristine (leurocristine) and Vinblastine (vincaleukoblastine)',
    mechanismOrAction: 'Binds specifically to beta-tubulin, preventing microtubule assembly and causing spindle arrest in metaphase of cellular mitosis',
    clinicalUse: 'Antineoplastic chemotherapy for acute lymphoblastic leukemia (ALL), Hodgkin disease, and non-Hodgkin lymphomas',
  },
  {
    name: 'Ephedra (Ma Huang)',
    botanicalSource: 'Ephedra sinica / Ephedra equisetina',
    family: 'Ephedraceae (Gymnosperm)',
    partUsed: 'Dried young herbaceous stems / whole herb',
    activeConstituents: 'Phenylalkylamine alkaloids: (-)-Ephedrine and Pseudoephedrine',
    mechanismOrAction: 'Mixed sympathomimetic: stimulates alpha- and beta-adrenergic receptors directly and causes release of endogenous norepinephrine from neuronal stores',
    clinicalUse: 'Bronchodilator in asthma, nasal decongestant, CNS stimulant, and vasopressor in hypotensive states',
  },
  {
    name: 'Clove',
    botanicalSource: 'Syzygium aromaticum (Eugenia caryophyllus)',
    family: 'Myrtaceae',
    partUsed: 'Dried unopened flower buds',
    activeConstituents: 'Volatile oil (15-20%) containing 70–90% Eugenol, plus eugenyl acetate and beta-caryophyllene',
    mechanismOrAction: 'Eugenol blocks voltage-gated sodium channels (local anesthetic effect) and suppresses bacterial enzyme pathways',
    clinicalUse: 'Topical dental analgesic for toothache, antiseptic, carminative, and pharmaceutical flavoring',
  },
];

export const PHYTOHORMONES_SUMMARY: HormoneSummary[] = [
  {
    name: 'Auxins',
    category: 'Growth Promoter',
    naturalForm: 'IAA (Indole-3-acetic acid)',
    syntheticExample: 'NAA (1-Naphthaleneacetic acid), 2,4-D, IBA',
    primaryFunctions: 'Cell elongation via wall loosening (acid growth), apical dominance maintenance, adventitious root initiation in stem cuttings, vascular differentiation',
    keyStressOrRipeningEffect: 'Synthetic auxins at high concentrations (e.g. 2,4-D) act as selective broadleaf herbicides; prevents premature fruit/leaf drop',
  },
  {
    name: 'Gibberellins (GA)',
    category: 'Growth Promoter',
    naturalForm: 'GA1, GA3 (Gibberellic acid)',
    syntheticExample: 'Commercial GA3 formulation',
    primaryFunctions: 'Internode elongation, bolting in rosette plants, breaks seed and winter bud dormancy, stimulates alpha-amylase synthesis in cereal aleurone during seed germination',
    keyStressOrRipeningEffect: 'Used commercially in malting/brewing industry to expedite barley conversion; increases size of seedless table grapes',
  },
  {
    name: 'Cytokinins',
    category: 'Growth Promoter',
    naturalForm: 'Zeatin, Kinetin (first isolated from DNA)',
    syntheticExample: 'BAP (6-Benzylaminopurine)',
    primaryFunctions: 'Promotes cytokinesis (cell division), overcomes apical dominance (induces axillary bud outgrowth), synthesized primarily in actively growing roots and transported upward in xylem',
    keyStressOrRipeningEffect: 'Delays leaf senescence (Richmond-Lang effect) by preserving chlorophyll and cellular protein degradation; essential for shoot organogenesis in tissue culture',
  },
  {
    name: 'Abscisic Acid (ABA)',
    category: 'Growth Inhibitor / Stress Regulator',
    naturalForm: 'ABA (Abscisic acid)',
    syntheticExample: 'Synthetic racemic ABA',
    primaryFunctions: 'The universal "Stress Hormone": closes stomatal guard cells under drought/water stress to limit transpiration, enforces and maintains seed dormancy, prevents precocious sprouting',
    keyStressOrRipeningEffect: 'Antagonistic to Gibberellins (ABA maintains dormancy while GA breaks dormancy); accumulates rapidly upon cellular dehydration, osmotic shock, or chilling',
  },
  {
    name: 'Ethylene',
    category: 'Growth Regulator / Ripening Gas',
    naturalForm: 'Ethylene gas (C₂H₄)',
    syntheticExample: 'Ethephon (releases ethylene in aqueous tissues)',
    primaryFunctions: 'The only gaseous phytohormone: promotes fruit ripening (climacteric respiratory burst), promotes leaf, flower, and fruit abscission, accelerates floral and foliar senescence',
    keyStressOrRipeningEffect: 'Induces the "triple response" in dark-grown seedlings (inhibition of elongation, radial hypocotyl swelling, horizontal growth); widely used to artificially ripen bananas and citrus',
  },
];

export const GUMS_VS_MUCILAGES = [
  {
    property: 'Nature of origin',
    gum: 'Pathological product (formed after mechanical injury or unfavourable conditions via gummosis)',
    mucilage: 'Physiological product (normal product of standard healthy plant growth and metabolism)',
  },
  {
    property: 'Site of formation',
    gum: 'Formed through breakdown of plant cell walls; exudates produced outside the cells',
    mucilage: 'Formed inside plant cells in specialized storage or mucilage cells',
  },
  {
    property: 'Water interaction',
    gum: 'Dissolves in water to form adhesive, viscous colloidal solutions or swells (tragacanth)',
    mucilage: 'Absorbs water and swells to form a slippery, slimy solution',
  },
  {
    property: 'Primary representative examples',
    gum: 'Gum Acacia (Acacia senegal), Tragacanth (Astragalus gummifer), Guar gum',
    mucilage: 'Agar (Gelidium / Gracilaria), Ispaghula / Psyllium seeds (Plantago ovata), Linseed',
  },
  {
    property: 'Pharmaceutical use',
    gum: 'Suspending agents, tablet binders, emulsifying agents, thickeners',
    mucilage: 'Demulcents, soothing throat agents, bulk-forming mechanical laxatives',
  },
];

export const ORGANIZED_VS_UNORGANIZED = [
  {
    property: 'Definition',
    organized: 'Derived from anatomical cellular organs of plants or animals',
    unorganized: 'Derived from non-cellular exudates, secretions, juices, or extracts',
  },
  {
    property: 'Microscopic cellular structure',
    organized: 'Present; diagnostic cellular histology (trichomes, stomata, vessels, fibers)',
    unorganized: 'Absent; no distinct cellular architecture or tissue organization',
  },
  {
    property: 'Typical identification methods',
    organized: 'Macroscopic morphology and histological powder microscopy',
    unorganized: 'Physical constants (melting, solubility, optical rotation) and chemical tests',
  },
  {
    property: 'Plant parts / Form examples',
    organized: 'Leaves (Senna, Digitalis), Barks (Cinchona, Cinnamon), Roots (Rauwolfia), Flowers (Clove)',
    unorganized: 'Gums (Acacia), Resins (Colophony), Dried latex (Opium), Dried juices (Aloe)',
  },
];

export const ADULTERATION_TYPES = [
  {
    type: 'Inferiority',
    definition: 'Any substandard condition where a drug fails to meet statutory pharmacopoeial standards, or the practice of blending a substandard batch with genuine drug.',
    cause: 'Natural variation, poor harvesting technique, or deliberate commercial dilution.',
  },
  {
    type: 'Spoilage',
    definition: 'Destruction of the quality and appearance of a crude drug specifically caused by the attack of microorganisms (fungi, bacteria) or insects.',
    cause: 'High moisture during storage, warm ambient temperatures, improper storage packaging.',
  },
  {
    type: 'Deterioration',
    definition: 'Progressive impairment in quality or loss of active medicinal constituents due to physical, biochemical, or environmental aging.',
    cause: 'Exposure to light, oxidation, temperature fluctuations, or prolonged storage leading to enzymatic breakdown.',
  },
  {
    type: 'Admixture',
    definition: 'Unintentional addition of one article or foreign plant part to another article.',
    cause: 'Carelessness, ignorance, accidental contamination during wild collection or harvesting.',
  },
];

export const ARABIC_EXAM_TIPS = [
  {
    title: 'تعريف وتاريخ علم العقاقير (Pharmacognosy)',
    tip: 'Pharmakon = Drug (دواء)، Gnosis = Knowledge (معرفة). المصطلح وضعه العالم الألماني C.A. Seydler عام 1815 في رسالته (Analecta Pharmacognostica). أبو الطب هو Hippocrates، وأبو النبات Theophrastus، وكتاب De Materia Medica مؤلفه Dioscorides (وصف أكثر من 600 نبات)، وطرق الاستخلاص وضعها Galen (Galenicals).',
  },
  {
    title: 'الفرق بين Organized و Unorganized Drugs',
    tip: 'Organized = أجزاء نباتية خلوية حقيقية (مثل الأوراق، اللحاء، الجذور، البذور)، تُفحص بالـ Microscopy والمورفولوجي. أما Unorganized = إفرازات وعصارات لا خلوية (مثل الصموغ، الراتنجات، اللاتكس، عصارة الصبار)، وتُفحص بالاختبارات الكيميائية والفيزيائية.',
  },
  {
    title: 'الفرق بين الصمغ (Gum) واللعاب النباتي (Mucilage)',
    tip: 'الصمغ (Gum) ناتج مرضي غير طبيعي (Pathological) يتكون بعد جرح الشجرة (Gummosis) خارج الخلايا ويكون لاصقاً (مثل Acacia). اللعاب (Mucilage) ناتج فسيولوجي طبيعي (Physiological) يتكون داخل الخلايا الطبيعية ويعطي محلولاً زلقاً غروياً (Slimy) مع الماء (مثل Agar و Ispaghula).',
  },
  {
    title: 'هرمونات النمو النباتية (Phytohormones)',
    tip: 'الهرمون الطبيعي للأوكسين هو IAA والصناعي NAA. الجبريلين (GA) مسؤول عن استطالة الساق (Stem elongation) وكسر السكون وصناعة الشعير في التخمير (Malting). السيتوكينين مسؤول عن الانقسام الخلوي (Cell division) وتأخير الشيخوخة. هرمون الإجهاد هو ABA ويغلق الثغور في الجفاف ويحافظ على السكون. هرمون الإنضاج الغازي الوحيد هو Ethylene.',
  },
  {
    title: 'حالات الغش الدوائي الأربعة (Adulteration)',
    tip: 'Inferiority: مادة دون المواصفات تم خلطها بالدواء. Spoilage: تلف ناتج خصيصاً عن هجوم الكائنات الحية الدقيقة كالبكتيريا والفطريات. Deterioration: تدهور وفقدان المادة الفعالة مع الوقت والحرارة والأكسدة. Admixture: خلط غير مقصود ناتج عن الإهمال أو الجهل أثناء الجمع.',
  },
  {
    title: 'أهم النباتات والمواد الفعالة وآلية التأثير الدوائي (Monographs & MOA)',
    tip: 'ديجيتاليس: أوراق Digitalis purpurea (عائلة Plantaginaceae)، المادة الفعالة Digitoxin/Digoxin وتثبط مضخة Na+/K+-ATPase. السنا: أوراق وقرون Senna alexandrina (عائلة Fabaceae)، بكتيريا القولون تحول الـ Sennosides إلى rhein-9-anthrone ملين منبه. حشيشة الست (Belladonna): عائلة Solanaceae، تحتوي على Atropine وهو مضاد لمستقبلات المسكارين. الأفيون: Papaver somniferum، لاتكس الكبسولات غير الناضجة، المورفين مسكن عبر مستقبلات الأفيون Mu. الفينكا (Catharanthus roseus): مضاد سرطان عبر تثبيط التيوبيولين (Tubulin) ومنع الانقسام الميتوزي.',
  },
];

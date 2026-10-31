import { Question, ModuleInfo } from '../types';
import { module1Questions } from './modules/module1';
import { module2Questions } from './modules/module2';
import { module3Questions } from './modules/module3';
import { module4Questions } from './modules/module4';
import { module5Questions } from './modules/module5';
import { module6Questions } from './modules/module6';
import { module7Questions } from './modules/module7';
import { module8Questions } from './modules/module8';
import { module9Questions } from './modules/module9';
import { module10Questions } from './modules/module10';

export const ALL_MODULES: ModuleInfo[] = [
  {
    id: 'mod1',
    title: 'Definitions, Crude Drugs, History & Scientists',
    shortCode: 'Lec 1A',
    description: 'Etymology of Pharmakon & Gnosis, Crude drug origin, Ancient medical traditions, Landmark scientists (Hippocrates, Theophrastus, Dioscorides, Galen, Seydler), and modern analytical methods.',
    questionCount: module1Questions.length,
    badge: '50 Qs',
    arabicTip: 'ركّز خصوصاً على تعريف Pharmacognosy، أنواع الـ crude drugs، الجزء النباتي لكل مثال، أسماء العلماء وتواريخهم (Seydler 1815)، وطرق التحليل الحديثة.',
  },
  {
    id: 'mod2',
    title: 'Sources, Marine & Animal Drugs, Tissue Culture & Aids',
    shortCode: 'Sources',
    description: 'Plant drug examples, Animal & Marine leads (Insulin, Cod liver oil, Cytarabine, Vidarabine), Plant Tissue Culture (Totipotency, Plasticity), Nanomedicine, and Plant Excipients (Acacia, Tragacanth, Guar gum, Agar).',
    questionCount: module2Questions.length,
    badge: '45 Qs',
    arabicTip: 'ركّز على الأدوية البحرية والحيوانية، ومصطلحات Totipotency و Plasticity، والفرق بين المستحلبات والمواد الرابطة الصيدلانية المستخرجة من النباتات.',
  },
  {
    id: 'mod3',
    title: 'Lecture 1: Phytopharmaceutical Products & Quality Journey',
    shortCode: 'Lec 1B',
    description: '7-stage plant-to-product journey (Selection → Collection → Authentication → Extraction → Evaluation → Formulation → Commercialization), 6 Product Requirements, Selection strategies, and Authentication testing.',
    questionCount: module3Questions.length,
    badge: '40 Qs',
    arabicTip: 'ركّز على ترتيب مراحل تحويل النبات إلى منتج، وطرق اختيار النبات (Ethno-guided, Chemotaxonomy)، ومتطلبات جمعه وتوثيق بياناته، وطرق الـ Authentication الستة.',
  },
  {
    id: 'mod4',
    title: 'Pharmacognosy 4: Biological & Geographical Sources',
    shortCode: 'Pharma 4',
    description: 'Traditional medicine leads, Spermatophyta (Angiosperms vs Gymnosperms), Fungi & Algae, Microbial biotechnology (Artemisinin precursor), Geographical altitude variations, and CITES international trade restrictions.',
    questionCount: module4Questions.length,
    badge: '38 Qs',
    arabicTip: 'ركّز خصوصاً على ثنائيات (الدواء - النبات)، والمصادر الحيوية والمنتجات الصيدلانية منها، وتعريف المصدر الجغرافي، وتأثير العوامل البيئية والقانونية (CITES).',
  },
  {
    id: 'mod5',
    title: 'Pharmacognosy 5: Formulation, HVAC, cGMP & Quality Control',
    shortCode: 'Pharma 5',
    description: 'APIs vs Excipients, Milling & Particle size, Polymorphs & Dissolution, Granulation & Compression, Tablet Coating functions, HVAC cleanroom airflow & Sterility, cGMP documentation, and Batch vs Continuous manufacturing.',
    questionCount: module5Questions.length,
    badge: '40 Qs',
    arabicTip: 'ركّز على الفرق بين APIs و Excipients، ووظائف الـ Tablet Coating، وطرق الـ Sterilization، واختبارات الـ QC، والفرق بين Batch و Continuous Manufacturing.',
  },
  {
    id: 'mod6',
    title: 'Plant Growth Regulators (Phytohormones Master)',
    shortCode: 'Hormones',
    description: 'Auxins (IAA, NAA, apical dominance, herbicides), Gibberellins (GA3, stem elongation, breaking dormancy, malting), Cytokinins (cell division, roots, delay senescence), ABA (stress hormone, stomatal closure), and Ethylene (gaseous ripening gas).',
    questionCount: module6Questions.length,
    badge: '40 Qs',
    arabicTip: 'ركّز على الجدول المقارن للهرمونات الخمسة: الوظيفة الحيوية الأساسية، الهرمون الطبيعي والصناعي، هرمون الإجهاد (ABA)، وهرمون الإنضاج الغازي (Ethylene).',
  },
  {
    id: 'mod7',
    title: 'Pharmacognosy 7: Drug Adulteration, Evaluation & Contamination',
    shortCode: 'Pharma 7',
    description: '4 Adulteration states (Inferiority, Spoilage, Deterioration, Admixture), 6 Evaluation disciplines, Chemical constants (Acid/Iodine/Ester values for oils), Microchemical slide tests, AAS heavy metals (Pb, Hg, As), and Microbial limits (Salmonella, E. coli).',
    questionCount: module7Questions.length,
    badge: '45 Qs',
    arabicTip: 'ركّز على تعريفات حالات الغش الأربعة (Inferiority, Spoilage, Deterioration, Admixture) واختبارات الثوابت الكيميائية للزيوت، وجهاز AAS لقياس المعادن الثقيلة.',
  },
  {
    id: 'mod8',
    title: 'Pharmacognosy 8: Anatomical Plant Parts & Marine/Animal Sources',
    shortCode: 'Pharma 8',
    description: 'Organized vs Unorganized drugs, Leaves (Senna, Digitalis, Eucalyptus), Flowers (Clove eugenol, Vinca, Hibiscus), Fruits & Seeds (Amla, Nux vomica, Castor), Roots & Stems (Ipecac, Rauwolfia, Ashwagandha, Ephedra), and Marine Cytarabine & Vidarabine.',
    questionCount: module8Questions.length,
    badge: '40 Qs',
    arabicTip: 'ركّز على أسماء النباتات، والمكوّن الفعّال، والجزء النباتي المستخدم، والاستخدام الطبي لكل نبات؛ فهي روابط متكررة جداً بالامتحان.',
  },
  {
    id: 'mod9',
    title: 'Classification of Crude Drugs: Organized vs Unorganized & Gums',
    shortCode: 'Classif.',
    description: 'Cellular organized vs acellular unorganized crude drugs, Pathological injury gums (Acacia) vs Physiological mucilages (Agar), Taxonomical hierarchy sequence, Solanaceae family examples, and Pharmacological cardiotonics.',
    questionCount: module9Questions.length,
    badge: '20 Qs',
    arabicTip: 'ركّز على الفرق الجوهري بين Organized و Unorganized، والفرق بين Gums و Mucilages، وترتيب السلم التصنيفي النباتي (Kingdom to Species).',
  },
  {
    id: 'mod10',
    title: 'Pharmacognosy 10: Botanical Monographs & Mechanisms of Action',
    shortCode: 'Pharma 10',
    description: 'Comprehensive monographs with Botanical Source, Family, Part used, Major Active Constituents, and Pharmacological Mechanism of Action for Digitalis, Cinchona, Senna, Belladonna, Opium, Ipecacuanha, Rauwolfia, Aloe, Turmeric, and Catharanthus.',
    questionCount: module10Questions.length,
    badge: '40 Qs',
    arabicTip: 'ركّز على الربط بين كل نبات واسم العائلة والجزء المستخدم والمادة الفعالة وآلية التأثير الدوائي (مثل تثبيط Na+/K+-ATPase للديجيتاليس، وتثبيط التيوبيولين للفينكا).',
  },
];

export const ALL_QUESTIONS: Question[] = [
  ...module1Questions,
  ...module2Questions,
  ...module3Questions,
  ...module4Questions,
  ...module5Questions,
  ...module6Questions,
  ...module7Questions,
  ...module8Questions,
  ...module9Questions,
  ...module10Questions,
];

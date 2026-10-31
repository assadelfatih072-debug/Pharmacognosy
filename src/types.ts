export interface Question {
  id: string;
  moduleId: string;
  moduleTitle: string;
  part: string;
  questionNumber: number;
  question: string;
  options: {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  keyPoints?: string;
  arabicNote?: string;
}

export interface ModuleInfo {
  id: string;
  title: string;
  shortCode: string;
  description: string;
  questionCount: number;
  badge: string;
  arabicTip?: string;
}

export interface PlantMonograph {
  name: string;
  botanicalSource: string;
  family: string;
  partUsed: string;
  activeConstituents: string;
  mechanismOrAction: string;
  clinicalUse: string;
}

export interface HormoneSummary {
  name: string;
  category: string;
  naturalForm: string;
  syntheticExample: string;
  primaryFunctions: string;
  keyStressOrRipeningEffect: string;
}

export interface ExamState {
  currentQuestionIndex: number;
  selectedAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestionIds: string[];
  isSubmitted: boolean;
  timeRemainingSeconds: number;
  startTime: number;
  totalTimeSeconds: number;
}

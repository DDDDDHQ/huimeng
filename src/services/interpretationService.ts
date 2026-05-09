import { DreamInterpretation, Dream, MoodTag } from '@/types';

const INTERPRETATION_TEMPLATES: Record<string, {
  interpretation: string;
  keywords: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  suggestions: string[];
}> = {
  flying: {
    interpretation: '梦见飞翔通常代表对自由的渴望，暗示你正在寻求突破现状的束缚。这可能意味着你渴望在生活中获得更多的自主权和掌控感，或者正在经历一种精神上的升华。',
    keywords: ['自由', '突破', '升华', '超越'],
    luckyNumbers: [7, 9, 3],
    luckyColors: ['天蓝色', '白色', '金色'],
    suggestions: ['保持开放的心态迎接新机遇', '勇敢追求内心真正想要的生活', '相信自己的能力']
  },
  falling: {
    interpretation: '梦见坠落通常反映了对失控的恐惧或生活中的压力。这可能暗示你感到某些事情正在从你手中溜走，或者担心自己无法达到某些期望。',
    keywords: ['焦虑', '压力', '失控', '担忧'],
    luckyNumbers: [2, 5, 8],
    luckyColors: ['绿色', '棕色', '土黄色'],
    suggestions: ['学会放下不必要的担忧', '制定切实可行的计划', '寻求他人的支持']
  },
  water: {
    interpretation: '梦见水通常与情感和潜意识相关。水面平静代表内心的平和，而波涛汹涌则可能暗示情绪波动。水的状态往往反映你当前情感生活的状态。',
    keywords: ['情感', '潜意识', '流动', '变化'],
    luckyNumbers: [1, 6, 9],
    luckyColors: ['蓝色', '绿色', '银色'],
    suggestions: ['关注自己的情感需求', '学会调节情绪', '保持内心的平静']
  },
  forest: {
    interpretation: '梦见森林通常代表内心的自然状态和潜意识的世界。茂密的森林可能暗示需要探索未知的自己，而穿越森林则可能象征着人生的旅程和成长。',
    keywords: ['成长', '探索', '自然', '内心'],
    luckyNumbers: [3, 6, 8],
    luckyColors: ['深绿色', '棕色', '大地色'],
    suggestions: ['多接触自然放松身心', '勇于探索新的可能性', '倾听内心的声音']
  },
  city: {
    interpretation: '梦见城市通常与社交生活和社会角色相关。繁华的城市可能暗示对社会认可的渴望，而陌生的城市则可能表示面临新的挑战或转变。',
    keywords: ['社交', '成就', '转变', '挑战'],
    luckyNumbers: [4, 6, 8],
    luckyColors: ['灰色', '银色', '霓虹色'],
    suggestions: ['拓展社交圈子', '积极参与社会活动', '勇于接受新挑战']
  },
  space: {
    interpretation: '梦见太空或宇宙通常代表对未知的探索和宏大的思考。这可能暗示你正在思考人生的意义，或者渴望突破现有的思维框架。',
    keywords: ['探索', '无限', '思考', '超越'],
    luckyNumbers: [0, 1, 9],
    luckyColors: ['深蓝色', '紫色', '黑色'],
    suggestions: ['保持好奇心和探索精神', '思考人生的深层意义', '突破思维局限']
  },
  beach: {
    interpretation: '梦见海滩通常代表两种力量的交汇——陆地和海洋的分界线。这可能暗示你正处于人生的一个转折点，正在平衡不同的生活面向。',
    keywords: ['平衡', '过渡', '放松', '新生'],
    luckyNumbers: [2, 5, 7],
    luckyColors: ['海蓝色', '白色', '沙滩色'],
    suggestions: ['给自己一些放松的时间', '寻求生活的平衡', '拥抱新的开始']
  },
  mountain: {
    interpretation: '梦见山脉通常象征着挑战和成就。登山代表克服困难达到目标，而站在山顶则暗示你正在或即将获得成功和更高的视野。',
    keywords: ['挑战', '成就', '高度', '坚持'],
    luckyNumbers: [1, 4, 8],
    luckyColors: ['棕色', '灰色', '白色'],
    suggestions: ['设定明确的目标并坚持努力', '相信自己的能力', '适时休息保持体力']
  },
  lost: {
    interpretation: '梦见迷路通常反映了对生活方向的困惑。这可能暗示你正在面临重大决定，或者感到不确定自己的道路是否正确。',
    keywords: ['困惑', '迷茫', '寻找', '方向'],
    luckyNumbers: [3, 5, 9],
    luckyColors: ['暖色系', '黄色', '橙色'],
    suggestions: ['花时间思考真正想要什么', '寻求可信赖的人的建议', '相信直觉']
  },
  chase: {
    interpretation: '梦见追逐通常与逃避或追求相关。你可能在追逐某个目标，也可能在逃避某些不愿面对的事情。这反映了内心的渴望或恐惧。',
    keywords: ['追求', '逃避', '目标', '动力'],
    luckyNumbers: [1, 4, 7],
    luckyColors: ['红色', '橙色', '金色'],
    suggestions: ['明确自己真正想要的', '勇敢面对逃避的问题', '将大目标分解为小步骤']
  }
};

const MOOD_INTERPRETATIONS: Record<MoodTag, { meaning: string; suggestion: string }> = {
  happy: {
    meaning: '愉快的梦境表明你内心满足，对生活持积极态度',
    suggestion: '继续保持这种积极的心态'
  },
  scared: {
    meaning: '恐惧的梦境反映了你内心深处的担忧或未解决的问题',
    suggestion: '正视恐惧，找出其根源'
  },
  confused: {
    meaning: '困惑的梦境暗示你正在经历认知上的冲突或重大决定',
    suggestion: '给自己一些时间和空间来思考'
  },
  sad: {
    meaning: '悲伤的梦境可能是情感处理的象征，帮助你释放负面情绪',
    suggestion: '允许自己感受情绪，必要时寻求支持'
  },
  excited: {
    meaning: '兴奋的梦境表明你对生活充满热情，有强烈的期待',
    suggestion: '将这份热情转化为实际行动'
  },
  peaceful: {
    meaning: '平静的梦境反映了你内心的和谐与安宁',
    suggestion: '珍惜这份内心的平静'
  },
  anxious: {
    meaning: '焦虑的梦境通常与压力和不确定性相关',
    suggestion: '找到压力的来源并尝试解决'
  },
  lonely: {
    meaning: '孤独的梦境可能暗示你需要更多的社交联系或情感支持',
    suggestion: '主动与他人建立联系'
  }
};

export const dreamService = {
  generateInterpretation(dream: Dream): DreamInterpretation {
    const interpretations: string[] = [];
    const allKeywords: string[] = [];
    const luckyNumbers = new Set<number>();
    const luckyColors = new Set<string>();
    const suggestions: string[] = [];

    if (dream.dreamTypeTags.length > 0) {
      dream.dreamTypeTags.forEach((tag) => {
        const template = INTERPRETATION_TEMPLATES[tag];
        if (template) {
          interpretations.push(template.interpretation);
          allKeywords.push(...template.keywords);
          template.luckyNumbers.forEach((n) => luckyNumbers.add(n));
          template.luckyColors.forEach((c) => luckyColors.add(c));
          suggestions.push(...template.suggestions);
        }
      });
    }

    if (dream.moodTags.length > 0) {
      dream.moodTags.forEach((mood) => {
        const moodInterpretation = MOOD_INTERPRETATIONS[mood];
        if (moodInterpretation) {
          allKeywords.push(mood);
          suggestions.push(moodInterpretation.suggestion);
        }
      });
    }

    const combinedInterpretation = interpretations.length > 0
      ? interpretations.join('\n\n')
      : '这是一段独特的梦境体验，梦中出现的情境和感受都是你潜意识的表现。建议你用心感受这段梦境的细节，它们可能蕴含着重要的信息。';

    const uniqueNumbers = Array.from(luckyNumbers).slice(0, 3);
    if (uniqueNumbers.length === 0) {
      uniqueNumbers.push(3, 7, 9);
    }

    const uniqueColors = Array.from(luckyColors).slice(0, 3);
    if (uniqueColors.length === 0) {
      uniqueColors.push('黑色', '白色', '金色');
    }

    const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 4);

    return {
      id: `interpretation_${Date.now()}`,
      dreamId: dream.id,
      interpretation: combinedInterpretation,
      keywords: Array.from(new Set(allKeywords)).slice(0, 5),
      luckyNumbers: uniqueNumbers,
      luckyColors: uniqueColors,
      suggestions: uniqueSuggestions,
      createdAt: new Date().toISOString()
    };
  },

  getInterpretationForKeyword(keyword: string): {
    meaning: string;
    category: string;
  } | null {
    const lowerKeyword = keyword.toLowerCase();
    
    const keywordMappings: Record<string, { meaning: string; category: string }> = {
      '飞翔': { meaning: '象征自由与超越', category: '积极' },
      '坠落': { meaning: '反映失控或焦虑', category: '警示' },
      '水': { meaning: '代表情感与潜意识', category: '情感' },
      '火': { meaning: '象征热情或愤怒', category: '情感' },
      '死亡': { meaning: '代表转变与重生', category: '转变' },
      '蛇': { meaning: '象征潜意识或转变', category: '神秘' },
      '动物': { meaning: '代表本能与直觉', category: '本能' },
      '房子': { meaning: '象征自我或内心', category: '自我' },
      '车': { meaning: '代表人生方向', category: '方向' },
      '镜子': { meaning: '象征自我反省', category: '反思' }
    };

    for (const [key, value] of Object.entries(keywordMappings)) {
      if (lowerKeyword.includes(key)) {
        return value;
      }
    }

    return null;
  }
};

export default dreamService;

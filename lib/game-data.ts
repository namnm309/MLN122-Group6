export type RoleId = "state" | "business" | "worker" | "citizen";

export type StrategicAxis =
  | "growth"
  | "equity"
  | "stability"
  | "control"
  | "pragmatism"
  | "extremity";

export interface Role {
  id: RoleId;
  label: string;
  description: string;
  goal: string;
  represents: string;
  priorities: string;
  biggestFear: string;
  playStyle: string;
  slogan: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  icon: string;
}

export const GAME_INTRO = {
  title: "Ban Điều Phối Lợi Ích Quốc Gia",
  hook: "Đây không phải bài quiz lý thuyết. Đây là bàn đàm phán trong một nền kinh tế thật.",
  shortIntro:
    "Bạn và những người chơi khác sẽ nhập vai 4 chủ thể trong nền kinh tế: Nhà nước, Doanh nghiệp, Người lao động, Người dân. Mỗi quyết định đều tạo ra bên được lợi, bên chịu thiệt và bên phải đứng ra điều tiết.",
  learningGoal:
    "Sau 5 tình huống, bạn sẽ thấy rõ vì sao xung đột lợi ích là bình thường, vì sao thể chế phải liên tục hoàn thiện và vì sao không có lựa chọn nào làm mọi phía hài lòng tuyệt đối.",
};

export const ROLES: Role[] = [
  {
    id: "state",
    label: "Nhà nước",
    description: "Bạn điều phối luật chơi và cân bằng lợi ích toàn hệ thống.",
    goal: "Giữ tăng trưởng, giữ ổn định và bảo vệ công bằng trong cùng một bài toán.",
    represents: "Cơ quan điều hành, bộ ngành, chính quyền địa phương.",
    priorities: "Kỷ cương thị trường, niềm tin xã hội, năng lực chống sốc.",
    biggestFear: "Tăng trưởng nóng dẫn đến bất ổn, hoặc can thiệp quá cứng làm nghẽn hệ thống.",
    playStyle: "Đánh đổi có tính toán: ưu tiên phương án tạo dư địa dài hạn, không chỉ xử lý triệu chứng.",
    slogan: "Ổn định để phát triển, phát triển để không ai bị bỏ lại.",
    color: "#4a8fe8",
    bgClass: "bg-role-state/20",
    textClass: "text-role-state",
    borderClass: "border-role-state",
    icon: "🏛",
  },
  {
    id: "business",
    label: "Doanh nghiệp",
    description: "Bạn vận hành sản xuất kinh doanh và tạo động lực tăng trưởng.",
    goal: "Tối ưu lợi nhuận bền vững thay vì lợi nhuận ngắn hạn bằng mọi giá.",
    represents: "Doanh nghiệp tư nhân, nhà đầu tư, chuỗi cung ứng.",
    priorities: "Chi phí hợp lý, luật chơi rõ ràng, thị trường dự đoán được.",
    biggestFear: "Chi phí bất định và chính sách đổi đột ngột làm mất động lực đầu tư.",
    playStyle: "Thực dụng có giới hạn: chấp nhận ràng buộc nếu đổi lại sân chơi cạnh tranh lành mạnh.",
    slogan: "Sinh lời đúng luật, lớn lên cùng thị trường.",
    color: "#e8943a",
    bgClass: "bg-role-business/20",
    textClass: "text-role-business",
    borderClass: "border-role-business",
    icon: "🏭",
  },
  {
    id: "worker",
    label: "Người lao động",
    description: "Bạn đại diện cho thu nhập, việc làm và an toàn của lực lượng sản xuất.",
    goal: "Tăng lương thực, giữ việc làm và có cơ chế bảo vệ khi thị trường biến động.",
    represents: "Công nhân, nhân viên văn phòng, lao động phi chính thức.",
    priorities: "Thu nhập đủ sống, điều kiện lao động, cơ hội nâng bậc kỹ năng.",
    biggestFear: "Bị cắt giảm quyền lợi khi doanh nghiệp khó khăn hoặc bị thay thế mà không có lưới đỡ.",
    playStyle: "Kiên định nhưng linh hoạt: ưu tiên phương án giữ việc làm và cải thiện thu nhập theo lộ trình.",
    slogan: "Việc làm bền, đời sống phải tiến lên.",
    color: "#4aad6e",
    bgClass: "bg-role-worker/20",
    textClass: "text-role-worker",
    borderClass: "border-role-worker",
    icon: "👷",
  },
  {
    id: "citizen",
    label: "Người dân",
    description: "Bạn đại diện cho sức mua, chất lượng sống và niềm tin tiêu dùng.",
    goal: "Giá cả hợp lý, dịch vụ công tin cậy, thị trường minh bạch để yên tâm chi tiêu.",
    represents: "Hộ gia đình, người tiêu dùng, cộng đồng dân cư.",
    priorities: "Chi phí sinh hoạt, an toàn sản phẩm, công bằng tiếp cận cơ hội.",
    biggestFear: "Giá tăng nhanh hơn thu nhập, chất lượng hàng hóa dịch vụ giảm mà không ai chịu trách nhiệm.",
    playStyle: "Cân bằng ngắn hạn và dài hạn: không chạy theo giá rẻ bằng mọi giá.",
    slogan: "Sống được hôm nay, yên tâm ngày mai.",
    color: "#e0624a",
    bgClass: "bg-role-citizen/20",
    textClass: "text-role-citizen",
    borderClass: "border-role-citizen",
    icon: "👨‍👩‍👧",
  },
];

export interface PromptOption {
  id: string;
  text: string;
  axisImpact: Partial<Record<StrategicAxis, number>>;
}

export interface RolePrompt {
  id: string;
  situation: string;
  question: string;
  options: PromptOption[];
}

const DEFAULT_PROMPTS: RolePrompt[] = [
  {
    id: "P1",
    situation: "Khi chi phí đầu vào tăng, áp lực lợi ích giữa các bên tăng theo.",
    question: "Bạn thường ưu tiên cách xử lý nào?",
    options: [
      { id: "A", text: "Đẩy tăng trưởng trước, xử lý hệ quả sau", axisImpact: { growth: 2, extremity: 1 } },
      { id: "B", text: "Ưu tiên nhóm dễ tổn thương", axisImpact: { equity: 2 } },
      { id: "C", text: "Giữ ổn định bằng các bước trung dung", axisImpact: { stability: 2, pragmatism: 1 } },
      { id: "D", text: "Siết kỷ luật ngay để tránh lệch hướng", axisImpact: { control: 2 } },
    ],
  },
  {
    id: "P2",
    situation: "Mâu thuẫn lợi ích leo thang trong đàm phán chính sách.",
    question: "Bạn chọn chiến lược thương lượng nào?",
    options: [
      { id: "A", text: "Chốt nhanh theo đa số", axisImpact: { stability: 1 } },
      { id: "B", text: "Tạo lộ trình hai bước để giảm sốc", axisImpact: { pragmatism: 2, stability: 1 } },
      { id: "C", text: "Bảo vệ một phía quyết liệt", axisImpact: { extremity: 2 } },
      { id: "D", text: "Đòi dữ liệu minh bạch trước khi chốt", axisImpact: { control: 1, pragmatism: 1 } },
    ],
  },
  {
    id: "P3",
    situation: "Bạn buộc phải đánh đổi giữa lợi ích ngắn hạn và bền vững dài hạn.",
    question: "Bạn nghiêng về hướng nào?",
    options: [
      { id: "A", text: "Ngắn hạn để tránh đổ vỡ trước mắt", axisImpact: { stability: 1 } },
      { id: "B", text: "Dài hạn dù phải chấp nhận phản ứng ban đầu", axisImpact: { growth: 1, pragmatism: 1 } },
      { id: "C", text: "Dung hòa theo lộ trình rõ ràng", axisImpact: { equity: 1, stability: 1, pragmatism: 1 } },
      { id: "D", text: "Giữ quyền kiểm soát tối đa", axisImpact: { control: 2 } },
    ],
  },
  {
    id: "P4",
    situation: "Không có phương án nào làm mọi bên hài lòng tuyệt đối.",
    question: "Tiêu chí cuối cùng bạn dùng để chọn là gì?",
    options: [
      { id: "A", text: "Ít tổn thương xã hội nhất", axisImpact: { equity: 2 } },
      { id: "B", text: "Ít biến động thị trường nhất", axisImpact: { stability: 2 } },
      { id: "C", text: "Khả năng phục hồi tăng trưởng tốt nhất", axisImpact: { growth: 2 } },
      { id: "D", text: "Khả năng thực thi chắc chắn nhất", axisImpact: { control: 1, pragmatism: 1 } },
    ],
  },
];

export const ROLE_PROMPTS: Record<RoleId, RolePrompt[]> = {
  state: DEFAULT_PROMPTS,
  business: DEFAULT_PROMPTS,
  worker: DEFAULT_PROMPTS,
  citizen: DEFAULT_PROMPTS,
};

export interface PulseSurveyQuestion {
  id: string;
  question: string;
  options: Array<{ id: string; text: string; axisImpact: Partial<Record<StrategicAxis, number>> }>;
}

export const PULSE_SURVEY: PulseSurveyQuestion[] = [
  {
    id: "Q1",
    question: "Khi kinh tế giảm tốc, ưu tiên đầu tiên của bạn là gì?",
    options: [
      { id: "A", text: "Kích cầu để tăng trưởng ngay", axisImpact: { growth: 2 } },
      { id: "B", text: "Bảo vệ nhóm dễ tổn thương", axisImpact: { equity: 2 } },
      { id: "C", text: "Giữ kỷ cương, tránh sốc", axisImpact: { stability: 2 } },
      { id: "D", text: "Kiểm soát chặt để tránh sai hướng", axisImpact: { control: 2 } },
    ],
  },
  {
    id: "Q2",
    question: "Mâu thuẫn lợi ích nên được giải quyết bằng cơ chế nào?",
    options: [
      { id: "A", text: "Thương lượng có ràng buộc", axisImpact: { pragmatism: 2, stability: 1 } },
      { id: "B", text: "Ra lệnh và thi hành nhanh", axisImpact: { control: 2 } },
      { id: "C", text: "Thị trường tự sàng lọc", axisImpact: { growth: 1, control: -1 } },
      { id: "D", text: "Ưu tiên bên yếu thế", axisImpact: { equity: 2 } },
    ],
  },
  {
    id: "Q3",
    question: "Bạn chấp nhận đánh đổi nào để đổi lấy ổn định?",
    options: [
      { id: "A", text: "Giảm tốc độ tăng trưởng", axisImpact: { stability: 2, growth: -1 } },
      { id: "B", text: "Giảm một phần tự do giá", axisImpact: { control: 1, stability: 1 } },
      { id: "C", text: "Giảm hỗ trợ ngắn hạn", axisImpact: { growth: 1, equity: -1 } },
      { id: "D", text: "Không đánh đổi, cứu tất cả", axisImpact: { extremity: 2 } },
    ],
  },
  {
    id: "Q4",
    question: "Nếu một quyết định không thể làm mọi bên hài lòng, bạn sẽ?",
    options: [
      { id: "A", text: "Chọn phương án ít tổn thương nhất", axisImpact: { pragmatism: 2 } },
      { id: "B", text: "Bảo vệ nhóm chịu tác động nặng nhất", axisImpact: { equity: 2 } },
      { id: "C", text: "Ưu tiên động lực thị trường", axisImpact: { growth: 2 } },
      { id: "D", text: "Ưu tiên kỷ luật thực thi", axisImpact: { control: 2 } },
    ],
  },
];

export interface SystemEffect {
  rigidity: number;
  socialTrust: number;
  marketHealth: number;
  conflict: number;
}

export interface MacroEffect {
  growth: number;
  equity: number;
  stability: number;
}

export interface RoundEffect extends MacroEffect {
  rolePoints: Record<RoleId, number>;
  system: SystemEffect;
}

export interface PartialRoundEffect extends Partial<MacroEffect> {
  rolePoints?: Partial<Record<RoleId, number>>;
  system?: Partial<SystemEffect>;
}

export interface RoleChoiceOption {
  id: string;
  label: string;
  text: string;
  rolePoints: Partial<Record<RoleId, number>>;
  macro: Partial<MacroEffect>;
  system: Partial<SystemEffect>;
}

export interface RoleDeviationRuleConfig {
  budget: number;
  penaltyBase: number;
  penaltyStep: number;
  penaltyMax: number;
}

export const ROLE_DEVIATION_CONFIG: Record<RoleId, RoleDeviationRuleConfig> = {
  state: { budget: 2, penaltyBase: 2, penaltyStep: 1, penaltyMax: 4 },
  business: { budget: 2, penaltyBase: 2, penaltyStep: 1, penaltyMax: 4 },
  worker: { budget: 2, penaltyBase: 2, penaltyStep: 1, penaltyMax: 4 },
  citizen: { budget: 2, penaltyBase: 2, penaltyStep: 1, penaltyMax: 4 },
};

export const ROLE_HINT_TEXT: Record<RoleId, string> = {
  state:
    "Ưu tiên của bạn là giữ ổn định hệ thống và niềm tin xã hội. Nhượng bộ quá mức ở ngắn hạn có thể làm hệ thống méo dài hạn.",
  business:
    "Bạn phải bảo toàn tăng trưởng và sức khỏe thị trường. Không thể liên tục chọn phương án hy sinh năng lực phát triển của doanh nghiệp.",
  worker:
    "Mục tiêu là bảo vệ thu nhập, việc làm và vị thế thương lượng. Nhẫn nhịn quá mức hoặc đối đầu cực đoan đều có chi phí dài hạn.",
  citizen:
    "Bạn bảo vệ sức mua, chất lượng sống và tính minh bạch. Chọn lợi ngắn hạn bằng mọi giá có thể làm trust xã hội giảm mạnh.",
};

export interface QuestionVariant {
  id: string;
  when: Partial<Record<RoleId, string[]>>;
  question: string;
}

export interface RoundRoleConfig {
  question: string;
  questionVariants?: QuestionVariant[];
  options: RoleChoiceOption[];
}

export interface SynergyRule {
  id: string;
  label: string;
  text: string;
  if: Partial<Record<RoleId, string[]>>;
  bonus: PartialRoundEffect;
}

export interface ConflictRule {
  id: string;
  label: string;
  text: string;
  if: Partial<Record<RoleId, string[]>>;
  penalty: PartialRoundEffect;
}

export interface GameRound {
  id: number;
  title: string;
  context: string;
  turnOrder: RoleId[];
  roles: Record<RoleId, RoundRoleConfig>;
  synergyRules: SynergyRule[];
  conflictRules: ConflictRule[];
  customEffectResolver?: (roleChoices: Record<RoleId, string | null>) => RoundEffect;
  message: string;
  lesson: string;
}

export const GAME_ROUNDS: GameRound[] = [
  {
    id: 1,
    title: "Giá năng lượng tăng sốc",
    context:
      "Giá xăng dầu và điện tăng mạnh. Chi phí vận hành của doanh nghiệp đội lên nhanh. Giá sinh hoạt bắt đầu nhích. Không xử lý khéo, áp lực sẽ lan thành xung đột xã hội.",
    turnOrder: ["business", "state", "worker", "citizen"],
    roles: {
      state: {
        question:
          "Giá năng lượng đang dí thẳng vào chi phí. Doanh nghiệp phản ứng sao trước cú sốc này. Nhà nước phải đứng giữa bài toán: cứu ai, cứu đến đâu, và có méo hệ thống không?",
        questionVariants: [
          {
            id: "when-business-pass-and-state-swing",
            when: { business: ["B"] },
            question:
              "Doanh nghiệp đang chuyển một phần chi phí sang giá bán. Nhà nước xử lý sao để đỡ sốc cho xã hội?",
          },
          {
            id: "when-business-cut-welfare",
            when: { business: ["C"] },
            question:
              "Doanh nghiệp đang giữ biên lợi nhuận bằng cách siết phúc lợi lao động. Nhà nước phản ứng thế nào?",
          },
          {
            id: "when-business-gong-or-invest",
            when: { business: ["A", "D"] },
            question:
              "Doanh nghiệp đang cố tự hấp thụ cú sốc bằng tối ưu/đầu tư. Nhà nước hỗ trợ sao để giữ nhịp mà không bơm sai chỗ?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Giảm chút thuế phí, cứu đúng chỗ",
            text:
              "Giảm bớt một phần thuế, phí với xăng dầu và điện, đồng thời trợ đúng nhóm dễ tổn thương. Cách này giúp hạ sốc trước mắt nhưng vẫn giữ được kỷ luật chính sách.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { rigidity: -1, socialTrust: 2, marketHealth: 1, conflict: -2 },
          },
          {
            id: "B",
            label: "Thị trường tự bơi",
            text:
              "Không giảm thuế, không trợ giá, để giá năng lượng tự chạy theo thị trường. Ngân sách đỡ áp lực hơn, nhưng phần đau sẽ dồn thẳng sang doanh nghiệp và hộ gia đình.",
            rolePoints: { state: -1 },
            macro: { growth: 0, equity: -1, stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
          {
            id: "C",
            label: "Chặn giá cứng luôn",
            text:
              "Đặt trần giá diện rộng để ghìm giá ngay cho toàn thị trường. Dễ trấn an tâm lý nhanh, nhưng nếu kéo dài thì dễ méo tín hiệu giá và bóp nghẹt động lực cung ứng.",
            rolePoints: { state: -1 },
            macro: { growth: -2, equity: 1, stability: -1 },
            system: { rigidity: 2, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Thôi ráng, tiền để đầu tư",
            text:
              "Không hỗ trợ trực tiếp ngay, dồn nguồn lực cho đầu tư công và hạ tầng năng lượng. Lợi về dài hạn, nhưng ngắn hạn thì dân và doanh nghiệp phải tự gồng nhiều hơn.",
            rolePoints: { state: 1 },
            macro: { growth: 1, equity: 0, stability: 0 },
            system: { rigidity: 1 },
          },
        ],
      },
      business: {
        question: "Giá năng lượng đang dí thẳng vào chi phí. DN phản ứng sao trước cú sốc này?",
        options: [
          {
            id: "A",
            label: "Gồng nhẹ, tối ưu vận hành",
            text:
              "Tạm gồng bằng cách tiết kiệm năng lượng, tối ưu logistics và chưa đẩy giá quá mạnh sang khách. Lãi mỏng đi một chút nhưng giữ được quan hệ với thị trường.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { socialTrust: 1, marketHealth: 2, conflict: -1, rigidity: 0 },
          },
          {
            id: "B",
            label: "Pass hết sang khách",
            text:
              "Đẩy phần lớn chi phí sang giá bán để bảo toàn biên lợi nhuận. Doanh nghiệp đỡ đau hơn, nhưng người dân và sức mua sẽ là bên lãnh đủ.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -1, stability: -1 },
            system: { socialTrust: -1, conflict: 1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Cắt phúc lợi để giữ lãi",
            text:
              "Siết phụ cấp, phúc lợi và các khoản mềm để giữ lợi nhuận. Cách này cứu sổ sách ngắn hạn nhưng rất dễ làm quan hệ lao động căng lên.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -2, stability: -2 },
            system: { socialTrust: -2, conflict: 2, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Đầu tư công nghệ tiết kiệm điện",
            text:
              "Đầu tư công nghệ tiết kiệm năng lượng, chấp nhận đau vốn ban đầu để giảm phụ thuộc về sau. Đòn này không cứu ngay lập tức, nhưng mở cửa sống khỏe lâu hơn.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 0, stability: 1 },
            system: { socialTrust: 0, marketHealth: 2, conflict: -1, rigidity: 0 },
          },
        ],
      },
      worker: {
        question:
          "Chi phí sống tăng, áp lực từ doanh nghiệp và phản ứng của Nhà nước đang định hình nhịp sống của bạn. Team lao động làm gì để bảo vệ mình mà không tự làm hệ thống rơi vào thế vỡ?",
        questionVariants: [
          {
            id: "when-business-cut-and-state-weak",
            when: { business: ["C"], state: ["B"] },
            question:
              "Chi phí sống tăng, phúc lợi bị siết, hỗ trợ lại chưa rõ. Team lao động làm gì?",
          },
          {
            id: "when-business-gong-and-state-support",
            when: { business: ["A", "D"], state: ["A"] },
            question:
              "Áp lực giá có nhưng DN đang cố gồng, Nhà nước cũng bắt đầu hỗ trợ. Team lao động phản ứng sao?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Đòi phụ cấp ngay",
            text:
              "Yêu cầu phụ cấp xăng xe hoặc điện nước ngay để bù chi phí sống. Bạn đỡ hụt hơi nhanh, nhưng doanh nghiệp sẽ thấy áp lực chi phí tăng tức thì.",
            rolePoints: { worker: 2 },
            macro: { growth: 0, equity: 2, stability: 0 },
            system: { socialTrust: 0, conflict: 1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Thương lượng có lộ trình",
            text:
              "Chấp nhận đi theo lộ trình nếu doanh nghiệp cam kết rõ chuyện tăng lương hoặc phụ cấp. Bạn chưa được hết ngay, nhưng đổi lại cơ hội giữ việc và giữ nhịp sản xuất tốt hơn.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Bùng căng luôn",
            text:
              "Đình công hoặc nghỉ việc mạnh để ép doanh nghiệp phải nhượng bộ. Cách này tạo sức ép lớn, nhưng cũng dễ làm sản xuất gãy nhịp và rủi ro việc làm tăng lên.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, equity: 1, stability: -2 },
            system: { socialTrust: -1, conflict: 3, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Cắn răng giữ việc",
            text:
              "Tạm gác yêu cầu lại để giữ việc trước đã. Ít xung đột hơn thật, nhưng phần thiệt ngắn hạn gần như dồn hết về phía người lao động.",
            rolePoints: { worker: 0 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { socialTrust: -1, conflict: 0, marketHealth: 0, rigidity: 0 },
          },
        ],
      },
      citizen: {
        question:
          "Giá hàng đang nhích lên và phản ứng xã hội đang quyết định nhịp ổn định của hệ thống. Người dân chọn mode nào?",
        questionVariants: [
          {
            id: "when-price-up-and-support-weak",
            when: { business: ["B"], state: ["B"] },
            question:
              "Giá hàng đang nhích lên rõ, hỗ trợ chưa đủ cảm nhận. Người dân chọn mode nào?",
          },
          {
            id: "when-targeted-support-and-stable-system",
            when: { business: ["A", "D"], state: ["A"] },
            question:
              "Giá còn áp lực nhưng hệ thống đang cố hạ nhiệt. Người dân phản ứng sao?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Cắt bớt chi tiêu",
            text:
              "Cắt bớt các khoản chưa quá cần để ưu tiên nhu yếu phẩm. Gia đình đỡ sốc hơn, nhưng tổng cầu và sức mua chung cũng chậm lại.",
            rolePoints: { citizen: 1 },
            macro: { growth: -1, equity: 0, stability: 1 },
            system: { conflict: -1, socialTrust: 0, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Ủng hộ hỗ trợ đúng chỗ",
            text:
              "Ủng hộ kiểu hỗ trợ đúng người, đúng lúc thay vì rải đều cho tất cả. Cách này nghe có vẻ ít 'sướng' ngay, nhưng công bằng và bền hơn cho cả hệ thống.",
            rolePoints: { citizen: 2 },
            macro: { growth: 0, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Ép phải ghìm giá",
            text:
              "Muốn ghìm giá thật mạnh để thứ gì cũng phải rẻ ngay. Dễ thấy lợi trước mắt, nhưng chi phí thật thường sẽ bị đẩy ngược lại sang doanh nghiệp hoặc ngân sách.",
            rolePoints: { citizen: 1 },
            macro: { growth: 0, equity: 1, stability: -1 },
            system: { rigidity: 2, marketHealth: -2, conflict: 1, socialTrust: 0 },
          },
          {
            id: "D",
            label: "Ai mạnh người nấy sống",
            text:
              "Không kỳ vọng hỗ trợ gì cả, ai lo được cho mình thì lo. Cách này nghe thực dụng, nhưng niềm tin xã hội và cảm giác công bằng sẽ rơi khá nhanh.",
            rolePoints: { citizen: -1 },
            macro: { growth: 0, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 1, marketHealth: 0, rigidity: 0 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "energy_chain_good",
        label: "Chuỗi đẹp hạ sốc",
        text:
          "Doanh nghiệp gồng đúng cách, Nhà nước cứu trúng nhịp, người lao động thương lượng có neo và người dân ủng hộ hỗ trợ đúng người đúng lúc.",
        if: {
          business: ["A", "D"],
          state: ["A"],
          worker: ["B"],
          citizen: ["B"],
        },
        bonus: {
          growth: 1,
          equity: 1,
          stability: 2,
          system: { socialTrust: 2, marketHealth: 1, conflict: -2 },
        },
      },
    ],
    conflictRules: [
      {
        id: "energy_chain_shift",
        label: "Chuỗi lệch (penalty nhẹ)",
        text:
          "DN chuyển gánh nặng sang giá bán, Nhà nước không bắt nhịp, người lao động bị kéo vào đối đầu và người dân cũng chọn phản ứng cực đoan hơn.",
        if: {
          business: ["B"],
          state: ["B"],
          worker: ["A"],
          citizen: ["A"],
        },
        penalty: {
          equity: -1,
          stability: -1,
          system: { socialTrust: -1, conflict: 1 },
        },
      },
      {
        id: "energy_chain_bad",
        label: "Chuỗi xấu (penalty nặng)",
        text:
          "DN cắt phúc lợi để giữ lãi, Nhà nước can thiệp méo nhịp, người lao động phản ứng sâu và người dân kéo cuộc chơi về hướng ai thắng ai chịu.",
        if: {
          business: ["C"],
          state: ["B", "D"],
          worker: ["C"],
          citizen: ["C", "D"],
        },
        penalty: {
          growth: -1,
          equity: -2,
          stability: -3,
          system: { socialTrust: -3, marketHealth: -1, conflict: 4 },
        },
      },
      {
        id: "energy_chain_fake_stability",
        label: "Ổn định giả (penalty cấu trúc)",
        text:
          "DN và Nhà nước cùng chọn các bước khiến hệ thống yên theo kiểu bị khóa cứng: người lao động chịu thiệt quyền lợi và người dân chọn phản ứng co cụm.",
        if: {
          business: ["B", "C"],
          state: ["C"],
          worker: ["D"],
          citizen: ["C"],
        },
        penalty: {
          stability: 1,
          system: { rigidity: 3, socialTrust: -2, marketHealth: -2, conflict: 1 },
        },
      },
    ],
    message:
      "Cú sốc giá là bài toán phân chia gánh nặng. Ai giữ được phần mình thì thường đang đẩy áp lực sang phần khác.",
    lesson:
      "Không có đáp án hoàn hảo cho tất cả. Nếu chỉ cố bảo vệ mình thì hệ thống dễ lệch hoặc vỡ.",
  },
  {
    id: 2,
    title: "Mâu thuẫn tiền lương và lợi nhuận",
    context:
      "Đơn hàng đang sát hạn. Doanh nghiệp than chi phí cao, lợi nhuận mỏng. Người lao động bức xúc vì lương không theo kịp giá. Không xử lý tốt là dễ nổ xung đột ngay tại nơi làm việc.",
    turnOrder: ["business", "worker", "state", "citizen"],
    roles: {
      state: {
        question:
          "Lương đang là điểm nóng và quan hệ lao động kéo theo cả ổn định sản xuất. Nhà nước vào cuộc kiểu nào để hạ nhiệt mà không làm lệch nhịp hệ thống?",
        questionVariants: [
          {
            id: "when-wage-hot-and-hard",
            when: { business: ["B", "D"], worker: ["A", "C"] },
            question:
              "Quan hệ lao động đang nóng lên rõ. Nhà nước vào cuộc kiểu nào?",
          },
          {
            id: "when-there-is-negotiation-gap",
            when: { worker: ["B"], business: ["A", "C"] },
            question:
              "Đã có khe để đàm phán. Nhà nước ưu tiên cơ chế nào?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Khung tăng theo lộ trình + đối thoại bắt buộc",
            text:
              "Lập khung tăng theo lộ trình, gắn thưởng năng suất và đối thoại bắt buộc. Không bên nào được tất cả ngay, nhưng xung đột dễ hạ nhiệt hơn.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { rigidity: -1, socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "B",
            label: "Ép tăng lương ngay trên diện rộng",
            text:
              "Ép tăng lương ngay trên diện rộng để dập lửa. Người lao động đỡ bức xúc nhanh, nhưng doanh nghiệp có thể phản ứng mạnh vì chi phí tăng sốc.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 2, stability: -1 },
            system: { rigidity: 1, socialTrust: 0, marketHealth: -1, conflict: 1 },
          },
          {
            id: "C",
            label: "Ưu tiên giữ doanh nghiệp, lương tính sau",
            text:
              "Ưu tiên giữ doanh nghiệp, lương tính sau để bảo vệ đơn hàng và việc làm. Cách này giúp bên sản xuất đỡ ngộp, nhưng dễ làm người lao động thấy mình bị hy sinh.",
            rolePoints: { state: -1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Đứng ngoài cho hai bên tự xử",
            text:
              "Đứng ngoài để hai bên tự xử. Trông có vẻ 'thị trường', nhưng thiếu khung chung thì quan hệ lao động dễ nóng lên.",
            rolePoints: { state: -1 },
            macro: { growth: 0, equity: -1, stability: -2 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
        ],
      },
      business: {
        question: "Áp lực đơn hàng còn đó, nhưng lương đang thành điểm nóng. DN ra tín hiệu gì trước?",
        options: [
          {
            id: "A",
            label: "Tăng lương theo lộ trình + thưởng năng suất",
            text:
              "Tăng theo lộ trình, gắn thưởng năng suất để hai bên còn chỗ thương lượng. DN chưa quá đau một cục, còn lao động cũng thấy có cửa.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { socialTrust: 1, marketHealth: 2, conflict: -1, rigidity: 0 },
          },
          {
            id: "B",
            label: "Chưa tăng, giữ sức cạnh tranh trước",
            text:
              "Chưa tăng lương để giữ sức cạnh tranh trước, lợi nhuận mỏng vẫn phải sống. Doanh nghiệp đỡ nghẹt hơn, nhưng phần chịu đựng sẽ bị đẩy sang người lao động.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Tăng ngay để dập lửa",
            text:
              "Tăng lương ngay để dập lửa. Người lao động đỡ bức xúc nhanh, nhưng doanh nghiệp chịu thiệt chi phí tức thời.",
            rolePoints: { business: 0 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { marketHealth: -1, conflict: -1, socialTrust: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Tái cơ cấu, giảm người để giữ biên",
            text:
              "Tái cơ cấu, giảm người để giữ biên lợi nhuận. DN giảm áp lực chi phí, nhưng rủi ro xã hội và niềm tin lao động tụt mạnh.",
            rolePoints: { business: 0 },
            macro: { growth: 0, equity: -2, stability: -2 },
            system: { socialTrust: -2, conflict: 2, marketHealth: 0, rigidity: 0 },
          },
        ],
      },
      worker: {
        question:
          "Lương đang chạm trần với giá. DN đang ra tín hiệu gì thì nhịp phản ứng của bạn sẽ kéo theo hệ thống theo hướng đó.",
        questionVariants: [
          {
            id: "when-business-self-rescue",
            when: { business: ["B", "D"] },
            question:
              "DN đang ưu tiên tự cứu trước. Team lao động phản ứng sao?",
          },
          {
            id: "when-business-signals-concession",
            when: { business: ["A", "C"] },
            question:
              "DN đã đưa tín hiệu nhượng bộ ở mức nào đó. Team lao động chọn cách nào?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Đòi tăng lương ngay và rõ",
            text:
              "Đòi tăng lương ngay và rõ ràng để bù chi phí sống. Quyền lợi được đẩy lên rõ hơn, nhưng doanh nghiệp sẽ thấy bị ép trong ngắn hạn.",
            rolePoints: { worker: 2 },
            macro: { growth: 0, equity: 2, stability: -1 },
            system: { socialTrust: 0, conflict: 1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Chấp nhận lộ trình, miễn có cam kết và giám sát",
            text:
              "Chấp nhận đi theo lộ trình nếu có cam kết rõ ràng và giám sát. Chưa thắng lớn ngay lập tức, nhưng xung đột dễ hạ nhiệt.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Đình công cảnh báo",
            text:
              "Đình công cảnh báo để buộc bên kia phải chú ý. Sức ép tăng rất mạnh, nhưng sản xuất và thu nhập ngắn hạn cũng dễ bị ảnh hưởng.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, equity: 0, stability: -2 },
            system: { socialTrust: -1, conflict: 3, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Im để giữ việc",
            text:
              "Im lặng để giữ việc trước. Ít rủi ro ngắn hạn hơn, nhưng phần thiệt sẽ âm thầm dồn lại.",
            rolePoints: { worker: 0 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { socialTrust: -1, conflict: 0, marketHealth: 0, rigidity: 0 },
          },
        ],
      },
      citizen: {
        question:
          "Người dân bị kéo vào cuộc chơi qua giá hàng và nhịp ổn định xã hội. Bạn đứng về hướng nào?",
        questionVariants: [
          {
            id: "when-conflict-up",
            when: { worker: ["C"] },
            question:
              "Quan hệ lao động đang căng, nguy cơ ảnh hưởng giá hàng và ổn định xã hội. Người dân đứng về hướng nào?",
          },
          {
            id: "when-negotiation-ok",
            when: { worker: ["B"], state: ["A"] },
            question:
              "Có dấu hiệu hai bên đang nhích về thỏa hiệp. Người dân ủng hộ gì?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Ủng hộ thỏa hiệp đôi bên cùng sống",
            text:
              "Ủng hộ phương án thỏa hiệp để cả doanh nghiệp lẫn người lao động còn đường sống. Hạ nhiệt nhưng vẫn giữ công bằng.",
            rolePoints: { citizen: 2 },
            macro: { growth: 0, equity: 1, stability: 2 },
            system: { socialTrust: 2, conflict: -1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Đứng hẳn về phía lao động",
            text:
              "Đứng hẳn về phía người lao động vì thấy họ gánh thiệt nhiều hơn. Công bằng tăng lên, nhưng áp lực chi phí cho doanh nghiệp cũng tăng theo.",
            rolePoints: { citizen: 1 },
            macro: { growth: 0, equity: 2, stability: 0 },
            system: { socialTrust: 0, conflict: 1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Ưu tiên giữ giá hàng ổn định",
            text:
              "Ưu tiên giữ giá hàng ổn định để chi phí không bị pass hết sang người mua. Dân bớt đau, thị trường cũng bớt méo.",
            rolePoints: { citizen: 1 },
            macro: { growth: 0, equity: 1, stability: 1 },
            system: { marketHealth: 1, conflict: 0, socialTrust: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Miễn hàng rẻ là được",
            text:
              "Không quan tâm ai thiệt ai lời, miễn hàng rẻ là được. Nghe tiện thật, nhưng xã hội vẫn mất động lực thương lượng.",
            rolePoints: { citizen: -1 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { socialTrust: -1, conflict: 0, marketHealth: 0, rigidity: 0 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "wage_negotiated_balance",
        label: "Chuỗi đẹp thương lượng",
        text:
          "DN tăng theo lộ trình, worker chấp nhận cơ chế có neo, State lập khung và citizen ủng hộ thỏa hiệp.",
        if: {
          business: ["A"],
          worker: ["B"],
          state: ["A"],
          citizen: ["A", "C"],
        },
        bonus: {
          growth: 1,
          equity: 1,
          stability: 2,
          system: { socialTrust: 2, marketHealth: 1, conflict: -2 },
        },
      },
    ],
    conflictRules: [
      {
        id: "wage_gridlock",
        label: "Chuỗi bế tắc",
        text:
          "DN giữ thế cứng, worker phản ứng mạnh trong khi State ưu tiên giữ sai nhịp. Citizen cũng chọn hướng kéo căng lên.",
        if: {
          business: ["B"],
          worker: ["A"],
          state: ["C"],
          citizen: ["B"],
        },
        penalty: {
          equity: 0,
          stability: -2,
          system: { socialTrust: -2, conflict: 2 },
        },
      },
      {
        id: "wage_conflict_blast",
        label: "Chuỗi nổ xung đột",
        text:
          "DN chọn cách cứng, worker bùng mạnh, State siết theo hướng cực đoan và citizen cũng đi theo. Xung đột bị đẩy lên mức khó hạ nhiệt.",
        if: {
          business: ["D", "B"],
          worker: ["C"],
          state: ["D"],
          citizen: ["D"],
        },
        penalty: {
          growth: -1,
          equity: -1,
          stability: -3,
          system: { socialTrust: -3, conflict: 4 },
        },
      },
      {
        id: "wage_locked_in_rigidity",
        label: "Chuỗi ép cứng",
        text:
          "DN ép cứng, worker bị chia rẽ giữa đòi và phản ứng sâu, State cũng đi vào mode kiểm soát. Citizen lại ưu tiên hướng kéo thêm bất cân đối.",
        if: {
          business: ["B"],
          worker: ["A", "C"],
          state: ["B"],
          citizen: ["C"],
        },
        penalty: {
          equity: 1,
          stability: -1,
          system: { rigidity: 2, marketHealth: -1, conflict: 1 },
        },
      },
    ],
    message:
      "Lương và lợi nhuận là chỗ va trực diện giữa công bằng và cạnh tranh. Không có cơ chế thương lượng thì xung đột leo rất nhanh.",
    lesson:
      "Đàm phán minh bạch là cơ chế để cái lợi của bên này không bị cảm nhận như cái thiệt của bên kia.",
  },
  {
    id: 3,
    title: "Nông sản ùn tắc, chuỗi cung ứng đứt",
    context:
      "Nông sản đang vào vụ nhưng đầu ra nghẽn. Giá tại nguồn rớt mạnh, hàng hóa ùn ứ, chi phí logistics tăng. Người sản xuất nhìn hàng đầy mà vẫn thiệt.",
    turnOrder: ["business", "state", "worker", "citizen"],
    roles: {
      state: {
        question:
          "Đầu ra nghẽn khiến lợi ích bị kẹt ở giữa chuỗi. Nhà nước phải mở đường nào để dòng chảy chạy lại mà không tạo méo hệ thống?",
        questionVariants: [
          {
            id: "when-business-open-flow",
            when: { business: ["A", "C"] },
            question:
              "Doanh nghiệp đã bắt đầu hấp thụ hàng. Nhà nước tiếp lực bằng gì?",
          },
          {
            id: "when-business-press-or-wait",
            when: { business: ["B", "D"] },
            question:
              "Đầu ra yếu, DN phản ứng kém hoặc tận dụng thế yếu của người sản xuất. Nhà nước xử lý sao?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Kết nối logistics + sàn số + tín dụng ngắn hạn",
            text:
              "Kết nối logistics, mở sàn số và tín dụng ngắn hạn để hàng đi được. Sửa đúng điểm nghẽn đang làm cả chuỗi nghẹt thở.",
            rolePoints: { state: 2 },
            macro: { growth: 2, equity: 2, stability: 1 },
            system: { rigidity: -1, socialTrust: 1, marketHealth: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Mua vào cứu giá ngắn hạn",
            text:
              "Mua vào để đỡ giá ngay cho người sản xuất. Cứu được trước mắt, nhưng nếu ôm lâu thì ngân sách và hiệu quả thị trường sẽ bắt đầu đuối.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 1, stability: 0 },
            system: { rigidity: 2, marketHealth: -1, socialTrust: 0, conflict: 0 },
          },
          {
            id: "C",
            label: "Dựng rào bảo hộ để chắc",
            text:
              "Dựng rào bảo hộ để ưu tiên tiêu thụ hàng trong nước. Tạo cảm giác an toàn nhanh, nhưng nếu lạm dụng thì thị trường dễ bị trì trệ và kém cạnh tranh.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 0, stability: -1 },
            system: { rigidity: 1, socialTrust: -1, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Để thị trường tự xử",
            text:
              "Không hỗ trợ đặc biệt, để mọi thứ tự xoay theo thị trường. Nhìn thì gọn, nhưng người yếu thế trong chuỗi thường là người chịu đòn đầu tiên.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: -2, stability: -1 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
        ],
      },
      business: {
        question:
          "Nguồn hàng đang nhiều nhưng chuỗi lưu thông lag nặng. DN vào thế nào?",
        options: [
          {
            id: "A",
            label: "Mở thu mua, tăng sơ chế và kho lạnh",
            text:
              "Mở thu mua, tăng sơ chế và kho lạnh để hàng không bị bán tháo. DN có thêm nguồn cung, còn nông dân cũng đỡ bị ép giá quá sâu.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 1 },
            system: { socialTrust: 1, marketHealth: 2, conflict: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Ép giá vì bên kia đang yếu thế",
            text:
              "Ép giá vì bên kia đang yếu thế. Lợi nhuận ngắn hạn có thể đẹp, nhưng niềm tin và cảm giác công bằng sẽ tụt rất nhanh.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Đẩy mạnh bán qua sàn và kênh online",
            text:
              "Đẩy mạnh bán qua sàn và kênh online để rút ngắn trung gian. Đây là cách kiếm tiền mà vẫn giúp chuỗi lưu thông thông hơn.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 1 },
            system: { socialTrust: 0, marketHealth: 2, conflict: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Đứng ngoài, chờ giá rơi thêm",
            text:
              "Đứng ngoài chờ giá rơi sâu hơn mới vào mua. Cách này an toàn cho DN, nhưng lại kéo dài thêm cơn nghẽn cho cả chuỗi.",
            rolePoints: { business: 0 },
            macro: { growth: -1, equity: -1, stability: -1 },
            system: { socialTrust: -1, marketHealth: 0, conflict: 1, rigidity: 0 },
          },
        ],
      },
      worker: {
        question:
          "Đầu ra đang bị tắc hoặc vừa bắt đầu mở. Team lao động sẽ tham gia theo hướng nào để quyền lợi không bị bỏ lại?",
        questionVariants: [
          {
            id: "when-chain-opened",
            when: { state: ["A"] },
            question:
              "Đầu ra đang có đường mở lại. Team lao động chọn cách tham gia nào?",
          },
          {
            id: "when-chain-still-lag",
            when: { state: ["B", "C", "D"] },
            question:
              "Hàng còn tắc, việc tăng nhưng quyền lợi chưa rõ. Team lao động phản ứng sao?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Hỗ trợ tăng ca, phân loại, bốc xếp để đẩy hàng",
            text:
              "Sẵn sàng tăng ca, phân loại, bốc xếp để đẩy hàng ra nhanh. Đổi lại cả chuỗi có cơ hội hồi nhịp.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 0, stability: 1 },
            system: { socialTrust: 0, marketHealth: 1, conflict: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Workload tăng thì tiền công cũng phải tăng",
            text:
              "Workload tăng thì tiền công cũng phải tăng. Chính đáng và ít 'đánh đổi' vào niềm tin.",
            rolePoints: { worker: 2 },
            macro: { growth: 0, equity: 2, stability: 0 },
            system: { socialTrust: 0, marketHealth: 0, conflict: 1, rigidity: 0 },
          },
          {
            id: "C",
            label: "Không rõ quyền lợi thì nghỉ cho khỏe",
            text:
              "Nếu quyền lợi không rõ ràng thì nghỉ luôn khỏi chuỗi. Bảo vệ bản thân được phần nào, nhưng cả hệ thống sẽ càng thiếu người ở lúc đang cần nhất.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, equity: 0, stability: -2 },
            system: { socialTrust: -1, marketHealth: 0, conflict: 2, rigidity: 0 },
          },
          {
            id: "D",
            label: "Học thêm kỹ năng bán hàng/sàn số",
            text:
              "Học thêm kỹ năng bán hàng, đóng gói hoặc dùng sàn số để bớt lệ thuộc một mắt xích. Không giải quyết hết mọi thứ ngay, nhưng tăng cơ hội thích nghi lâu dài.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { socialTrust: 1, marketHealth: 1, conflict: 0, rigidity: 0 },
          },
        ],
      },
      citizen: {
        question:
          "Người dân có thể giúp chuỗi bớt méo bằng cách chọn hành vi mua/ủng hộ nào. Bạn chọn theo nhịp nào?",
        questionVariants: [
          {
            id: "when-better-outflow",
            when: { state: ["A"] },
            question:
              "Nông sản đã có đường ra hơn nhưng chưa thật sự ổn định. Người dân phản ứng sao?",
          },
          {
            id: "when-still-mess",
            when: { state: ["B", "C", "D"] },
            question:
              "Giá tại nguồn rớt nhưng người làm ra vẫn khổ. Người dân chọn hành vi nào?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Mua ủng hộ hàng nội địa, ưu tiên kênh minh bạch",
            text:
              "Mua ủng hộ hàng nội địa, ưu tiên kênh minh bạch. Giúp người làm ra bớt bị ép giá, nhưng vẫn cân nhắc hiệu quả mua sắm.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { socialTrust: 1, conflict: -1, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "B",
            label: "Chỉ săn rẻ, càng ép càng tốt",
            text:
              "Chỉ săn rẻ, càng ép càng tốt. Tiết kiệm được cho mình, nhưng dễ tiếp tay cho vòng xoáy ép giá ở phía dưới.",
            rolePoints: { citizen: 0 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { socialTrust: -1, conflict: 0, marketHealth: 0, rigidity: 0 },
          },
          {
            id: "C",
            label: "Ủng hộ bán qua sàn, truy xuất rõ ràng",
            text:
              "Ủng hộ bán qua sàn với truy xuất rõ ràng để rút bớt trung gian. Người mua yên tâm hơn, thị trường cũng minh bạch hơn.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { socialTrust: 1, marketHealth: 2, conflict: 0, rigidity: 0 },
          },
          {
            id: "D",
            label: "Kệ, chuyện của nhà sản xuất",
            text:
              "Không quan tâm chuyện phía sau, cứ mua theo thói quen. Nhẹ đầu thật, nhưng cũng là cách để nút thắt cứ nằm đó mãi.",
            rolePoints: { citizen: -1 },
            macro: { growth: 0, equity: -1, stability: -1 },
            system: { socialTrust: -1, conflict: 0, marketHealth: 0, rigidity: 0 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "agri_chain_good",
        label: "Chuỗi đẹp thông dòng",
        text:
          "Doanh nghiệp mở đường bằng thu mua/sơ chế, Nhà nước kết nối lưu thông, lao động tham gia tích cực và người dân chọn kênh minh bạch.",
        if: {
          state: ["A"],
          business: ["A", "C"],
          worker: ["A", "D"],
          citizen: ["A", "C"],
        },
        bonus: {
          growth: 2,
          equity: 1,
          stability: 1,
          system: { marketHealth: 2, socialTrust: 1, conflict: -1 },
        },
      },
    ],
    conflictRules: [
      {
        id: "agri_chain_weak_exploit",
        label: "Chuỗi tận dụng thế yếu (penalty)",
        text:
          "DN ép giá lúc thế yếu, Nhà nước không mở đường đúng nhịp, lao động bị kéo vào phản ứng bất cân đối và người dân cũng chọn phương án tiếp tay.",
        if: {
          business: ["B"],
          state: ["B", "D"],
          worker: ["B", "C"],
          citizen: ["B"],
        },
        penalty: {
          growth: 0,
          equity: -2,
          stability: -1,
          system: { socialTrust: -2, conflict: 2 },
        },
      },
      {
        id: "agri_chain_long_break",
        label: "Chuỗi đứt gãy kéo dài (penalty nặng)",
        text:
          "DN đứng ngoài chờ giá tiếp tục, Nhà nước cũng để thị trường tự xử hoặc dựng rào sai điểm, lao động không vào đúng nhịp và người dân chọn hành vi làm méo thêm.",
        if: {
          business: ["D"],
          state: ["D", "C"],
          worker: ["C"],
          citizen: ["D"],
        },
        penalty: {
          growth: -2,
          equity: -2,
          stability: -2,
          system: { socialTrust: -2, marketHealth: -2, conflict: 2 },
        },
      },
      {
        id: "agri_chain_short_savior",
        label: "Cứu ngắn hạn nhưng kém bền (penalty cấu trúc nhẹ)",
        text:
          "DN mở nút theo cách nhanh, Nhà nước tiếp lực không khớp, lao động làm đúng một phần và người dân cũng chỉ dừng ở mức hỗ trợ tối thiểu.",
        if: {
          business: ["A"],
          state: ["B"],
          worker: ["A"],
          citizen: ["A"],
        },
        penalty: {
          growth: 0,
          equity: 0,
          stability: 1,
          system: { rigidity: 2, marketHealth: -1, socialTrust: 0, conflict: 0 },
        },
      },
    ],
    message:
      "Khi chuỗi lưu thông đứt, vấn đề không chỉ là “giá thấp hay cao”, mà là ai có năng lực nối lại hệ thống và ai đang bị bỏ lại.",
    lesson:
      "Các can thiệp phải đúng điểm nghẽn: đúng kênh, đúng thời điểm và đúng lợi ích của từng mắt xích.",
  },
  {
    id: 4,
    title: "Niềm tin thị trường suy giảm",
    context:
      "Xuất hiện các vụ gian lận chất lượng, thông tin mập mờ, quảng bá sai lệch. Người tiêu dùng mất niềm tin, thị trường bắt đầu chững lại vì ai cũng nghi ngờ nhau.",
    turnOrder: ["business", "state", "worker", "citizen"],
    roles: {
      state: {
        question:
          "Thị trường đang mất trust. DN đang cứu mình bằng cách nào sẽ kéo theo cách Nhà nước phải hoàn thiện sân chơi. Nhà nước bật mode nào để niềm tin quay lại mà không bóp nghẹt thị trường?",
        questionVariants: [
          {
            id: "when-business-is-transparent",
            when: { business: ["A", "D"] },
            question:
              "Doanh nghiệp đã có tín hiệu làm thật. Nhà nước hoàn thiện sân chơi theo hướng nào?",
          },
          {
            id: "when-business-fake-it",
            when: { business: ["B", "C"] },
            question:
              "Thị trường có dấu hiệu gian lận/đánh tráo niềm tin. Nhà nước bật mode nào?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Siết luật + công khai + xử nghiêm",
            text:
              "Siết luật cho chuẩn, công khai dữ liệu giám sát và xử lý nghiêm các vụ sai phạm. Cách này tốn sức thực thi, nhưng tạo lại cảm giác luật chơi còn đáng tin.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Đâu cháy dập chỗ đó",
            text:
              "Vụ nào nổ thì dập vụ đó, chưa đụng tới khung lớn. Đỡ tốn công cải tổ ngay, nhưng niềm tin chung rất khó hồi phục nếu gốc vấn đề còn nguyên.",
            rolePoints: { state: 0 },
            macro: { growth: 0, equity: 0, stability: -1 },
            system: { socialTrust: -1, marketHealth: -1, conflict: 1 },
          },
          {
            id: "C",
            label: "Nới tay cho DN đỡ mệt",
            text:
              "Nới tay cho doanh nghiệp một thời gian để họ đỡ mệt. Nhìn ngắn hạn thì nhẹ gánh, nhưng rất dễ gửi tín hiệu rằng làm sai cũng không sao lắm.",
            rolePoints: { state: -2 },
            macro: { growth: 1, equity: -2, stability: -2 },
            system: { rigidity: -1, socialTrust: -2, marketHealth: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Siết hành chính diện rộng",
            text:
              "Siết hành chính diện rộng, check thật mạnh để răn đe. Có thể dập sợ nhanh, nhưng cũng dễ làm bên làm đúng thấy mình bị trói tay.",
            rolePoints: { state: -1 },
            macro: { growth: -2, equity: 0, stability: -1 },
            system: { rigidity: 2, socialTrust: -1, marketHealth: -1, conflict: 1 },
          },
        ],
      },
      business: {
        question:
          "Thị trường đang mất trust. DN chọn cách cứu mình và cứu danh tiếng kiểu nào?",
        options: [
          {
            id: "A",
            label: "Minh bạch full stack",
            text:
              "Minh bạch nguồn gốc, chất lượng và dữ liệu liên quan để lấy lại niềm tin bằng hàng thật, số thật. Tốn công hơn, nhưng nếu làm được thì thương hiệu sẽ khỏe bền.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2 },
          },
          {
            id: "B",
            label: "PR mạnh, bên trong tính sau",
            text:
              "Đẩy PR thật mạnh để giữ hình ảnh trước, còn bên trong tính sau. Cứu được bề mặt một lúc, nhưng nếu bị lộ thì cú gãy trust sẽ đau hơn nhiều.",
            rolePoints: { business: 0 },
            macro: { growth: 0, stability: -1 },
            system: { socialTrust: -2, conflict: 1 },
          },
          {
            id: "C",
            label: "Giảm chi phí kiểm soát chất lượng",
            text:
              "Cắt bớt khâu kiểm soát chất lượng để tiết kiệm chi phí. Lợi ngắn hạn có thể nhích lên, nhưng thị trường sẽ xem đó là cái giá họ đang phải trả hộ bạn.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -2 },
            system: { marketHealth: -2, socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Tự xây bộ chuẩn + bên thứ ba",
            text:
              "Tự xây bộ chuẩn cao hơn và kéo bên thứ ba vào kiểm định. Đây là cách vừa giữ sân cho doanh nghiệp, vừa gửi tín hiệu 'tôi chơi luật đàng hoàng'.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2 },
          },
        ],
      },
      worker: {
        question:
          "Nếu tổ chức đang cố giữ chuẩn thì worker xử lý vai trò thế nào. Còn nếu có dấu hiệu nhập nhèm, worker làm gì để không tiếp tay cho cái bẩn kéo dài?",
        questionVariants: [
          {
            id: "when-organization-trying-to-fix",
            when: { business: ["A", "D"] },
            question:
              "Bên trong đã có nỗ lực sửa chuẩn, worker xử lý vai trò của mình thế nào?",
          },
          {
            id: "when-organization-sketchy",
            when: { business: ["B", "C"] },
            question:
              "Thấy sai phạm nhưng hệ thống chưa chắc đã sạch. Worker làm gì?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Báo nội bộ, yêu cầu sửa",
            text:
              "Báo nội bộ và ép quy trình phải sửa. Vẫn giữ cửa cho tổ chức tự chỉnh, đồng thời giúp bạn không phải ôm im rủi ro một mình.",
            rolePoints: { worker: 2 },
            macro: { stability: 1 },
            system: { socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Im lặng cho lành",
            text:
              "Im lặng cho lành, coi như chưa thấy gì để tránh rắc rối cá nhân. Bản thân đỡ va chạm hơn, nhưng cái giá sẽ bị đẩy sang người mua và toàn hệ thống.",
            rolePoints: { worker: 0 },
            macro: { equity: -1, stability: -1 },
            system: { socialTrust: -1 },
          },
          {
            id: "C",
            label: "Tố giác sai phạm nặng",
            text:
              "Nếu sai phạm quá nặng thì tố giác ra ngoài để chặn hậu quả lớn hơn. Rủi ro cá nhân cao hơn, nhưng xã hội lại được bảo vệ nhiều hơn.",
            rolePoints: { worker: 2 },
            macro: { equity: 1, stability: 1 },
            system: { socialTrust: 2, conflict: 0 },
          },
          {
            id: "D",
            label: "Kệ, miễn có lương",
            text:
              "Kệ, miễn cuối tháng vẫn có lương là được. Cách nghĩ này cứu mình rất ngắn hạn, nhưng lâu dài sẽ bào mòn trust của cả thị trường.",
            rolePoints: { worker: -1 },
            macro: { equity: -1 },
            system: { socialTrust: -2 },
          },
        ],
      },
      citizen: {
        question:
          "Người dân phản ứng dựa trên việc thị trường đã bắt đầu sửa thật hay vẫn nhập nhèm. Bạn chọn cách nào để không biến niềm tin thành thứ bị thao túng?",
        questionVariants: [
          {
            id: "when-market-starts-fixing",
            when: { state: ["A", "B"] },
            question:
              "Niềm tin chưa hồi hoàn toàn nhưng đã có bên làm thật. Người dân phản ứng sao?",
          },
          {
            id: "when-market-still-mess",
            when: { state: ["C", "D"] },
            question:
              "Tin giả, hàng kém, quảng bá quá đà đang làm mọi người mệt. Người dân chọn cách nào?",
          },
        ],
        options: [
          {
            id: "A",
            label: "Ưu tiên hàng minh bạch",
            text:
              "Ưu tiên hàng có nguồn gốc rõ ràng và minh bạch, dù có thể tốn công hơn khi chọn. Người tiêu dùng mất thêm chút thời gian, nhưng đổi lại giúp thị trường bớt nhập nhèm.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, stability: 1 },
            system: { socialTrust: 1, marketHealth: 1 },
          },
          {
            id: "B",
            label: "Tẩy chay bên làm láo",
            text:
              "Tẩy chay bên làm láo và ủng hộ bên làm tử tế. Tác động chậm hơn một cú check hành chính, nhưng tạo áp lực rất thật lên doanh nghiệp.",
            rolePoints: { citizen: 2 },
            macro: { equity: 1, stability: 1 },
            system: { socialTrust: 1, conflict: 0 },
          },
          {
            id: "C",
            label: "Ham rẻ bất chấp",
            text:
              "Ham rẻ bất chấp, miễn trước mắt tiết kiệm được. Kiểu phản ứng này nghe hợp ví tiền, nhưng vô tình thưởng cho bên làm ăn nhập nhèm.",
            rolePoints: { citizen: -1 },
            macro: { equity: -1, stability: -1 },
            system: { marketHealth: -1, socialTrust: -1 },
          },
          {
            id: "D",
            label: "Tin review mạng là đủ",
            text:
              "Tin review mạng là đủ, khỏi kiểm thêm cho mệt. Nhanh thì nhanh thật, nhưng rất dễ biến niềm tin thành thứ bị thao túng.",
            rolePoints: { citizen: 0 },
            macro: { stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "trust_chain_good",
        label: "Chuỗi đẹp khôi phục trust",
        text:
          "Nhà nước siết đúng chỗ, doanh nghiệp minh bạch, lao động dám báo sai phạm và người dân tiêu dùng thông minh sẽ kéo niềm tin thị trường đi lên.",
        if: {
          state: ["A"],
          business: ["A", "D"],
          worker: ["A", "C"],
          citizen: ["A", "B"],
        },
        bonus: {
          growth: 1,
          equity: 1,
          stability: 2,
          system: { socialTrust: 3, marketHealth: 2, conflict: -1 },
        },
      },
    ],
    conflictRules: [
      {
        id: "trust_chain_make-up",
        label: "Chuỗi làm màu",
        text:
          "DN làm màu, Nhà nước cũng dập theo hướng méo, worker và citizen đi theo nhịp khiến niềm tin không hồi lại được.",
        if: {
          business: ["B"],
          state: ["B"],
          worker: ["B"],
          citizen: ["D"],
        },
        penalty: {
          stability: -2,
          system: { socialTrust: -3, marketHealth: -1, conflict: 1 },
        },
      },
      {
        id: "trust_chain_break",
        label: "Chuỗi phá trust (penalty nặng)",
        text:
          "DN đánh tráo niềm tin, Nhà nước không dứt khoát đủ mạnh, worker buông xuôi và citizen cũng chọn cách tiếp tay. Niềm tin gãy theo dây chuyền.",
        if: {
          business: ["C"],
          state: ["C", "D"],
          worker: ["D"],
          citizen: ["C"],
        },
        penalty: {
          equity: -2,
          stability: -2,
          system: { socialTrust: -4, marketHealth: -3, conflict: 2 },
        },
      },
      {
        id: "trust_chain_stiff_for_peace",
        label: "Chuỗi siết cho yên (penalty cấu trúc)",
        text:
          "DN chọn cách lửng chuẩn, Nhà nước siết hành chính diện rộng, worker bị kéo về im lặng và citizen cũng chọn hướng quá an toàn. Hệ thống yên nhưng trust bị mài mòn.",
        if: {
          business: ["B", "C"],
          state: ["D"],
          worker: ["B"],
          citizen: ["A"],
        },
        penalty: {
          stability: 0,
          system: { rigidity: 3, socialTrust: -1, marketHealth: -1 },
        },
      },
    ],
    message:
      "Không có trust thì thị trường sẽ tự ăn mòn chính nó. Niềm tin không đến từ lời nói, mà đến từ hành vi nhất quán của cả hệ thống.",
    lesson:
      "Niềm tin không tự sinh. Nếu hành vi của từng bên chỉ tối ưu ngắn hạn, trust sẽ gãy và phục hồi luôn đắt hơn tưởng tượng.",
  },
  {
    id: 5,
    title: "Chốt gói định hướng 3 năm",
    context:
      "Sau nhiều cú sốc và xung đột ngắn hạn, giờ là lúc chọn gói định hướng cho 3 năm tới. Không thể có tất cả mọi thứ cùng lúc. Mỗi định hướng sẽ ưu tiên nhóm này nhiều hơn nhóm khác.",
    turnOrder: ["state", "business", "worker", "citizen"],
    roles: {
      state: {
        question:
          "Nếu phải chốt hướng lớn cho 3 năm tới, ở vai Nhà nước bạn kéo về phía nào?",
        options: [
          {
            id: "A",
            label: "Tăng trưởng bằng mọi giá",
            text:
              "Tăng trưởng thần tốc, chạy trước tính sau. Ưu tiên tăng trưởng lên trước, chấp nhận những chỗ yếu bị bỏ lại rõ hơn.",
            rolePoints: { state: -1 },
            macro: {},
            system: {},
          },
          {
            id: "B",
            label: "An sinh ngắn hạn là trung tâm",
            text:
              "Ưu tiên an sinh và hỗ trợ thu nhập trong ngắn hạn để giảm áp lực xã hội. Dễ tạo cảm giác ấm hơn trước mắt, nhưng dư địa phát triển về sau có thể bị mỏng đi.",
            rolePoints: { state: 0 },
            macro: {},
            system: {},
          },
          {
            id: "C",
            label: "Cân bằng: năng suất + an sinh mục tiêu + kỷ cương thị trường",
            text:
              "Chọn gói cân bằng: năng suất đi cùng an sinh mục tiêu và kỷ cương thị trường. Không phe nào sướng tuyệt đối, nhưng hệ thống bền hơn nhiều.",
            rolePoints: { state: 2 },
            macro: {},
            system: {},
          },
          {
            id: "D",
            label: "Kiểm soát hành chính mạnh để giữ trật tự",
            text:
              "Quản thật chặt để đỡ loạn. Trật tự tăng lên, nhưng độ linh hoạt và động lực đổi mới có thể bị bó lại.",
            rolePoints: { state: 0 },
            macro: {},
            system: {},
          },
        ],
      },
      business: {
        question:
          "Nhà nước đã nghiêng về một hướng. Doanh nghiệp muốn kéo tương lai về phía nào để mình sống khỏe?",
        options: [
          {
            id: "A",
            label: "Bơm tốc độ, tăng trưởng trước",
            text:
              "Bơm tốc độ để mở rộng thật nhanh, chốt tăng trưởng trước đã.",
            rolePoints: { business: 2 },
            macro: {},
            system: {},
          },
          {
            id: "B",
            label: "Xin hỗ trợ nhiều để giữ an toàn",
            text:
              "Xin hỗ trợ nhiều để giảm rủi ro và giữ cảm giác an toàn.",
            rolePoints: { business: 0 },
            macro: {},
            system: {},
          },
          {
            id: "C",
            label: "Đầu tư năng suất, cạnh tranh tử tế, minh bạch lâu dài",
            text:
              "Đầu tư năng suất, cạnh tranh tử tế, minh bạch lâu dài.",
            rolePoints: { business: 2 },
            macro: {},
            system: {},
          },
          {
            id: "D",
            label: "Xin cơ chế bảo hộ, đỡ phải cạnh tranh gắt",
            text:
              "Xin cơ chế bảo hộ để đỡ đau khi cạnh tranh.",
            rolePoints: { business: 1 },
            macro: {},
            system: {},
          },
        ],
      },
      worker: {
        question:
          "Hai hướng trên đang tạo ra tương lai kiểu nào. Người lao động muốn đẩy cán cân theo phía nào?",
        options: [
          {
            id: "A",
            label: "Miễn có việc là được, quyền lợi tính sau",
            text:
              "Miễn có việc là được, quyền lợi tính sau.",
            rolePoints: { worker: 0 },
            macro: {},
            system: {},
          },
          {
            id: "B",
            label: "Phúc lợi trước mắt càng chắc càng tốt",
            text:
              "Phúc lợi trước mắt càng chắc càng tốt.",
            rolePoints: { worker: 2 },
            macro: {},
            system: {},
          },
          {
            id: "C",
            label: "Muốn cả lương, kỹ năng, cơ hội đi lên đều có",
            text:
              "Muốn cả lương, kỹ năng và cơ hội đi lên đều có.",
            rolePoints: { worker: 2 },
            macro: {},
            system: {},
          },
          {
            id: "D",
            label: "Quản chặt để đỡ bất ổn",
            text:
              "Chấp nhận quản chặt để đỡ bất ổn.",
            rolePoints: { worker: 0 },
            macro: {},
            system: {},
          },
        ],
      },
      citizen: {
        question:
          "Sau khi nhìn 3 bên kia kéo định hướng, người dân chốt phiếu theo kiểu nào?",
        options: [
          {
            id: "A",
            label: "Miễn kinh tế chạy mạnh, chịu thiệt chút cũng được",
            text:
              "Miễn kinh tế chạy mạnh, chịu thiệt chút cũng được.",
            rolePoints: { citizen: 0 },
            macro: {},
            system: {},
          },
          {
            id: "B",
            label: "Ưu tiên đỡ khổ trước đã",
            text:
              "Ưu tiên đỡ khổ trước đã.",
            rolePoints: { citizen: 2 },
            macro: {},
            system: {},
          },
          {
            id: "C",
            label: "Tăng trưởng nhưng phải công bằng và đáng tin",
            text:
              "Tăng trưởng nhưng phải công bằng và đáng tin.",
            rolePoints: { citizen: 2 },
            macro: {},
            system: {},
          },
          {
            id: "D",
            label: "Cứ kiểm soát mạnh cho chắc cú",
            text:
              "Cứ kiểm soát mạnh cho chắc cú.",
            rolePoints: { citizen: 0 },
            macro: {},
            system: {},
          },
        ],
      },
    },
    message:
      "Định hướng dài hạn không phải là chọn “từ đẹp nhất”, mà là chọn mô hình phân phối lợi ích và gánh nặng.",
    lesson: "Định hướng dài hạn không phải để bên nào cũng thắng, mà để các bên đủ chấp nhận nhau để xã hội không trượt vào bất ổn.",

    synergyRules: [],
    conflictRules: [],
    customEffectResolver: (roleChoices) => {
      const getDir = (rid: RoleId) => roleChoices[rid];
      const dirs: Record<RoleId, string | null> = {
        state: getDir("state"),
        business: getDir("business"),
        worker: getDir("worker"),
        citizen: getDir("citizen"),
      };

      const allowed = new Set(["A", "B", "C", "D"]);
      const counts: Record<"A" | "B" | "C" | "D", number> = { A: 0, B: 0, C: 0, D: 0 };
      (Object.keys(dirs) as RoleId[]).forEach((rid) => {
        const d = dirs[rid];
        if (d && allowed.has(d)) counts[d as "A" | "B" | "C" | "D"] += 1;
      });

      const nonNullCount = (Object.keys(dirs) as RoleId[]).reduce((acc, rid) => (dirs[rid] ? acc + 1 : acc), 0);
      const uniqueDirs = (Object.keys(counts) as Array<keyof typeof counts>).filter((k) => counts[k] > 0);

      const directionEffect: Record<
        "A" | "B" | "C" | "D",
        { growth: number; equity: number; stability: number; system: Partial<SystemEffect> }
      > = {
        A: { growth: 2, equity: -2, stability: -1, system: { rigidity: -1, socialTrust: -2, marketHealth: 0, conflict: 2 } },
        B: { growth: -1, equity: 2, stability: 0, system: { rigidity: 1, socialTrust: 1, marketHealth: -1, conflict: 0 } },
        C: { growth: 2, equity: 2, stability: 2, system: { rigidity: 0, socialTrust: 2, marketHealth: 2, conflict: -2 } },
        D: { growth: -1, equity: -1, stability: 1, system: { rigidity: 2, socialTrust: -1, marketHealth: -2, conflict: 1 } },
      };

      const roundInt = (v: number) => Math.round(v);

      const base = createEmptyRoundEffect();

      // Base: hội tụ / chia phe / bế tắc chiến lược (trong spec là áp vào macro/system)
      if (nonNullCount === 4 && uniqueDirs.length === 4) {
        // Case 3: bế tắc chiến lược
        base.stability += -2;
        base.system.socialTrust += -2;
        base.system.conflict += 2;
      } else {
        const maxCount = Math.max(counts.A, counts.B, counts.C, counts.D);
        if (maxCount >= 3) {
          const finalDir = (Object.entries(counts) as Array<[keyof typeof counts, number]>).sort((a, b) => b[1] - a[1])[0][0];
          const eff = directionEffect[finalDir as "A" | "B" | "C" | "D"];
          base.growth += eff.growth;
          base.equity += eff.equity;
          base.stability += eff.stability;
          base.system.rigidity += eff.system.rigidity ?? 0;
          base.system.socialTrust += eff.system.socialTrust ?? 0;
          base.system.marketHealth += eff.system.marketHealth ?? 0;
          base.system.conflict += eff.system.conflict ?? 0;
        } else {
          // Case 2: trung bình có trọng số theo số vai chọn từng hướng
          const denom = nonNullCount || 1;
          (["A", "B", "C", "D"] as Array<"A" | "B" | "C" | "D">).forEach((d) => {
            const c = counts[d];
            if (!c) return;
            const eff = directionEffect[d];
            base.growth += (eff.growth * c) / denom;
            base.equity += (eff.equity * c) / denom;
            base.stability += (eff.stability * c) / denom;
            base.system.rigidity += ((eff.system.rigidity ?? 0) * c) / denom;
            base.system.socialTrust += ((eff.system.socialTrust ?? 0) * c) / denom;
            base.system.marketHealth += ((eff.system.marketHealth ?? 0) * c) / denom;
            base.system.conflict += ((eff.system.conflict ?? 0) * c) / denom;
          });
          // Chuẩn hóa về số nguyên để khớp hệ chỉ số hiện tại
          base.growth = roundInt(base.growth);
          base.equity = roundInt(base.equity);
          base.stability = roundInt(base.stability);
          base.system.rigidity = roundInt(base.system.rigidity);
          base.system.socialTrust = roundInt(base.system.socialTrust);
          base.system.marketHealth = roundInt(base.system.marketHealth);
          base.system.conflict = roundInt(base.system.conflict);
        }
      }

      // Pattern application: delta on top of base (spec “pattern_application = delta”)
      const stateDir = dirs.state;
      const bizDir = dirs.business;
      const workerDir = dirs.worker;
      const citizenDir = dirs.citizen;

      const isAllC = stateDir === "C" && bizDir === "C" && workerDir === "C" && citizenDir === "C";
      if (isAllC) {
        base.growth += 2;
        base.equity += 2;
        base.stability += 2;
        base.system.socialTrust += 3;
        base.system.marketHealth += 2;
        base.system.conflict += -3;
      }

      const isGrowthSkew =
        stateDir === "A" && bizDir === "A" && citizenDir === "B" && (workerDir === "B" || workerDir === "C");
      if (isGrowthSkew) {
        base.growth += 1;
        base.equity += -2;
        base.stability += -1;
        base.system.socialTrust += -2;
        base.system.conflict += 2;
      }

      const isWelfareHeavy = stateDir === "B" && bizDir === "B" && workerDir === "B" && citizenDir === "B";
      if (isWelfareHeavy) {
        base.growth += -1;
        base.equity += 2;
        base.system.marketHealth += -2;
        base.system.rigidity += 1;
      }

      const isStiffControl = stateDir === "D" && bizDir === "D" && workerDir === "D" && citizenDir === "D";
      if (isStiffControl) {
        base.growth += -2;
        base.equity += -1;
        base.stability += 1;
        base.system.rigidity += 3;
        base.system.socialTrust += -2;
        base.system.marketHealth += -3;
        base.system.conflict += 1;
      }

      // Note: penalty “bế tắc chiến lược” đã có trong case 3 nên không cộng thêm ở pattern.
      return base;
    },
  },
];

export interface Indicators {
  growth: number;
  equity: number;
  stability: number;
}

export interface Player {
  id: string;
  name: string;
  role: RoleId | null;
  vote: string | null;
}

export type GamePhase = "lobby" | "waiting" | "round" | "round_result" | "final";

export interface AppliedRoundRule {
  id: string;
  label: string;
  text: string;
  effect: RoundEffect;
}

export interface RoundHistoryItem {
  roundId: number;
  winOption?: number | string;
  effect?: RoundEffect;
  voteBreakdown: Record<string, number>;
  roleVoteBreakdown?: Partial<Record<RoleId, Record<string, number>>>;
  roleChoices: Record<RoleId, string | null>;
  baseEffect?: RoundEffect;
  synergyApplied?: AppliedRoundRule[];
  conflictApplied?: AppliedRoundRule[];
  finalEffect?: RoundEffect;
  deviationFlags?: Record<RoleId, boolean>;
  deviationBudgetBefore?: Record<RoleId, number>;
  deviationBudgetAfter?: Record<RoleId, number>;
  deviationPenaltyApplied?: Record<RoleId, number>;
  deviationPenaltyCount?: Record<RoleId, number>;
}

export interface GameState {
  roomCode: string;
  roomName: string;
  hostName: string;
  players: Player[];
  phase: GamePhase;
  currentRound: number;
  indicators: Indicators;
  votes: Record<string, string>;
  roundHistory: RoundHistoryItem[];
  turnIndex: number;
  turnExpiresAt: string | null;
  countdown: number;
  roleDeviationBudget: Record<RoleId, number>;
  roleDeviationUsed: Record<RoleId, number>;
  roleDeviationPenaltyCount: Record<RoleId, number>;
}

export interface SystemScores {
  rigidity: number;
  socialTrust: number;
  marketHealth: number;
  conflict: number;
}

export interface GlobalEnding {
  id: string;
  title: string;
  description: string;
  quote: string;
  vibe: string;
  condition: (ctx: EndingContext) => boolean;
  color: string;
  icon: string;
}

export interface EndingContext {
  indicators: Indicators;
  roleScores: Record<RoleId, number>;
  system: SystemScores;
}

export const GLOBAL_ENDINGS: GlobalEnding[] = [
  {
    id: "harmonized-growth",
    title: "Game Thắng Cả Bàn",
    description: "Tăng trưởng, công bằng và ổn định đều ở vùng xanh. Mỗi vai được hưởng phần hợp lý mà hệ thống vẫn giữ được trust.",
    quote: "Không ai win all, nhưng cả bàn win đủ.",
    vibe: "GIF: cả nhóm đập tay ăn mừng sau cuộc họp",
    condition: (c) => c.indicators.growth >= 8 && c.indicators.equity >= 8 && c.indicators.stability >= 8 && c.system.socialTrust >= 4,
    color: "#4aad6e",
    icon: "🌿",
  },
  {
    id: "growth-at-all-costs",
    title: "Đua Số Bất Chấp",
    description: "Biểu đồ tăng trưởng nhìn rất đẹp, nhưng công bằng và niềm tin xã hội tụt dốc.",
    quote: "Chạy nhanh quá đôi khi chỉ để… tới sớm trong bức tường.",
    vibe: "GIF: xe đua cán đích nhưng phanh bốc khói",
    condition: (c) => c.indicators.growth >= 8 && (c.indicators.equity <= 5 || c.system.socialTrust <= -2),
    color: "#e8943a",
    icon: "🚀",
  },
  {
    id: "stable-but-stifled",
    title: "Ổn Nhưng Hơi Đơ",
    description: "Biến động ít, nhưng động lực đổi mới và tăng trưởng như bị kéo phanh tay.",
    quote: "Ở mãi vùng an toàn cũng là một kiểu rủi ro.",
    vibe: "GIF: biểu đồ đi ngang kéo dài",
    condition: (c) => c.indicators.stability >= 7 && c.system.rigidity >= 4 && c.indicators.growth <= 6,
    color: "#4a8fe8",
    icon: "🧊",
  },
  {
    id: "market-imbalance",
    title: "Thị Trường Lệch Pha",
    description: "Giá cả méo mó, dòng tiền và nguồn lực chảy sai chỗ, ai đó đang gồng quá sức.",
    quote: "Thiếu niềm tin thì bơm bao nhiêu tiền cũng khó cứu.",
    vibe: "GIF: bàn cân nghiêng mạnh một phía",
    condition: (c) => c.system.marketHealth <= -3 && c.indicators.stability <= 6,
    color: "#e0624a",
    icon: "📉",
  },
  {
    id: "social-friction",
    title: "Xã Hội Ở Chế Độ Căng",
    description: "Mâu thuẫn lợi ích tích tụ, chi phí phối hợp xã hội và độ mệt mỏi của mọi bên đều tăng.",
    quote: "Drama hôm nay thường là hoá đơn của những lần né quyết định trước đó.",
    vibe: "GIF: phòng họp tranh luận căng thẳng",
    condition: (c) => c.system.conflict >= 3 && c.indicators.equity <= 7,
    color: "#d35454",
    icon: "🔥",
  },
  {
    id: "welfare-overstretched",
    title: "An Sinh Gồng Cả Map",
    description: "Mạng lưới an sinh bung hết cỡ, nhưng động lực tăng trưởng và sức chịu đựng của ngân sách bị kéo căng.",
    quote: "Không có bánh thì khó chia, an sinh bền phải đi cùng nguồn thu bền.",
    vibe: "GIF: người gánh tải nặng nhưng vẫn bước tiếp",
    condition: (c) => c.indicators.equity >= 8 && c.indicators.growth <= 5,
    color: "#6cbf7d",
    icon: "🛟",
  },
  {
    id: "rules-bent",
    title: "Luật Chơi Méo Dần",
    description: "Thực dụng ngắn hạn thắng thế, kỷ cương thị trường bị bẻ cong để giải quyết từng ca riêng lẻ.",
    quote: "Bẻ luật một lần cho tiện, lần sau sẽ rất khó bẻ lại cho thẳng.",
    vibe: "GIF: thước đo bị bẻ gãy",
    condition: (c) => c.system.marketHealth <= -1 && c.system.socialTrust <= -1 && c.system.rigidity <= -2,
    color: "#9b6a4b",
    icon: "🧱",
  },
  {
    id: "total-gridlock",
    title: "Kẹt Xe Toàn Map",
    description: "Tăng trưởng, công bằng, ổn định cùng tụt, xung đột cao và hệ thống lạc lối.",
    quote: "Không quyết cũng là một quyết định, và thường là quyết định đắt nhất.",
    vibe: "GIF: đèn giao thông đỏ đồng loạt",
    condition: () => true,
    color: "#7a7a7a",
    icon: "🛑",
  },
];

export interface RoleEnding {
  id: string;
  roleId: RoleId;
  title: string;
  academicName: string;
  description: string;
  strengths: string;
  risks: string;
  quote: string;
  vibe: string;
  condition: (ctx: RoleEndingContext) => boolean;
}

export interface RoleEndingContext {
  roleScore: number;
  indicators: Indicators;
  system: SystemScores;
}

const fallbackRoleEnding = (roleId: RoleId): RoleEnding => ({
  id: `${roleId}-fallback`,
  roleId,
  title: "Lệch Pha Hơi Nhiều",
  academicName: "Lệch pha lợi ích",
  description: "Vai của bạn chưa tìm được cách bảo vệ lợi ích mình trong bức tranh chung hiện tại.",
  strengths: "Nhìn thấy rõ chỗ mình đang bị thiệt.",
  risks: "Nếu không góp tiếng nói, vai này sẽ tiếp tục chịu thiệt trong các vòng sau.",
  quote: "Khi bàn chơi lệch quá lâu, người chịu thiệt thường là người im lặng.",
  vibe: "GIF: bàn cờ bị xáo trộn",
  condition: () => true,
});

export const ROLE_ENDINGS: Record<RoleId, RoleEnding[]> = {
  state: [
    {
      id: "state-regulator",
      roleId: "state",
      title: "Bộ Não Điều Tiết",
      academicName: "Cân bằng thể chế động",
      description: "Bạn giữ được nhịp điều phối khi hệ thống biến động mạnh.",
      strengths: "Ổn định cao, niềm tin xã hội tăng.",
      risks: "Đòi hỏi năng lực thực thi liên tục.",
      quote: "Điều tiết giỏi là biết lúc nào kéo, lúc nào thả.",
      vibe: "GIF: trung tâm điều hành sáng đèn",
      condition: (c) => c.roleScore >= 6 && c.indicators.stability >= 7 && c.system.socialTrust >= 2,
    },
    {
      id: "state-iron-hand",
      roleId: "state",
      title: "Bàn Tay Sắt",
      academicName: "Quản trị hành chính cứng",
      description: "Bạn lập lại trật tự nhanh nhưng giảm độ linh hoạt thị trường.",
      strengths: "Kiểm soát khủng hoảng ngắn hạn tốt.",
      risks: "Độ cứng cao làm suy yếu động lực dài hạn.",
      quote: "Trật tự đến nhanh, nhưng động lực cũng có thể đi nhanh.",
      vibe: "GIF: con dấu đỏ đóng mạnh",
      condition: (c) => c.system.rigidity >= 4,
    },
    {
      id: "state-social-shield",
      roleId: "state",
      title: "Lá Chắn Xã Hội",
      academicName: "Nhà nước kiến tạo bao trùm",
      description: "Bạn đặt trọng tâm vào nhóm dễ tổn thương và giữ nhiệt xã hội.",
      strengths: "Công bằng cải thiện rõ.",
      risks: "Nếu thiếu động lực tăng trưởng, dư địa tài khóa co lại.",
      quote: "Bảo vệ đúng lúc là đầu tư cho ổn định ngày mai.",
      vibe: "GIF: chiếc khiên che cho đám đông",
      condition: (c) => c.indicators.equity >= 8 && c.indicators.growth <= 6,
    },
    {
      id: "state-pragmatist",
      roleId: "state",
      title: "Kẻ Thực Dụng",
      academicName: "Điều hành theo ràng buộc",
      description: "Bạn chọn phương án khả thi nhất trong bối cảnh cụ thể.",
      strengths: "Giữ được cân bằng tối thiểu giữa các bên.",
      risks: "Dễ bị nhìn là thỏa hiệp nửa vời.",
      quote: "Đúng trong bối cảnh quan trọng hơn đẹp trên giấy.",
      vibe: "GIF: bàn họp đầy giấy ghi chú",
      condition: (c) => c.roleScore >= 2,
    },
    fallbackRoleEnding("state"),
  ],
  business: [
    {
      id: "biz-market-architect",
      roleId: "business",
      title: "Kiến Trúc Sư Thị Trường",
      academicName: "Tăng trưởng dựa trên năng suất",
      description: "Bạn tạo lợi nhuận bằng đổi mới và cạnh tranh lành mạnh.",
      strengths: "Lợi nhuận bền, thị trường khỏe.",
      risks: "Phụ thuộc vào tính ổn định chính sách.",
      quote: "Lợi nhuận bền là lợi nhuận đến từ năng suất thật.",
      vibe: "GIF: dây chuyền sản xuất vận hành trơn tru",
      condition: (c) => c.roleScore >= 6 && c.system.marketHealth >= 2,
    },
    {
      id: "biz-cost-cutter",
      roleId: "business",
      title: "Dao Cắt Chi Phí",
      academicName: "Tối ưu ngắn hạn",
      description: "Bạn bảo toàn biên lợi nhuận bằng cắt giảm mạnh tay.",
      strengths: "Sống sót nhanh trong cú sốc.",
      risks: "Mất niềm tin lao động và thương hiệu.",
      quote: "Cắt nhanh cứu hôm nay, nhưng có thể mất ngày mai.",
      vibe: "GIF: bảng ngân sách bị cắt đỏ",
      condition: (c) => c.system.conflict >= 3,
    },
    {
      id: "biz-rule-gamer",
      roleId: "business",
      title: "Người Chơi Luật",
      academicName: "Khai thác khe hở thể chế",
      description: "Bạn giỏi tìm khoảng trống để tối đa hóa lợi ích doanh nghiệp.",
      strengths: "Linh hoạt cao trước biến động.",
      risks: "Rủi ro pháp lý và phản ứng xã hội.",
      quote: "Nếu luật mơ hồ, người nhanh hơn sẽ thắng trước.",
      vibe: "GIF: người chơi vượt mê cung",
      condition: (c) => c.system.socialTrust <= -1 && c.roleScore >= 2,
    },
    {
      id: "biz-partner-builder",
      roleId: "business",
      title: "Đối Tác Kiến Tạo",
      academicName: "Hợp tác công tư hiệu quả",
      description: "Bạn chấp nhận ràng buộc để đổi lấy sân chơi bền vững.",
      strengths: "Cân bằng đầu tư, nhân sự và thị trường.",
      risks: "Lợi nhuận ngắn hạn không đột biến.",
      quote: "Thị trường bền vững là tài sản lớn nhất của doanh nghiệp.",
      vibe: "GIF: hai bên bắt tay ký kết",
      condition: (c) => c.roleScore >= 2,
    },
    fallbackRoleEnding("business"),
  ],
  worker: [
    {
      id: "worker-bridge-builder",
      roleId: "worker",
      title: "Người Bắc Cầu",
      academicName: "Thương lượng tập thể hiệu quả",
      description: "Bạn kết hợp sức ép và đàm phán để cải thiện quyền lợi.",
      strengths: "Tăng quyền lợi mà vẫn giữ nhịp sản xuất.",
      risks: "Cần tổ chức và dữ liệu vững.",
      quote: "Đàm phán giỏi là không để ai rời bàn tay trắng.",
      vibe: "GIF: họp bàn tròn đồng thuận",
      condition: (c) => c.roleScore >= 6 && c.indicators.equity >= 7,
    },
    {
      id: "worker-frontline",
      roleId: "worker",
      title: "Mũi Nhọn Đấu Tranh",
      academicName: "Sức ép tập thể cường độ cao",
      description: "Bạn đẩy yêu cầu quyền lợi lên cao và nhanh.",
      strengths: "Tạo chú ý chính sách tức thì.",
      risks: "Xung đột leo thang, rủi ro việc làm tăng.",
      quote: "Sức ép mạnh có thể mở cửa, cũng có thể đóng sập cửa.",
      vibe: "GIF: đoàn người giương biểu ngữ",
      condition: (c) => c.system.conflict >= 4,
    },
    {
      id: "worker-safety-anchor",
      roleId: "worker",
      title: "Neo An Toàn",
      academicName: "Ưu tiên bảo toàn việc làm",
      description: "Bạn chọn sự ổn định việc làm trong giai đoạn bất định.",
      strengths: "Giảm rủi ro mất việc trước mắt.",
      risks: "Tăng thu nhập chậm.",
      quote: "Khi gió lớn, giữ được neo là quan trọng nhất.",
      vibe: "GIF: neo tàu giữ vững giữa sóng",
      condition: (c) => c.indicators.stability >= 7,
    },
    {
      id: "worker-upskill-runner",
      roleId: "worker",
      title: "Người Chạy Trước Công Nghệ",
      academicName: "Thích nghi năng suất",
      description: "Bạn ưu tiên nâng kỹ năng để không bị bỏ lại.",
      strengths: "Tăng giá trị lao động dài hạn.",
      risks: "Tốn thời gian và chi phí học lại.",
      quote: "Kỹ năng mới là bảo hiểm tốt nhất của người lao động.",
      vibe: "GIF: công nhân học máy mới",
      condition: (c) => c.roleScore >= 2,
    },
    fallbackRoleEnding("worker"),
  ],
  citizen: [
    {
      id: "citizen-balance-keeper",
      roleId: "citizen",
      title: "Người Giữ Nhịp Sống",
      academicName: "Phúc lợi tiêu dùng bền vững",
      description: "Bạn buộc hệ thống quay về giá trị sử dụng thật cho người dân.",
      strengths: "Sức mua và niềm tin tiêu dùng tăng.",
      risks: "Cần minh bạch dữ liệu và giám sát liên tục.",
      quote: "Thị trường tốt là thị trường để người dân sống được.",
      vibe: "GIF: gia đình mua sắm vui vẻ",
      condition: (c) => c.roleScore >= 6 && c.system.socialTrust >= 2,
    },
    {
      id: "citizen-price-warrior",
      roleId: "citizen",
      title: "Thợ Săn Giá Rẻ",
      academicName: "Tối ưu ngắn hạn tiêu dùng",
      description: "Bạn ưu tiên giá rẻ trước mắt, chấp nhận rủi ro chất lượng dài hạn.",
      strengths: "Giảm áp lực chi tiêu tạm thời.",
      risks: "Có thể tiếp tay cho thị trường kém minh bạch.",
      quote: "Rẻ hôm nay có thể đắt hơn vào ngày mai.",
      vibe: "GIF: giỏ hàng đầy nhưng vẻ mặt lo lắng",
      condition: (c) => c.system.marketHealth <= -2,
    },
    {
      id: "citizen-rights-guardian",
      roleId: "citizen",
      title: "Người Gác Quyền Lợi",
      academicName: "Công dân giám sát thị trường",
      description: "Bạn đòi minh bạch thông tin và trách nhiệm giải trình.",
      strengths: "Nâng chất lượng cạnh tranh thị trường.",
      risks: "Kết quả cải thiện cần thời gian.",
      quote: "Minh bạch không xa xỉ, đó là điều kiện tối thiểu.",
      vibe: "GIF: kính lúp soi nhãn sản phẩm",
      condition: (c) => c.roleScore >= 2,
    },
    {
      id: "citizen-silent-majority",
      roleId: "citizen",
      title: "Đa Số Im Lặng",
      academicName: "Thích nghi thụ động",
      description: "Bạn chịu đựng biến động thay vì tạo sức ép thay đổi.",
      strengths: "Giữ ổn định tâm lý ngắn hạn.",
      risks: "Quyền lợi tiêu dùng dễ bị xâm mòn.",
      quote: "Im lặng không có nghĩa là không có chi phí.",
      vibe: "GIF: hàng người xếp hàng lặng lẽ",
      condition: (c) => c.indicators.stability >= 6,
    },
    fallbackRoleEnding("citizen"),
  ],
};

export function createEmptySystemEffect(): SystemEffect {
  return { rigidity: 0, socialTrust: 0, marketHealth: 0, conflict: 0 };
}

export function createInitialRoleDeviationBudget(): Record<RoleId, number> {
  return {
    state: ROLE_DEVIATION_CONFIG.state.budget,
    business: ROLE_DEVIATION_CONFIG.business.budget,
    worker: ROLE_DEVIATION_CONFIG.worker.budget,
    citizen: ROLE_DEVIATION_CONFIG.citizen.budget,
  };
}

export function createEmptyRoleCountMap(): Record<RoleId, number> {
  return { state: 0, business: 0, worker: 0, citizen: 0 };
}

export function createEmptyRoleFlagMap(): Record<RoleId, boolean> {
  return { state: false, business: false, worker: false, citizen: false };
}

export function createEmptyRoundEffect(): RoundEffect {
  return {
    growth: 0,
    equity: 0,
    stability: 0,
    rolePoints: { state: 0, business: 0, worker: 0, citizen: 0 },
    system: createEmptySystemEffect(),
  };
}

export function applyPartialRoundEffect(
  base: RoundEffect,
  partial: PartialRoundEffect | null | undefined
): RoundEffect {
  if (!partial) return { ...base, rolePoints: { ...base.rolePoints }, system: { ...base.system } };

  return {
    growth: base.growth + (partial.growth ?? 0),
    equity: base.equity + (partial.equity ?? 0),
    stability: base.stability + (partial.stability ?? 0),
    rolePoints: {
      state: base.rolePoints.state + (partial.rolePoints?.state ?? 0),
      business: base.rolePoints.business + (partial.rolePoints?.business ?? 0),
      worker: base.rolePoints.worker + (partial.rolePoints?.worker ?? 0),
      citizen: base.rolePoints.citizen + (partial.rolePoints?.citizen ?? 0),
    },
    system: {
      rigidity: base.system.rigidity + (partial.system?.rigidity ?? 0),
      socialTrust: base.system.socialTrust + (partial.system?.socialTrust ?? 0),
      marketHealth: base.system.marketHealth + (partial.system?.marketHealth ?? 0),
      conflict: base.system.conflict + (partial.system?.conflict ?? 0),
    },
  };
}

export function materializeOptionEffect(option: RoleChoiceOption): RoundEffect {
  return applyPartialRoundEffect(createEmptyRoundEffect(), {
    growth: option.macro.growth ?? 0,
    equity: option.macro.equity ?? 0,
    stability: option.macro.stability ?? 0,
    rolePoints: option.rolePoints,
    system: option.system,
  });
}

export function isRoleChoiceDeviation(roleId: RoleId, option: RoleChoiceOption | null): boolean {
  if (!option) return false;
  switch (roleId) {
    case "business":
      return (
        (option.rolePoints.business ?? 0) <= 0 ||
        (option.macro.growth ?? 0) < 0 ||
        (option.system.marketHealth ?? 0) < 0
      );
    case "state":
      return (option.macro.stability ?? 0) < 0 && (option.system.socialTrust ?? 0) < 0;
    case "worker":
      return (option.macro.equity ?? 0) < 0 && (option.rolePoints.worker ?? 0) <= 0;
    case "citizen":
      return (option.macro.equity ?? 0) < 0 || (option.system.socialTrust ?? 0) < 0;
    default:
      return false;
  }
}

export function getOverBudgetPenalty(roleId: RoleId, penaltyCount: number): number {
  const config = ROLE_DEVIATION_CONFIG[roleId];
  return Math.min(config.penaltyMax, config.penaltyBase + penaltyCount * config.penaltyStep);
}

export function resolveRoleOption(
  round: GameRound | undefined,
  roleId: RoleId,
  optionId: string | null | undefined
): RoleChoiceOption | null {
  if (!round || !optionId) return null;
  return round.roles[roleId].options.find((option) => option.id === optionId) ?? null;
}

export function matchesRoleRule(
  selections: Record<RoleId, string | null>,
  condition: Partial<Record<RoleId, string[]>>
): boolean {
  return (Object.keys(condition) as RoleId[]).every((roleId) => {
    const accepted = condition[roleId];
    if (!accepted?.length) return true;
    return selections[roleId] !== null && accepted.includes(selections[roleId] as string);
  });
}

export function resolveConditionalQuestion(
  roleConfig: RoundRoleConfig,
  selections: Record<RoleId, string | null>
): string {
  const variant = roleConfig.questionVariants?.find((item) => matchesRoleRule(selections, item.when));
  return variant?.question ?? roleConfig.question;
}

export function getHistoryEffect(historyItem: RoundHistoryItem): RoundEffect {
  if (historyItem.finalEffect) return historyItem.finalEffect;
  if (historyItem.effect) return historyItem.effect;
  return createEmptyRoundEffect();
}

export function computeRoleScores(roundHistory: RoundHistoryItem[]): Record<RoleId, number> {
  const scores: Record<RoleId, number> = { state: 0, business: 0, worker: 0, citizen: 0 };
  for (const hist of roundHistory) {
    const effect = getHistoryEffect(hist);
    for (const role of Object.keys(scores) as RoleId[]) {
      scores[role] += effect.rolePoints[role] ?? 0;
    }
  }
  return scores;
}

export function computeSystemScores(roundHistory: RoundHistoryItem[]): SystemScores {
  const scores: SystemScores = createEmptySystemEffect();
  for (const hist of roundHistory) {
    const effect = getHistoryEffect(hist);
    scores.rigidity += effect.system.rigidity;
    scores.socialTrust += effect.system.socialTrust;
    scores.marketHealth += effect.system.marketHealth;
    scores.conflict += effect.system.conflict;
  }
  return scores;
}

export function determineGlobalEnding(ctx: EndingContext): GlobalEnding {
  return GLOBAL_ENDINGS.find((ending) => ending.condition(ctx)) ?? GLOBAL_ENDINGS[GLOBAL_ENDINGS.length - 1];
}

export function determineRoleEnding(roleId: RoleId, ctx: RoleEndingContext): RoleEnding {
  const list = ROLE_ENDINGS[roleId];
  return list.find((ending) => ending.condition(ctx)) ?? list[list.length - 1];
}

export const ENDINGS = GLOBAL_ENDINGS;

export function determineEnding(indicators: Indicators): GlobalEnding {
  return determineGlobalEnding({
    indicators,
    roleScores: { state: 0, business: 0, worker: 0, citizen: 0 },
    system: { rigidity: 0, socialTrust: 0, marketHealth: 0, conflict: 0 },
  });
}

export function generateRoomCode(): string {
  const num = Math.floor(100 + Math.random() * 900);
  return `CBLI-${num}`;
}

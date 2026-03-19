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

export interface RoundRoleConfig {
  question: string;
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
  roles: Record<RoleId, RoundRoleConfig>;
  synergyRules: SynergyRule[];
  conflictRules: ConflictRule[];
  message: string;
  lesson: string;
}

export const GAME_ROUNDS: GameRound[] = [
  {
    id: 1,
    title: "Giá năng lượng tăng sốc",
    context:
      "Giá xăng dầu, điện tăng mạnh. Doanh nghiệp méo mặt vì chi phí đội lên, người lao động thấy lương chưa về mà ví đã bay màu, người dân thì mỗi lần đổ xăng như bị critical damage.",
    roles: {
      state: {
        question:
          "Giá đang nhảy như coin meme, bên Nhà nước chốt bài nào để đỡ sốc mà không phá game?",
        options: [
          {
            id: "A",
            label: "Giảm chút thuế phí, cứu đúng chỗ",
            text:
              "Giảm bớt một phần thuế, phí với xăng dầu/điện và mở gói trợ giá có mục tiêu cho nhóm dễ tổn thương, kèm thời hạn và điều kiện rõ ràng.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { rigidity: -1, socialTrust: 2, marketHealth: 1, conflict: -2 },
          },
          {
            id: "B",
            label: "Thị trường tự bơi",
            text:
              "Không can thiệp thuế/phí hay trợ giá, để giá năng lượng tiếp tục do thị trường tự điều chỉnh.",
            rolePoints: { state: -1 },
            macro: { growth: 1, equity: -2, stability: -2 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
          {
            id: "C",
            label: "Chặn giá cứng luôn",
            text:
              "Đặt trần giá năng lượng áp dụng rộng rãi, buộc doanh nghiệp giữ giá dưới một ngưỡng nhất định trong một thời gian.",
            rolePoints: { state: -1 },
            macro: { growth: -2, equity: 1, stability: -1 },
            system: { rigidity: 2, socialTrust: 0, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Thôi ráng, tiền để đầu tư",
            text:
              "Không trợ giá trực tiếp, dồn nguồn lực vào đầu tư công và chấp nhận để giá năng lượng cao hơn trong ngắn hạn.",
            rolePoints: { state: 1 },
            macro: { growth: 2, equity: -1, stability: -1 },
            system: { rigidity: 0, socialTrust: -1, marketHealth: 1, conflict: 1 },
          },
        ],
      },
      business: {
        question:
          "Chi phí đầu vào tăng như có ai buff lửa. Doanh nghiệp xử lý sao cho khỏi toang?",
        options: [
          {
            id: "A",
            label: "Gồng nhẹ, tối ưu vận hành",
            text:
              "Tập trung tiết kiệm năng lượng, tối ưu logistics, chưa tăng giá mạnh với khách hàng.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { marketHealth: 2, socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Pass hết sang khách",
            text:
              "Chuyển phần lớn chi phí tăng thêm sang giá bán, chấp nhận khách hàng chịu thiệt.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -2, stability: -1 },
            system: { marketHealth: -1, socialTrust: -2, conflict: 2 },
          },
          {
            id: "C",
            label: "Cắt phúc lợi để giữ lãi",
            text:
              "Giảm trợ cấp, siết chi phí lao động và phúc lợi để bảo toàn biên lợi nhuận.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -2, stability: -2 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Đầu tư công nghệ tiết kiệm điện",
            text:
              "Đầu tư công nghệ tiết kiệm năng lượng, chấp nhận đau ngắn hạn để khỏe dài hạn.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 0, stability: 1 },
            system: { marketHealth: 2, socialTrust: 0, conflict: -1 },
          },
        ],
      },
      worker: {
        question:
          "Giá cả tăng mà lương đứng hình. Team lao động phản ứng kiểu nào?",
        options: [
          {
            id: "A",
            label: "Đòi phụ cấp ngay",
            text:
              "Đòi doanh nghiệp chi thêm phụ cấp xăng xe/điện nước để bù chi phí sinh hoạt.",
            rolePoints: { worker: 2 },
            macro: { equity: 2, stability: 0 },
            system: { socialTrust: 0, conflict: 1 },
          },
          {
            id: "B",
            label: "Thương lượng có lộ trình",
            text:
              "Chấp nhận thương lượng theo lộ trình, miễn có cam kết tăng lương/phụ cấp rõ ràng.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "C",
            label: "Bùng căng luôn",
            text:
              "Nghỉ việc hoặc đình công mạnh để gây áp lực, chấp nhận rủi ro việc làm.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, equity: 1, stability: -2 },
            system: { socialTrust: -1, conflict: 3 },
          },
          {
            id: "D",
            label: "Cắn răng giữ việc",
            text:
              "Tạm thời chấp nhận giữ việc, lùi đòi hỏi lại để chờ thời điểm thuận lợi hơn.",
            rolePoints: { worker: 0 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { socialTrust: -1, conflict: 0 },
          },
        ],
      },
      citizen: {
        question:
          "Xăng điện tăng, ví mỏng dần. Người dân chọn mode sinh tồn nào?",
        options: [
          {
            id: "A",
            label: "Cắt bớt chi tiêu",
            text:
              "Cắt giảm các khoản chi không thật sự cần thiết, ưu tiên nhu yếu phẩm.",
            rolePoints: { citizen: 1 },
            macro: { growth: -1, stability: 1 },
            system: { conflict: -1 },
          },
          {
            id: "B",
            label: "Ủng hộ hỗ trợ đúng chỗ",
            text:
              "Ủng hộ các chính sách hỗ trợ đúng người đúng lúc, tập trung vào nhóm dễ tổn thương.",
            rolePoints: { citizen: 2 },
            macro: { equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "C",
            label: "Ép phải ghìm giá",
            text:
              "Đòi hỏi phải ghìm giá hàng loạt, mọi thứ đều phải rẻ, bất chấp chi phí hệ thống.",
            rolePoints: { citizen: 1 },
            macro: { equity: 1, stability: -1 },
            system: { rigidity: 2, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Ai mạnh người nấy sống",
            text:
              "Không quan tâm tới cơ chế hỗ trợ, chỉ nghĩ tới việc tự lo cho mình.",
            rolePoints: { citizen: -1 },
            macro: { equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 1 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "energy-soft-landing",
        label: "Phối hợp hạ sốc",
        text:
          "Nhà nước điều tiết vừa phải, doanh nghiệp không đẩy hết gánh nặng, người lao động thương lượng còn người dân ủng hộ hỗ trợ đúng mục tiêu.",
        if: {
          state: ["A"],
          business: ["A", "D"],
          worker: ["B"],
          citizen: ["B"],
        },
        bonus: {
          growth: 1,
          equity: 1,
          stability: 2,
          system: { socialTrust: 2, conflict: -2 },
        },
      },
    ],
    conflictRules: [
      {
        id: "energy-hard-clash",
        label: "Ghìm giá, xung đột tăng",
        text:
          "Kiểm soát cứng trong khi doanh nghiệp và lao động phản ứng mạnh khiến hệ thống mất ổn định nhanh.",
        if: {
          state: ["C"],
          business: ["B", "C"],
          worker: ["C"],
          citizen: ["C"],
        },
        penalty: {
          stability: -2,
          system: { marketHealth: -2, conflict: 3, rigidity: 2 },
        },
      },
    ],
    message: "Điều tiết khôn ngoan không triệt tiêu thị trường mà làm mềm cú sốc để hệ thống tự cân bằng lại.",
    lesson: "Tăng trưởng ngắn hạn không thể đạt trên chi phí xã hội quá lớn.",
  },
  {
    id: 2,
    title: "Mâu thuẫn tiền lương và lợi nhuận",
    context:
      "Đơn hàng sát hạn, doanh nghiệp than khó, người lao động bức xúc vì lương không theo kịp giá. Không xử lý khéo là combat ngay tại xưởng.",
    roles: {
      state: {
        question:
          "Hai bên sắp solo, Nhà nước nhảy vào kiểu gì cho bớt drama?",
        options: [
          {
            id: "A",
            label: "Khung lộ trình + thưởng năng suất",
            text:
              "Ra khung tăng lương theo lộ trình và gắn thưởng năng suất, tạo không gian thương lượng có ràng buộc.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { rigidity: -1, socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "B",
            label: "Ép tăng lương đồng loạt",
            text:
              "Ép tăng lương tối thiểu đồng loạt trong thời gian rất ngắn, ưu tiên dập lửa ngay.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 2, stability: -1 },
            system: { rigidity: 1, marketHealth: -1, conflict: 1 },
          },
          {
            id: "C",
            label: "Giữ sức DN, lương tính sau",
            text:
              "Ưu tiên giữ sức doanh nghiệp, lùi câu chuyện tăng lương lại để bảo vệ đơn hàng.",
            rolePoints: { state: -1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Kệ hai bên tự deal",
            text:
              "Không đặt khuôn khổ thương lượng, để doanh nghiệp và người lao động tự xử và tự chịu kết quả.",
            rolePoints: { state: -1 },
            macro: { growth: 0, equity: -1, stability: -2 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
        ],
      },
      business: {
        question:
          "Nhân sự đang nóng, lợi nhuận thì không phải vô hạn. Doanh nghiệp chốt bài gì?",
        options: [
          {
            id: "A",
            label: "Tăng từ từ + KPI rõ",
            text:
              "Tăng lương từ từ nhưng có KPI thưởng rõ ràng, gắn quyền lợi với hiệu quả.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { marketHealth: 2, socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Không tăng, giữ đơn hàng",
            text:
              "Giữ nguyên lương, ưu tiên giữ giá thành và đơn hàng trong bối cảnh cạnh tranh.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "C",
            label: "Tăng mạnh để dập lửa",
            text:
              "Tăng lương nhanh để dập xung đột, chấp nhận biên lợi nhuận ngắn hạn giảm.",
            rolePoints: { business: 0 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { marketHealth: -1, conflict: -1 },
          },
          {
            id: "D",
            label: "Tái cơ cấu, giảm người",
            text:
              "Cắt giảm nhân sự để giảm áp lực chi phí, giữ biên lợi nhuận cho phần còn lại.",
            rolePoints: { business: 0 },
            macro: { growth: 0, equity: -2, stability: -2 },
            system: { socialTrust: -2, conflict: 2 },
          },
        ],
      },
      worker: {
        question:
          "Team worker muốn được tôn trọng chứ không muốn thành NPC. Chọn gì?",
        options: [
          {
            id: "A",
            label: "Đòi tăng ngay",
            text:
              "Đòi tăng lương ngay lập tức để bắt kịp chi phí sống.",
            rolePoints: { worker: 2 },
            macro: { equity: 2, stability: -1 },
            system: { conflict: 1 },
          },
          {
            id: "B",
            label: "Nhận lộ trình + thưởng",
            text:
              "Chấp nhận lộ trình tăng lương và thưởng năng suất nếu cam kết đủ rõ.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "C",
            label: "Đình công cảnh báo",
            text:
              "Tổ chức đình công hoặc cảnh báo để gây sức ép, chấp nhận rủi ro sản xuất.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, stability: -2 },
            system: { conflict: 3 },
          },
          {
            id: "D",
            label: "Im, giữ việc",
            text:
              "Không lên tiếng, ưu tiên giữ việc và tránh xung đột.",
            rolePoints: { worker: 0 },
            macro: { equity: -1, stability: 0 },
            system: { socialTrust: -1 },
          },
        ],
      },
      citizen: {
        question:
          "Người dân đứng ngoài nhìn drama này và nghĩ gì là hợp lý nhất?",
        options: [
          {
            id: "A",
            label: "Ủng hộ thỏa hiệp đôi bên",
            text:
              "Ủng hộ các phương án dung hòa để cả doanh nghiệp lẫn người lao động cùng sống được.",
            rolePoints: { citizen: 2 },
            macro: { equity: 1, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Đứng hẳn về phía lao động",
            text:
              "Ủng hộ mạnh mẽ phía người lao động trong yêu cầu tăng lương.",
            rolePoints: { citizen: 1 },
            macro: { equity: 2, stability: 0 },
            system: { conflict: 1 },
          },
          {
            id: "C",
            label: "Giữ giá hàng cho dân",
            text:
              "Ưu tiên giữ giá hàng hóa, không muốn doanh nghiệp đẩy chi phí sang người tiêu dùng.",
            rolePoints: { citizen: 1 },
            macro: { growth: 0, equity: 1, stability: 1 },
            system: { marketHealth: 1 },
          },
          {
            id: "D",
            label: "Miễn rẻ là được",
            text:
              "Không quan tâm phía nào, miễn giá cuối cùng rẻ là được.",
            rolePoints: { citizen: -1 },
            macro: { equity: -1 },
            system: { socialTrust: -1 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "wage-negotiated-balance",
        label: "Thương lượng có neo",
        text:
          "Khi Nhà nước tạo khung, doanh nghiệp tăng theo lộ trình và lao động chấp nhận cơ chế thưởng, hệ thống dễ ổn định hơn.",
        if: {
          state: ["A"],
          business: ["A"],
          worker: ["B"],
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
        id: "wage-free-for-all",
        label: "Mặc ai nấy xoay",
        text:
          "Nếu Nhà nước đứng ngoài, doanh nghiệp cứng và lao động bùng nổ thì xung đột tăng rất nhanh.",
        if: {
          state: ["D"],
          business: ["B"],
          worker: ["C"],
          citizen: ["D"],
        },
        penalty: {
          stability: -3,
          system: { socialTrust: -2, conflict: 3 },
        },
      },
    ],
    message: "Mâu thuẫn lợi ích cần cơ chế đàm phán minh bạch, không thể xử lý bằng mệnh lệnh một chiều.",
    lesson: "Lợi ích của bên này thường là chi phí của bên kia nếu thiếu thiết kế thể chế.",
  },
  {
    id: 3,
    title: "Nông sản ùn tắc, chuỗi cung ứng đứt",
    context:
      "Nông sản vào vụ mà đầu ra nghẽn, giá tại nguồn rớt mạnh. Người sản xuất nhìn hàng đầy kho mà chỉ biết thở dài kiểu game này khó quá.",
    roles: {
      state: {
        question:
          "Nông sản đang kẹt cứng, Nhà nước mở map kiểu nào?",
        options: [
          {
            id: "A",
            label: "Logistics + sàn số + tín dụng",
            text:
              "Ưu tiên tháo điểm nghẽn bằng cách hỗ trợ logistics, kết nối nông dân với sàn thương mại số và mở gói tín dụng ngắn hạn cho khâu thu mua và phân phối.",
            rolePoints: { state: 2 },
            macro: { growth: 2, equity: 2, stability: 1 },
            system: { rigidity: -1, socialTrust: 1, marketHealth: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Nhà nước mua vào kéo dài",
            text:
              "Nhà nước đứng ra mua tạm trữ nông sản trong thời gian dài, dùng ngân sách để đỡ giá.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 1, stability: 0 },
            system: { rigidity: 2, marketHealth: -1 },
          },
          {
            id: "C",
            label: "Bảo hộ, dựng rào",
            text:
              "Đặt các biện pháp bảo hộ, hạn chế cạnh tranh và nhập khẩu để ưu tiên tiêu thụ nông sản trong nước.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 0, stability: -1 },
            system: { rigidity: 1, socialTrust: -1, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Thị trường tự xử",
            text:
              "Không triển khai hỗ trợ đặc biệt, để chuỗi cung ứng và giá cả tự điều chỉnh.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: -2, stability: -1 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
        ],
      },
      business: {
        question:
          "Hàng đang rẻ, nguồn đang nhiều. Doanh nghiệp xử sao để vừa ăn được vừa không bị chửi?",
        options: [
          {
            id: "A",
            label: "Thu mua + sơ chế + kho lạnh",
            text:
              "Mở thu mua, đầu tư sơ chế và kho lạnh để giữ giá trị nông sản.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 1 },
            system: { marketHealth: 2, socialTrust: 1 },
          },
          {
            id: "B",
            label: "Ép giá mạnh",
            text:
              "Tận dụng lúc nông dân yếu thế để ép giá sâu, tối đa hóa biên lợi nhuận.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "C",
            label: "Đẩy bán qua sàn",
            text:
              "Đẩy mạnh bán qua sàn online và kênh trực tiếp, rút ngắn trung gian.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 1 },
            system: { marketHealth: 2 },
          },
          {
            id: "D",
            label: "Đứng ngoài, đợi rẻ nữa",
            text:
              "Tạm thời không nhập thêm, chờ giá xuống sâu hơn rồi mới quay lại.",
            rolePoints: { business: 0 },
            macro: { growth: -1, equity: -1, stability: -1 },
            system: { socialTrust: -1 },
          },
        ],
      },
      worker: {
        question:
          "Team lao động trong chuỗi cung ứng làm gì để không bị cuốn theo cơn lag toàn hệ?",
        options: [
          {
            id: "A",
            label: "Tăng ca, bốc xếp, phân loại",
            text:
              "Sẵn sàng tăng ca, hỗ trợ bốc xếp và phân loại để đẩy hàng ra nhanh hơn.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, stability: 1 },
            system: { marketHealth: 1 },
          },
          {
            id: "B",
            label: "Đòi thêm tiền công",
            text:
              "Yêu cầu trả thêm tiền công vì khối lượng việc tăng mạnh.",
            rolePoints: { worker: 2 },
            macro: { equity: 2, stability: 0 },
            system: { conflict: 1 },
          },
          {
            id: "C",
            label: "Không rõ quyền lợi thì nghỉ",
            text:
              "Nếu không có quyền lợi rõ ràng, chấp nhận nghỉ việc, bỏ khỏi chuỗi.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, stability: -2 },
            system: { conflict: 2 },
          },
          {
            id: "D",
            label: "Học thêm kỹ năng bán, sàn số",
            text:
              "Đầu tư học thêm kỹ năng bán hàng và sử dụng sàn số để không bị lệ thuộc.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { marketHealth: 1, socialTrust: 1 },
          },
        ],
      },
      citizen: {
        question:
          "Nông sản rẻ mà nông dân vẫn khổ. Người dân phản ứng sao cho có tình có lý?",
        options: [
          {
            id: "A",
            label: "Mua ủng hộ, chọn kênh minh bạch",
            text:
              "Ưu tiên mua nông sản nội địa qua kênh minh bạch, chấp nhận bớt săn siêu rẻ.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Săn rẻ hết cỡ",
            text:
              "Chỉ quan tâm giá rẻ nhất, ép giá tối đa.",
            rolePoints: { citizen: 0 },
            macro: { equity: -1 },
            system: { socialTrust: -1 },
          },
          {
            id: "C",
            label: "Ủng hộ bán qua sàn",
            text:
              "Ưu tiên mua hàng qua sàn có truy xuất nguồn gốc rõ ràng.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { marketHealth: 2, socialTrust: 1 },
          },
          {
            id: "D",
            label: "Kệ, chuyện của nhà sản xuất",
            text:
              "Không quan tâm đến câu chuyện đằng sau giá, chỉ mua theo thói quen.",
            rolePoints: { citizen: -1 },
            macro: { equity: -1, stability: -1 },
            system: { socialTrust: -1 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "agri-open-flow",
        label: "Mở nút thắt chuỗi cung ứng",
        text:
          "Khi cả 4 vai cùng chọn hướng thông dòng chảy hàng hóa, hiệu quả và công bằng cùng được cải thiện.",
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
        id: "agri-everyone-for-self",
        label: "Mạnh ai nấy né",
        text:
          "Nếu các bên đều né trách nhiệm, chuỗi cung ứng càng tắc và niềm tin tụt tiếp.",
        if: {
          state: ["D"],
          business: ["B", "D"],
          worker: ["C"],
          citizen: ["B", "D"],
        },
        penalty: {
          growth: -2,
          equity: -2,
          stability: -2,
          system: { socialTrust: -2, conflict: 2 },
        },
      },
    ],
    message: "Hỗ trợ đúng là sửa điểm nghẽn thị trường chứ không bao cấp vô hạn.",
    lesson: "Công bằng và hiệu quả có thể đi cùng nhau nếu chọn đúng điểm can thiệp.",
  },
  {
    id: 4,
    title: "Niềm tin thị trường suy giảm",
    context:
      "Gian lận chất lượng, thổi thông tin, làm ăn nhập nhèm khiến người tiêu dùng mất niềm tin. Thị trường bắt đầu kiểu: không biết tin ai nữa luôn.",
    roles: {
      state: {
        question:
          "Thị trường đang mất trust, Nhà nước bật mode nào?",
        options: [
          {
            id: "A",
            label: "Siết luật + công khai + xử nghiêm",
            text:
              "Hoàn thiện pháp lý, công khai dữ liệu giám sát và xử lý nghiêm minh các vụ sai phạm.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Đâu cháy dập chỗ đó",
            text:
              "Không thay đổi khung lớn, chỉ xử lý từng vụ việc phát sinh.",
            rolePoints: { state: 0 },
            macro: { growth: 0, equity: 0, stability: -1 },
            system: { socialTrust: -1, marketHealth: -1, conflict: 1 },
          },
          {
            id: "C",
            label: "Nới tay cho DN đỡ mệt",
            text:
              "Nới lỏng kiểm tra và tiêu chuẩn một thời gian để giảm áp lực cho doanh nghiệp.",
            rolePoints: { state: -2 },
            macro: { growth: 1, equity: -2, stability: -2 },
            system: { rigidity: -1, socialTrust: -2, marketHealth: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Siết hành chính diện rộng",
            text:
              "Tăng mạnh kiểm tra hành chính, áp thêm nhiều thủ tục và chế tài.",
            rolePoints: { state: -1 },
            macro: { growth: -2, equity: 0, stability: -1 },
            system: { rigidity: 2, socialTrust: -1, marketHealth: -1, conflict: 1 },
          },
        ],
      },
      business: {
        question:
          "Thị trường đang nghi ngờ tất cả. Doanh nghiệp chơi bài gì để cứu danh tiếng?",
        options: [
          {
            id: "A",
            label: "Minh bạch full stack",
            text:
              "Minh bạch nguồn gốc, chất lượng, dữ liệu sản xuất và phân phối.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2 },
          },
          {
            id: "B",
            label: "PR mạnh, bên trong tính sau",
            text:
              "Đầu tư vào truyền thông hơn là sửa chất lượng thật sự.",
            rolePoints: { business: 0 },
            macro: { growth: 0, stability: -1 },
            system: { socialTrust: -2, conflict: 1 },
          },
          {
            id: "C",
            label: "Giảm chi phí kiểm soát chất lượng",
            text:
              "Tối giản khâu kiểm soát chất lượng để giảm chi phí.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -2 },
            system: { marketHealth: -2, socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Tự xây bộ chuẩn + bên thứ ba",
            text:
              "Tự xây bộ chuẩn và mời bên thứ ba kiểm định để tăng niềm tin.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2 },
          },
        ],
      },
      worker: {
        question:
          "Nếu thấy sai phạm trong chuỗi làm việc, worker xử lý sao?",
        options: [
          {
            id: "A",
            label: "Báo nội bộ, yêu cầu sửa",
            text:
              "Báo cáo nội bộ và yêu cầu sửa quy trình khi phát hiện sai phạm.",
            rolePoints: { worker: 2 },
            macro: { stability: 1 },
            system: { socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Im lặng cho lành",
            text:
              "Im lặng, coi như không thấy để tránh rắc rối.",
            rolePoints: { worker: 0 },
            macro: { equity: -1, stability: -1 },
            system: { socialTrust: -1 },
          },
          {
            id: "C",
            label: "Tố giác sai phạm nặng",
            text:
              "Tố giác ra bên ngoài khi sai phạm nghiêm trọng.",
            rolePoints: { worker: 2 },
            macro: { equity: 1, stability: 1 },
            system: { socialTrust: 2, conflict: 0 },
          },
          {
            id: "D",
            label: "Kệ, miễn có lương",
            text:
              "Không quan tâm tới hệ quả, miễn cuối tháng nhận lương.",
            rolePoints: { worker: -1 },
            macro: { equity: -1 },
            system: { socialTrust: -2 },
          },
        ],
      },
      citizen: {
        question:
          "Người dân nên phản ứng sao khi niềm tin thị trường tụt đáy?",
        options: [
          {
            id: "A",
            label: "Ưu tiên hàng minh bạch",
            text:
              "Ưu tiên mua hàng có nguồn gốc rõ ràng, minh bạch.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, stability: 1 },
            system: { socialTrust: 1, marketHealth: 1 },
          },
          {
            id: "B",
            label: "Tẩy chay bên làm láo",
            text:
              "Tẩy chay các doanh nghiệp gian lận, ủng hộ bên làm tử tế.",
            rolePoints: { citizen: 2 },
            macro: { equity: 1, stability: 1 },
            system: { socialTrust: 1, conflict: 0 },
          },
          {
            id: "C",
            label: "Ham rẻ bất chấp",
            text:
              "Chọn rẻ bằng mọi giá, không quan tâm chất lượng hay nguồn gốc.",
            rolePoints: { citizen: -1 },
            macro: { equity: -1, stability: -1 },
            system: { marketHealth: -1, socialTrust: -1 },
          },
          {
            id: "D",
            label: "Tin review mạng là đủ",
            text:
              "Chỉ tin review mạng, không kiểm chứng thêm.",
            rolePoints: { citizen: 0 },
            macro: { stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "trust-rebuild",
        label: "Khôi phục niềm tin",
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
        id: "trust-collapse",
        label: "Mất trust dây chuyền",
        text:
          "Khi quản lý lệch pha với doanh nghiệp làm ẩu, người lao động im lặng và người dân chọn bừa, niềm tin tụt rất nhanh.",
        if: {
          state: ["C", "D"],
          business: ["B", "C"],
          worker: ["B", "D"],
          citizen: ["C", "D"],
        },
        penalty: {
          stability: -2,
          system: { socialTrust: -3, marketHealth: -2, conflict: 2 },
        },
      },
    ],
    message: "Thị trường chỉ bền khi tự do đi cùng kỷ cương và minh bạch.",
    lesson: "Hoàn thiện thể chế là điều kiện để cạnh tranh công bằng.",
  },
  {
    id: 5,
    title: "Chốt gói định hướng 3 năm",
    context:
      "Sau 4 vòng sóng gió, giờ là lúc chốt định hướng 3 năm tới. Không chỉ là tăng trưởng, mà còn là câu chuyện xã hội có cân bằng không, niềm tin còn giữ được không.",
    roles: {
      state: {
        question:
          "Nếu phải chốt một hướng lớn cho 3 năm tới, Nhà nước pick gì?",
        options: [
          {
            id: "A",
            label: "Tăng trưởng thần tốc",
            text:
              "Ưu tiên tối đa cho tăng trưởng kinh tế, chấp nhận nới lỏng chuẩn công bằng và an sinh.",
            rolePoints: { state: -1 },
            macro: { growth: 2, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "B",
            label: "An sinh ngắn hạn là số 1",
            text:
              "Đặt trọng tâm vào mở rộng an sinh và hỗ trợ thu nhập trong ngắn hạn.",
            rolePoints: { state: 0 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { rigidity: 1, socialTrust: 1, marketHealth: -1 },
          },
          {
            id: "C",
            label: "Gói cân bằng ba mục tiêu",
            text:
              "Cân bằng: nâng năng suất, an sinh mục tiêu và kỷ cương thị trường.",
            rolePoints: { state: 2 },
            macro: { growth: 2, equity: 2, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "D",
            label: "Quản thật chặt cho chắc",
            text:
              "Tăng cường quản lý hành chính và kiểm soát mạnh để giữ trật tự.",
            rolePoints: { state: 0 },
            macro: { growth: -1, equity: -1, stability: 1 },
            system: { rigidity: 2, socialTrust: -1, marketHealth: -2, conflict: 1 },
          },
        ],
      },
      business: {
        question:
          "Doanh nghiệp muốn 3 năm tới sống khỏe kiểu nào?",
        options: [
          {
            id: "A",
            label: "Bơm tốc độ, chạy trước",
            text:
              "Đẩy mạnh tăng trưởng doanh thu và mở rộng thị trường càng nhanh càng tốt.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: -2, stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
          {
            id: "B",
            label: "Xin hỗ trợ nhiều cho an toàn",
            text:
              "Ưu tiên xin các gói hỗ trợ để giảm rủi ro kinh doanh.",
            rolePoints: { business: 0 },
            macro: { growth: 0, equity: 0, stability: 0 },
            system: { rigidity: 1, marketHealth: -1 },
          },
          {
            id: "C",
            label: "Đầu tư năng suất, minh bạch",
            text:
              "Đầu tư vào công nghệ, con người và quản trị để cạnh tranh tử tế, minh bạch lâu dài.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2 },
          },
          {
            id: "D",
            label: "Xin bảo hộ để đỡ đau",
            text:
              "Xin thêm cơ chế bảo hộ, hạn chế cạnh tranh để giảm áp lực.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { rigidity: 2, marketHealth: -2 },
          },
        ],
      },
      worker: {
        question:
          "Worker muốn tương lai 3 năm tới theo vibe nào?",
        options: [
          {
            id: "A",
            label: "Miễn có việc là được",
            text:
              "Ưu tiên việc làm ổn định, chấp nhận quyền lợi chưa tối ưu.",
            rolePoints: { worker: 0 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -1 },
          },
          {
            id: "B",
            label: "Phúc lợi trước mắt",
            text:
              "Ưu tiên phúc lợi và hỗ trợ hiện tại, chấp nhận tăng trưởng chậm hơn.",
            rolePoints: { worker: 2 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { socialTrust: 1 },
          },
          {
            id: "C",
            label: "Lương, kỹ năng, cơ hội cùng lên",
            text:
              "Muốn vừa nâng lương, vừa nâng kỹ năng và cơ hội thăng tiến.",
            rolePoints: { worker: 2 },
            macro: { growth: 2, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "D",
            label: "Quản chặt để đỡ bất ổn",
            text:
              "Chấp nhận thêm kiểm soát để bớt loạn, dù cơ hội có thể hẹp hơn.",
            rolePoints: { worker: 0 },
            macro: { stability: 1, equity: -1 },
            system: { rigidity: 2, marketHealth: -1 },
          },
        ],
      },
      citizen: {
        question:
          "Nếu phải vote cho một tương lai 3 năm tới, người dân chọn gói nào?",
        options: [
          {
            id: "A",
            label: "Miễn kinh tế chạy mạnh",
            text:
              "Chấp nhận chịu thiệt ít nhiều miễn kinh tế chạy nhanh.",
            rolePoints: { citizen: 0 },
            macro: { growth: 2, equity: -2, stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
          {
            id: "B",
            label: "Đỡ khổ trước đã",
            text:
              "Ưu tiên chính sách giúp đỡ nhóm đang khó khăn trong ngắn hạn.",
            rolePoints: { citizen: 2 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { socialTrust: 1 },
          },
          {
            id: "C",
            label: "Tăng trưởng nhưng phải công bằng",
            text:
              "Muốn tăng trưởng nhưng đi kèm công bằng và đáng tin, không bỏ ai lại phía sau.",
            rolePoints: { citizen: 2 },
            macro: { growth: 2, equity: 2, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "D",
            label: "Kiểm soát mạnh cho chắc cú",
            text:
              "Ủng hộ kiểm soát mạnh để tránh sốc, dù cơ hội có thể ít hơn.",
            rolePoints: { citizen: 0 },
            macro: { stability: 1, equity: -1 },
            system: { rigidity: 2, marketHealth: -2 },
          },
        ],
      },
    },
    synergyRules: [
      {
        id: "three-year-balanced-growth",
        label: "Đồng thuận cân bằng",
        text:
          "Khi cả 4 vai cùng chấp nhận bài toán tăng trưởng đi cùng công bằng và kỷ cương, hệ thống đạt trạng thái đẹp nhất.",
        if: {
          state: ["C"],
          business: ["C"],
          worker: ["C"],
          citizen: ["C"],
        },
        bonus: {
          growth: 2,
          equity: 2,
          stability: 2,
          system: { socialTrust: 3, marketHealth: 2, conflict: -3 },
        },
      },
    ],
    conflictRules: [
      {
        id: "growth-vs-protection",
        label: "Tăng trưởng vọt nhưng xã hội lệch pha",
        text:
          "Khi Nhà nước và doanh nghiệp lao lên tăng trưởng còn lao động và người dân đòi bù đắp mạnh, hệ thống khó giữ ổn định.",
        if: {
          state: ["A"],
          business: ["A"],
          worker: ["B"],
          citizen: ["B"],
        },
        penalty: {
          stability: -2,
          system: { socialTrust: -2, conflict: 2 },
        },
      },
      {
        id: "locked-economy",
        label: "Khóa cứng toàn hệ",
        text:
          "Nếu cả 4 vai cùng nghiêng về kiểm soát cứng, thị trường sẽ thiếu động lực phát triển.",
        if: {
          state: ["D"],
          business: ["D"],
          worker: ["D"],
          citizen: ["D"],
        },
        penalty: {
          growth: -2,
          system: { marketHealth: -3, rigidity: 3 },
        },
      },
    ],
    message: "Không có chiến thắng tuyệt đối cho một bên. Kết quả bền vững đến từ cân bằng lợi ích.",
    lesson: "Bài học trung tâm: cân bằng tăng trưởng, công bằng xã hội và ổn định thị trường.",
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
  countdown: number;
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
    title: "Phát Triển Hài Hòa",
    description: "Tăng trưởng, công bằng và ổn định cùng đạt ngưỡng cao. Bàn chơi tìm được điểm cân bằng bền.",
    quote: "Khi luật chơi rõ ràng, lợi ích khác nhau vẫn có thể đồng thuận.",
    vibe: "GIF: cả nhóm đập tay ăn mừng sau cuộc họp",
    condition: (c) => c.indicators.growth >= 8 && c.indicators.equity >= 8 && c.indicators.stability >= 8 && c.system.socialTrust >= 4,
    color: "#4aad6e",
    icon: "🌿",
  },
  {
    id: "growth-at-all-costs",
    title: "Tăng Trưởng Bằng Mọi Giá",
    description: "Tăng trưởng cao nhưng công bằng và niềm tin xã hội suy yếu.",
    quote: "Đi quá nhanh không có nghĩa là đi xa.",
    vibe: "GIF: xe đua cán đích nhưng phanh bốc khói",
    condition: (c) => c.indicators.growth >= 8 && (c.indicators.equity <= 5 || c.system.socialTrust <= -2),
    color: "#e8943a",
    icon: "🚀",
  },
  {
    id: "stable-but-stifled",
    title: "Ổn Định Nhưng Ngột Ngạt",
    description: "Biến động thấp nhưng động lực đổi mới suy giảm vì quản trị quá cứng.",
    quote: "An toàn tuyệt đối đôi khi là kẻ thù của tiến bộ.",
    vibe: "GIF: biểu đồ đi ngang kéo dài",
    condition: (c) => c.indicators.stability >= 7 && c.system.rigidity >= 4 && c.indicators.growth <= 6,
    color: "#4a8fe8",
    icon: "🧊",
  },
  {
    id: "market-imbalance",
    title: "Thị Trường Mất Cân Bằng",
    description: "Tín hiệu giá méo mó, sức khỏe thị trường giảm và nguồn lực phân bổ kém hiệu quả.",
    quote: "Thị trường yếu không vì thiếu tiền, mà vì thiếu niềm tin.",
    vibe: "GIF: bàn cân nghiêng mạnh một phía",
    condition: (c) => c.system.marketHealth <= -3 && c.indicators.stability <= 6,
    color: "#e0624a",
    icon: "📉",
  },
  {
    id: "social-friction",
    title: "Xã Hội Căng Cứng",
    description: "Mâu thuẫn lợi ích tích tụ thành xung đột rộng, chi phí phối hợp xã hội tăng cao.",
    quote: "Mỗi quyết định trì hoãn hôm nay là xung đột của ngày mai.",
    vibe: "GIF: phòng họp tranh luận căng thẳng",
    condition: (c) => c.system.conflict >= 4 && c.indicators.equity <= 6,
    color: "#d35454",
    icon: "🔥",
  },
  {
    id: "welfare-overstretched",
    title: "An Sinh Gồng Gánh",
    description: "An sinh được ưu tiên cao nhưng động lực tăng trưởng yếu, ngân sách chịu áp lực dài hạn.",
    quote: "An sinh bền khi có nguồn thu bền.",
    vibe: "GIF: người gánh tải nặng nhưng vẫn bước tiếp",
    condition: (c) => c.indicators.equity >= 8 && c.indicators.growth <= 5,
    color: "#6cbf7d",
    icon: "🛟",
  },
  {
    id: "rules-bent",
    title: "Luật Chơi Bị Bẻ Cong",
    description: "Thực dụng ngắn hạn lấn át nguyên tắc dài hạn, làm suy yếu kỷ cương thị trường.",
    quote: "Luật chơi bị bẻ cong hôm nay sẽ trả giá bằng bất ổn ngày mai.",
    vibe: "GIF: thước đo bị bẻ gãy",
    condition: (c) => c.system.marketHealth <= -1 && c.system.socialTrust <= -1 && c.system.rigidity <= -2,
    color: "#9b6a4b",
    icon: "🧱",
  },
  {
    id: "total-gridlock",
    title: "Bế Tắc Toàn Diện",
    description: "Ba chỉ số cốt lõi cùng yếu, xung đột lợi ích cao và hệ thống mất hướng điều phối.",
    quote: "Không quyết được cũng là một quyết định, và thường là quyết định đắt nhất.",
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
  title: "Kẻ Phá Vỡ Cân Bằng",
  academicName: "Lệch pha lợi ích",
  description: "Vai của bạn chưa đạt được trạng thái tối ưu trong cấu trúc lợi ích hiện tại.",
  strengths: "Nhìn thấy rõ chi phí của các quyết định lệch trục.",
  risks: "Vai trò bị thiệt trong phân bổ lợi ích chung.",
  quote: "Khi cân bằng vỡ, ai cũng phải trả giá.",
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

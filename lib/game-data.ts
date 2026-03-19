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
      "Giá xăng dầu và điện cùng leo thang. Doanh nghiệp thấy chi phí đội lên từng ngày, người lao động thấy lương chưa tăng mà ví đã mỏng đi, còn người dân thì mỗi lần đổ xăng là một lần tụt mood.",
    roles: {
      state: {
        question:
          "Giá đang nhảy như coin meme. Nếu là Nhà nước, bạn chốt hướng nào để hạ sốc mà không làm ngân sách và thị trường lệch pha?",
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
            macro: { growth: 1, equity: -2, stability: -2 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
          {
            id: "C",
            label: "Chặn giá cứng luôn",
            text:
              "Đặt trần giá diện rộng để ghìm giá ngay cho toàn thị trường. Dễ trấn an tâm lý nhanh, nhưng nếu kéo dài thì dễ méo tín hiệu giá và bóp nghẹt động lực cung ứng.",
            rolePoints: { state: -1 },
            macro: { growth: -2, equity: 1, stability: -1 },
            system: { rigidity: 2, socialTrust: 0, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Thôi ráng, tiền để đầu tư",
            text:
              "Không hỗ trợ trực tiếp ngay, dồn nguồn lực cho đầu tư công và hạ tầng năng lượng. Lợi về dài hạn, nhưng ngắn hạn thì dân và doanh nghiệp phải tự gồng nhiều hơn.",
            rolePoints: { state: 1 },
            macro: { growth: 2, equity: -1, stability: -1 },
            system: { rigidity: 0, socialTrust: -1, marketHealth: 1, conflict: 1 },
          },
        ],
      },
      business: {
        question:
          "Chi phí đầu vào bị buff lửa liên tục. Nếu là doanh nghiệp, bạn chọn cách nào để đỡ toang mà vẫn còn cửa sống dài hạn?",
        options: [
          {
            id: "A",
            label: "Gồng nhẹ, tối ưu vận hành",
            text:
              "Tạm gồng bằng cách tiết kiệm năng lượng, tối ưu logistics và chưa đẩy giá quá mạnh sang khách. Lãi mỏng đi một chút nhưng giữ được quan hệ với thị trường.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { marketHealth: 2, socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Pass hết sang khách",
            text:
              "Đẩy phần lớn chi phí sang giá bán để bảo toàn biên lợi nhuận. Doanh nghiệp đỡ đau hơn, nhưng người dân và sức mua sẽ là bên lãnh đủ.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -2, stability: -1 },
            system: { marketHealth: -1, socialTrust: -2, conflict: 2 },
          },
          {
            id: "C",
            label: "Cắt phúc lợi để giữ lãi",
            text:
              "Siết phụ cấp, phúc lợi và các khoản mềm để giữ lợi nhuận. Cách này cứu sổ sách ngắn hạn nhưng rất dễ làm quan hệ lao động căng lên.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -2, stability: -2 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Đầu tư công nghệ tiết kiệm điện",
            text:
              "Đầu tư công nghệ tiết kiệm năng lượng, chấp nhận đau vốn ban đầu để giảm phụ thuộc về sau. Đòn này không cứu ngay lập tức, nhưng mở cửa sống khỏe lâu hơn.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 0, stability: 1 },
            system: { marketHealth: 2, socialTrust: 0, conflict: -1 },
          },
        ],
      },
      worker: {
        question:
          "Giá cả leo thang mà lương đứng hình. Nếu là người lao động, bạn phản ứng sao để bảo vệ mình mà không tự đẩy mình vào thế khó hơn?",
        options: [
          {
            id: "A",
            label: "Đòi phụ cấp ngay",
            text:
              "Yêu cầu phụ cấp xăng xe hoặc điện nước ngay để bù chi phí sống. Bạn đỡ hụt hơi nhanh, nhưng doanh nghiệp sẽ thấy áp lực chi phí tăng tức thì.",
            rolePoints: { worker: 2 },
            macro: { equity: 2, stability: 0 },
            system: { socialTrust: 0, conflict: 1 },
          },
          {
            id: "B",
            label: "Thương lượng có lộ trình",
            text:
              "Chấp nhận đi theo lộ trình nếu doanh nghiệp cam kết rõ chuyện tăng lương hoặc phụ cấp. Bạn chưa được hết ngay, nhưng đổi lại cơ hội giữ việc và giữ nhịp sản xuất tốt hơn.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "C",
            label: "Bùng căng luôn",
            text:
              "Đình công hoặc nghỉ việc mạnh để ép doanh nghiệp phải nhượng bộ. Cách này tạo sức ép lớn, nhưng cũng dễ làm sản xuất gãy nhịp và rủi ro việc làm tăng lên.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, equity: 1, stability: -2 },
            system: { socialTrust: -1, conflict: 3 },
          },
          {
            id: "D",
            label: "Cắn răng giữ việc",
            text:
              "Tạm gác yêu cầu lại để giữ việc trước đã. Ít xung đột hơn thật, nhưng phần thiệt ngắn hạn gần như dồn hết về phía người lao động.",
            rolePoints: { worker: 0 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { socialTrust: -1, conflict: 0 },
          },
        ],
      },
      citizen: {
        question:
          "Xăng điện tăng làm ví mỏng dần. Nếu là người dân, bạn sẽ ủng hộ kiểu phản ứng nào để bảo vệ đời sống của mình?",
        options: [
          {
            id: "A",
            label: "Cắt bớt chi tiêu",
            text:
              "Cắt bớt các khoản chưa quá cần để ưu tiên nhu yếu phẩm. Gia đình đỡ sốc hơn, nhưng tổng cầu và sức mua chung cũng chậm lại.",
            rolePoints: { citizen: 1 },
            macro: { growth: -1, stability: 1 },
            system: { conflict: -1 },
          },
          {
            id: "B",
            label: "Ủng hộ hỗ trợ đúng chỗ",
            text:
              "Ủng hộ kiểu hỗ trợ đúng người, đúng lúc thay vì rải đều cho tất cả. Cách này nghe có vẻ ít 'sướng' ngay, nhưng công bằng và bền hơn cho cả hệ thống.",
            rolePoints: { citizen: 2 },
            macro: { equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "C",
            label: "Ép phải ghìm giá",
            text:
              "Muốn ghìm giá thật mạnh để thứ gì cũng phải rẻ ngay. Dễ thấy lợi trước mắt, nhưng chi phí thật thường sẽ bị đẩy ngược lại sang doanh nghiệp hoặc ngân sách.",
            rolePoints: { citizen: 1 },
            macro: { equity: 1, stability: -1 },
            system: { rigidity: 2, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Ai mạnh người nấy sống",
            text:
              "Không kỳ vọng hỗ trợ gì cả, ai lo được cho mình thì lo. Cách này nghe thực dụng, nhưng niềm tin xã hội và cảm giác công bằng sẽ rơi khá nhanh.",
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
          stability: -3,
          system: { marketHealth: -3, conflict: 4, rigidity: 3 },
        },
      },
    ],
    message: "Cùng một cú sốc năng lượng, mỗi bên đều nhìn từ cái đau của mình: Nhà nước sợ lệch vĩ mô, doanh nghiệp sợ lỗ, lao động sợ hụt sống, người dân sợ chi phí đội lên từng ngày.",
    lesson: "Nếu ai cũng đẩy phần đau sang người khác, hệ thống sẽ mất ổn định rất nhanh; còn nếu biết chia sẻ cú sốc hợp lý, xã hội sẽ dễ thở hơn.",
  },
  {
    id: 2,
    title: "Mâu thuẫn tiền lương và lợi nhuận",
    context:
      "Đơn hàng sát hạn, doanh nghiệp than chi phí quá căng, người lao động thì bức xúc vì lương không theo kịp giá. Chỉ cần lệch một nhịp là từ căng thẳng chuyển sang combat ngay.",
    roles: {
      state: {
        question:
          "Doanh nghiệp và người lao động đang chuẩn bị solo. Nếu là Nhà nước, bạn nhảy vào kiểu nào để hạ nhiệt mà vẫn giữ được sản xuất?",
        options: [
          {
            id: "A",
            label: "Khung lộ trình + thưởng năng suất",
            text:
              "Đặt khung tăng lương theo lộ trình, gắn với thưởng năng suất để hai bên còn chỗ thương lượng. Không bên nào được tất cả ngay, nhưng xung đột dễ hạ nhiệt hơn.",
            rolePoints: { state: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { rigidity: -1, socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "B",
            label: "Ép tăng lương đồng loạt",
            text:
              "Ép tăng lương đồng loạt trong thời gian ngắn để dập lửa ngay. Người lao động đỡ bức xúc nhanh, nhưng doanh nghiệp có thể phản ứng mạnh vì chi phí tăng sốc.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 2, stability: -1 },
            system: { rigidity: 1, marketHealth: -1, conflict: 1 },
          },
          {
            id: "C",
            label: "Giữ sức DN, lương tính sau",
            text:
              "Giữ ưu tiên cho doanh nghiệp, tạm lùi chuyện tăng lương để bảo vệ đơn hàng và việc làm. Cách này giúp bên sản xuất đỡ ngộp, nhưng dễ làm người lao động thấy mình bị hy sinh.",
            rolePoints: { state: -1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "D",
            label: "Kệ hai bên tự deal",
            text:
              "Đứng ngoài và để hai bên tự deal với nhau. Trông có vẻ 'thị trường', nhưng thiếu khung chung thì rất dễ vỡ nhịp phối hợp.",
            rolePoints: { state: -1 },
            macro: { growth: 0, equity: -1, stability: -2 },
            system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
          },
        ],
      },
      business: {
        question:
          "Nhân sự đang nóng, còn lợi nhuận thì không phải vô hạn. Nếu là doanh nghiệp, bạn chốt bài gì để sống sót mà không đốt luôn niềm tin lao động?",
        options: [
          {
            id: "A",
            label: "Tăng từ từ + KPI rõ",
            text:
              "Tăng lương từ từ, nhưng đổi lại là KPI thưởng minh bạch để nhân sự thấy có đường đi lên. DN chưa quá đau một cục, còn người lao động cũng thấy có cửa.",
            rolePoints: { business: 2 },
            macro: { growth: 1, equity: 1, stability: 2 },
            system: { marketHealth: 2, socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Không tăng, giữ đơn hàng",
            text:
              "Giữ nguyên lương để ưu tiên giữ giá thành và chốt đơn hàng. Doanh nghiệp đỡ nghẹt hơn, nhưng phần chịu đựng sẽ bị đẩy sang người lao động.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "C",
            label: "Tăng mạnh để dập lửa",
            text:
              "Tăng nhanh một nhịp để dập lửa trước, chấp nhận lợi nhuận ngắn hạn mỏng đi. Đỡ căng với lao động hơn, nhưng nếu kéo dài thì DN sẽ bị hụt sức cạnh tranh.",
            rolePoints: { business: 0 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { marketHealth: -1, conflict: -1 },
          },
          {
            id: "D",
            label: "Tái cơ cấu, giảm người",
            text:
              "Tái cơ cấu và giảm người để bớt áp lực chi phí. Sổ sách có thể đẹp hơn, nhưng rủi ro xã hội và niềm tin lao động tụt khá mạnh.",
            rolePoints: { business: 0 },
            macro: { growth: 0, equity: -2, stability: -2 },
            system: { socialTrust: -2, conflict: 2 },
          },
        ],
      },
      worker: {
        question:
          "Bạn là người lao động và không muốn mình thành NPC trong cuộc chơi này. Bạn chọn cách gây sức ép nào?",
        options: [
          {
            id: "A",
            label: "Đòi tăng ngay",
            text:
              "Đòi tăng lương ngay để bắt kịp chi phí sống. Quyền lợi được đẩy lên rõ hơn, nhưng doanh nghiệp sẽ cảm thấy bị ép trong ngắn hạn.",
            rolePoints: { worker: 2 },
            macro: { equity: 2, stability: -1 },
            system: { conflict: 1 },
          },
          {
            id: "B",
            label: "Nhận lộ trình + thưởng",
            text:
              "Chấp nhận đi theo lộ trình nếu lương và thưởng được cam kết đủ rõ. Không thắng lớn ngay lập tức, nhưng cơ hội giữ việc và giữ nhịp đàm phán tốt hơn nhiều.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "C",
            label: "Đình công cảnh báo",
            text:
              "Đình công cảnh báo để buộc bên kia phải chú ý. Sức ép tăng rất mạnh, nhưng sản xuất và thu nhập ngắn hạn cũng dễ cùng lúc bị ảnh hưởng.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, stability: -2 },
            system: { conflict: 3 },
          },
          {
            id: "D",
            label: "Im, giữ việc",
            text:
              "Im và giữ việc trước đã, chưa đòi thêm gì lúc này. Ít rủi ro trước mắt hơn, nhưng phần thiệt sẽ âm thầm tích lại ở phía lao động.",
            rolePoints: { worker: 0 },
            macro: { equity: -1, stability: 0 },
            system: { socialTrust: -1 },
          },
        ],
      },
      citizen: {
        question:
          "Người dân đứng ngoài nhìn drama ở xưởng và biết giá cả ngoài chợ cũng bị ảnh hưởng. Bạn sẽ nghiêng về hướng nào?",
        options: [
          {
            id: "A",
            label: "Ủng hộ thỏa hiệp đôi bên",
            text:
              "Ủng hộ phương án thỏa hiệp để cả doanh nghiệp lẫn người lao động còn đường sống. Không quá cực đoan cho bên nào, nhưng đổi lại hệ thống ổn hơn.",
            rolePoints: { citizen: 2 },
            macro: { equity: 1, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Đứng hẳn về phía lao động",
            text:
              "Đứng hẳn về phía người lao động vì thấy họ đang gánh thiệt nhiều hơn. Công bằng tăng lên, nhưng áp lực chi phí cho doanh nghiệp cũng tăng theo.",
            rolePoints: { citizen: 1 },
            macro: { equity: 2, stability: 0 },
            system: { conflict: 1 },
          },
          {
            id: "C",
            label: "Giữ giá hàng cho dân",
            text:
              "Ưu tiên giữ giá hàng, không muốn chi phí từ nhà máy bị pass hết sang người mua. Dân đỡ đau hơn, nhưng DN sẽ bị bó thêm một lớp áp lực.",
            rolePoints: { citizen: 1 },
            macro: { growth: 0, equity: 1, stability: 1 },
            system: { marketHealth: 1 },
          },
          {
            id: "D",
            label: "Miễn rẻ là được",
            text:
              "Không quan tâm ai thiệt ai lời, miễn giá cuối cùng vẫn rẻ là được. Nghe tiện thật, nhưng rất dễ đẩy cuộc chơi vào tâm thế mạnh ai nấy giữ phần mình.",
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
          system: { socialTrust: -3, conflict: 4 },
        },
      },
    ],
    message: "Vòng này cho thấy rất rõ: tiền lương với người lao động là chuyện sống còn, nhưng với doanh nghiệp lại là chi phí; còn với Nhà nước và người dân, nó kéo theo cả ổn định và giá cả.",
    lesson: "Nếu thiếu khung thương lượng minh bạch, cái lợi của bên này gần như sẽ bị cảm nhận như cái thiệt của bên kia.",
  },
  {
    id: 3,
    title: "Nông sản ùn tắc, chuỗi cung ứng đứt",
    context:
      "Nông sản vào vụ nhưng đầu ra nghẽn, giá tại vườn rơi mạnh còn giá tới tay người mua lại không hề rẻ như kỳ vọng. Nhìn đâu cũng thấy một kiểu thiệt khác nhau.",
    roles: {
      state: {
        question:
          "Nông sản đang kẹt cứng ở giữa đường. Nếu là Nhà nước, bạn mở map kiểu nào để cứu dòng chảy thay vì chỉ dập lửa tạm thời?",
        options: [
          {
            id: "A",
            label: "Logistics + sàn số + tín dụng",
            text:
              "Ưu tiên tháo điểm nghẽn logistics, mở đường cho sàn số và tín dụng ngắn hạn để hàng đi được. Không quá màu mè, nhưng sửa đúng chỗ đang làm cả chuỗi nghẹt thở.",
            rolePoints: { state: 2 },
            macro: { growth: 2, equity: 2, stability: 1 },
            system: { rigidity: -1, socialTrust: 1, marketHealth: 2, conflict: -1 },
          },
          {
            id: "B",
            label: "Nhà nước mua vào kéo dài",
            text:
              "Nhà nước mua vào kéo dài để đỡ giá ngay cho người sản xuất. Cứu được trước mắt, nhưng nếu ôm lâu thì ngân sách và hiệu quả thị trường sẽ bắt đầu đuối.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 1, stability: 0 },
            system: { rigidity: 2, marketHealth: -1 },
          },
          {
            id: "C",
            label: "Bảo hộ, dựng rào",
            text:
              "Dựng rào bảo hộ để ưu tiên tiêu thụ hàng trong nước. Tạo cảm giác an toàn nhanh, nhưng nếu lạm dụng thì thị trường dễ bị trì trệ và kém cạnh tranh.",
            rolePoints: { state: -1 },
            macro: { growth: -1, equity: 0, stability: -1 },
            system: { rigidity: 1, socialTrust: -1, marketHealth: -2, conflict: 1 },
          },
          {
            id: "D",
            label: "Thị trường tự xử",
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
          "Nguồn hàng đang nhiều, giá tại vườn đang thấp. Nếu là doanh nghiệp, bạn chơi bài nào để có lợi mà không bị xem là ép người yếu thế?",
        options: [
          {
            id: "A",
            label: "Thu mua + sơ chế + kho lạnh",
            text:
              "Mở thu mua, đầu tư sơ chế và kho lạnh để hàng không bị bán tháo. DN có thêm nguồn cung, còn nông dân cũng đỡ bị ép giá quá sâu.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 1 },
            system: { marketHealth: 2, socialTrust: 1 },
          },
          {
            id: "B",
            label: "Ép giá mạnh",
            text:
              "Tận dụng lúc nông dân yếu thế để ép giá thật sâu. Lợi nhuận ngắn hạn có thể đẹp, nhưng niềm tin và cảm giác công bằng sẽ tụt rất nhanh.",
            rolePoints: { business: 1 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "C",
            label: "Đẩy bán qua sàn",
            text:
              "Đẩy mạnh bán qua sàn và kênh trực tiếp để rút ngắn trung gian. Đây là cách kiếm tiền mà vẫn giúp chuỗi lưu thông thông hơn.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 1 },
            system: { marketHealth: 2 },
          },
          {
            id: "D",
            label: "Đứng ngoài, đợi rẻ nữa",
            text:
              "Đứng ngoài chờ giá rơi sâu hơn mới vào mua. Cách này an toàn cho DN, nhưng lại kéo dài thêm cơn nghẽn cho cả chuỗi.",
            rolePoints: { business: 0 },
            macro: { growth: -1, equity: -1, stability: -1 },
            system: { socialTrust: -1 },
          },
        ],
      },
      worker: {
        question:
          "Bạn là lao động trong chuỗi cung ứng và cả hệ đang lag. Bạn chọn cách nào để không bị cuốn đi cùng cơn nghẽn này?",
        options: [
          {
            id: "A",
            label: "Tăng ca, bốc xếp, phân loại",
            text:
              "Sẵn sàng tăng ca, bốc xếp và phân loại để đẩy hàng ra nhanh. Công sức bỏ ra nhiều hơn, nhưng đổi lại cả chuỗi có cơ hội hồi nhịp.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, stability: 1 },
            system: { marketHealth: 1 },
          },
          {
            id: "B",
            label: "Đòi thêm tiền công",
            text:
              "Yêu cầu tăng tiền công vì workload tăng mạnh. Chính đáng cho phía lao động, nhưng cũng tạo thêm áp lực chi phí cho doanh nghiệp đang xoay xở.",
            rolePoints: { worker: 2 },
            macro: { equity: 2, stability: 0 },
            system: { conflict: 1 },
          },
          {
            id: "C",
            label: "Không rõ quyền lợi thì nghỉ",
            text:
              "Nếu quyền lợi không rõ ràng thì nghỉ luôn khỏi chuỗi. Bảo vệ bản thân được phần nào, nhưng cả hệ thống sẽ càng thiếu người ở lúc đang cần nhất.",
            rolePoints: { worker: 1 },
            macro: { growth: -1, stability: -2 },
            system: { conflict: 2 },
          },
          {
            id: "D",
            label: "Học thêm kỹ năng bán, sàn số",
            text:
              "Học thêm kỹ năng bán hàng, đóng gói hoặc dùng sàn số để bớt lệ thuộc một mắt xích. Không giải quyết hết mọi thứ ngay, nhưng tăng cơ hội thích nghi lâu dài.",
            rolePoints: { worker: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { marketHealth: 1, socialTrust: 1 },
          },
        ],
      },
      citizen: {
        question:
          "Nông sản ở vườn rất rẻ mà nông dân vẫn khổ, còn ngoài chợ chưa chắc rẻ. Nếu là người dân, bạn phản ứng sao cho vừa có lý vừa có tình?",
        options: [
          {
            id: "A",
            label: "Mua ủng hộ, chọn kênh minh bạch",
            text:
              "Ưu tiên mua qua kênh minh bạch, chấp nhận không săn rẻ bằng mọi giá. Bạn bỏ thêm chút cân nhắc để người sản xuất đỡ bị chèn ép.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { socialTrust: 1, conflict: -1 },
          },
          {
            id: "B",
            label: "Săn rẻ hết cỡ",
            text:
              "Chỉ săn giá rẻ nhất, càng rẻ càng tốt. Tiết kiệm được cho mình, nhưng rất dễ tiếp tay cho vòng xoáy ép giá ở phía dưới.",
            rolePoints: { citizen: 0 },
            macro: { equity: -1 },
            system: { socialTrust: -1 },
          },
          {
            id: "C",
            label: "Ủng hộ bán qua sàn",
            text:
              "Ủng hộ bán qua sàn có truy xuất rõ ràng để rút bớt trung gian. Người mua yên tâm hơn, còn thị trường cũng minh bạch hơn.",
            rolePoints: { citizen: 2 },
            macro: { growth: 1, equity: 1, stability: 1 },
            system: { marketHealth: 2, socialTrust: 1 },
          },
          {
            id: "D",
            label: "Kệ, chuyện của nhà sản xuất",
            text:
              "Không quan tâm chuyện phía sau, cứ mua theo thói quen. Nhẹ đầu thật, nhưng cũng là cách để nút thắt cứ nằm đó mãi.",
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
          stability: -3,
          system: { socialTrust: -3, conflict: 3 },
        },
      },
    ],
    message: "Điểm khó của vòng này là người sản xuất, doanh nghiệp, lao động và người tiêu dùng đều thấy mình có lý. Nhưng nếu chỉ nhìn từng mảnh riêng lẻ, cả chuỗi sẽ tiếp tục nghẽn.",
    lesson: "Khi chọn đúng điểm can thiệp, công bằng và hiệu quả không nhất thiết phải đứng ở hai chiến tuyến đối lập.",
  },
  {
    id: 4,
    title: "Niềm tin thị trường suy giảm",
    context:
      "Gian lận chất lượng, thổi thông tin và làm ăn nhập nhèm khiến người tiêu dùng mất niềm tin. Thị trường rơi vào trạng thái nhìn đâu cũng thấy nghi ngờ.",
    roles: {
      state: {
        question:
          "Trust thị trường đang tụt rất sâu. Nếu là Nhà nước, bạn chọn mode nào để kéo lại niềm tin mà không bóp nghẹt toàn bộ hoạt động kinh doanh?",
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
          "Người mua đang nhìn doanh nghiệp bằng ánh mắt đầy nghi ngờ. Nếu là doanh nghiệp, bạn cứu danh tiếng kiểu gì?",
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
          "Nếu đang ở trong chuỗi làm việc và thấy có sai phạm, bạn là người lao động thì sẽ xử lý ra sao?",
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
          "Khi niềm tin thị trường tụt đáy, nếu là người dân bạn sẽ phản ứng theo kiểu nào?",
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
          stability: -3,
          system: { socialTrust: -4, marketHealth: -3, conflict: 3 },
        },
      },
    ],
    message: "Vòng này cho thấy niềm tin không tự nhiên mà có: Nhà nước phải giữ luật chơi, doanh nghiệp phải minh bạch, lao động phải dám lên tiếng và người dân cũng phải tiêu dùng có trách nhiệm.",
    lesson: "Khi ai cũng chọn lợi ngắn hạn cho riêng mình, trust sẽ tụt rất nhanh; mà một khi trust gãy rồi, phục hồi luôn đắt hơn tưởng tượng.",
  },
  {
    id: 5,
    title: "Chốt gói định hướng 3 năm",
    context:
      "Sau 4 vòng sóng gió, giờ là lúc chốt định hướng 3 năm tới. Đây không còn là xử lý một sự cố riêng lẻ nữa, mà là chọn xem xã hội muốn đi nhanh, đi chắc hay đi cùng nhau tới đâu.",
    roles: {
      state: {
        question:
          "Nếu phải chốt một hướng lớn cho 3 năm tới, ở vai Nhà nước bạn pick lối nào để vừa giữ nhịp phát triển vừa không làm xã hội lệch hẳn sang một phía?",
        options: [
          {
            id: "A",
            label: "Tăng trưởng thần tốc",
            text:
              "Đẩy tăng trưởng lên trước, chấp nhận nới lỏng chuẩn công bằng và an sinh trong một thời gian. Máy kinh tế có thể chạy nhanh hơn, nhưng những chỗ yếu sẽ bị bỏ lại rõ hơn.",
            rolePoints: { state: -1 },
            macro: { growth: 2, equity: -2, stability: -1 },
            system: { socialTrust: -2, conflict: 2 },
          },
          {
            id: "B",
            label: "An sinh ngắn hạn là số 1",
            text:
              "Ưu tiên an sinh và hỗ trợ thu nhập trong ngắn hạn để giảm áp lực xã hội. Dễ tạo cảm giác ấm hơn trước mắt, nhưng dư địa phát triển về sau có thể bị mỏng đi.",
            rolePoints: { state: 0 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { rigidity: 1, socialTrust: 1, marketHealth: -1 },
          },
          {
            id: "C",
            label: "Gói cân bằng ba mục tiêu",
            text:
              "Chọn gói cân bằng: tăng năng suất, an sinh có mục tiêu và giữ kỷ cương thị trường. Không phe nào sướng tuyệt đối, nhưng hệ thống bền hơn nhiều.",
            rolePoints: { state: 2 },
            macro: { growth: 2, equity: 2, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "D",
            label: "Quản thật chặt cho chắc",
            text:
              "Quản thật chặt để đỡ loạn, chấp nhận hy sinh độ linh hoạt của thị trường. Trật tự tăng lên, nhưng không khí phát triển và đổi mới có thể bị bó lại.",
            rolePoints: { state: 0 },
            macro: { growth: -1, equity: -1, stability: 1 },
            system: { rigidity: 2, socialTrust: -1, marketHealth: -2, conflict: 1 },
          },
        ],
      },
      business: {
        question:
          "Nếu là doanh nghiệp, bạn muốn 3 năm tới sống khỏe theo kiểu nào: tăng tốc mạnh, xin đệm an toàn, hay chơi đường dài?",
        options: [
          {
            id: "A",
            label: "Bơm tốc độ, chạy trước",
            text:
              "Bơm tốc độ để mở rộng thật nhanh, chốt tăng trưởng trước đã. DN có cơ hội bứt mạnh, nhưng phần chi phí xã hội dễ bị đẩy ngược cho bên khác gánh.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: -2, stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
          {
            id: "B",
            label: "Xin hỗ trợ nhiều cho an toàn",
            text:
              "Xin hỗ trợ nhiều để giảm rủi ro và giữ cảm giác an toàn. Ít áp lực hơn cho DN, nhưng cũng khiến thị trường phụ thuộc hơn vào che chở bên ngoài.",
            rolePoints: { business: 0 },
            macro: { growth: 0, equity: 0, stability: 0 },
            system: { rigidity: 1, marketHealth: -1 },
          },
          {
            id: "C",
            label: "Đầu tư năng suất, minh bạch",
            text:
              "Đầu tư vào công nghệ, con người và quản trị để cạnh tranh tử tế trong đường dài. Không phải cú nổ nhanh nhất, nhưng là nền để DN lớn lên mà không bị ghét.",
            rolePoints: { business: 2 },
            macro: { growth: 2, equity: 1, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2 },
          },
          {
            id: "D",
            label: "Xin bảo hộ để đỡ đau",
            text:
              "Xin cơ chế bảo hộ để bớt đau khi cạnh tranh. Dễ thở cho DN hiện tại, nhưng thị trường nói chung sẽ mất động lực nâng chất.",
            rolePoints: { business: 1 },
            macro: { growth: 0, equity: -1, stability: 0 },
            system: { rigidity: 2, marketHealth: -2 },
          },
        ],
      },
      worker: {
        question:
          "Nếu là người lao động, bạn muốn 3 năm tới theo vibe nào: an toàn trước mắt, phúc lợi nhanh, hay vừa lương vừa cơ hội đi lên?",
        options: [
          {
            id: "A",
            label: "Miễn có việc là được",
            text:
              "Miễn có việc là được, quyền lợi tính sau. Đỡ lo ngay chuyện thất nghiệp, nhưng phần thiệt về thu nhập và vị thế sẽ âm thầm tích lại.",
            rolePoints: { worker: 0 },
            macro: { growth: 1, equity: -2, stability: -1 },
            system: { socialTrust: -1 },
          },
          {
            id: "B",
            label: "Phúc lợi trước mắt",
            text:
              "Ưu tiên phúc lợi chắc tay trước đã, còn tăng trưởng tính sau. Đời sống đỡ ngộp nhanh hơn, nhưng cơ hội nâng năng suất và tăng lương dài hạn có thể chậm lại.",
            rolePoints: { worker: 2 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { socialTrust: 1 },
          },
          {
            id: "C",
            label: "Lương, kỹ năng, cơ hội cùng lên",
            text:
              "Muốn cả lương, kỹ năng và cơ hội đi lên cùng tăng. Đây là lựa chọn khó chiều ngay, nhưng nếu làm được thì vị thế của người lao động sẽ bền hơn.",
            rolePoints: { worker: 2 },
            macro: { growth: 2, equity: 2, stability: 2 },
            system: { socialTrust: 2, conflict: -1 },
          },
          {
            id: "D",
            label: "Quản chặt để đỡ bất ổn",
            text:
              "Chấp nhận quản chặt để đỡ bất ổn, dù cơ hội linh hoạt và tăng tốc có thể hẹp lại. An toàn hơn, nhưng cảm giác bị bó cũng tăng lên.",
            rolePoints: { worker: 0 },
            macro: { stability: 1, equity: -1 },
            system: { rigidity: 2, marketHealth: -1 },
          },
        ],
      },
      citizen: {
        question:
          "Nếu là người dân và phải vote cho một tương lai 3 năm tới, bạn nghiêng về gói nào nhất?",
        options: [
          {
            id: "A",
            label: "Miễn kinh tế chạy mạnh",
            text:
              "Miễn kinh tế chạy mạnh thì chịu thiệt một chút cũng được. Sức bật nhìn rất đã, nhưng nhóm yếu thế sẽ dễ cảm nhận mình bị bỏ lại.",
            rolePoints: { citizen: 0 },
            macro: { growth: 2, equity: -2, stability: -1 },
            system: { socialTrust: -1, conflict: 1 },
          },
          {
            id: "B",
            label: "Đỡ khổ trước đã",
            text:
              "Ưu tiên đỡ khổ trước đã, nhất là với nhóm đang hụt hơi. Cảm giác công bằng tăng lên, nhưng nhịp tăng trưởng chung có thể bớt bốc.",
            rolePoints: { citizen: 2 },
            macro: { growth: -1, equity: 2, stability: 0 },
            system: { socialTrust: 1 },
          },
          {
            id: "C",
            label: "Tăng trưởng nhưng phải công bằng",
            text:
              "Muốn tăng trưởng, nhưng phải công bằng và đáng tin để người dân còn yên tâm mà sống. Không phải lựa chọn nhanh nhất, nhưng là lựa chọn dễ ở cùng lâu nhất.",
            rolePoints: { citizen: 2 },
            macro: { growth: 2, equity: 2, stability: 2 },
            system: { socialTrust: 2, marketHealth: 2, conflict: -2 },
          },
          {
            id: "D",
            label: "Kiểm soát mạnh cho chắc cú",
            text:
              "Ủng hộ kiểm soát mạnh cho chắc cú, miễn ít biến động hơn. Tâm lý an toàn tăng lên, nhưng bầu không khí phát triển cũng dễ bị nén lại.",
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
          stability: -3,
          system: { socialTrust: -3, conflict: 3 },
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
          growth: -3,
          system: { marketHealth: -4, rigidity: 4 },
        },
      },
    ],
    message: "Đây là vòng cho thấy rõ nhất chuyện không có tương lai nào chỉ toàn màu hồng cho một phía. Mỗi vai đều có điều muốn giữ, nhưng nếu kéo quá mạnh về phía mình thì cả hệ thống sẽ trả giá.",
    lesson: "Phát triển bền không phải là làm bên nào cũng vui tuyệt đối, mà là tìm được mức phối hợp đủ chấp nhận để xã hội không trượt vào bất ổn.",
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
    condition: (c) => c.system.conflict >= 4 && c.indicators.equity <= 6,
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

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

export interface OptionEffect {
  growth: number;
  equity: number;
  stability: number;
  rolePoints: Record<RoleId, number>;
  system: SystemEffect;
}

export interface RoundOption {
  id: string;
  label: string;
  text: string;
  style: "growth" | "equity" | "stability" | "control" | "pragmatic" | "extreme";
  effect: OptionEffect;
}

export interface RoleContext {
  state: string;
  business: string;
  worker: string;
  citizen: string;
}

export interface GameRound {
  id: number;
  title: string;
  context: string;
  roleContext: RoleContext;
  question: string;
  options: RoundOption[];
  message: string;
  lesson: string;
  bestOption: number;
}

export const GAME_ROUNDS: GameRound[] = [
  {
    id: 1,
    title: "Giá năng lượng tăng sốc",
    context:
      "Giá xăng dầu và điện tăng liên tục, kéo chi phí vận chuyển và giá hàng hóa đi lên. Áp lực chi tiêu hộ gia đình tăng mạnh.",
    roleContext: {
      state: "Bạn cần hạ nhiệt lạm phát mà không phá kỷ luật ngân sách.",
      business: "Biên lợi nhuận giảm, áp lực tăng giá bán rất lớn.",
      worker: "Thu nhập thực giảm vì chi phí sinh hoạt leo thang.",
      citizen: "Ngân sách gia đình bị bóp nghẹt, niềm tin tiêu dùng giảm.",
    },
    question: "Nhóm nên chốt phương án nào?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Giảm một phần thuế phí + trợ giá có mục tiêu",
        style: "pragmatic",
        effect: {
          growth: 1,
          equity: 2,
          stability: 2,
          rolePoints: { state: 2, business: 1, worker: 2, citizen: 2 },
          system: { rigidity: -1, socialTrust: 2, marketHealth: 1, conflict: -2 },
        },
      },
      {
        id: "B",
        label: "B",
        text: "Để thị trường tự điều chỉnh hoàn toàn",
        style: "growth",
        effect: {
          growth: 1,
          equity: -2,
          stability: -2,
          rolePoints: { state: -1, business: 2, worker: -2, citizen: -2 },
          system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
        },
      },
      {
        id: "C",
        label: "C",
        text: "Áp trần giá cứng trên diện rộng",
        style: "control",
        effect: {
          growth: -2,
          equity: 1,
          stability: -1,
          rolePoints: { state: -1, business: -2, worker: 1, citizen: 1 },
          system: { rigidity: 2, socialTrust: 0, marketHealth: -2, conflict: 1 },
        },
      },
      {
        id: "D",
        label: "D",
        text: "Ưu tiên đầu tư công, tạm dừng hỗ trợ giá",
        style: "growth",
        effect: {
          growth: 2,
          equity: -1,
          stability: -1,
          rolePoints: { state: 1, business: 2, worker: -1, citizen: -1 },
          system: { rigidity: 0, socialTrust: -1, marketHealth: 1, conflict: 1 },
        },
      },
    ],
    message: "Điều tiết khôn ngoan không triệt tiêu thị trường mà làm mềm cú sốc để hệ thống tự cân bằng lại.",
    lesson: "Tăng trưởng ngắn hạn không thể đạt trên chi phí xã hội quá lớn.",
    bestOption: 0,
  },
  {
    id: 2,
    title: "Mâu thuẫn tiền lương và lợi nhuận",
    context:
      "Doanh nghiệp nói không đủ sức tăng lương, người lao động đe dọa đình công. Đơn hàng xuất khẩu đến sát hạn.",
    roleContext: {
      state: "Cần cơ chế đàm phán có ràng buộc để tránh đứt gãy sản xuất.",
      business: "Biên lợi nhuận thấp, tăng lương đột ngột có thể buộc cắt nhân sự.",
      worker: "Thu nhập thực giảm liên tiếp, áp lực đời sống tăng cao.",
      citizen: "Đứt sản xuất sẽ đẩy giá hàng hóa và thiếu nguồn cung.",
    },
    question: "Giải pháp nào giúp hạ nhiệt xung đột lợi ích?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Lộ trình tăng lương + thưởng năng suất + hỗ trợ có điều kiện",
        style: "pragmatic",
        effect: {
          growth: 1,
          equity: 2,
          stability: 2,
          rolePoints: { state: 2, business: 1, worker: 2, citizen: 1 },
          system: { rigidity: -1, socialTrust: 2, marketHealth: 2, conflict: -2 },
        },
      },
      {
        id: "B",
        label: "B",
        text: "Buộc tăng lương ngay trên diện rộng",
        style: "equity",
        effect: {
          growth: -1,
          equity: 2,
          stability: -1,
          rolePoints: { state: -1, business: -2, worker: 2, citizen: 1 },
          system: { rigidity: 1, socialTrust: 0, marketHealth: -1, conflict: 1 },
        },
      },
      {
        id: "C",
        label: "C",
        text: "Đóng băng lương để giữ cạnh tranh",
        style: "growth",
        effect: {
          growth: 1,
          equity: -2,
          stability: -1,
          rolePoints: { state: -1, business: 2, worker: -2, citizen: -1 },
          system: { rigidity: 0, socialTrust: -2, marketHealth: 0, conflict: 2 },
        },
      },
      {
        id: "D",
        label: "D",
        text: "Để hai bên tự xử, nhà nước đứng ngoài",
        style: "extreme",
        effect: {
          growth: 0,
          equity: -1,
          stability: -2,
          rolePoints: { state: -1, business: 0, worker: -2, citizen: -1 },
          system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
        },
      },
    ],
    message: "Mâu thuẫn lợi ích cần cơ chế đàm phán minh bạch, không thể xử lý bằng mệnh lệnh một chiều.",
    lesson: "Lợi ích của bên này thường là chi phí của bên kia nếu thiếu thiết kế thể chế.",
    bestOption: 0,
  },
  {
    id: 3,
    title: "Nông sản ùn tắc, chuỗi cung ứng đứt",
    context:
      "Nông sản vào vụ lớn nhưng tiêu thụ chậm, giá tại nguồn rớt mạnh. Người sản xuất chịu thiệt nặng.",
    roleContext: {
      state: "Cần sửa điểm nghẽn lưu thông thay vì cứu trợ dàn trải.",
      business: "Nếu có chia sẻ rủi ro logistics, doanh nghiệp có thể mở thêm kênh phân phối.",
      worker: "Lao động thời vụ mất việc nếu chuỗi tiêu thụ tiếp tục nghẽn.",
      citizen: "Giá đến tay người mua vẫn cao dù giá tại vườn rẻ.",
    },
    question: "Phương án nào phù hợp nhất?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Kết nối logistics, sàn số và tín dụng ngắn hạn",
        style: "pragmatic",
        effect: {
          growth: 2,
          equity: 2,
          stability: 1,
          rolePoints: { state: 2, business: 2, worker: 2, citizen: 1 },
          system: { rigidity: -1, socialTrust: 1, marketHealth: 2, conflict: -1 },
        },
      },
      {
        id: "B",
        label: "B",
        text: "Nhà nước mua vào kéo dài",
        style: "control",
        effect: {
          growth: -1,
          equity: 1,
          stability: 0,
          rolePoints: { state: -2, business: -1, worker: 1, citizen: 1 },
          system: { rigidity: 2, socialTrust: 0, marketHealth: -1, conflict: 0 },
        },
      },
      {
        id: "C",
        label: "C",
        text: "Bảo hộ bằng hạn chế cạnh tranh",
        style: "control",
        effect: {
          growth: -1,
          equity: 0,
          stability: -1,
          rolePoints: { state: -1, business: 1, worker: 0, citizen: -1 },
          system: { rigidity: 1, socialTrust: -1, marketHealth: -2, conflict: 1 },
        },
      },
      {
        id: "D",
        label: "D",
        text: "Không can thiệp",
        style: "extreme",
        effect: {
          growth: -1,
          equity: -2,
          stability: -1,
          rolePoints: { state: -1, business: 0, worker: -2, citizen: -1 },
          system: { rigidity: -2, socialTrust: -2, marketHealth: -1, conflict: 2 },
        },
      },
    ],
    message: "Hỗ trợ đúng là sửa điểm nghẽn thị trường chứ không bao cấp vô hạn.",
    lesson: "Công bằng và hiệu quả có thể đi cùng nhau nếu chọn đúng điểm can thiệp.",
    bestOption: 0,
  },
  {
    id: 4,
    title: "Niềm tin thị trường suy giảm",
    context:
      "Xuất hiện hàng loạt vụ gian lận chất lượng và thao túng thông tin, người tiêu dùng giảm chi tiêu mạnh.",
    roleContext: {
      state: "Nếu niềm tin mất, chi phí điều tiết và giám sát sẽ tăng theo cấp số nhân.",
      business: "Doanh nghiệp làm ăn tử tế bị cạnh tranh bởi bên lách luật.",
      worker: "Đơn hàng giảm làm rủi ro việc làm tăng.",
      citizen: "Người dân cần cơ chế bảo vệ quyền lợi rõ ràng.",
    },
    question: "Nên ưu tiên giải pháp nào?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Hoàn thiện pháp lý + công khai dữ liệu giám sát + xử lý nghiêm",
        style: "stability",
        effect: {
          growth: 1,
          equity: 2,
          stability: 2,
          rolePoints: { state: 2, business: 1, worker: 2, citizen: 2 },
          system: { rigidity: 0, socialTrust: 2, marketHealth: 2, conflict: -1 },
        },
      },
      {
        id: "B",
        label: "B",
        text: "Chỉ xử lý từng vụ việc phát sinh",
        style: "pragmatic",
        effect: {
          growth: 0,
          equity: 0,
          stability: -1,
          rolePoints: { state: 0, business: 1, worker: -1, citizen: -1 },
          system: { rigidity: 0, socialTrust: -1, marketHealth: -1, conflict: 1 },
        },
      },
      {
        id: "C",
        label: "C",
        text: "Nới tay để giảm áp lực cho doanh nghiệp",
        style: "growth",
        effect: {
          growth: 1,
          equity: -2,
          stability: -2,
          rolePoints: { state: -2, business: 2, worker: -2, citizen: -2 },
          system: { rigidity: -1, socialTrust: -2, marketHealth: -2, conflict: 2 },
        },
      },
      {
        id: "D",
        label: "D",
        text: "Siết hành chính diện rộng",
        style: "control",
        effect: {
          growth: -2,
          equity: 0,
          stability: -1,
          rolePoints: { state: -1, business: -2, worker: 0, citizen: 0 },
          system: { rigidity: 2, socialTrust: -1, marketHealth: -1, conflict: 1 },
        },
      },
    ],
    message: "Thị trường chỉ bền khi tự do đi cùng kỷ cương và minh bạch.",
    lesson: "Hoàn thiện thể chế là điều kiện để cạnh tranh công bằng.",
    bestOption: 0,
  },
  {
    id: 5,
    title: "Chốt gói định hướng 3 năm",
    context:
      "Bàn chơi phải chọn một gói chính sách tổng hợp để đi qua chu kỳ tới mà không đánh mất cân bằng xã hội.",
    roleContext: {
      state: "Bạn phải giữ cả tăng trưởng, công bằng và ổn định trong một cấu hình khả thi.",
      business: "Cần môi trường dự đoán được để đầu tư dài hạn.",
      worker: "Cần lộ trình thu nhập và an sinh không bị bỏ lại.",
      citizen: "Cần giá cả hợp lý, việc làm bền và dịch vụ công tin cậy.",
    },
    question: "Nhóm nên thông qua gói nào?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Tăng trưởng bằng mọi giá",
        style: "growth",
        effect: {
          growth: 2,
          equity: -2,
          stability: -1,
          rolePoints: { state: -1, business: 2, worker: -1, citizen: -2 },
          system: { rigidity: -1, socialTrust: -2, marketHealth: 0, conflict: 2 },
        },
      },
      {
        id: "B",
        label: "B",
        text: "An sinh ngắn hạn là trung tâm",
        style: "equity",
        effect: {
          growth: -1,
          equity: 2,
          stability: 0,
          rolePoints: { state: -1, business: -2, worker: 2, citizen: 2 },
          system: { rigidity: 1, socialTrust: 1, marketHealth: -1, conflict: 0 },
        },
      },
      {
        id: "C",
        label: "C",
        text: "Gói cân bằng: năng suất + an sinh mục tiêu + kỷ cương thị trường",
        style: "pragmatic",
        effect: {
          growth: 2,
          equity: 2,
          stability: 2,
          rolePoints: { state: 2, business: 2, worker: 2, citizen: 2 },
          system: { rigidity: 0, socialTrust: 2, marketHealth: 2, conflict: -2 },
        },
      },
      {
        id: "D",
        label: "D",
        text: "Kiểm soát hành chính mạnh để giữ trật tự",
        style: "control",
        effect: {
          growth: -1,
          equity: -1,
          stability: 1,
          rolePoints: { state: 0, business: -2, worker: -1, citizen: -1 },
          system: { rigidity: 2, socialTrust: -1, marketHealth: -2, conflict: 1 },
        },
      },
    ],
    message: "Không có chiến thắng tuyệt đối cho một bên. Kết quả bền vững đến từ cân bằng lợi ích.",
    lesson: "Bài học trung tâm: cân bằng tăng trưởng, công bằng xã hội và ổn định thị trường.",
    bestOption: 2,
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

export interface RoundHistoryItem {
  roundId: number;
  winOption: number | string;
  effect: OptionEffect;
  voteBreakdown: Record<string, number>;
  roleChoices: Record<RoleId, number | string | null>;
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

export function resolveHistoryOption(roundId: number, winOption: number | string): RoundOption | null {
  const round = GAME_ROUNDS.find((r) => r.id === roundId);
  if (!round) return null;
  const index = typeof winOption === "string" ? parseInt(winOption, 10) : winOption;
  if (!Number.isFinite(index)) return null;
  return round.options[index] ?? null;
}

export function computeRoleScores(roundHistory: RoundHistoryItem[]): Record<RoleId, number> {
  const scores: Record<RoleId, number> = { state: 0, business: 0, worker: 0, citizen: 0 };
  for (const hist of roundHistory) {
    const option = resolveHistoryOption(hist.roundId, hist.winOption);
    if (!option) continue;
    for (const role of Object.keys(scores) as RoleId[]) {
      scores[role] += option.effect.rolePoints[role] ?? 0;
    }
  }
  return scores;
}

export function computeSystemScores(roundHistory: RoundHistoryItem[]): SystemScores {
  const scores: SystemScores = { rigidity: 0, socialTrust: 0, marketHealth: 0, conflict: 0 };
  for (const hist of roundHistory) {
    const option = resolveHistoryOption(hist.roundId, hist.winOption);
    if (!option) continue;
    scores.rigidity += option.effect.system.rigidity;
    scores.socialTrust += option.effect.system.socialTrust;
    scores.marketHealth += option.effect.system.marketHealth;
    scores.conflict += option.effect.system.conflict;
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

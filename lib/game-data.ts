export type RoleId = "state" | "business" | "worker" | "citizen";

export interface Role {
  id: RoleId;
  label: string;
  description: string; // Short description of who you are
  goal: string;        // Your win condition / what you're optimizing for
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  icon: string;
}

export const ROLES: Role[] = [
  {
    id: "state",
    label: "Nhà nước",
    description: "Bạn là người điều hành chính sách kinh tế vĩ mô. Quyết định của bạn ảnh hưởng đến toàn bộ xã hội.",
    goal: "Duy tri on dinh thi truong, tang truong GDP va dam bao cong bang xa hoi cung mot luc.",
    color: "#4a8fe8",
    bgClass: "bg-role-state/20",
    textClass: "text-role-state",
    borderClass: "border-role-state",
    icon: "🏛",
  },
  {
    id: "business",
    label: "Doanh nghiep",
    description: "Ban quan ly mot doanh nghiep san xuat. Loi nhuan va su song con cua cong ty phu thuoc vao chinh sach.",
    goal: "Toi da hoa loi nhuan, giam chi phi dau vao va mo rong thi truong — trong khuon kho phap luat.",
    color: "#e8943a",
    bgClass: "bg-role-business/20",
    textClass: "text-role-business",
    borderClass: "border-role-business",
    icon: "🏭",
  },
  {
    id: "worker",
    label: "Nguoi lao dong",
    description: "Ban la cong nhan/nhan vien. Cuoc song hang ngay phu thuoc vao luong thuong va an toan viec lam.",
    goal: "Tang luong thuc te, bao ve viec lam va co quyen loi lao dong duoc dam bao.",
    color: "#4aad6e",
    bgClass: "bg-role-worker/20",
    textClass: "text-role-worker",
    borderClass: "border-role-worker",
    icon: "👷",
  },
  {
    id: "citizen",
    label: "Nguoi dan",
    description: "Ban la nguoi tieu dung thong thuong. Moi chinh sach kinh te deu anh huong truc tiep toi vi tien cua ban.",
    goal: "Giu gia ca hop ly, doi song on dinh va suc mua khong bi bo moi boi chinh sach.",
    color: "#e0624a",
    bgClass: "bg-role-citizen/20",
    textClass: "text-role-citizen",
    borderClass: "border-role-citizen",
    icon: "👨‍👩‍👧",
  },
];

export interface OptionEffect {
  growth: number;
  equity: number;
  stability: number;
  // Points awarded to each role when this option wins (+2 great, +1 ok, 0 neutral, -1 bad, -2 very bad)
  rolePoints: Record<RoleId, number>;
}

export interface RoundOption {
  id: string;
  label: string;
  text: string;
  effect: OptionEffect;
}

// Private context shown only to each role before they vote
export interface RoleContext {
  state: string;
  business: string;
  worker: string;
  citizen: string;
}

export interface GameRound {
  id: number;
  title: string;
  context: string;     // Public context shown to everyone
  roleContext: RoleContext; // Private "insider info" per role
  question: string;
  options: RoundOption[];
  message: string;
  bestOption: number; // Index 0-3
}

export const GAME_ROUNDS: GameRound[] = [
  {
    id: 1,
    title: "Giá xăng tăng mạnh",
    context:
      "Giá xăng tăng khiến chi phí vận chuyển và giá hàng hóa tăng theo. Doanh nghiệp lo chi phí sản xuất cao, người dân lo sinh hoạt đắt đỏ, thị trường có dấu hiệu bất ổn.",
    roleContext: {
      state: "Ngân sách nhà nước đang có dư địa để giảm thuế xăng dầu khoảng 2–3%. Nếu không hành động, nguy cơ lạm phát leo thang ảnh hưởng uy tín điều hành.",
      business: "Chi phí logistics của công ty tăng 18% so với quý trước. Nếu thị trường tự điều chỉnh, bạn có thể tăng giá bán và giữ lợi nhuận — nhưng đối thủ cũng làm vậy.",
      worker: "Giá thực phẩm và xăng xe đi làm đã ngốn thêm 15% thu nhập tháng của bạn. Lương chưa tăng nhưng chi tiêu hàng ngày đã vượt ngân sách.",
      citizen: "Hóa đơn chợ tuần này tăng rõ rệt. Nhiều hàng xóm đã hạn chế đi lại. Bạn lo ngại nếu không có can thiệp, giá sẽ còn tăng tiếp.",
    },
    question: "Nhà điều hành nên ưu tiên phương án nào?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Để thị trường tự điều chỉnh hoàn toàn",
        effect: { growth: 1, equity: -1, stability: -2, rolePoints: { state: -1, business: 2, worker: -2, citizen: -2 } },
      },
      {
        id: "B",
        label: "B",
        text: "Giảm một số loại thuế để giảm áp lực giá",
        effect: { growth: 1, equity: 1, stability: 2, rolePoints: { state: 2, business: 1, worker: 1, citizen: 2 } },
      },
      {
        id: "C",
        label: "C",
        text: "Ép tất cả doanh nghiệp giữ giá",
        effect: { growth: -2, equity: 1, stability: -1, rolePoints: { state: -1, business: -2, worker: 1, citizen: 2 } },
      },
      {
        id: "D",
        label: "D",
        text: "Tạm ngừng lưu thông một số mặt hàng",
        effect: { growth: -2, equity: -1, stability: -2, rolePoints: { state: -2, business: -2, worker: -1, citizen: -2 } },
      },
    ],
    message:
      "Nhà nước không phủ nhận thị trường, nhưng có thể điều tiết để giảm sốc cho xã hội.",
    bestOption: 1,
  },
  {
    id: 2,
    title: "Mâu thuẫn giữa doanh nghiệp và người lao động",
    context:
      "Doanh nghiệp cho rằng chi phí đầu vào tăng nên không thể tăng lương. Người lao động yêu cầu cải thiện thu nhập và đe dọa đình công.",
    roleContext: {
      state: "Bộ Lao động đang chịu áp lực từ cả hai phía. Nếu đình công xảy ra, GDP quý này có thể giảm 0.3%. Có thể dùng quỹ hỗ trợ doanh nghiệp như đòn bẩy thương lượng.",
      business: "Chi phí nguyên liệu đầu vào tăng 22% nhưng doanh thu chưa tăng tương ứng. Biên lợi nhuận đang mỏng. Nếu tăng lương ngay, bạn sẽ phải sa thải 10% nhân sự.",
      worker: "Lương thực tế của bạn đã bị bào mòn 3 năm liên tiếp do lạm phát. Đồng nghiệp đang muốn đình công nhưng bạn sợ mất việc. Đây là lần hiếm có để đòi quyền lợi.",
      citizen: "Hàng hóa trong nước phần lớn do nhà máy này sản xuất. Nếu đình công, nguồn cung giảm và giá sẽ tăng. Nhưng nếu công nhân không đủ sống, ai sẽ mua hàng của bạn?",
    },
    question: "Phương án nào hài hòa lợi ích hơn?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Chỉ bảo vệ doanh nghiệp để giữ sản xuất",
        effect: { growth: 1, equity: -2, stability: -1, rolePoints: { state: -1, business: 2, worker: -2, citizen: -1 } },
      },
      {
        id: "B",
        label: "B",
        text: "Bắt doanh nghiệp tăng lương ngay lập tức",
        effect: { growth: -1, equity: 1, stability: -1, rolePoints: { state: -1, business: -2, worker: 2, citizen: 1 } },
      },
      {
        id: "C",
        label: "C",
        text: "Thương lượng lộ trình tăng lương, kết hợp hỗ trợ doanh nghiệp hợp lý",
        effect: { growth: 1, equity: 2, stability: 2, rolePoints: { state: 2, business: 1, worker: 2, citizen: 1 } },
      },
      {
        id: "D",
        label: "D",
        text: "Để hai bên tự giải quyết",
        effect: { growth: 0, equity: -1, stability: -2, rolePoints: { state: -1, business: 0, worker: -2, citizen: -1 } },
      },
    ],
    message:
      "Quan hệ lợi ích không thể xử lý cực đoan, mà cần cơ chế phối hợp và thương lượng.",
    bestOption: 2,
  },
  {
    id: 3,
    title: "Nông sản tồn đọng",
    context:
      "Một lượng lớn nông sản khó tiêu thụ, giá giảm mạnh, nông dân bị ảnh hưởng nặng. Doanh nghiệp phân phối chưa mặn mà vì lợi nhuận thấp.",
    roleContext: {
      state: "Ước tính 40.000 tấn nông sản tồn kho tại 3 tỉnh. Nếu để thối, thiệt hại kinh tế và xã hội rất lớn. Có thể điều phối logistics và mở sàn thương mại điện tử với chi phí thấp.",
      business: "Vận chuyển nông sản vùng sâu lợi nhuận rất thấp, chỉ 2–3%/chuyến. Nhưng nếu nhà nước hỗ trợ logistics và kết nối đầu ra, đây là cơ hội mở thị trường mới lâu dài.",
      worker: "Nhiều công nhân nông nghiệp trong vùng bạn quen đang không có thu nhập. Nếu được hỗ trợ tiêu thụ, họ có việc làm; nếu không, họ sẽ kéo lên thành phố tìm việc.",
      citizen: "Giá rau củ quả đang rẻ bất thường — tốt cho bạn ngắn hạn. Nhưng nếu nông dân phá sản hàng loạt, năm sau sẽ thiếu hàng và giá tăng vọt. Bạn muốn ổn định dài hạn không?",
    },
    question: "Giải pháp nào phù hợp nhất?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Để nông dân tự xoay xở",
        effect: { growth: -1, equity: -2, stability: -1, rolePoints: { state: -1, business: 0, worker: -2, citizen: -1 } },
      },
      {
        id: "B",
        label: "B",
        text: "Hỗ trợ kết nối tiêu thụ, logistics, sàn thương mại điện tử",
        effect: { growth: 2, equity: 2, stability: 1, rolePoints: { state: 2, business: 2, worker: 2, citizen: 2 } },
      },
      {
        id: "C",
        label: "C",
        text: "Cấm hoàn toàn hàng cạnh tranh",
        effect: { growth: -1, equity: 0, stability: -1, rolePoints: { state: -1, business: 1, worker: 0, citizen: -1 } },
      },
      {
        id: "D",
        label: "D",
        text: "Nhà nước mua toàn bộ trong thời gian dài",
        effect: { growth: -1, equity: 1, stability: 0, rolePoints: { state: -2, business: -1, worker: 1, citizen: 1 } },
      },
    ],
    message:
      "Hỗ trợ đúng cách là tạo điều kiện lưu thông hàng hóa và mở rộng thị trường, không phải bao cấp kéo dài.",
    bestOption: 1,
  },
  {
    id: 4,
    title: "Thị trường thiếu minh bạch",
    context:
      "Xuất hiện tình trạng cạnh tranh không lành mạnh, thông tin không minh bạch, người tiêu dùng bị thiệt hại, niềm tin thị trường giảm.",
    roleContext: {
      state: "Có 3 vụ kiện doanh nghiệp gian lận nhãn mác đang chờ xử lý. Nếu không có khung pháp lý mạnh, số vụ sẽ tăng gấp đôi. Luật mới cần 6 tháng để thông qua nhưng hiệu lực lâu dài.",
      business: "Đối thủ của bạn đang dán nhãn giả xuất xứ để bán giá cao hơn, giành khách hàng. Nếu có giám sát minh bạch, sân chơi mới công bằng và bạn có lợi thế cạnh tranh thật.",
      worker: "Bạn làm trong nhà máy sản xuất đúng chuẩn nhưng bị cạnh tranh bởi hàng gian lận rẻ hơn. Công ty có nguy cơ cắt giảm nhân sự. Quy định minh bạch sẽ bảo vệ việc làm của bạn.",
      citizen: "Bạn đã mua phải 2 sản phẩm kém chất lượng gắn mác cao cấp trong 3 tháng qua. Bạn không biết tin tưởng thương hiệu nào. Cần có cơ chế để người tiêu dùng không bị lừa.",
    },
    question: "Giải pháp lâu dài nào phù hợp nhất?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Hoàn thiện pháp luật và tăng cơ chế giám sát minh bạch",
        effect: { growth: 1, equity: 2, stability: 2, rolePoints: { state: 2, business: 1, worker: 2, citizen: 2 } },
      },
      {
        id: "B",
        label: "B",
        text: "Chỉ xử lý từng vụ việc nhỏ",
        effect: { growth: 0, equity: 0, stability: -1, rolePoints: { state: 0, business: 1, worker: -1, citizen: -1 } },
      },
      {
        id: "C",
        label: "C",
        text: "Không cần can thiệp",
        effect: { growth: -1, equity: -2, stability: -2, rolePoints: { state: -2, business: 2, worker: -2, citizen: -2 } },
      },
      {
        id: "D",
        label: "D",
        text: "Hạn chế mạnh hoạt động thị trường",
        effect: { growth: -2, equity: 0, stability: -1, rolePoints: { state: -1, business: -2, worker: 0, citizen: 0 } },
      },
    ],
    message:
      "Hoàn thiện thể chế là yếu tố quan trọng để thị trường vận hành hiệu quả và lành mạnh.",
    bestOption: 0,
  },
  {
    id: 5,
    title: "Chọn gói chính sách tổng hợp",
    context:
      "Sau nhiều biến động, nền kinh tế cần một gói định hướng tổng hợp để phát triển bền vững.",
    roleContext: {
      state: "Đây là vòng quyết định cuối. GDP tăng trưởng quan trọng cho nhiệm kỳ, nhưng bất ổn xã hội sẽ đe dọa tính chính danh. Lịch sử cho thấy tăng trưởng mà không có công bằng sẽ dẫn đến khủng hoảng.",
      business: "Môi trường ổn định và pháp lý minh bạch mới là điều kiện để đầu tư dài hạn. Tăng trưởng ngắn hạn 'bằng mọi giá' sẽ tạo ra bong bóng — bạn đã thấy điều đó ở các nước khác.",
      worker: "Sau 4 vòng, thu nhập thực của bạn phụ thuộc vào chính sách này. Nếu chỉ tăng trưởng mà không có an sinh, khoảng cách giàu nghèo sẽ doãng ra và bạn ở phía bị bỏ lại.",
      citizen: "Bạn muốn giá cả ổn định, việc làm có, và tương lai cho con cái. Không có công thức nào hoàn hảo — nhưng câu hỏi là ai sẽ được hi sinh và ai sẽ được hưởng lợi.",
    },
    question: "Nên chọn hướng nào?",
    options: [
      {
        id: "A",
        label: "A",
        text: "Chỉ ưu tiên tăng trưởng bằng mọi giá",
        effect: { growth: 2, equity: -2, stability: -1, rolePoints: { state: -1, business: 2, worker: -1, citizen: -2 } },
      },
      {
        id: "B",
        label: "B",
        text: "Chỉ tập trung an sinh ngắn hạn",
        effect: { growth: -1, equity: 2, stability: 0, rolePoints: { state: -1, business: -2, worker: 2, citizen: 2 } },
      },
      {
        id: "C",
        label: "C",
        text: "Kết hợp phát triển kinh tế với công bằng xã hội và ổn định thị trường",
        effect: { growth: 2, equity: 2, stability: 2, rolePoints: { state: 2, business: 2, worker: 2, citizen: 2 } },
      },
      {
        id: "D",
        label: "D",
        text: "Giảm mạnh vai trò điều tiết",
        effect: { growth: 0, equity: -2, stability: -2, rolePoints: { state: -2, business: 1, worker: -2, citizen: -1 } },
      },
    ],
    message:
      "Định hướng xã hội chủ nghĩa đòi hỏi phát triển kinh tế đi kèm công bằng và ổn định.",
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

export type GamePhase =
  | "lobby"
  | "waiting"
  | "round"
  | "round_result"
  | "final";

export interface GameState {
  roomCode: string;
  roomName: string;
  hostName: string;
  players: Player[];
  phase: GamePhase;
  currentRound: number;
  indicators: Indicators;
  votes: Record<string, string>; // playerId -> optionId
  roundHistory: Array<{
    roundId: number;
    winOption: string;
    effect: OptionEffect;
    voteBreakdown: Record<string, number>;
    roleChoices: Record<RoleId, string | null>;
  }>;
  countdown: number;
}

export interface Ending {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  condition: (indicators: Indicators) => boolean;
  color: string;
  icon: string;
}

export const ENDINGS: Ending[] = [
  {
    id: "sustainable",
    title: "Phát triển bền vững",
    subtitle: "Nền kinh tế phát triển tốt, xã hội ổn định",
    description:
      "Tất cả các chủ thể đã tìm được tiếng nói chung. Lợi ích được hài hòa, thị trường vận hành lành mạnh và xã hội ngày càng công bằng hơn.",
    condition: (i) => i.growth >= 3 && i.equity >= 3 && i.stability >= 3,
    color: "#4aad6e",
    icon: "🌱",
  },
  {
    id: "growth_imbalanced",
    title: "Tăng trưởng nhưng mất cân bằng",
    subtitle: "Phát triển nhanh nhưng xung đột lợi ích lớn",
    description:
      "Nền kinh tế tăng trưởng nhưng khoảng cách lợi ích ngày càng doãng ra. Người yếu thế chưa được bảo vệ đúng mức và thị trường tiềm ẩn bất ổn.",
    condition: (i) => i.growth >= 4 && (i.equity < 3 || i.stability < 3),
    color: "#e8943a",
    icon: "⚡",
  },
  {
    id: "stable_inefficient",
    title: "Ổn định nhưng hiệu quả thấp",
    subtitle: "Thiên về hỗ trợ trước mắt, thiếu động lực dài hạn",
    description:
      "Xã hội được bảo vệ nhưng động lực phát triển kinh tế bị suy giảm. Các chính sách chú trọng an sinh nhưng chưa tạo ra nền tảng tăng trưởng bền vững.",
    condition: (i) => i.equity >= 4 && i.growth < 3,
    color: "#4a8fe8",
    icon: "⚖️",
  },
  {
    id: "crisis",
    title: "Khủng hoảng lợi ích",
    subtitle: "Không điều hòa được mâu thuẫn giữa các chủ thể",
    description:
      "Các quyết định thiếu cân nhắc đã dẫn đến sự mất cân bằng nghiêm trọng. Mâu thuẫn lợi ích leo thang và thị trường mất ổn định.",
    condition: () => true,
    color: "#e0624a",
    icon: "⚠️",
  },
];

export function determineEnding(indicators: Indicators): Ending {
  return ENDINGS.find((e) => e.condition(indicators)) ?? ENDINGS[3];
}

export function computeRoleScores(
  roundHistory: Array<{ winOption: number; effect: OptionEffect; roundId: number }>
): Record<RoleId, number> {
  const scores: Record<RoleId, number> = { state: 0, business: 0, worker: 0, citizen: 0 };
  for (const hist of roundHistory) {
    const round = GAME_ROUNDS.find((r) => r.id === hist.roundId);
    if (!round) continue;
    const opt = round.options[hist.winOption];
    if (!opt) continue;
    for (const role of Object.keys(scores) as RoleId[]) {
      scores[role] += opt.effect.rolePoints[role] ?? 0;
    }
  }
  return scores;
}

export function generateRoomCode(): string {
  const num = Math.floor(100 + Math.random() * 900);
  return `CBLI-${num}`;
}

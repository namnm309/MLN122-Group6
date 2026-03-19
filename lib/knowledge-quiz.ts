export type KnowledgeQuizQuestion = {
  id: string;
  question: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export const knowledgeQuizQuestions: KnowledgeQuizQuestion[] = [
  {
    id: "q1",
    question:
      "Vì sao nói “hoàn thiện thể chế” là điều kiện quan trọng để KTTT định hướng XHCN vận hành hiệu quả ở Việt Nam?",
    choices: [
      "Vì thể chế càng yếu thì cạnh tranh càng công bằng",
      "Vì thể chế là “luật chơi”; luật rõ – thực thi nghiêm giúp giảm méo mó, lợi ích nhóm và làm thị trường chạy đúng hướng",
      "Vì hoàn thiện thể chế đồng nghĩa Nhà nước không cần quản lý nữa",
      "Vì chỉ cần tăng GDP, còn công bằng/ổn định để sau",
    ],
    correctIndex: 1,
    explanation:
      "Ở Việt Nam, hoàn thiện thể chế giúp giảm chồng chéo – rườm rà, tăng minh bạch – dự đoán được, hạn chế độc quyền/lợi ích nhóm và bảo đảm định hướng công bằng – ổn định.",
  },
  {
    id: "q2",
    question: "“Thể chế kinh tế” có thể hiểu nôm na là gì?",
    choices: [
      "Giá cả tự hình thành trên thị trường",
      "Chỉ là nguồn thu – chi ngân sách Nhà nước",
      "“Luật chơi” của nền kinh tế (luật, chính sách, bộ máy thực thi, cơ chế giám sát)",
      "Chỉ là lợi nhuận của doanh nghiệp",
    ],
    correctIndex: 2,
    explanation:
      "Thể chế là khung luật lệ/chính sách và cách quản lý – thực thi để thị trường vận hành thông suốt, minh bạch và cạnh tranh lành mạnh.",
  },
  {
    id: "q3",
    question:
      "Ở Việt Nam, nếu thể chế yếu (luật chồng chéo, thực thi kém) thì hệ quả nào dễ xảy ra nhất?",
    choices: [
      "Thủ tục gọn nhẹ hơn và chi phí giảm",
      "Thủ tục rườm rà, chi phí tăng, thị trường bị méo mó và phát sinh lợi ích nhóm",
      "Tự động giảm bất bình đẳng xã hội",
      "Tự động tăng năng suất lao động",
    ],
    correctIndex: 1,
    explanation:
      "Thể chế yếu làm tăng chi phí giao dịch, tạo kẽ hở cho độc quyền/lợi ích nhóm và phân bổ nguồn lực sai.",
  },
  {
    id: "q4",
    question:
      "Trong 5 mảng hoàn thiện thể chế, mảng nào nhấn mạnh đồng bộ các thị trường (hàng hóa, lao động, vốn, BĐS, KH-CN…)?",
    choices: [
      "Sở hữu & thành phần kinh tế",
      "Yếu tố thị trường vận hành đồng bộ",
      "Tăng trưởng đi cùng công bằng",
      "Hội nhập kinh tế quốc tế",
    ],
    correctIndex: 1,
    explanation:
      "Mảng này tập trung làm cho các thị trường vận hành thông suốt, tránh điểm nghẽn gây méo mó toàn hệ thống.",
  },
  {
    id: "q5",
    question:
      "Vai trò quản lý của Nhà nước thể hiện rõ nhất ở việc nào?",
    choices: [
      "Không ban hành luật để thị trường tự chạy",
      "Chỉ can thiệp bằng mệnh lệnh hành chính, không dùng công cụ kinh tế",
      "Ban hành luật, điều tiết, chống độc quyền và đầu tư hạ tầng – giáo dục – y tế",
      "Cấm cạnh tranh để ổn định giá",
    ],
    correctIndex: 2,
    explanation:
      "Nhà nước tạo khung pháp lý, điều tiết vĩ mô và cung cấp nền tảng (hạ tầng, dịch vụ công) để thị trường phát triển đúng hướng.",
  },
  {
    id: "q6",
    question:
      "“Quan hệ lợi ích kinh tế” giữa các chủ thể ở Việt Nam thường có đặc điểm nào?",
    choices: [
      "Luôn thống nhất hoàn toàn, không có mâu thuẫn",
      "Luôn mâu thuẫn hoàn toàn, không thể hợp tác",
      "Vừa thống nhất vừa mâu thuẫn, cần cơ chế điều hòa",
      "Chỉ tồn tại giữa doanh nghiệp và Nhà nước",
    ],
    correctIndex: 2,
    explanation:
      "Lợi ích có mặt thống nhất (khi kinh tế tốt nhiều bên cùng hưởng) và mặt mâu thuẫn (mỗi bên muốn tối đa phần mình).",
  },
  {
    id: "q7",
    question:
      "Ví dụ “Chủ doanh nghiệp ↔ Công nhân” mâu thuẫn lợi ích thường xoay quanh vấn đề gì?",
    choices: [
      "Thuế xuất nhập khẩu",
      "Lương/chi phí và điều kiện lao động",
      "Tỷ giá hối đoái",
      "Giá bất động sản",
    ],
    correctIndex: 1,
    explanation:
      "Doanh nghiệp muốn tối ưu chi phí, công nhân muốn tăng lương và cải thiện điều kiện làm việc; cần luật lao động và cơ chế thương lượng.",
  },
  {
    id: "q8",
    question:
      "Trong 4 nguyên tắc điều hòa lợi ích, ý nào nhấn mạnh “lợi ích cá nhân phải phù hợp lợi ích xã hội”?",
    choices: [
      "Tôn trọng lợi ích chính đáng của các chủ thể",
      "Kết hợp hài hòa lợi ích cá nhân – tập thể – xã hội",
      "Lợi ích cá nhân trong khuôn khổ pháp luật và đạo đức",
      "Nhà nước giữ vai trò điều tiết",
    ],
    correctIndex: 2,
    explanation:
      "Cá nhân được theo đuổi lợi ích nhưng phải trong khuôn khổ pháp luật/đạo đức để không gây hại lợi ích chung.",
  },
  {
    id: "q9",
    question:
      "Nhà nước có thể điều hòa quan hệ lợi ích bằng nhóm công cụ nào?",
    choices: [
      "Pháp luật, thuế, lương, an sinh, chống độc quyền",
      "Chỉ tuyên truyền, không cần chính sách",
      "Chỉ tăng giá bán để bù chi phí",
      "Cấm mọi hình thức sở hữu tư nhân",
    ],
    correctIndex: 0,
    explanation:
      "Các công cụ chính sách giúp giảm xung đột lợi ích và bảo vệ nhóm yếu thế, qua đó ổn định xã hội và môi trường kinh doanh.",
  },
  {
    id: "q10",
    question:
      "Câu nào sau đây thể hiện đúng “tinh thần” kết hợp các mặt đối lập khi vận dụng ở Việt Nam?",
    choices: [
      "Chọn một mục tiêu duy nhất (tăng trưởng) rồi tính sau",
      "Thị trường tạo động lực nhưng cần Nhà nước định hướng; tăng trưởng đi cùng công bằng và ổn định",
      "Càng ít luật càng tốt vì thị trường tự sửa mọi thứ",
      "Mâu thuẫn lợi ích không cần điều hòa, để tự giải quyết",
    ],
    correctIndex: 1,
    explanation:
      "Chương 5 nhấn mạnh dung hòa: mở – quản, hiệu quả – công bằng, tăng trưởng – bền vững; và điều hòa lợi ích để giảm xung đột, tăng hợp tác.",
  },
];


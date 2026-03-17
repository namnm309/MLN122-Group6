export type LandingAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type LandingBullet = {
  label?: string;
  text: string;
};

export type LandingSlide =
  | {
      id: string;
      navLabel: string;
      kind: "hero";
      eyebrow: string;
      title: string;
      accent?: string;
      lead: string;
      actions: LandingAction[];
    }
  | {
      id: string;
      navLabel: string;
      kind: "video";
      eyebrow: string;
      title: string;
      lead: string;
      note: string;
      videoSrc: string;
      openHref: string;
      actions: LandingAction[];
    }
  | {
      id: string;
      navLabel: string;
      kind: "content";
      eyebrow: string;
      title: string;
      lead: string;
      bullets: LandingBullet[];
      asideTitle?: string;
      asideText?: string;
      formulas?: string[];
      actions?: LandingAction[];
    }
  | {
      id: string;
      navLabel: string;
      kind: "howtoSteps";
      eyebrow: string;
      title: string;
      lead: string;
      steps: LandingBullet[];
      note: string;
      actions?: LandingAction[];
    }
  | {
      id: string;
      navLabel: string;
      kind: "howtoSummary";
      eyebrow: string;
      title: string;
      lead: string;
      roles: LandingBullet[];
      indicators: LandingBullet[];
      actions?: LandingAction[];
    };

export const landingSlides: LandingSlide[] = [
  {
    id: "video",
    navLabel: "Video",
    kind: "video",
    eyebrow: "",
    title: "Video lý thuyết ngắn",
    lead:
      "Xem nhanh để lấy bối cảnh chung. Sau đó mỗi màn bên dưới sẽ bóc tách từng ý theo nhịp ngắn, dễ đọc và dễ nhớ hơn.",
    note: "",
    videoSrc: "https://drive.google.com/file/d/1tIckbcONnWTjaW2KPwUeBLNG-8Jn2P-4/view?usp=sharing",
    openHref: "https://drive.google.com/file/d/1tIckbcONnWTjaW2KPwUeBLNG-8Jn2P-4/view?usp=sharing",
    actions: [
      { label: "Tiếp tục sang lý thuyết", href: "#tomtat", variant: "primary" },
    ],
  },
  {
    id: "tomtat",
    navLabel: "Lý thuyết",
    kind: "content",
    eyebrow: "Lý thuyết 1/6",
    title: "Tóm tắt nhanh",
    lead:
      "Khung logic của chương 5: thị trường tạo động lực, Nhà nước định hướng để tránh lệch hướng, còn quan hệ lợi ích luôn vừa hợp tác vừa xung đột nên cần cơ chế điều hòa.",
    bullets: [
      {
        label: "KTTT định hướng XHCN",
        text: "Dùng cơ chế thị trường để phân bổ nguồn lực (giá cả, cạnh tranh, cung–cầu), nhưng Nhà nước định hướng để gắn tăng trưởng với công bằng, an sinh và ổn định.",
      },
      {
        label: "Thể chế",
        text: "Là “bộ luật chơi” (luật, chính sách, bộ máy, chuẩn mực) quyết định thị trường chạy thông hay bị méo mó.",
      },
      {
        label: "Quan hệ lợi ích",
        text: "Là tương tác lợi ích giữa cá nhân – tập thể – xã hội: có mặt thống nhất (cùng hưởng khi kinh tế tốt) và mặt mâu thuẫn (ai cũng muốn tối đa phần mình).",
      },
      {
        label: "Góc nhìn triết học",
        text: "Đây là một bài toán “biện chứng”: hai mặt đối lập (hiệu quả–công bằng, tự do kinh doanh–quản lý Nhà nước) phải được kết hợp trong một cơ chế vận hành ổn định.",
      },
    ],
    asideTitle: "Nhớ nhanh",
    asideText:
      "Nếu thị trường là “động cơ”, thì thể chế là “luật đường”, và điều tiết là “tay lái”. Thiếu một trong ba, phát triển sẽ hoặc chậm, hoặc lệch, hoặc bất ổn.",
  },
  {
    id: "theche",
    navLabel: "Thể chế",
    kind: "content",
    eyebrow: "Lý thuyết 2/6",
    title: "Thể chế là gì",
    lead:
      "Thể chế là toàn bộ luật lệ, chính sách và cách quản lý để nền kinh tế vận hành. Nói gọn: thể chế quyết định “luật chơi” thị trường chạy đúng hay lệch.",
    bullets: [
      {
        label: "Cấu phần",
        text: "Gồm luật (đất đai, lao động, DN…), chính sách (thuế, lương, an sinh), bộ máy thực thi và cơ chế giám sát.",
      },
      {
        label: "Chức năng",
        text: "Tạo niềm tin và dự đoán được: ai làm đúng luật thì được bảo vệ; ai làm sai thì bị xử lý.",
      },
      { label: "Luật chồng chéo", text: "Doanh nghiệp khó quyết định, thủ tục kéo dài, chi phí tăng → kìm hãm động lực thị trường." },
      {
        label: "Cạnh tranh méo mó",
        text: "Dễ phát sinh độc quyền, lợi ích nhóm và ưu ái không công bằng → phân bổ nguồn lực sai.",
      },
      {
        label: "Hệ quả xã hội",
        text: "Người lao động thiệt thòi, bất bình đẳng tăng, tài nguyên bị khai thác bừa bãi → bất ổn và phản tác dụng phát triển.",
      },
    ],
    asideTitle: "Mấu chốt",
    asideText:
      "Hoàn thiện thể chế là “nâng chất” luật chơi để vừa khuyến khích làm ăn, vừa chặn méo mó (độc quyền, tham nhũng, bóc lột, ô nhiễm…).",
  },
  {
    id: "noidung",
    navLabel: "5 mảng",
    kind: "content",
    eyebrow: "Lý thuyết 3/6",
    title: "Năm mảng cần hoàn thiện",
    lead:
      "Có thể nhớ như 5 “trụ” để thị trường chạy đúng hướng: quyền sở hữu rõ, thị trường đồng bộ, Nhà nước điều tiết, tăng trưởng đi cùng công bằng và hội nhập đúng luật chơi quốc tế.",
    bullets: [
      { label: "A", text: "Sở hữu & thành phần kinh tế: công nhận đa sở hữu, bảo vệ quyền tài sản hợp pháp, cạnh tranh bình đẳng." },
      { label: "B", text: "Thị trường đồng bộ: hàng hóa, lao động, vốn, BĐS, KH-CN… tránh chỗ “tắc” làm méo toàn hệ." },
      { label: "C", text: "Nhà nước điều tiết: luật rõ, chống độc quyền, kiểm soát rủi ro (lạm phát, sốc giá), đầu tư hạ tầng." },
      { label: "D", text: "Công bằng & an sinh: giảm nghèo, việc làm, giáo dục–y tế, hỗ trợ vùng yếu thế để ổn định xã hội." },
      { label: "E", text: "Hội nhập: minh bạch, chuẩn chất lượng, sở hữu trí tuệ, cải cách thủ tục để DN “chơi được” sân toàn cầu." },
    ],
    asideTitle: "Góc nhìn triết học",
    asideText:
      "5 trụ này là cách dung hòa các cặp đối lập: mở – quản, cạnh tranh – bảo vệ, hiệu quả – công bằng, tăng trưởng – bền vững.",
  },
  {
    id: "loiich",
    navLabel: "Lợi ích",
    kind: "content",
    eyebrow: "Lý thuyết 4/6",
    title: "Lợi ích kinh tế",
    lead:
      "Lợi ích kinh tế là cái mỗi chủ thể muốn đạt trong hoạt động kinh tế. Vì nguồn lực có hạn, nên quan hệ lợi ích luôn có cả hợp tác và xung đột.",
    bullets: [
      { label: "Khái niệm", text: "Lợi ích kinh tế = mục tiêu vật chất/thu nhập/điều kiện sống mà chủ thể theo đuổi (lương, lợi nhuận, thu ngân sách…).", },
      { label: "Cá nhân", text: "Muốn lương tốt hơn, cơ hội học tập tốt hơn, điều kiện sống ổn định hơn → động lực trực tiếp của lao động và sáng tạo." },
      { label: "Tập thể", text: "Muốn tổ chức/doanh nghiệp tăng hiệu quả và vị thế → tối ưu chi phí, mở rộng sản xuất, tăng năng suất." },
      { label: "Xã hội", text: "Muốn lợi ích chung: phát triển bền, trật tự, môi trường, công bằng → ổn định để tái sản xuất xã hội." },
      { label: "Tính hai mặt", text: "Thống nhất khi “chiếc bánh” lớn lên; mâu thuẫn khi chia phần (lương–lợi nhuận, giá thấp–giá cao, môi trường–tăng trưởng…).", },
    ],
    asideTitle: "Ví dụ",
    asideText:
      "Chủ DN muốn giảm chi phí, công nhân muốn tăng lương, xã hội muốn có việc làm nhưng không bất ổn. Đây là mâu thuẫn lợi ích điển hình cần điều tiết.",
  },
  {
    id: "nguyentac",
    navLabel: "Nguyên tắc",
    kind: "content",
    eyebrow: "Lý thuyết 5/6",
    title: "Nguyên tắc điều hòa",
    lead:
      "Điều hòa quan hệ lợi ích không phải triệt tiêu lợi ích cá nhân, mà là thiết kế cơ chế để lợi ích cá nhân vận động trong khuôn khổ pháp luật và phù hợp lợi ích chung.",
    bullets: [
      { label: "1) Chính đáng", text: "Tôn trọng lợi ích hợp pháp của các chủ thể (làm giàu hợp pháp, cạnh tranh lành mạnh, quyền lợi NLĐ…).", },
      { label: "2) Hài hòa", text: "Kết hợp lợi ích cá nhân – tập thể – xã hội; tránh thiên lệch một phía gây bất ổn.", },
      { label: "3) Khuôn khổ", text: "Lợi ích cá nhân phải trong khuôn khổ pháp luật và đạo đức (không trốn thuế, gian lận, phá môi trường, bóc lột…).", },
      { label: "4) Vai trò Nhà nước", text: "Dùng luật, thuế, chính sách lương, an sinh, chống độc quyền, tiêu chuẩn môi trường… để điều tiết.", },
      { label: "5) Cơ chế phân phối lại", text: "Thuế và an sinh giúp giảm chênh lệch quá mức, giữ ổn định xã hội để phát triển dài hạn.", },
    ],
    asideTitle: "Nhìn thực tế",
    asideText:
      "Đình công, ô nhiễm, độc quyền hay “lợi ích nhóm” đều là biểu hiện quan hệ lợi ích lệch. Điều hòa là đưa mâu thuẫn về khuôn khổ giải quyết.",
  },
  {
    id: "ket",
    navLabel: "Kết luận",
    kind: "content",
    eyebrow: "Lý thuyết 6/6",
    title: "Kết luận & công thức nhớ",
    lead:
      "Chương 5 có thể gói thành 2 công thức + 1 logic triết học: kết hợp các mặt đối lập để hệ thống vận hành ổn định (tăng trưởng nhưng không đánh đổi công bằng và bền vững).",
    bullets: [
      { label: "Thể chế", text: "Hoàn thiện thể chế = làm luật chơi đầy đủ, minh bạch, thực thi nghiêm để thị trường chạy đúng." },
      { label: "Định hướng", text: "Phát triển = tăng trưởng + công bằng + bền vững + ổn định (không chỉ nhìn GDP)." },
      { label: "Quan hệ lợi ích", text: "Lợi ích vừa thống nhất vừa mâu thuẫn → cần cơ chế điều tiết để giảm xung đột và khuyến khích hợp tác." },
      { label: "Triết học", text: "Biện chứng: không chọn 1 trong 2, mà tổ chức cơ chế để hai mặt đối lập cùng tồn tại và chuyển hóa theo hướng tích cực." },
    ],
    formulas: [
      "KTTT ĐH XHCN = Thị trường + Nhà nước định hướng + Công bằng",
      "Quan hệ lợi ích = Cá nhân + Tập thể + Xã hội -> vừa thống nhất, vừa mâu thuẫn -> cần hài hòa, điều tiết",
    ],
    actions: [{ label: "Sang hướng dẫn chơi", href: "#howto-flow", variant: "primary" }],
  },
  {
    id: "howto-flow",
    navLabel: "Hướng dẫn",
    kind: "howtoSteps",
    eyebrow: "Cách chơi 1/2",
    title: "Nhịp chơi trong game",
    lead:
      "Game xoay quanh thảo luận, bỏ phiếu và chấp nhận đánh đổi. Bạn không chỉ chọn đáp án đúng, mà phải chọn phương án hợp với vai của mình.",
    steps: [
      { label: "01", text: "Host tạo phòng, chia sẻ mã và người chơi lần lượt tham gia." },
      { label: "02", text: "Mỗi người chọn một vai với góc nhìn lợi ích khác nhau." },
      { label: "03", text: "Mỗi vòng có bối cảnh thực tế và 4 phương án A/B/C/D." },
      { label: "04", text: "Người chơi bỏ 1 phiếu trong 30 giây, hết giờ hệ thống tự chốt." },
      { label: "05", text: "Phương án thắng sẽ đổi 3 chỉ số chung và điểm lợi ích của từng vai." },
      { label: "06", text: "Cuối game hệ thống tổng hợp điểm vai trò và kết cục toàn cục." },
    ],
    note: "Điểm hay nhất của game là tranh luận trước khi vote, vì mỗi vai sẽ ưu tiên một lợi ích khác nhau.",
    actions: [{ label: "Xem vai trò & chỉ số", href: "#howto-summary", variant: "primary" }],
  },
  {
    id: "howto-summary",
    navLabel: "Vai trò",
    kind: "howtoSummary",
    eyebrow: "Cách chơi 2/2",
    title: "Vai trò & chỉ số chung",
    lead:
      "Muốn chơi tốt, bạn cần hiểu vai của mình đang bảo vệ điều gì và hệ thống đang đo kết quả bằng những chỉ số nào.",
    roles: [
      { label: "Nhà nước", text: "Ưu tiên ổn định, điều tiết và giữ cân bằng giữa các nhóm lợi ích." },
      { label: "Doanh nghiệp", text: "Ưu tiên tăng trưởng, hiệu quả đầu tư và mở rộng hoạt động." },
      { label: "Người lao động", text: "Ưu tiên việc làm, thu nhập, điều kiện lao động và an sinh." },
      { label: "Người dân", text: "Ưu tiên chất lượng sống, giá cả hợp lý, môi trường và công bằng." },
    ],
    indicators: [
      { label: "Tăng trưởng", text: "Đo hiệu quả phát triển sản xuất và sức bật kinh tế." },
      { label: "Công bằng", text: "Đo mức độ bảo vệ người yếu thế và phân phối lợi ích." },
      { label: "Ổn định", text: "Đo khả năng kiểm soát biến động và giữ niềm tin thị trường." },
    ],
    actions: [
      { label: "Vào game ngay", href: "/game", variant: "primary" },
      { label: "Quay lại video", href: "#video", variant: "secondary" },
    ],
  },
];

export const landingNavItems = [
  { label: "Video", href: "#video" },
  { label: "Lý thuyết", href: "#tomtat" },
  { label: "Hướng dẫn", href: "#howto-flow" },
] as const;


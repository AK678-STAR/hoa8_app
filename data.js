// ========================================================
// DỮ LIỆU ĐẦY ĐỦ: TÁCH RIÊNG 1 BÊN CÂN BẰNG PHƯƠNG TRÌNH & 1 BÊN LÝ THUYẾT
// ========================================================

const ELEMENT_COLORS = {
    H: { name: "Hydro", color: "#e2e8f0", textColor: "#0f172a", radius: 12 },
    O: { name: "Oxy", color: "#ef4444", textColor: "#ffffff", radius: 15 },
    N: { name: "Nitơ", color: "#3b82f6", textColor: "#ffffff", radius: 15 },
    C: { name: "Cacbon", color: "#64748b", textColor: "#ffffff", radius: 15 },
    Cl: { name: "Clo", color: "#10b981", textColor: "#0f172a", radius: 16 },
    Na: { name: "Natri", color: "#a855f7", textColor: "#ffffff", radius: 17 },
    K: { name: "Kali", color: "#9333ea", textColor: "#ffffff", radius: 18 },
    Mg: { name: "Magie", color: "#06b6d4", textColor: "#0f172a", radius: 17 },
    Ca: { name: "Canxi", color: "#0284c7", textColor: "#ffffff", radius: 18 },
    Ba: { name: "Bari", color: "#0369a1", textColor: "#ffffff", radius: 19 },
    Al: { name: "Nhôm", color: "#38bdf8", textColor: "#0f172a", radius: 17 },
    Fe: { name: "Sắt", color: "#f59e0b", textColor: "#0f172a", radius: 18 },
    Cu: { name: "Đồng", color: "#ea580c", textColor: "#ffffff", radius: 18 },
    Zn: { name: "Kẽm", color: "#6b7280", textColor: "#ffffff", radius: 17 },
    S: { name: "Lưu huỳnh", color: "#eab308", textColor: "#0f172a", radius: 16 },
    P: { name: "Photpho", color: "#f97316", textColor: "#ffffff", radius: 16 },
    Ag: { name: "Bạc", color: "#cbd5e1", textColor: "#0f172a", radius: 18 }
};

// BẢNG HÓA TRỊ ĐẦY ĐỦ
const VALENCE_DATA = [
    { name: "Hydro", symbol: "H", valence: ["I"], type: "Phi kim", note: "Luôn có hóa trị I trong mọi hợp chất." },
    { name: "Natri", symbol: "Na", valence: ["I"], type: "Kim loại", note: "Kim loại kiềm hóa trị I (NaCl, NaOH)." },
    { name: "Kali", symbol: "K", valence: ["I"], type: "Kim loại", note: "Kim loại kiềm hóa trị I (KCl, KOH)." },
    { name: "Bạc", symbol: "Ag", valence: ["I"], type: "Kim loại", note: "Bạc luôn có hóa trị I (AgCl, AgNO3)." },
    { name: "Liti", symbol: "Li", valence: ["I"], type: "Kim loại", note: "Kim loại kiềm hóa trị I (LiOH)." },
    { name: "Clo", symbol: "Cl", valence: ["I"], type: "Phi kim", note: "Clo trong muối Clorua và axit HCl có hóa trị I." },
    { name: "Nhóm Hiđroxit", symbol: "OH", valence: ["I"], type: "Gốc Bazơ", note: "Nhóm -OH luôn có hóa trị I (NaOH, Ca(OH)2)." },
    { name: "Nhóm Nitrat", symbol: "NO3", valence: ["I"], type: "Gốc Axit", note: "Gốc axit -NO3 có hóa trị I (HNO3, AgNO3)." },

    { name: "Oxy", symbol: "O", valence: ["II"], type: "Phi kim", note: "Oxy luôn có hóa trị II (CuO, FeO, H2O)." },
    { name: "Magie", symbol: "Mg", valence: ["II"], type: "Kim loại", note: "Magie luôn có hóa trị II (MgO, MgCl2)." },
    { name: "Canxi", symbol: "Ca", valence: ["II"], type: "Kim loại", note: "Canxi luôn có hóa trị II (CaO, CaCO3)." },
    { name: "Bari", symbol: "Ba", valence: ["II"], type: "Kim loại", note: "Bari luôn có hóa trị II (BaCl2, BaSO4)." },
    { name: "Kẽm", symbol: "Zn", valence: ["II"], type: "Kim loại", note: "Kẽm luôn có hóa trị II (ZnO, ZnSO4)." },
    { name: "Đồng", symbol: "Cu", valence: ["II"], type: "Kim loại", note: "Đồng thường gặp nhất là hóa trị II (CuO, CuSO4)." },
    { name: "Chì", symbol: "Pb", valence: ["II"], type: "Kim loại", note: "Chì thường gặp hóa trị II (PbO, Pb(NO3)2)." },
    { name: "Nhóm Sunfat", symbol: "SO4", valence: ["II"], type: "Gốc Axit", note: "Gốc =SO4 có hóa trị II (H2SO4, BaSO4)." },
    { name: "Nhóm Cacbonat", symbol: "CO3", valence: ["II"], type: "Gốc Axit", note: "Gốc =CO3 có hóa trị II (CaCO3, Na2CO3)." },

    { name: "Nhôm", symbol: "Al", valence: ["III"], type: "Kim loại", note: "Nhôm luôn luôn có hóa trị III (Al2O3, AlCl3)." },
    { name: "Nhóm Photphat", symbol: "PO4", valence: ["III"], type: "Gốc Axit", note: "Gốc ≡PO4 có hóa trị III (H3PO4, AlPO4)." },

    { name: "Sắt", symbol: "Fe", valence: ["II", "III"], type: "Kim loại", note: "Sắt có 2 hóa trị: II (FeCl2, FeSO4) và III (FeCl3, Fe2O3)." },
    { name: "Cacbon", symbol: "C", valence: ["II", "IV"], type: "Phi kim", note: "Cacbon có hóa trị II (khí CO) và IV (CO2, CH4)." },
    { name: "Lưu huỳnh", symbol: "S", valence: ["II", "IV", "VI"], type: "Phi kim", note: "Lưu huỳnh có hóa trị II (H2S, FeS), IV (SO2), VI (SO3)." },
    { name: "Photpho", symbol: "P", valence: ["III", "V"], type: "Phi kim", note: "Photpho có hóa trị III (P2O3) và V (P2O5)." },
    { name: "Nitơ", symbol: "N", valence: ["I", "II", "III", "IV", "V"], type: "Phi kim", note: "Nitơ đa hóa trị, thường gặp trong oxit NO2 (IV) và N2O5 (V)." }
];

// ========================================================
// PHẦN 1: KHO CHUYÊN CÂN BẰNG PHƯƠNG TRÌNH HÓA HỌC (4 CẤP ĐỘ)
// ========================================================
const EQUATION_LESSONS = {
    level_1: [
        {
            name: "Magie cháy trong Oxy",
            eqDisplay: "Mg + O₂ ➔ MgO",
            solution: "2Mg + O₂ ➔ 2MgO",
            reactants: [{ formula: "Mg", atoms: { Mg: 1 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "MgO", atoms: { Mg: 1, O: 1 } }],
            primaryElem: "Mg",
            secondaryElem: "O",
            trick: "Kim loại Mg trước, Oxy sau",
            traps: ["Sửa thành MgO₂", "4Mg + 2O₂ ➔ 4MgO (Chưa tối giản)", "Cân bằng Oxy trước Mg"]
        },
        {
            name: "Sắt tác dụng axit HCl",
            eqDisplay: "Fe + HCl ➔ FeCl₂ + H₂",
            solution: "Fe + 2HCl ➔ FeCl₂ + H₂",
            reactants: [{ formula: "Fe", atoms: { Fe: 1 } }, { formula: "HCl", atoms: { H: 1, Cl: 1 } }],
            products: [{ formula: "FeCl2", atoms: { Fe: 1, Cl: 2 } }, { formula: "H2", atoms: { H: 2 } }],
            primaryElem: "Fe",
            secondaryElem: "Cl",
            trick: "Kim loại Fe ➔ Phi kim Cl ➔ H",
            traps: ["Sửa thành HCl₂", "2Fe + 4HCl ➔ 2FeCl₂ + 2H₂ (Chưa tối giản)", "Cân bằng H trước Cl"]
        },
        {
            name: "Kẽm tác dụng axit HCl",
            eqDisplay: "Zn + HCl ➔ ZnCl₂ + H₂",
            solution: "Zn + 2HCl ➔ ZnCl₂ + H₂",
            reactants: [{ formula: "Zn", atoms: { Zn: 1 } }, { formula: "HCl", atoms: { H: 1, Cl: 1 } }],
            products: [{ formula: "ZnCl2", atoms: { Zn: 1, Cl: 2 } }, { formula: "H2", atoms: { H: 2 } }],
            primaryElem: "Zn",
            secondaryElem: "Cl",
            trick: "Kim loại Zn ➔ Phi kim Cl ➔ H",
            traps: ["Thêm 2 vào Zn", "Sửa thành ZnCl", "Điền 2Zn + 2HCl"]
        },
        {
            name: "Khí Hydro cháy trong Oxy",
            eqDisplay: "H₂ + O₂ ➔ H₂O",
            solution: "2H₂ + O₂ ➔ 2H₂O",
            reactants: [{ formula: "H2", atoms: { H: 2 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "H2O", atoms: { H: 2, O: 1 } }],
            primaryElem: "O",
            secondaryElem: "H",
            trick: "Làm chẵn Oxy trước ➔ Thêm 2 vào H₂O",
            traps: ["Sửa thành H₂O₂", "H₂ + O₂ ➔ H₂O (Để nguyên 1:1:1)", "4H₂ + 2O₂ ➔ 4H₂O (Chưa tối giản)"]
        },
        {
            name: "Đồng tác dụng với Oxy",
            eqDisplay: "Cu + O₂ ➔ CuO",
            solution: "2Cu + O₂ ➔ 2CuO",
            reactants: [{ formula: "Cu", atoms: { Cu: 1 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "CuO", atoms: { Cu: 1, O: 1 } }],
            primaryElem: "Cu",
            secondaryElem: "O",
            trick: "Kim loại Cu ➔ Oxy",
            traps: ["Sửa thành CuO₂", "Cu + O₂ ➔ CuO", "4Cu + 2O₂ ➔ 4CuO"]
        }
    ],

    level_2: [
        {
            name: "Nhôm cháy sáng trong Oxy",
            eqDisplay: "Al + O₂ ➔ Al₂O₃",
            solution: "4Al + 3O₂ ➔ 2Al₂O₃",
            reactants: [{ formula: "Al", atoms: { Al: 1 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "Al2O3", atoms: { Al: 2, O: 3 } }],
            primaryElem: "Al",
            secondaryElem: "O",
            trick: "Bẻ lẻ thành chẵn (Nhân 2 vào Al₂O₃)",
            traps: ["2Al + 3O₂ ➔ Al₂O₃", "Sửa thành AlO₂", "8Al + 6O₂ ➔ 4Al₂O₃ (Chưa tối giản)"]
        },
        {
            name: "Sắt cháy trong khí Clo",
            eqDisplay: "Fe + Cl₂ ➔ FeCl₃",
            solution: "2Fe + 3Cl₂ ➔ 2FeCl₃",
            reactants: [{ formula: "Fe", atoms: { Fe: 1 } }, { formula: "Cl2", atoms: { Cl: 2 } }],
            products: [{ formula: "FeCl3", atoms: { Fe: 1, Cl: 3 } }],
            primaryElem: "Fe",
            secondaryElem: "Cl",
            trick: "Bẻ lẻ thành chẵn (Nhân 2 vào FeCl₃)",
            traps: ["Fe + 3Cl₂ ➔ FeCl₃", "Sửa thành FeCl₂", "4Fe + 6Cl₂ ➔ 4FeCl₃ (Chưa tối giản)"]
        },
        {
            name: "Đốt Photpho trong Oxy",
            eqDisplay: "P + O₂ ➔ P₂O₅",
            solution: "4P + 5O₂ ➔ 2P₂O₅",
            reactants: [{ formula: "P", atoms: { P: 1 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "P2O5", atoms: { P: 2, O: 5 } }],
            primaryElem: "P",
            secondaryElem: "O",
            trick: "Bội chung nhỏ nhất (BCNN 2 và 5 là 10)",
            traps: ["2P + 5O₂ ➔ P₂O₅", "P + O₂ ➔ P₂O₅", "8P + 10O₂ ➔ 4P₂O₅ (Chưa tối giản)"]
        },
        {
            name: "Nhôm tác dụng axit HCl",
            eqDisplay: "Al + HCl ➔ AlCl₃ + H₂",
            solution: "2Al + 6HCl ➔ 2AlCl₃ + 3H₂",
            reactants: [{ formula: "Al", atoms: { Al: 1 } }, { formula: "HCl", atoms: { H: 1, Cl: 1 } }],
            products: [{ formula: "AlCl3", atoms: { Al: 1, Cl: 3 } }, { formula: "H2", atoms: { H: 2 } }],
            primaryElem: "Al",
            secondaryElem: "Cl",
            trick: "BCNN của Cl(3) và H(2) là 6",
            traps: ["Al + 3HCl ➔ AlCl₃ + H₂", "2Al + 3HCl ➔ AlCl₃ + 3H₂", "4Al + 12HCl ➔ 4AlCl₃ + 6H₂"]
        },
        {
            name: "Natri phản ứng với Nước",
            eqDisplay: "Na + H₂O ➔ NaOH + H₂",
            solution: "2Na + 2H₂O ➔ 2NaOH + H₂",
            reactants: [{ formula: "Na", atoms: { Na: 1 } }, { formula: "H2O", atoms: { H: 2, O: 1 } }],
            products: [{ formula: "NaOH", atoms: { Na: 1, O: 1, H: 1 } }, { formula: "H2", atoms: { H: 2 } }],
            primaryElem: "Na",
            secondaryElem: "H",
            trick: "Làm chẵn tổng H vế phải (Nhân 2 NaOH)",
            traps: ["Na + H₂O ➔ NaOH + H₂ (1:1:1:1)", "Na + 2H₂O ➔ NaOH + H₂", "4Na + 4H₂O ➔ 4NaOH + 2H₂"]
        }
    ],

    level_3: [
        {
            name: "Nhôm tác dụng axit H₂SO₄",
            eqDisplay: "Al + H₂SO₄ ➔ Al₂(SO₄)₃ + H₂",
            solution: "2Al + 3H₂SO₄ ➔ Al₂(SO₄)₃ + 3H₂",
            reactants: [{ formula: "Al", atoms: { Al: 1 } }, { formula: "H2SO4", atoms: { H: 2, S: 1, O: 4 } }],
            products: [{ formula: "Al2(SO4)3", atoms: { Al: 2, S: 3, O: 12 } }, { formula: "H2", atoms: { H: 2 } }],
            primaryElem: "Al",
            secondaryElem: "SO4",
            trick: "Đóng gói bưu kiện nhóm SO₄ (3 nhóm SO₄)",
            traps: ["Al + 3H₂SO₄ ➔ Al₂(SO₄)₃ + 3H₂", "2Al + H₂SO₄ ➔ Al₂(SO₄)₃ + H₂", "Sửa thành AlSO₄"]
        },
        {
            name: "Bari clorua + Bạc nitrat",
            eqDisplay: "BaCl₂ + AgNO₃ ➔ Ba(NO₃)₂ + AgCl",
            solution: "BaCl₂ + 2AgNO₃ ➔ Ba(NO₃)₂ + 2AgCl",
            reactants: [{ formula: "BaCl2", atoms: { Ba: 1, Cl: 2 } }, { formula: "AgNO3", atoms: { Ag: 1, N: 1, O: 3 } }],
            products: [{ formula: "Ba(NO3)2", atoms: { Ba: 1, N: 2, O: 6 } }, { formula: "AgCl", atoms: { Ag: 1, Cl: 1 } }],
            primaryElem: "Ba",
            secondaryElem: "NO3",
            trick: "Cân bằng nhóm NO₃ (2 nhóm NO₃)",
            traps: ["BaCl₂ + AgNO₃ ➔ Ba(NO₃)₂ + AgCl", "2BaCl₂ + 4AgNO₃ ➔ 2Ba(NO₃)₂ + 4AgCl", "Sửa thành BaNO₃"]
        },
        {
            name: "Khử Sắt(III) oxit bằng khí CO",
            eqDisplay: "Fe₂O₃ + CO ➔ Fe + CO₂",
            solution: "Fe₂O₃ + 3CO ➔ 2Fe + 3CO₂",
            reactants: [{ formula: "Fe2O3", atoms: { Fe: 2, O: 3 } }, { formula: "CO", atoms: { C: 1, O: 1 } }],
            products: [{ formula: "Fe", atoms: { Fe: 1 } }, { formula: "CO2", atoms: { C: 1, O: 2 } }],
            primaryElem: "Fe",
            secondaryElem: "C",
            trick: "3 CO cướp 3 O trong Fe₂O₃",
            traps: ["Fe₂O₃ + CO ➔ 2Fe + CO₂", "Fe₂O₃ + 2CO ➔ 2Fe + 2CO₂", "2Fe₂O₃ + 6CO ➔ 4Fe + 6CO₂"]
        },
        {
            name: "Khử Sắt(III) oxit bằng khí H₂",
            eqDisplay: "Fe₂O₃ + H₂ ➔ Fe + H₂O",
            solution: "Fe₂O₃ + 3H₂ ➔ 2Fe + 3H₂O",
            reactants: [{ formula: "Fe2O3", atoms: { Fe: 2, O: 3 } }, { formula: "H2", atoms: { H: 2 } }],
            products: [{ formula: "Fe", atoms: { Fe: 1 } }, { formula: "H2O", atoms: { H: 2, O: 1 } }],
            primaryElem: "Fe",
            secondaryElem: "H",
            trick: "3 H₂ lấy 3 O thành 3 H₂O",
            traps: ["Fe₂O₃ + H₂ ➔ Fe + H₂O", "Fe₂O₃ + 2H₂ ➔ 2Fe + 2H₂O", "Sửa thành FeO"]
        },
        {
            name: "Đốt cháy khí Metan",
            eqDisplay: "CH₄ + O₂ ➔ CO₂ + H₂O",
            solution: "CH₄ + 2O₂ ➔ CO₂ + 2H₂O",
            reactants: [{ formula: "CH4", atoms: { C: 1, H: 4 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "CO2", atoms: { C: 1, O: 2 } }, { formula: "H2O", atoms: { H: 2, O: 1 } }],
            primaryElem: "C",
            secondaryElem: "H",
            trick: "Thứ tự C ➔ H ➔ O",
            traps: ["CH₄ + O₂ ➔ CO₂ + H₂O (1:1:1:1)", "CH₄ + 4O₂ ➔ CO₂ + 2H₂O", "2CH₄ + 4O₂ ➔ 2CO₂ + 4H₂O"]
        }
    ],

    level_4: [
        {
            name: "NaOH + Sắt(III) sunfat",
            eqDisplay: "NaOH + Fe₂(SO₄)₃ ➔ Fe(OH)₃ + Na₂SO₄",
            solution: "6NaOH + Fe₂(SO₄)₃ ➔ 2Fe(OH)₃ + 3Na₂SO₄",
            reactants: [{ formula: "NaOH", atoms: { Na: 1, O: 1, H: 1 } }, { formula: "Fe2(SO4)3", atoms: { Fe: 2, S: 3, O: 12 } }],
            products: [{ formula: "Fe(OH)3", atoms: { Fe: 1, O: 3, H: 3 } }, { formula: "Na2SO4", atoms: { Na: 2, S: 1, O: 4 } }],
            primaryElem: "Fe",
            secondaryElem: "SO4",
            trick: "Cân bằng 2 Fe và 3 nhóm SO₄ ➔ 6 NaOH",
            traps: ["2NaOH + Fe₂(SO₄)₃ ➔ 2Fe(OH)₃ + Na₂SO₄", "3NaOH + Fe₂(SO₄)₃ ➔ Fe(OH)₃ + 3Na₂SO₄", "Sửa thành FeSO₄"]
        },
        {
            name: "Đốt cháy quặng Pirit sắt",
            eqDisplay: "FeS₂ + O₂ ➔ Fe₂O₃ + SO₂",
            solution: "4FeS₂ + 11O₂ ➔ 2Fe₂O₃ + 8SO₂",
            reactants: [{ formula: "FeS2", atoms: { Fe: 1, S: 2 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "Fe2O3", atoms: { Fe: 2, O: 3 } }, { formula: "SO2", atoms: { S: 1, O: 2 } }],
            primaryElem: "Fe",
            secondaryElem: "S",
            trick: "Nhân 2 Fe₂O₃ để làm chẵn ➔ 4 FeS₂ ➔ 8 SO₂ ➔ 11 O₂",
            traps: ["2FeS₂ + 7O₂ ➔ Fe₂O₃ + 4SO₂", "FeS₂ + O₂ ➔ Fe₂O₃ + SO₂", "8FeS₂ + 22O₂ ➔ 4Fe₂O₃ + 16SO₂"]
        },
        {
            name: "Đốt cháy khí Axetilen",
            eqDisplay: "C₂H₂ + O₂ ➔ CO₂ + H₂O",
            solution: "2C₂H₂ + 5O₂ ➔ 4CO₂ + 2H₂O",
            reactants: [{ formula: "C2H2", atoms: { C: 2, H: 2 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "CO2", atoms: { C: 1, O: 2 } }, { formula: "H2O", atoms: { H: 2, O: 1 } }],
            primaryElem: "C",
            secondaryElem: "H",
            trick: "Bẻ lẻ Oxy: Nhân 2 vào C₂H₂ ➔ 4 CO₂ + 2 H₂O ➔ 5 O₂",
            traps: ["C₂H₂ + 5/2 O₂ ➔ 2CO₂ + H₂O (Phân số không tối giản)", "C₂H₂ + O₂ ➔ CO₂ + H₂O", "4C₂H₂ + 10O₂ ➔ 8CO₂ + 4H₂O"]
        },
        {
            name: "Đốt cháy cồn y tế (Rượu etylic)",
            eqDisplay: "C₂H₆O + O₂ ➔ CO₂ + H₂O",
            solution: "C₂H₆O + 3O₂ ➔ 2CO₂ + 3H₂O",
            reactants: [{ formula: "C2H6O", atoms: { C: 2, H: 6, O: 1 } }, { formula: "O2", atoms: { O: 2 } }],
            products: [{ formula: "CO2", atoms: { C: 1, O: 2 } }, { formula: "H2O", atoms: { H: 2, O: 1 } }],
            primaryElem: "C",
            secondaryElem: "H",
            trick: "Cân bằng C(2), H(6) ➔ trừ 1 O có sẵn trong cồn",
            traps: ["C₂H₆O + 7/2 O₂ ➔ 2CO₂ + 3H₂O", "C₂H₆O + O₂ ➔ CO₂ + H₂O", "2C₂H₆O + 6O₂ ➔ 4CO₂ + 6H₂O"]
        }
    ]
};

// ========================================================
// PHẦN 2: KHO CHUYÊN LÝ THUYẾT & BẢN CHẤT HIỆN TƯỢNG HÓA 8 (4 CẤP ĐỘ)
// ========================================================
const THEORY_LESSONS = {
    level_1: [
        {
            name: "Bản Chất: Hiện Tượng Vật Lý vs Hóa Học",
            concept: "Hiện tượng hóa học là hiện tượng có tạo ra CHẤT MỚI. Hiện tượng vật lý chỉ đổi hình dạng/trạng thái.",
            steps: [
                {
                    dialog: "Chào em! Thầy sẽ kiểm tra phản xạ phân biệt Hiện tượng Vật lý và Hóa học.",
                    question: "Hiện tượng nào sau đây là HIỆN TƯỢNG HÓA HỌC (có sinh ra chất mới)?",
                    options: [
                        { text: "Cơm để lâu ngày bị thiu, bốc mùi chua", correct: true, explain: "Chính xác! Cơm bị lên men biến thành chất mới có mùi chua là hiện tượng hóa học!" },
                        { text: "Nước đá tan chảy thành nước lỏng", correct: false, explain: "Sai rồi! Nước đá tan chỉ là chuyển trạng thái (rắn sang lỏng), vẫn là H2O!" },
                        { text: "Bẻ gãy một thanh sắt làm đôi", correct: false, explain: "Sai rồi! Bẻ gãy chỉ thay đổi hình dạng, vẫn là kim loại sắt Fe!" }
                    ]
                },
                {
                    dialog: "Rất tốt! Nhớ rằng chỉ khi có chất mới sinh ra thì mới là hiện tượng hóa học.",
                    question: "Dấu hiệu nào sau đây CHẮC CHẮN chứng tỏ có phản ứng hóa học xảy ra?",
                    options: [
                        { text: "Có chất kết tủa mới, sủi bọt khí, hoặc đổi màu", correct: true, explain: "Tuyệt vời! Kết tủa, bay khí, đổi màu, tỏa nhiệt là các dấu hiệu sinh ra chất mới!" },
                        { text: "Chất bị nghiền nhỏ thành bột mịn", correct: false, explain: "Nghiền nhỏ chỉ đổi kích thước hạt, không sinh ra chất mới!" },
                        { text: "Chất bị nam châm hút lại", correct: false, explain: "Nam châm hút là tính chất vật lý của từ tính sắt!" }
                    ]
                },
                {
                    dialog: "Tuyệt vời! Vậy kết luận bản chất hiện tượng hóa học là gì?",
                    question: "Điểm khác biệt duy nhất giữa Hiện tượng hóa học và Hiện tượng vật lý là:",
                    options: [
                        { text: "Hiện tượng hóa học có sinh ra CHẤT MỚI", correct: true, explain: "Hoàn hảo 100%! Có chất mới = Hóa học, Không chất mới = Vật lý!" },
                        { text: "Hiện tượng hóa học luôn phát ra tiếng nổ", correct: false, explain: "Không phải phản ứng nào cũng nổ!" },
                        { text: "Hiện tượng hóa học không làm thay đổi nguyên tử", correct: false, explain: "Liên kết giữa các nguyên tử bị thay đổi để tạo chất mới!" }
                    ]
                }
            ]
        },
        {
            name: "Quy Tắc Hóa Trị & Lập Công Thức Hóa Học",
            concept: "Quy tắc hóa trị: Trong hợp chất A_x B_y có hóa trị a và b thì: a * x = b * y.",
            steps: [
                {
                    dialog: "Chào em! Thầy sẽ kiểm tra quy tắc hóa trị trong hợp chất.",
                    question: "Trong phân tử hợp chất Al₂O₃, biết O có hóa trị II, vậy Nhôm (Al) có hóa trị mấy?",
                    options: [
                        { text: "Hóa trị III (Vì: a * 2 = II * 3 ➔ a = 6 / 2 = III)", correct: true, explain: "Chính xác! Áp dụng quy tắc a*x = b*y ➔ a*2 = 2*3 ➔ Al hóa trị III!" },
                        { text: "Hóa trị II", correct: false, explain: "Sai bét! Nhìn chỉ số chân: 2 nhân a phải bằng 3 nhân 2!" },
                        { text: "Hóa trị I", correct: false, explain: "Nhôm không bao giờ có hóa trị I!" }
                    ]
                },
                {
                    dialog: "Rất chuẩn! Bây giờ hãy lập công thức hóa học giữa Magie (Mg hóa trị II) và Clo (Cl hóa trị I).",
                    question: "Công thức hóa học đúng giữa Mg(II) và Cl(I) là:",
                    options: [
                        { text: "MgCl₂", correct: true, explain: "Chuẩn không cần chỉnh! II * 1 = I * 2 ➔ Công thức là MgCl₂!" },
                        { text: "Mg₂Cl", correct: false, explain: "Sai rồi! Chỉ số của Cl phải là 2 để cân bằng hóa trị!" },
                        { text: "MgCl", correct: false, explain: "Sai! Mg hóa trị II còn Cl hóa trị I, không thể là 1:1!" }
                    ]
                },
                {
                    dialog: "Hoàn thành bước cuối! Phân biệt Đơn chất và Hợp chất.",
                    question: "Chất nào sau đây là ĐƠN CHẤT (chỉ do 1 nguyên tố tạo nên)?",
                    options: [
                        { text: "Khí Oxy (O₂) và Kim loại Đồng (Cu)", correct: true, explain: "Chính xác 100%! O₂ chỉ gồm nguyên tố O, Cu chỉ gồm nguyên tố Cu ➔ Đơn chất!" },
                        { text: "Nước ăn (H₂O) và Muối ăn (NaCl)", correct: false, explain: "H₂O và NaCl do 2 nguyên tố tạo nên ➔ Đây là Hợp chất!" },
                        { text: "Axit clohiđric (HCl)", correct: false, explain: "HCl gồm H và Cl ➔ Hợp chất!" }
                    ]
                }
            ]
        }
    ],

    level_2: [
        {
            name: "Lý Thuyết: Điều Chế & Thu Khí Oxy Trong Phòng Thí Nghiệm",
            concept: "Nhiệt phân hợp chất giàu Oxy kém bền (KMnO₄ thuốc tím hoặc KClO₃) và thu bằng cách đẩy nước hoặc đẩy không khí.",
            steps: [
                {
                    dialog: "Chào em! Thầy sẽ hỏi em về phương pháp điều chế khí Oxy trong phòng thí nghiệm.",
                    question: "Trong phòng thí nghiệm, người ta thường dùng hóa chất nào để điều chế khí Oxy (O₂)?",
                    options: [
                        { text: "Thuốc tím (KMnO₄) hoặc Kali clorat (KClO₃)", correct: true, explain: "Chính xác! KMnO₄ và KClO₃ là các chất giàu Oxy và dễ bị nhiệt phân sinh ra O₂!" },
                        { text: "Nước biển (NaCl)", correct: false, explain: "Nước biển đun nóng chỉ bay hơi nước, không tạo khí O₂!" },
                        { text: "Đá vôi (CaCO₃)", correct: false, explain: "Nhiệt phân đá vôi CaCO₃ sinh ra khí CO₂, không phải Oxy!" }
                    ]
                },
                {
                    dialog: "Rất tốt! Khí Oxy ít tan trong nước và nặng hơn không khí (d = 32/29 ≈ 1.1).",
                    question: "Vì sao có thể thu khí Oxy bằng phương pháp ĐẨY NƯỚC?",
                    options: [
                        { text: "Vì khí Oxy tan rất ít trong nước", correct: true, explain: "Tuyệt vời! Nhờ tan rất ít trong nước nên O₂ đẩy nước ra khỏi bình thu dễ dàng!" },
                        { text: "Vì khí Oxy nhẹ hơn nước", correct: false, explain: "Mọi chất khí đều nhẹ hơn nước lỏng, nhưng nếu tan nhiều (như HCl, NH₃) thì không thu đẩy nước được!" },
                        { text: "Vì khí Oxy phản ứng với nước", correct: false, explain: "Khí Oxy không phản ứng với nước ở điều kiện thường!" }
                    ]
                },
                {
                    dialog: "Đến phần nhận biết! Dùng que đóm còn tàn đỏ để thử khí Oxy.",
                    question: "Hiện tượng xảy ra khi đưa que đóm còn tàn đỏ vào miệng ống nghiệm chứa đầy khí Oxy là:",
                    options: [
                        { text: "Que đóm bùng cháy sáng rực", correct: true, explain: "Hoàn hảo 100%! Khí Oxy duy trì sự cháy mãnh liệt làm que đóm bùng cháy!" },
                        { text: "Que đóm tắt ngay lập tức kèm tiếng nổ", correct: false, explain: "Đó là khí CO₂ hoặc N₂ làm tắt que đóm!" },
                        { text: "Que đóm chuyển sang màu xanh lam", correct: false, explain: "Không có hiện tượng đổi màu gỗ que đóm!" }
                    ]
                }
            ]
        },
        {
            name: "Lý Thuyết: Nhận Biết Axit, Bazơ & Quỳ Tím",
            concept: "Axit có nguyên tử H đứng đầu ➔ Làm quỳ tím hóa ĐỎ. Bazơ có nhóm -OH ở đuôi ➔ Làm quỳ tím hóa XANH.",
            steps: [
                {
                    dialog: "Chào em! Thầy sẽ kiểm tra cách phân biệt Axit, Bazơ và tác dụng với Quỳ tím.",
                    question: "Dung dịch nào sau đây làm giấy QUỲ TÍM HÓA ĐỎ?",
                    options: [
                        { text: "Dung dịch Axit clohiđric (HCl) và Axit sunfuric (H₂SO₄)", correct: true, explain: "Chính xác! Axit (có H đầu phân tử) làm quỳ tím hóa ĐỎ!" },
                        { text: "Dung dịch Natri hiđroxit (NaOH)", correct: false, explain: "NaOH là Bazơ (có -OH), làm quỳ tím hóa XANH!" },
                        { text: "Nước cất tinh khiết (H₂O)", correct: false, explain: "Nước tinh khiết trung tính, quỳ tím không đổi màu!" }
                    ]
                },
                {
                    dialog: "Rất chuẩn! Còn Bazơ tan (kiềm) thì làm quỳ tím hóa xanh.",
                    question: "Đặc điểm nhận dạng công thức hóa học của một BAZƠ là gì?",
                    options: [
                        { text: "Gồm Kim loại liên kết với một hay nhiều nhóm Hiđroxit (-OH)", correct: true, explain: "Chuẩn 100%! Ví dụ NaOH, Ca(OH)₂, Cu(OH)₂ là các bazơ!" },
                        { text: "Có nguyên tử Hydro (H) đứng đầu liên kết với gốc axit", correct: false, explain: "Đó là định nghĩa của Axit (như HCl, HNO₃)!" },
                        { text: "Chỉ gồm 1 nguyên tử kim loại và 1 nguyên tử Oxy", correct: false, explain: "Đó là Oxit bazơ (như CuO, CaO), không phải Bazơ!" }
                    ]
                },
                {
                    dialog: "Bước cuối: Phân loại Muối (gồm Kim loại + Gốc axit).",
                    question: "Chất nào sau đây thuộc loại hợp chất MUỐI?",
                    options: [
                        { text: "Muối ăn (NaCl), Đồng sunfat (CuSO₄), Sắt clorua (FeCl₂)", correct: true, explain: "Hoàn hảo 100%! Kim loại + Gốc axit = Muối!" },
                        { text: "Natri hiđroxit (NaOH)", correct: false, explain: "Có nhóm -OH là Bazơ!" },
                        { text: "Khí Cacbonic (CO₂)", correct: false, explain: "CO₂ là Oxit phi kim (Oxit axit)!" }
                    ]
                }
            ]
        }
    ],

    level_3: [
        {
            name: "Định Luật Bảo Toàn Khối Lượng (Lô-mô-nô-xốp - La-voa-đi-ê)",
            concept: "Trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất tham gia phản ứng: m_A + m_B = m_C + m_D.",
            steps: [
                {
                    dialog: "Chào em! Thầy sẽ kiểm tra định luật bảo toàn khối lượng - bí kíp tính toán của Hóa 8.",
                    question: "Nung 100g Đá vôi (CaCO₃) sinh ra 56g Vôi sống (CaO) và khí CO₂. Khối lượng khí CO₂ thoát ra là bao nhiêu?",
                    options: [
                        { text: "44g (Vì: m_CO₂ = 100g - 56g = 44g)", correct: true, explain: "Chính xác! Theo định luật: m_CaCO₃ = m_CaO + m_CO₂ ➔ m_CO₂ = 100 - 56 = 44g!" },
                        { text: "56g", correct: false, explain: "Sai rồi! Khối lượng khí CO₂ phải lấy tổng trừ đi vôi sống CaO!" },
                        { text: "156g", correct: false, explain: "Sai bét! Nung đá vôi làm sao sinh ra khối lượng lớn hơn ban đầu được!" }
                    ]
                },
                {
                    dialog: "Rất chuẩn! Bản chất vì sao khối lượng được bảo toàn?",
                    question: "Vì sao trong phản ứng hóa học, tổng khối lượng các chất luôn không đổi?",
                    options: [
                        { text: "Vì số lượng nguyên tử của mỗi nguyên tố được giữ nguyên vẹn trước và sau phản ứng", correct: true, explain: "Tuyệt vời! Chỉ có liên kết giữa các nguyên tử thay đổi, số hạt nguyên tử được bảo toàn!" },
                        { text: "Vì các chất tự sinh ra và tự mất đi", correct: false, explain: "Sai! Vật chất không tự nhiên sinh ra hay mất đi!" },
                        { text: "Vì nhiệt độ phòng thí nghiệm không đổi", correct: false, explain: "Nhiệt độ không quyết định định luật bảo toàn nguyên tử!" }
                    ]
                },
                {
                    dialog: "Đến phản ứng nổ nguy hiểm của khí Hiđro!",
                    question: "Hỗn hợp khí Hiđro (H₂) và Oxy (O₂) gây nổ mạnh nhất khi trộn theo tỷ lệ thể tích nào?",
                    options: [
                        { text: "2 thể tích H₂ : 1 thể tích O₂ (Tỷ lệ 2 : 1)", correct: true, explain: "Hoàn hảo 100%! Phản ứng: 2H₂ + O₂ ➔ 2H₂O tỏa nhiệt cực lớn gây nổ mạnh nhất ở tỉ lệ 2:1!" },
                        { text: "1 thể tích H₂ : 1 thể tích O₂", correct: false, explain: "Sai! Tỷ lệ phản ứng đúng của phân tử là 2 H₂ cần 1 O₂!" },
                        { text: "1 thể tích H₂ : 2 thể tích O₂", correct: false, explain: "Sai tỉ lệ!" }
                    ]
                }
            ]
        }
    ],

    level_4: [
        {
            name: "Dung Dịch: Nồng Độ Phần Trăm (C%) & Nồng Độ Mol (C_M)",
            concept: "Công thức nồng độ phần trăm: C% = (m_ct / m_dd) * 100%. Công thức nồng độ mol: C_M = n / V (lít).",
            steps: [
                {
                    dialog: "Chào em! Thầy sẽ thử thách em với công thức tính nồng độ dung dịch Cấp 4.",
                    question: "Hòa tan 20g muối ăn (NaCl) vào 80g nước cất. Nồng độ phần trăm (C%) của dung dịch thu được là bao nhiêu?",
                    options: [
                        { text: "20% (Vì: m_dd = 20g + 80g = 100g ➔ C% = 20/100 * 100% = 20%)", correct: true, explain: "Chính xác! Khối lượng dung dịch = m_chất tan + m_nước = 20 + 80 = 100g ➔ C% = 20%!" },
                        { text: "25% (Lấy 20 chia 80)", correct: false, explain: "Bẫy đấy! Mẫu số phải là khối lượng dung dịch (20 + 80 = 100g), không phải khối lượng nước!" },
                        { text: "15%", correct: false, explain: "Tính toán sai rồi!" }
                    ]
                },
                {
                    dialog: "Rất xuất sắc! Đến công thức Nồng độ Mol (C_M = n / V).",
                    question: "Hòa tan 1 mol đường vào nước thu được đúng 2 lít dung dịch. Nồng độ mol (C_M) của dung dịch là:",
                    options: [
                        { text: "0.5 M (Vì: C_M = 1 mol / 2 lít = 0.5M)", correct: true, explain: "Tuyệt vời! C_M = n / V = 1 / 2 = 0.5 mol/lít (viết tắt là 0.5M)!" },
                        { text: "2 M", correct: false, explain: "Lấy n chia V (1 chia 2), không phải lấy V chia n!" },
                        { text: "1 M", correct: false, explain: "Sai rồi!" }
                    ]
                },
                {
                    dialog: "Bước đỉnh cao cuối cùng: Điều kiện để chất rắn tan nhanh hơn trong nước.",
                    question: "Biện pháp nào sau đây giúp chất rắn (như đường, muối) tan nhanh nhất trong nước?",
                    options: [
                        { text: "Khuấy đều, đun nóng dung dịch và nghiền nhỏ chất rắn", correct: true, explain: "Hoàn hảo 100%! Nghiền nhỏ (tăng diện tích tiếp xúc) + Khuấy đều + Đun nóng làm các hạt tan nhanh nhất!" },
                        { text: "Để yên trong tủ lạnh không khuấy", correct: false, explain: "Nhiệt độ lạnh và không khuấy làm chất tan cực kỳ chậm!" },
                        { text: "Thêm thật nhiều dầu ăn vào", correct: false, explain: "Dầu ăn không hòa tan muối đường!" }
                    ]
                }
            ]
        }
    ]
};

// ========================================================
// PHẦN 3: NGÂN HÀNG 30+ CÂU HỎI TRẮC NGHIỆM ĐẤU TRƯỜNG TOÀN DIỆN LỚP 8
// ========================================================
const ARENA_EXAM_QUESTIONS = [
    {
        id: "ex_01",
        question: "Hóa trị của Nhôm (Al) trong hợp chất Al₂O₃ và AlCl₃ là bao nhiêu?",
        options: ["III", "II", "I", "IV"],
        correctIndex: 0,
        explain: "Nhôm (Al) luôn luôn có hóa trị III trong mọi hợp chất."
    },
    {
        id: "ex_02",
        question: "Tổng hệ số cân bằng tối giản của phản ứng: Fe + O₂ ➔ Fe₃O₄ là bao nhiêu?",
        options: ["6 (3 + 2 + 1)", "5", "7", "8"],
        correctIndex: 0,
        explain: "Phương trình: 3Fe + 2O₂ ➔ Fe₃O₄. Tổng hệ số: 3 + 2 + 1 = 6."
    },
    {
        id: "ex_03",
        question: "Trong phương trình: Al + HCl ➔ AlCl₃ + H₂, hệ số của phân tử HCl là mấy?",
        options: ["6", "3", "2", "1"],
        correctIndex: 0,
        explain: "BCNN của Cl(3) và H(2) là 6. Phương trình: 2Al + 6HCl ➔ 2AlCl₃ + 3H₂."
    },
    {
        id: "ex_04",
        question: "Gốc axit Sunfat (=SO₄) có hóa trị mấy?",
        options: ["II", "I", "III", "IV"],
        correctIndex: 0,
        explain: "Gốc Sunfat (=SO₄) luôn có hóa trị II (ví dụ H₂SO₄, CuSO₄)."
    },
    {
        id: "ex_05",
        question: "Điều cấm kỵ số 1 khi cân bằng phương trình hóa học là gì?",
        options: ["Tuyệt đối không sửa số nhỏ ở chân công thức", "Không được nhân số 2", "Chỉ được điền số lẻ", "Không được đếm Oxy"],
        correctIndex: 0,
        explain: "Sửa số nhỏ ở chân công thức sẽ biến chất này thành chất khác!"
    },
    {
        id: "ex_06",
        question: "Theo thứ tự ưu tiên 'KIM - PHI - NHÓM - H - O', trong phản ứng Fe + H₂SO₄ ➔ FeSO₄ + H₂, nguyên tố nào cân bằng đầu tiên?",
        options: ["Kim loại Fe", "Oxy", "Hydro", "Nhóm SO₄"],
        correctIndex: 0,
        explain: "Luôn ưu tiên Kim loại (Fe) đứng đầu tiên."
    },
    {
        id: "ex_07",
        question: "Để làm chẵn số Oxy trong phân tử Al₂O₃ khi cân bằng phản ứng Al + O₂ ➔ Al₂O₃, ta đặt số mấy trước Al₂O₃?",
        options: ["Đặt số 2 (thành 2Al₂O₃)", "Đặt số 3", "Đặt số 1", "Đặt số 4"],
        correctIndex: 0,
        explain: "Nhân 2 vào Al₂O₃ để thành 2x3 = 6 Oxy (số chẵn)."
    },
    {
        id: "ex_08",
        question: "Khí CO khử Fe₂O₃ tạo thành Fe và khí gì?",
        options: ["CO₂", "O₂", "H₂O", "SO₂"],
        correctIndex: 0,
        explain: "CO cướp Oxy biến thành khí Cacbon đioxit (CO₂)."
    },
    {
        id: "ex_09",
        question: "Hóa trị của Sắt (Fe) trong phân tử muối FeCl₂ là bao nhiêu?",
        options: ["II", "III", "I", "IV"],
        correctIndex: 0,
        explain: "Clo hóa trị I, nên Fe trong FeCl₂ có hóa trị II."
    },
    {
        id: "ex_10",
        question: "Tổng hệ số cân bằng của phản ứng đốt cháy khí Metan: CH₄ + O₂ ➔ CO₂ + H₂O là:",
        options: ["6 (1 + 2 + 1 + 2)", "5", "4", "7"],
        correctIndex: 0,
        explain: "Phương trình: CH₄ + 2O₂ ➔ CO₂ + 2H₂O. Tổng: 1 + 2 + 1 + 2 = 6."
    },
    {
        id: "ex_11",
        question: "Nhóm Hiđroxit (-OH) trong phân tử NaOH hay Ca(OH)₂ có hóa trị mấy?",
        options: ["I", "II", "III", "IV"],
        correctIndex: 0,
        explain: "Nhóm -OH luôn có hóa trị I."
    },
    {
        id: "ex_12",
        question: "Cân bằng phản ứng: P + O₂ ➔ P₂O₅. Hệ số của O₂ là bao nhiêu?",
        options: ["5", "2", "3", "4"],
        correctIndex: 0,
        explain: "Phương trình chuẩn: 4P + 5O₂ ➔ 2P₂O₅."
    },
    {
        id: "ex_13",
        question: "Phản ứng nào sau đây đã tự động cân bằng (hệ số 1 : 1 : 1 : 1)?",
        options: ["Zn + H₂SO₄ ➔ ZnSO₄ + H₂", "Al + HCl ➔ AlCl₃ + H₂", "Fe + Cl₂ ➔ FeCl₃", "Mg + O₂ ➔ MgO"],
        correctIndex: 0,
        explain: "Zn + H₂SO₄ ➔ ZnSO₄ + H₂ có số nguyên tử 2 vế bằng nhau sẵn."
    },
    {
        id: "ex_14",
        question: "Trong phản ứng NaOH + Fe₂(SO₄)₃ ➔ Fe(OH)₃ + Na₂SO₄, hệ số của NaOH là bao nhiêu?",
        options: ["6", "3", "2", "4"],
        correctIndex: 0,
        explain: "Phương trình: 6NaOH + Fe₂(SO₄)₃ ➔ 2Fe(OH)₃ + 3Na₂SO₄."
    },
    {
        id: "ex_15",
        question: "Khí Hydro (H₂) có hóa trị mấy?",
        options: ["I", "II", "III", "IV"],
        correctIndex: 0,
        explain: "Nguyên tử Hydro luôn có hóa trị I."
    },
    {
        id: "ex_16",
        question: "Phản ứng: 2KMnO₄ ➔ K₂MnO₄ + MnO₂ + O₂ là phản ứng dùng để làm gì trong phòng thí nghiệm?",
        options: ["Điều chế khí Oxy (O₂)", "Điều chế khí Hydro", "Điều chế kim loại Kali", "Điều chế Clo"],
        correctIndex: 0,
        explain: "Nhiệt phân thuốc tím (KMnO₄) để thu khí Oxy."
    },
    {
        id: "ex_17",
        question: "Cặp nguyên tố nào sau đây đều có hóa trị I?",
        options: ["Natri (Na) và Kali (K)", "Canxi (Ca) và Magie (Mg)", "Nhôm (Al) và Sắt (Fe)", "Đồng (Cu) và Kẽm (Zn)"],
        correctIndex: 0,
        explain: "Na, K, Ag, H đều có hóa trị I."
    },
    {
        id: "ex_18",
        question: "Hệ số tối giản của phản ứng: Na + H₂O ➔ NaOH + H₂ là:",
        options: ["2 : 2 : 2 : 1", "1 : 1 : 1 : 1", "2 : 1 : 2 : 1", "1 : 2 : 1 : 1"],
        correctIndex: 0,
        explain: "Phương trình: 2Na + 2H₂O ➔ 2NaOH + H₂."
    },
    {
        id: "ex_19",
        question: "Trong công thức Al₂(SO₄)₃, có tổng cộng bao nhiêu nguyên tử Oxy?",
        options: ["12 nguyên tử Oxy (3 x 4)", "4", "7", "3"],
        correctIndex: 0,
        explain: "3 nhóm SO₄ ➔ 3 x 4 = 12 nguyên tử Oxy."
    },
    {
        id: "ex_20",
        question: "Khi đốt cháy hợp chất hữu cơ (C, H, O), thứ tự cân bằng chuẩn là:",
        options: ["Cacbon ➔ Hydro ➔ Oxy", "Oxy ➔ Hydro ➔ Cacbon", "Hydro ➔ Oxy ➔ Cacbon", "Cân bằng Oxy trước"],
        correctIndex: 0,
        explain: "Luôn luôn cân bằng C ➔ H ➔ O."
    },
    {
        id: "ex_21",
        question: "Oxit sắt từ có công thức hóa học là:",
        options: ["Fe₃O₄", "Fe₂O₃", "FeO", "Fe₂O"],
        correctIndex: 0,
        explain: "Oxit sắt từ là Fe₃O₄ (hỗn hợp FeO.Fe₂O₃)."
    },
    {
        id: "ex_22",
        question: "Hóa trị của Nitơ trong phân tử khí N₂O₅ là bao nhiêu?",
        options: ["V", "IV", "III", "II"],
        correctIndex: 0,
        explain: "Oxy hóa trị II (5x2=10) ➔ 2 nguyên tử N có tổng hóa trị 10 ➔ N hóa trị V."
    },
    {
        id: "ex_23",
        question: "Tổng hệ số cân bằng của phản ứng: Fe₂O₃ + 3H₂ ➔ 2Fe + 3H₂O là:",
        options: ["9 (1 + 3 + 2 + 3)", "7", "8", "6"],
        correctIndex: 0,
        explain: "Tổng các hệ số: 1 + 3 + 2 + 3 = 9."
    },
    {
        id: "ex_24",
        question: "Bari clorua (BaCl₂) tác dụng với Axit Sunfuric (H₂SO₄) tạo thành kết tủa trắng là chất nào?",
        options: ["BaSO₄", "BaCl₂", "HCl", "H₂O"],
        correctIndex: 0,
        explain: "BaSO₄ là kết tủa trắng không tan trong axit."
    },
    {
        id: "ex_25",
        question: "Kim loại nào sau đây có hóa trị II không đổi trong mọi hợp chất?",
        options: ["Kẽm (Zn)", "Sắt (Fe)", "Đồng (Cu)", "Natri (Na)"],
        correctIndex: 0,
        explain: "Kẽm (Zn) và Magie (Mg), Canxi (Ca) luôn có hóa trị II."
    },
    {
        id: "ex_26",
        question: "Hệ số của O₂ trong phản ứng đốt cháy khí Axetilen: 2C₂H₂ + ?O₂ ➔ 4CO₂ + 2H₂O là:",
        options: ["5", "3", "4", "2"],
        correctIndex: 0,
        explain: "Vế phải có (4x2)+2 = 10 Oxy ➔ Cần 5 O₂."
    },
    {
        id: "ex_27",
        question: "Nhóm Photphat (≡PO₄) có hóa trị mấy?",
        options: ["III", "II", "I", "IV"],
        correctIndex: 0,
        explain: "Gốc Photphat (≡PO₄) có hóa trị III."
    },
    {
        id: "ex_28",
        question: "Để khử hoàn toàn 1 phân tử Fe₂O₃ cần bao nhiêu phân tử khí CO?",
        options: ["3 phân tử CO", "2 phân tử CO", "1 phân tử CO", "4 phân tử CO"],
        correctIndex: 0,
        explain: "Fe₂O₃ có 3 Oxy nên cần đúng 3 phân tử CO để lấy hết 3 Oxy."
    },
    {
        id: "ex_29",
        question: "Chất nào sau đây làm quỳ tím hóa đỏ khi tan trong nước?",
        options: ["Axit Clohiđric (HCl)", "Nước (H₂O)", "Natri hiđroxit (NaOH)", "Muối ăn (NaCl)"],
        correctIndex: 0,
        explain: "Axit làm quỳ tím hóa đỏ, Bazơ làm quỳ tím hóa xanh."
    },
    {
        id: "ex_30",
        question: "Phản ứng: C₂H₆O + 3O₂ ➔ 2CO₂ + 3H₂O là phản ứng đốt cháy của chất nào?",
        options: ["Cồn y tế (Rượu etylic)", "Khí Metan", "Khí Axetilen", "Dầu hỏa"],
        correctIndex: 0,
        explain: "C₂H₆O là công thức của cồn y tế / rượu etylic."
    }
];

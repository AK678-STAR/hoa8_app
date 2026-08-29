// ========================================================
// HỆ THỐNG GIA SƯ ẢO - TÁCH BIỆT 1 BÊN CÂN BẰNG & 1 BÊN LÝ THUYẾT
// ========================================================
class VoiceAndSoundEngine {
    constructor() {
        this.ctx = null;
        this.unlocked = false;
        this.voiceEnabled = true;
        this.currentUtterance = null;
    }

    initAudio() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.unlocked = true;
    }

    vibrate(pattern) {
        if ("vibrate" in navigator) {
            try { navigator.vibrate(pattern); } catch (e) {}
        }
    }

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const btn = document.getElementById("btn-voice-toggle");
        if (btn) {
            if (this.voiceEnabled) {
                btn.className = "btn-voice-toggle";
                btn.innerHTML = "🔊 Giọng Nói: BẬT";
                this.speak("Đã bật giọng nói gia sư!");
            } else {
                btn.className = "btn-voice-toggle off";
                btn.innerHTML = "🔇 Giọng Nói: TẮT";
                this.stopAllSpeech();
            }
        }
    }

    cleanTextForSpeech(text) {
        let clean = text.replace(/<[^>]*>/g, " ");
        
        clean = clean.replace(/➔|->/g, " tạo thành ")
                     .replace(/\+/g, " tác dụng với ")
                     .replace(/₂/g, " hai ")
                     .replace(/₃/g, " ba ")
                     .replace(/₄/g, " bốn ")
                     .replace(/₅/g, " năm ")
                     .replace(/₆/g, " sáu ")
                     .replace(/Oxy \(O\)/gi, " Oxy ")
                     .replace(/Hydro \(H\)/gi, " Hiđro ")
                     .replace(/KIM ➔ PHI ➔ NHÓM ➔ H ➔ O/gi, " Kim loại, Phi kim, Nhóm nguyên tử, Hiđro, Oxy ");

        clean = clean.replace(/\s+/g, " ").trim();
        return clean;
    }

    stopAllSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    speak(text, delay = 0, onEndCallback = null) {
        if (!this.voiceEnabled || !('speechSynthesis' in window)) {
            if (onEndCallback) setTimeout(onEndCallback, 1200);
            return;
        }

        this.stopAllSpeech();
        
        setTimeout(() => {
            try {
                this.stopAllSpeech();
                const cleanText = this.cleanTextForSpeech(text);
                const utter = new SpeechSynthesisUtterance(cleanText);
                
                utter.lang = 'vi-VN';
                utter.rate = 0.85;
                utter.pitch = 1.0;
                
                const voices = window.speechSynthesis.getVoices();
                const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
                if (viVoice) utter.voice = viVoice;

                let isEnded = false;
                const handleFinish = () => {
                    if (!isEnded) {
                        isEnded = true;
                        if (onEndCallback) onEndCallback();
                    }
                };

                utter.onend = handleFinish;
                utter.onerror = handleFinish;

                const wordCount = cleanText.split(/\s+/).length;
                const safeTimeout = Math.max(1800, (wordCount / 2.0) * 1000 + 1000);
                setTimeout(handleFinish, safeTimeout);

                this.currentUtterance = utter;
                window.speechSynthesis.speak(utter);
            } catch (e) {
                if (onEndCallback) onEndCallback();
            }
        }, delay);
    }

    readQuestion(dialogText, questionText, onEndCallback = null) {
        if (!this.voiceEnabled) return;
        const fullText = `${dialogText}. ... ${questionText}`;
        this.speak(fullText, 200, onEndCallback);
    }

    playDogBark() {
        if (!this.voiceEnabled) return;
        try {
            this.initAudio();
            const now = this.ctx.currentTime;
            this.makeSingleBark(now);
            this.makeSingleBark(now + 0.16);
            this.makeSingleBark(now + 0.34);
        } catch (e) {}
    }

    makeSingleBark(time) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(320, time);
        osc.frequency.exponentialRampToValueAtTime(80, time + 0.12);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(650, time);
        filter.Q.setValueAtTime(3, time);

        gain.gain.setValueAtTime(0.45, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.12);
    }

    playClick() {
        this.vibrate(15);
        try {
            this.initAudio();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {}
    }

    playSuccess() {
        this.vibrate([40, 60, 80]);
        try {
            this.initAudio();
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime + index * 0.08);
                gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + index * 0.08 + 0.2);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + index * 0.08);
                osc.stop(this.ctx.currentTime + index * 0.08 + 0.2);
            });
        } catch (e) {}
    }

    playLevelUp() {
        this.vibrate([50, 50, 50, 100, 150]);
        try {
            this.initAudio();
            const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
            notes.forEach((freq, index) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.1);
                gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.1);
                gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + index * 0.1 + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + index * 0.1);
                osc.stop(this.ctx.currentTime + index * 0.1 + 0.25);
            });
        } catch (e) {}
    }

    roastOnWrong(onEndCallback = null) {
        this.stopAllSpeech();
        this.vibrate([150, 100, 150]);
        this.playDogBark();
        
        const roasts = [
            "Ngu thế! Đọc kỹ lại cái đề đi thằng nhóc!",
            "Sai bét tè lè nhè rồi! Học hành kiểu gì đấy hả thằng nhóc!",
            "Gà thế em ơi! Bấm lụi để bị reset về số không à!",
            "Có thế mà cũng chọn sai! Về lớp một học lại đi nhóc con!",
            "Bị gài bẫy như một đứa trẻ con! Nhìn lại đáp án đúng đi!",
            "Lại bấm bừa rồi! Bị reset chuỗi về số không cho chừa nhé thằng nhóc!",
            "Quá non và xanh! Gà mờ thế này sao thi được Hóa tám hả em!"
        ];
        const text = roasts[Math.floor(Math.random() * roasts.length)];
        this.speak(text, 500, onEndCallback);
    }

    praiseOnCorrect(onEndCallback = null) {
        this.stopAllSpeech();
        const praises = [
            "Giỏi lắm nhóc con! Đỉnh đấy!",
            "Ngoan lắm thằng nhóc! Chuẩn không cần chỉnh!",
            "Được đấy nhóc con! Cứ thế mà phát huy nhé!",
            "Khá khen cho nhóc con! Bắt đầu thông minh lên rồi đấy!",
            "Xuất sắc! Ngoan lắm thằng nhóc!"
        ];
        const text = praises[Math.floor(Math.random() * praises.length)];
        this.speak(text, 150, onEndCallback);
    }
}

const VoiceEngine = new VoiceAndSoundEngine();

['click', 'touchstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, () => {
        VoiceEngine.initAudio();
    }, { once: true });
});

function detectDevice() {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth < 768;
    const isTablet = /(iPad|Tablet|(Android(?!.*Mobile)))/i.test(ua) || (window.innerWidth >= 768 && window.innerWidth <= 1024);
    
    const badge = document.getElementById("device-badge");
    if (badge) {
        if (isMobile) {
            badge.innerHTML = "📱 Chế độ: Điện thoại";
        } else if (isTablet) {
            badge.innerHTML = "📱 Chế độ: Máy tính bảng";
        } else {
            badge.innerHTML = "💻 Chế độ: Máy tính";
        }
    }
}

// ========================================================
// QUẢN LÝ CHUYỂN ĐỔI CHẾ ĐỘ RÕ RÀNG (4 TABS)
// ========================================================
function switchMode(modeId) {
    VoiceEngine.playClick();
    VoiceEngine.stopAllSpeech();

    document.querySelectorAll(".mode-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.mode === modeId);
    });

    // Ẩn tất cả section
    document.querySelectorAll(".mode-section").forEach(sec => {
        sec.classList.remove("active");
    });

    if (modeId === "equation") {
        document.getElementById("section-tutor").classList.add("active");
        TutorApp.setCategory("equation");
    } else if (modeId === "theory") {
        document.getElementById("section-tutor").classList.add("active");
        TutorApp.setCategory("theory");
    } else if (modeId === "arena") {
        document.getElementById("section-arena").classList.add("active");
        ExamApp.init();
    } else if (modeId === "mistakes") {
        document.getElementById("section-mistakes").classList.add("active");
        MistakeNotebook.render();
    }
}

// ========================================================
// SỔ TAY MẸO & BẢNG HÓA TRỊ (FULL COMBO MODAL)
// ========================================================
const HandbookModal = {
    init() {
        this.renderTable(VALENCE_DATA);
    },

    open(tabId = "tab-summary") {
        VoiceEngine.playClick();
        VoiceEngine.stopAllSpeech();
        document.getElementById("handbook-modal").style.display = "flex";
        this.openTab(tabId);
    },

    close() {
        VoiceEngine.playClick();
        document.getElementById("handbook-modal").style.display = "none";
    },

    openTab(tabId) {
        VoiceEngine.playClick();
        document.getElementById("handbook-modal").style.display = "flex";

        document.querySelectorAll(".modal-tab-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.tab === tabId);
        });

        document.querySelectorAll(".modal-content-tab").forEach(content => {
            content.classList.toggle("active", content.id === tabId);
        });
    },

    renderTable(data) {
        const tbody = document.getElementById("hb-valence-tbody");
        if (!tbody) return;
        tbody.innerHTML = "";

        data.forEach(item => {
            const tr = document.createElement("tr");
            const valStr = item.valence.join(", ");
            tr.innerHTML = `
                <td><strong>${item.name}</strong> (<code style="color: #38bdf8; font-weight: bold;">${item.symbol}</code>)</td>
                <td><strong style="color: #10b981;">${valStr}</strong></td>
                <td><span style="font-size: 0.8rem; color: #94a3b8;">${item.type}</span></td>
                <td style="color: #cbd5e1; font-size: 0.85rem;">${item.note}</td>
            `;
            tbody.appendChild(tr);
        });
    },

    filterTable(query) {
        const q = query.toLowerCase().trim();
        const filtered = VALENCE_DATA.filter(item => 
            item.name.toLowerCase().includes(q) ||
            item.symbol.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
        );
        this.renderTable(filtered);
    }
};

// ========================================================
// CORE: GIA SƯ ẢO (CÂN BẰNG PHƯƠNG TRÌNH & LÝ THUYẾT TÁCH RIÊNG)
// ========================================================
const TutorApp = {
    currentCategory: "equation", // 'equation' hoặc 'theory'
    
    // Tiến trình Cân Bằng
    eqState: { level: 1, correct: 0, streak: 0 },
    // Tiến trình Lý Thuyết
    theoryState: { level: 1, correct: 0, streak: 0 },

    currentLesson: null,
    generatedSteps: [],
    currentStepIndex: 0,
    isProcessing: false,

    init() {
        this.loadSavedState();
        this.updateSidebarRoadmap();
        this.nextQuestion();
        this.updateMasteryDashboard();
    },

    setCategory(category) {
        this.currentCategory = category;
        this.updateSidebarRoadmap();
        this.nextQuestion();
        this.updateMasteryDashboard();
    },

    getActiveState() {
        return this.currentCategory === "equation" ? this.eqState : this.theoryState;
    },

    resetAllProgress() {
        VoiceEngine.playClick();
        if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học (Cả Cân Bằng & Lý Thuyết) về Cấp 1 (0%) không?")) {
            localStorage.removeItem("hoa8_eq_progress_v5");
            localStorage.removeItem("hoa8_theory_progress_v5");
            localStorage.removeItem("hoa8_mistakes_v4");
            
            this.eqState = { level: 1, correct: 0, streak: 0 };
            this.theoryState = { level: 1, correct: 0, streak: 0 };
            
            this.saveState();
            this.updateMasteryDashboard();
            this.nextQuestion();
            MistakeNotebook.updateBadge();
            MistakeNotebook.render();
            VoiceEngine.speak("Đã đặt lại toàn bộ tiến độ về cấp một!");
        }
    },

    getRequiredForLevel(lvl) {
        switch (lvl) {
            case 1: return 8;
            case 2: return 18;
            case 3: return 28;
            default: return 38;
        }
    },

    loadSavedState() {
        const savedEq = localStorage.getItem("hoa8_eq_progress_v5");
        if (savedEq) {
            try { this.eqState = JSON.parse(savedEq); } catch (e) {}
        }
        const savedTheory = localStorage.getItem("hoa8_theory_progress_v5");
        if (savedTheory) {
            try { this.theoryState = JSON.parse(savedTheory); } catch (e) {}
        }
    },

    saveState() {
        localStorage.setItem("hoa8_eq_progress_v5", JSON.stringify(this.eqState));
        localStorage.setItem("hoa8_theory_progress_v5", JSON.stringify(this.theoryState));
    },

    getLevelData() {
        const state = this.getActiveState();
        const key = `level_${state.level}`;
        if (this.currentCategory === "equation") {
            return EQUATION_LESSONS[key] || EQUATION_LESSONS.level_1;
        } else {
            return THEORY_LESSONS[key] || THEORY_LESSONS.level_1;
        }
    },

    updateSidebarRoadmap() {
        const isEq = this.currentCategory === "equation";
        document.getElementById("user-track-label").textContent = isEq ? "PHẦN: CÂN BẰNG PHƯƠNG TRÌNH" : "PHẦN: LÝ THUYẾT & BẢN CHẤT";
        document.getElementById("sidebar-roadmap-title").textContent = isEq ? "Lộ Trình Cân Bằng 4 Cấp" : "Lộ Trình Lý Thuyết 4 Cấp";

        const eqDescs = [
            "Kim loại + Axit, Đơn chất cháy trong Oxy (Thần chú Kim - Phi - H - O).",
            "Tuyệt chiêu Bẻ lẻ thành chẵn (Al₂O₃, FeCl₃) & Bội chung nhỏ nhất.",
            "Đóng gói nhóm nguyên tử (SO₄, NO₃, OH) & Khử oxit bằng CO, H₂.",
            "Phức hợp nhiều nhóm bazơ & Cháy chất hữu cơ phức tạp."
        ];

        const theoryDescs = [
            "Hiện tượng Vật lý vs Hóa học, Quy tắc hóa trị (a.x = b.y), Đơn chất vs Hợp chất.",
            "Điều chế & thu khí Oxy (KMnO₄ đẩy nước), Nhận biết Axit (quỳ đỏ) vs Bazơ (quỳ xanh).",
            "Định luật bảo toàn khối lượng (m_A + m_B = m_C + m_D), Hỗn hợp nổ 2H₂:1O₂.",
            "Dung dịch, Nồng độ phần trăm (C%) & Nồng độ Mol (C_M), Tốc độ hòa tan."
        ];

        for (let i = 1; i <= 4; i++) {
            const descEl = document.getElementById(`tier-desc-${i}`);
            if (descEl) {
                descEl.textContent = isEq ? eqDescs[i - 1] : theoryDescs[i - 1];
            }
        }
    },

    nextQuestion() {
        this.isProcessing = false;
        VoiceEngine.stopAllSpeech();

        const pool = this.getLevelData();
        let rand = pool[Math.floor(Math.random() * pool.length)];
        
        if (pool.length > 1 && this.currentLesson && rand.name === this.currentLesson.name) {
            rand = pool[(pool.indexOf(rand) + 1) % pool.length];
        }
        
        this.currentLesson = rand;
        this.currentStepIndex = 0;

        document.getElementById("tutor-avatar").textContent = "🧑‍🏫";
        document.getElementById("eq-current-name").textContent = rand.name;

        if (this.currentCategory === "theory") {
            // GIA SƯ CHUYÊN LÝ THUYẾT
            document.getElementById("eq-trick-badge").className = "badge theory";
            document.getElementById("eq-trick-badge").textContent = "💡 Lý Thuyết & Bản Chất";
            document.getElementById("eq-formula-display").innerHTML = `<div class="theory-concept-text">📌 ${rand.concept}</div>`;
            document.getElementById("visual-header-text").textContent = "🧪 Bản chất & Hiện tượng thực tế:";
            
            this.generatedSteps = rand.steps.map(s => ({
                dialog: s.dialog,
                question: s.question,
                options: this.shuffleArray(s.options)
            }));

            this.renderTheoryVisuals();
        } else {
            // GIA SƯ CHUYÊN CÂN BẰNG PHƯƠNG TRÌNH
            document.getElementById("eq-trick-badge").className = "badge";
            document.getElementById("eq-trick-badge").textContent = `Mẹo: ${rand.trick}`;
            document.getElementById("eq-formula-display").textContent = rand.eqDisplay;
            document.getElementById("visual-header-text").textContent = "👁️ Mô phỏng các gói phân tử (Visual Molecules):";

            this.generatedSteps = this.generateStepsForEquation(rand);
            this.renderMolecules();
        }
        
        document.getElementById("tutor-success-box").style.display = "none";
        document.getElementById("tutor-options-container").style.display = "flex";

        this.renderCurrentStep();
        this.updateMasteryDashboard();
    },

    generateStepsForEquation(eq) {
        const steps = [];

        const opts1 = [
            { text: `Nguyên tố ${eq.primaryElem}`, correct: true, explain: `Chính xác! Luôn ưu tiên nguyên tố đứng đầu theo thứ tự để làm chuẩn!` },
            { text: `Nguyên tố ${eq.secondaryElem}`, correct: false, explain: `Chưa đúng, ${eq.secondaryElem} đứng sau ${eq.primaryElem} trong thứ tự ưu tiên!` },
            { text: `Cân bằng Oxy (O) trước tiên`, correct: false, explain: `Bẫy đấy! Oxy luôn luôn cân bằng cuối cùng để tự kiểm tra!` }
        ];

        const opts2 = [
            { text: `Áp dụng tuyệt chiêu: ${eq.trick}`, correct: true, explain: `Tuyệt vời! Nhận diện đúng phương pháp chuẩn!` },
            { text: `Sửa số nhỏ ở chân công thức cho nhanh bằng`, correct: false, explain: `Bị gài rồi! CẤM TUYỆT ĐỐI sửa số nhỏ ở chân công thức!` },
            { text: `Bỏ qua không cần cân bằng vì số hạt tự bằng`, correct: false, explain: `Bẫy đấy! Hai vế đang bị lệch số nguyên tử cơ mà!` }
        ];

        const trapList = eq.traps || ["Chưa tối giản", "Sai hệ số"];
        const opts3 = [
            { text: `${eq.solution}`, correct: true, explain: `Hoàn hảo 100%! Phương trình đã được cân bằng chính xác và tối giản!` },
            { text: `${trapList[0]}`, correct: false, explain: `Bẫy đấy! Hệ số này bị sai hoặc chưa tối giản!` },
            { text: `${trapList[1] || 'Sửa sai công thức'}`, correct: false, explain: `Sai bét rồi! Nhìn kỹ lại hệ số 2 vế nào!` }
        ];

        steps.push({
            dialog: `Chào em! Thầy sẽ cùng em làm bài: ${eq.name}`,
            question: `Theo quy tắc Kim loại, Phi kim, Nhóm, Hiđro, Oxy, ta cần cân bằng nguyên tố nào đầu tiên?`,
            options: this.shuffleArray(opts1)
        });

        steps.push({
            dialog: `Nhìn vào phản ứng, bài này áp dụng mẹo: ${eq.trick}`,
            question: `Em hãy nhìn kỹ số nguyên tử ở hai vế để chọn cách làm chuẩn xác nhất:`,
            options: this.shuffleArray(opts2)
        });

        steps.push({
            dialog: `Sau khi nhân hệ số tối giản, hai vế đã hoàn toàn bằng nhau!`,
            question: `Vậy phương trình cân bằng hoàn chỉnh nhất là gì?`,
            options: this.shuffleArray(opts3)
        });

        return steps;
    },

    shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    },

    renderCurrentStep() {
        this.isProcessing = false;
        const step = this.generatedSteps[this.currentStepIndex];
        const total = this.generatedSteps.length;

        document.getElementById("tutor-avatar").textContent = "🧑‍🏫";
        document.getElementById("step-indicator").textContent = `Bước ${this.currentStepIndex + 1} / ${total}`;
        document.getElementById("tutor-dialog-text").innerHTML = step.dialog;
        document.getElementById("tutor-question-text").innerHTML = `❓ ${step.question}`;

        VoiceEngine.readQuestion(step.dialog, step.question);

        const container = document.getElementById("tutor-options-container");
        container.innerHTML = "";

        step.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "btn-option-card";
            btn.innerHTML = `
                <span><strong>${String.fromCharCode(65 + idx)}.</strong> ${opt.text}</span>
                <span style="color: #38bdf8; font-size: 1.2rem;">➔</span>
            `;
            btn.onclick = () => this.handleOption(opt, btn);
            container.appendChild(btn);
        });
    },

    handleOption(opt, clickedBtn) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        VoiceEngine.stopAllSpeech();

        const container = document.getElementById("tutor-options-container");
        const cardBox = document.getElementById("tutor-card-box");
        const avatar = document.getElementById("tutor-avatar");
        const state = this.getActiveState();

        if (opt.correct) {
            clickedBtn.classList.add("correct-anim");
            avatar.textContent = "😎";
            VoiceEngine.playSuccess();

            const feedback = document.createElement("div");
            feedback.className = "tutor-feedback-banner success";
            feedback.innerHTML = `🎉 <strong>ĐÚNG RỒI!</strong> ${opt.explain}`;
            container.appendChild(feedback);

            const total = this.generatedSteps.length;

            VoiceEngine.praiseOnCorrect(() => {
                setTimeout(() => {
                    if (this.currentStepIndex < total - 1) {
                        this.currentStepIndex++;
                        this.renderCurrentStep();
                    } else {
                        this.handleLessonCompleted();
                    }
                }, 500);
            });
        } else {
            clickedBtn.classList.add("wrong-anim");
            avatar.textContent = "🐶";

            cardBox.classList.remove("card-shake");
            void cardBox.offsetWidth;
            cardBox.classList.add("card-shake");

            // Reset tiến trình về 0
            state.correct = 0;
            state.streak = 0;
            this.saveState();
            this.updateMasteryDashboard();

            MistakeNotebook.addMistake({
                id: `tutor_${Date.now()}`,
                question: `[${this.currentCategory === 'equation' ? 'Cân bằng' : 'Lý thuyết'}] ${this.currentLesson.name}`,
                userChoice: opt.text,
                solution: this.currentCategory === "theory" ? "Đáp án lý thuyết chuẩn" : this.currentLesson.solution,
                hint: opt.explain
            });

            const feedback = document.createElement("div");
            feedback.className = "tutor-feedback-banner wrong";
            feedback.innerHTML = `🐕 <strong>GÂU GÂU! SAI BÉTTT!</strong> ${opt.explain}<br><strong style="color:#f43f5e;">⚠️ Đã bị RESET chuỗi đúng về 0 để làm lại từ đầu!</strong>`;
            container.appendChild(feedback);

            VoiceEngine.roastOnWrong(() => {
                setTimeout(() => {
                    if (document.getElementById("section-tutor").classList.contains("active")) {
                        this.nextQuestion();
                    }
                }, 800);
            });
        }
    },

    handleLessonCompleted() {
        const state = this.getActiveState();
        state.streak++;
        state.correct++;
        this.saveState();
        this.updateMasteryDashboard();

        document.getElementById("tutor-options-container").style.display = "none";
        const successBox = document.getElementById("tutor-success-box");
        successBox.style.display = "block";

        if (this.currentCategory === "theory") {
            document.getElementById("success-solution-text").textContent = `Đã hoàn thành xuất sắc bài lý thuyết: ${this.currentLesson.name}!`;
        } else {
            document.getElementById("success-solution-text").textContent = `Phương trình chuẩn: ${this.currentLesson.solution}`;
        }

        const req = this.getRequiredForLevel(state.level);

        if (state.correct >= req && state.level < 4) {
            VoiceEngine.playLevelUp();
            state.level++;
            state.correct = 0;
            this.saveState();
            this.updateMasteryDashboard();

            document.getElementById("success-heading").innerHTML = `🚀 CHÚC MỪNG EM ĐÃ LÊN CẤP ${state.level}!<br><span style="color: #fef08a; font-size: 1.25rem;">Mở khóa thử thách cấp độ tiếp theo!</span>`;
            document.getElementById("btn-next-action").textContent = "Bắt Đầu Cấp Mới Ngay ➔";
        } else {
            document.getElementById("success-heading").textContent = `🎉 XUẤT SẮC! EM ĐÃ GIẢI ĐÚNG HOÀN TOÀN!`;
            document.getElementById("btn-next-action").textContent = `Làm Bài Tiếp Theo (${state.correct}/${req}) ➔`;
        }
    },

    updateMasteryDashboard() {
        const state = this.getActiveState();
        const icons = { 1: "⭐", 2: "🌟", 3: "🔥", 4: "👑" };
        const titles = {
            1: "CẤP 1: CƠ BẢN (Nhập môn)",
            2: "CẤP 2: TRUNG BÌNH (Vận dụng)",
            3: "CẤP 3: NÂNG CAO (Thành thạo)",
            4: "CẤP 4: ĐỈNH CAO (Vô tận)"
        };

        const req = this.getRequiredForLevel(state.level);

        document.getElementById("user-level-icon").textContent = icons[state.level] || "⭐";
        document.getElementById("user-level-title").textContent = titles[state.level] || titles[1];
        document.getElementById("streak-count").textContent = state.streak;

        const percent = Math.min(100, Math.round((state.correct / req) * 100));
        document.getElementById("mastery-progress-bar").style.width = `${percent}%`;
        document.getElementById("mastery-status-text").textContent = `🎯 Tỷ lệ hiểu bài: ${percent}% (Đúng liên tiếp ${req} câu để lên cấp)`;
        document.getElementById("mastery-score-text").textContent = `${state.correct} / ${req} câu đúng`;

        for (let i = 1; i <= 4; i++) {
            const card = document.getElementById(`tier-item-${i}`);
            const status = document.getElementById(`tier-status-${i}`);
            if (card && status) {
                card.className = "tier-card";
                const levelReq = this.getRequiredForLevel(i);
                if (i < state.level) {
                    card.classList.add("completed");
                    status.textContent = "✅ Hoàn thành";
                } else if (i === state.level) {
                    card.classList.add("active");
                    status.textContent = `⚡ Cần ${levelReq} câu`;
                } else {
                    status.textContent = `🔒 Khóa (${levelReq} câu)`;
                }
            }
        }
    },

    renderTheoryVisuals() {
        const canvas = document.getElementById("molecule-canvas");
        if (!canvas) return;
        canvas.innerHTML = `
            <div class="theory-tag-box">🔬 Hiện Tượng & Bản Chất</div>
            <div class="theory-tag-box" style="border-color: #38bdf8; color: #38bdf8;">⚗️ Tư Duy Trực Quan</div>
            <div class="theory-tag-box" style="border-color: #f59e0b; color: #f59e0b;">🧪 Đầy Đủ Khảo Hạch Hóa 8</div>
        `;
    },

    renderMolecules() {
        const canvas = document.getElementById("molecule-canvas");
        if (!canvas) return;
        canvas.innerHTML = "";

        const eq = this.currentLesson;
        if (!eq.reactants) return;

        eq.reactants.forEach((r, idx) => {
            if (idx > 0) {
                const plus = document.createElement("span");
                plus.className = "mol-symbol";
                plus.textContent = "+";
                canvas.appendChild(plus);
            }
            canvas.appendChild(this.createMolBlob(r.formula, r.atoms));
        });

        const arrow = document.createElement("span");
        arrow.className = "mol-symbol";
        arrow.style.color = "#f59e0b";
        arrow.textContent = "➔";
        canvas.appendChild(arrow);

        eq.products.forEach((p, idx) => {
            if (idx > 0) {
                const plus = document.createElement("span");
                plus.className = "mol-symbol";
                plus.textContent = "+";
                canvas.appendChild(plus);
            }
            canvas.appendChild(this.createMolBlob(p.formula, p.atoms));
        });
    },

    createMolBlob(formula, atoms) {
        const group = document.createElement("div");
        group.className = "mol-group";

        const blob = document.createElement("div");
        blob.className = "mol-blob";

        for (const [elem, count] of Object.entries(atoms)) {
            const meta = ELEMENT_COLORS[elem] || { color: "#94a3b8", textColor: "#fff" };
            for (let c = 0; c < count; c++) {
                const sphere = document.createElement("div");
                sphere.className = "atom-ball";
                sphere.style.background = meta.color;
                sphere.style.color = meta.textColor;
                sphere.textContent = elem;
                blob.appendChild(sphere);
            }
        }

        const label = document.createElement("span");
        label.style.fontSize = "0.75rem";
        label.style.fontWeight = "700";
        label.style.color = "#94a3b8";
        label.innerHTML = formula.replace(/(\d+)/g, "<sub>$1</sub>");

        group.appendChild(blob);
        group.appendChild(label);
        return group;
    }
};

// ========================================================
// CHẾ ĐỘ 3: ĐẤU TRƯỜNG SÁT HẠCH 30 CÂU (30 PHÚT)
// ========================================================
const ExamApp = {
    questions: [],
    currentIndex: 0,
    score: 0,
    timerInterval: null,
    totalSeconds: 30 * 60,
    secondsLeft: 30 * 60,
    isProcessing: false,

    init() {
        this.showLobby();
    },

    showLobby() {
        clearInterval(this.timerInterval);
        VoiceEngine.stopAllSpeech();
        document.getElementById("exam-lobby-area").style.display = "block";
        document.getElementById("exam-play-area").style.display = "none";
        document.getElementById("exam-result-area").style.display = "none";
    },

    startExam() {
        VoiceEngine.playClick();
        VoiceEngine.stopAllSpeech();

        const pool = [...ARENA_EXAM_QUESTIONS];
        this.questions = TutorApp.shuffleArray(pool).slice(0, 30);
        this.currentIndex = 0;
        this.score = 0;
        this.secondsLeft = this.totalSeconds;
        this.isProcessing = false;

        document.getElementById("exam-lobby-area").style.display = "none";
        document.getElementById("exam-play-area").style.display = "block";
        document.getElementById("exam-result-area").style.display = "none";

        this.startTimer();
        this.renderQuestion();
    },

    startTimer() {
        clearInterval(this.timerInterval);
        const timerBadge = document.getElementById("exam-timer-badge");
        timerBadge.className = "step-badge timer-badge";
        timerBadge.textContent = "⏱️ 30:00";

        this.timerInterval = setInterval(() => {
            this.secondsLeft--;
            
            const mins = String(Math.floor(this.secondsLeft / 60)).padStart(2, '0');
            const secs = String(this.secondsLeft % 60).padStart(2, '0');
            timerBadge.textContent = `⏱️ ${mins}:${secs}`;

            if (this.secondsLeft <= 300) {
                timerBadge.classList.add("warning");
            }

            if (this.secondsLeft <= 0) {
                clearInterval(this.timerInterval);
                VoiceEngine.speak("Hết giờ làm bài thi!");
                this.finishExam(true);
            }
        }, 1000);
    },

    renderQuestion() {
        this.isProcessing = false;
        const q = this.questions[this.currentIndex];
        document.getElementById("exam-progress-badge").textContent = `Câu ${this.currentIndex + 1} / ${this.questions.length}`;
        document.getElementById("exam-q-text").innerHTML = `<strong>Câu ${this.currentIndex + 1}:</strong> ${q.question}`;

        VoiceEngine.speak(`Câu ${this.currentIndex + 1}. ... ${q.question}`, 200);

        const container = document.getElementById("exam-options-container");
        container.innerHTML = "";

        const correctText = q.options[q.correctIndex];
        const shuffledOpts = TutorApp.shuffleArray([...q.options]);

        shuffledOpts.forEach((optText, idx) => {
            const btn = document.createElement("button");
            btn.className = "btn-option-card";
            btn.innerHTML = `
                <span><strong>${String.fromCharCode(65 + idx)}.</strong> ${optText}</span>
                <span style="color: #38bdf8; font-size: 1.2rem;">➔</span>
            `;
            btn.onclick = () => this.handleAnswer(optText === correctText, optText, correctText, q, btn);
            container.appendChild(btn);
        });
    },

    handleAnswer(isCorrect, userChoice, correctText, questionObj, clickedBtn) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        VoiceEngine.stopAllSpeech();

        if (isCorrect) {
            clickedBtn.classList.add("correct-anim");
            VoiceEngine.playSuccess();
            this.score++;

            VoiceEngine.praiseOnCorrect(() => {
                setTimeout(() => {
                    this.currentIndex++;
                    if (this.currentIndex < this.questions.length) {
                        this.renderQuestion();
                    } else {
                        this.finishExam();
                    }
                }, 400);
            });
        } else {
            clickedBtn.classList.add("wrong-anim");
            MistakeNotebook.addMistake({
                id: `exam_${questionObj.id}_${Date.now()}`,
                question: questionObj.question,
                userChoice: userChoice,
                solution: correctText,
                hint: questionObj.explain
            });

            VoiceEngine.roastOnWrong(() => {
                setTimeout(() => {
                    this.currentIndex++;
                    if (this.currentIndex < this.questions.length) {
                        this.renderQuestion();
                    } else {
                        this.finishExam();
                    }
                }, 600);
            });
        }
    },

    finishExam(isTimeout = false) {
        clearInterval(this.timerInterval);
        VoiceEngine.stopAllSpeech();

        document.getElementById("exam-play-area").style.display = "none";
        document.getElementById("exam-result-area").style.display = "block";

        const finalScore = ((this.score / this.questions.length) * 10).toFixed(1);
        document.getElementById("exam-score-heading").textContent = `KẾT QUẢ: ${finalScore} / 10 ĐIỂM (${this.score}/${this.questions.length} câu đúng)`;
        
        const sub = document.getElementById("exam-score-sub");
        const icon = document.getElementById("exam-result-icon");

        if (isTimeout) {
            sub.innerHTML = `<span style="color:#f43f5e; font-weight:800;">⏰ HẾT GIỜ LÀM BÀI 30 PHÚT!</span><br>Em đã hoàn thành được ${this.score}/${this.questions.length} câu hỏi.`;
            icon.textContent = "⏱️";
        } else if (finalScore >= 9.0) {
            icon.textContent = "🏆";
            sub.textContent = "🎉 THIÊN TÀI HÓA HỌC! Em đã làm chủ toàn bộ kiến thức Hóa 8!";
            VoiceEngine.speak("Xuất sắc! Mười điểm không có nhưng! Giỏi lắm nhóc con!", 300);
        } else if (finalScore >= 6.5) {
            icon.textContent = "⭐";
            sub.textContent = "Khá tốt! Nhưng vẫn còn một số câu bị gài bẫy. Hãy vào Sổ tay câu sai để ôn lại nhé!";
            VoiceEngine.speak("Khá đấy nhóc con, nhưng vẫn còn sai vài câu, vào sổ tay câu sai mà làm lại!", 300);
        } else {
            icon.textContent = "🐕";
            sub.textContent = "Cần cố gắng nhiều hơn! Hãy mở Sổ Tay Mẹo Full Combo và luyện thêm cùng Gia sư nhé!";
            VoiceEngine.speak("Điểm kém quá thằng nhóc! Ngu thế, học hành kiểu gì đấy!", 300);
        }
    }
};

// ========================================================
// CHẾ ĐỘ 4: SỔ TAY CÂU SAI (MISTAKE NOTEBOOK)
// ========================================================
const MistakeNotebook = {
    KEY: "hoa8_mistakes_v4",

    getMistakes() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    },

    addMistake(item) {
        const list = this.getMistakes();
        list.unshift(item);
        if (list.length > 50) list.pop();
        localStorage.setItem(this.KEY, JSON.stringify(list));
        this.updateBadge();
    },

    removeMistake(id) {
        let list = this.getMistakes();
        list = list.filter(m => m.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(list));
        this.updateBadge();
        this.render();
    },

    clearMistakes() {
        if (confirm("Bạn có chắc muốn xóa sạch toàn bộ lịch sử câu sai không?")) {
            localStorage.removeItem(this.KEY);
            this.updateBadge();
            this.render();
        }
    },

    updateBadge() {
        const list = this.getMistakes();
        const badge = document.getElementById("mistake-badge-count");
        if (badge) badge.textContent = list.length;
    },

    render() {
        this.updateBadge();
        const container = document.getElementById("mistake-list-container");
        if (!container) return;

        const list = this.getMistakes();
        if (list.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted); grid-column: 1 / -1;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🌟</div>
                    <p style="font-size: 1.1rem;">Chưa có câu nào làm sai cả! Thật tuyệt vời!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = "";
        list.forEach(item => {
            const card = document.createElement("div");
            card.className = "mistake-card";
            card.innerHTML = `
                <div class="mistake-q">❓ ${item.question}</div>
                <div class="mistake-ans">❌ Em đã chọn: <strong>${item.userChoice}</strong></div>
                <div class="mistake-solution">✅ Đáp án đúng: <strong>${item.solution}</strong></div>
                <div style="font-size: 0.85rem; color: #94a3b8;">💡 ${item.hint}</div>
                <button class="btn-primary" style="margin-top: 5px; padding: 8px 14px; font-size: 0.85rem;" onclick="MistakeNotebook.removeMistake('${item.id}')">Đã Hiểu & Xóa Khỏi Sổ 🗑️</button>
            `;
            container.appendChild(card);
        });
    }
};

window.addEventListener("resize", detectDevice);

window.addEventListener("DOMContentLoaded", () => {
    detectDevice();
    HandbookModal.init();
    TutorApp.init();
    MistakeNotebook.updateBadge();
});

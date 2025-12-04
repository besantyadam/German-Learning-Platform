// Function to show lesson content based on level
function showLevelContent(level) {
    // إخفاء جميع محتويات الدروس أولاً
    document.querySelectorAll('.lesson-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.querySelector('.initial-message').classList.add('hidden');

    // إظهار محتوى المستوى المحدد
    const contentElement = document.getElementById(level + '-content');
    if (contentElement) {
        contentElement.classList.remove('hidden');
    } else {
        // رسالة تظهر للمستويات غير المكتملة (مثل A2, B2)
        document.getElementById('content-display').innerHTML = `
            <div class="lesson-content">
                <h3>محتوى مستوى ${level}</h3>
                <p>عفواً، محتوى هذا المستوى قيد التطوير حالياً لإضافة أحدث أنظمة التعلم التفاعلي.</p>
            </div>
        `;
    }
}

// Function for Audio (Text-to-Speech)
function playAudio(word) {
    // استخدام Web Speech API للنطق الألماني
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE';
    speechSynthesis.speak(utterance);
}

// Simple Quiz Data (مثال)
const quizData = [
    {
        question: "ما هي الأداة الصحيحة لكلمة 'Computer'؟ (A1)",
        options: ["Die", "Der", "Das"],
        answer: "Der"
    },
    {
        question: "أي فعل يعبر عن الماضي (Konjunktiv II)؟ (C1)",
        options: ["Ich werde essen", "Ich habe gegessen", "Ich würde essen"],
        answer: "Ich würde essen"
    }
];

// Function to render the Quiz structure
function renderQuiz() {
    const quizArea = document.getElementById('quiz-area');
    let html = '';
    quizData.forEach((item, index) => {
        html += `<div class="quiz-question" data-answer="${item.answer}" data-index="${index}">
                    <p>${index + 1}. ${item.question}</p>
                    <div class="quiz-options">
        `;
        item.options.forEach(option => {
            html += `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label>`;
        });
        html += `   </div>
                    <p id="feedback-${index}" class="feedback"></p>
                </div>`;
    });
    html += `<button class="btn" onclick="submitFullQuiz()">تحقق من النتائج</button>`;
    quizArea.innerHTML = html;
    document.getElementById('start-quiz-btn').classList.add('hidden');
}

// Function to handle quiz start and submission
function startQuiz() {
    renderQuiz();
    document.getElementById('quizResult').classList.add('hidden');
}

function submitFullQuiz() {
    let score = 0;
    const totalQuestions = quizData.length;

    quizData.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const feedbackElement = document.getElementById(`feedback-${index}`);
        feedbackElement.style.display = 'block';

        if (selectedOption && selectedOption.value === item.answer) {
            score++;
            feedbackElement.textContent = "صحيح! الإجابة هي: " + item.answer;
            feedbackElement.style.color = '#2ecc71';
        } else if (selectedOption) {
            feedbackElement.textContent = "خطأ. الإجابة الصحيحة هي: " + item.answer;
            feedbackElement.style.color = '#e74c3c';
        } else {
            feedbackElement.textContent = "لم يتم الإجابة على هذا السؤال.";
            feedbackElement.style.color = '#f39c12';
        }
    });

    const resultElement = document.getElementById('quizResult');
    resultElement.classList.remove('hidden');
    resultElement.style.color = (score / totalQuestions) > 0.5 ? '#16a085' : '#c0392b';
    resultElement.innerHTML = `نتيجة الاختبار: ${score} من ${totalQuestions}. <br> درجة الإتقان: ${Math.round((score / totalQuestions) * 100)}%`;
}

// Simple form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    alert("تم استلام رسالتك بنجاح! شكراً لتعاونك.");
    event.target.reset(); // Clear the form
    return false;
}

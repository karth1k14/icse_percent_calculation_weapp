function calculatePercentage() {
    let marks = {
        english: parseInt(document.getElementById("english").value) || 0,
        language: parseInt(document.getElementById("language").value) || 0,
        historyGeography: parseInt(document.getElementById("historyGeography").value) || 0,
        science: parseInt(document.getElementById("science").value) || 0,
        maths: parseInt(document.getElementById("maths").value) || 0,
        optional: parseInt(document.getElementById("optional").value) || 0
    };

    let englishMarks = marks.english; // English is compulsory
    let otherSubjects = [marks.language, marks.historyGeography, marks.science, marks.maths, marks.optional];

    // Select the top 4 highest marks from the remaining 5 subjects
    let topFour = otherSubjects.sort((a, b) => b - a).slice(0, 4);

    let totalMarks = englishMarks + topFour.reduce((sum, mark) => sum + mark, 0);
    let percentage = (totalMarks / 500) * 100;

    document.getElementById("result").innerText = `Your percentage: ${percentage.toFixed(2)}%`;
}

// Reset function for manual entry
function resetManualEntry() {
    document.querySelectorAll(".manual-entry input").forEach(input => input.value = "");
    document.getElementById("result").innerText = "";
}

// OCR extraction using Tesseract.js
function extractMarksFromImage() {
    let file = document.getElementById("marksheetUpload").files[0];

    if (!file) {
        alert("Please upload a marksheet image first.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function () {
        Tesseract.recognize(
            reader.result, 
            'eng', 
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            console.log("Extracted Text:", text);
            
            let marks = text.match(/\b\d{1,3}\b/g)?.map(Number).filter(n => n >= 0 && n <= 100) || [];

            if (marks.length !== 6) {
                document.getElementById("ocrResult").innerHTML = "⚠️ Error: Could not extract exactly 6 marks. Try a clearer image.";
                return;
            }

            let extractedMarks = {
                english: marks[0], 
                language: marks[1], 
                historyGeography: marks[2], 
                science: marks[3], 
                maths: marks[4], 
                optional: marks[5]
            };

            let englishMarks = extractedMarks.english; // English is compulsory
            let otherSubjects = [extractedMarks.language, extractedMarks.historyGeography, extractedMarks.science, extractedMarks.maths, extractedMarks.optional];

            let topFour = otherSubjects.sort((a, b) => b - a).slice(0, 4);
            let totalMarks = englishMarks + topFour.reduce((sum, mark) => sum + mark, 0);
            let percentage = (totalMarks / 500) * 100;

            document.getElementById("ocrResult").innerHTML = `Extracted Marks: ${marks.join(", ")}<br>Your percentage: <strong>${percentage.toFixed(2)}%</strong>`;
        }).catch(error => {
            console.error("OCR Error:", error);
            document.getElementById("ocrResult").innerHTML = "❌ Error processing image.";
        });
    };

    reader.readAsDataURL(file);
}

// Reset function for file upload section
function resetForm() {
    document.getElementById("marksheetUpload").value = "";
    document.getElementById("ocrResult").innerHTML = "";
}
// Function to Calculate Percentage
function calculatePercentage() {
    let english = parseFloat(document.getElementById("english").value) || 0;
    let language = parseFloat(document.getElementById("language").value) || 0;
    let history = parseFloat(document.getElementById("history").value) || 0;
    let science = parseFloat(document.getElementById("science").value) || 0;
    let maths = parseFloat(document.getElementById("maths").value) || 0;
    let optional = parseFloat(document.getElementById("optional").value) || 0;

    // English is compulsory, so select the top 4 among the rest
    let marks = [language, history, science, maths, optional];
    marks.sort((a, b) => b - a); // Sort in descending order

    let totalMarks = english + marks[0] + marks[1] + marks[2] + marks[3];
    let percentage = (totalMarks / 500) * 100;

    document.getElementById("result").innerText = `Your Percentage: ${percentage.toFixed(2)}%`;
}

// Function to Reset Form
function resetForm() {
    document.querySelectorAll("input[type='number']").forEach(input => input.value = "");
    document.getElementById("result").innerText = "";
    document.getElementById("ocrResult").innerText = "";
}

// Function to Extract Marks using OCR
function extractMarksFromImage() {
    let file = document.getElementById("marksheetUpload").files[0];
    
    if (!file) {
        alert("Please upload a marksheet image!");
        return;
    }

    Tesseract.recognize(
        file,
        'eng',
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        document.getElementById("ocrResult").innerText = `Extracted Marks: ${text}`;
        // Further processing can be done here
    });
}

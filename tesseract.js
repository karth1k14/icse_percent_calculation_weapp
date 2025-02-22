Tesseract.recognize(canvas.toDataURL(), 'eng', {
    logger: m => console.log(m),  // Log OCR progress
    tessedit_char_whitelist: '0123456789',  // Recognize only numbers (ignore alphabets/symbols)
    psm: 6  // Assume a uniform block of text (useful for structured numbers)
}).then(({ data: { text } }) => {
    console.log("Extracted Text:", text);

    // Extract only numbers (marks) between 0 and 100
    let marks = text.match(/\b\d{1,3}\b/g)?.map(Number).filter(n => n >= 0 && n <= 100) || [];

    if (marks.length < 6) {
        document.getElementById("ocrResult").innerHTML = "⚠️ Error: Could not extract enough marks. Try a clearer image.";
        return;
    }

    // Select top 5 marks
    marks.sort((a, b) => b - a);
    let top5Marks = marks.slice(0, 5);
    let totalMarks = top5Marks.reduce((sum, mark) => sum + mark, 0);
    let percentage = (totalMarks / (5 * 100)) * 100;

    document.getElementById("ocrResult").innerHTML = `
        ✅ Extracted Marks: ${top5Marks.join(", ")} <br>
        🎯 Your percentage: <strong>${percentage.toFixed(2)}%</strong>
    `;
});

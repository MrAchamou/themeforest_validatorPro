// Test script for HistoryProgress module

const HistoryProgress = require("./assets/js/history-progress");

async function testHistoryProgress() {
    const hp = new HistoryProgress();

    console.log("--- Testing saveValidationResult ---");
    const result1 = {
        totalScore: 85,
        issues: [{ name: "Issue 1" }],
        successes: [{ name: "Success 1" }],
        analysisTime: 1200
    };
    await hp.saveValidationResult(result1);
    console.log("Result 1 saved.");

    const result2 = {
        totalScore: 92,
        issues: [],
        successes: [{ name: "Success 1" }, { name: "Success 2" }],
        analysisTime: 1000
    };
    await hp.saveValidationResult(result2);
    console.log("Result 2 saved.");

    console.log("\n--- Testing getValidationHistory ---");
    const history = await hp.getValidationHistory();
    console.log("Validation History:", history);

    if (history.length >= 2) {
        console.log("\n--- Testing compareResults ---");
        const comparison = hp.compareResults(history[0], history[1]);
        console.log("Comparison (Result 1 vs Result 2):");
        console.log(comparison);

        console.log("\n--- Testing generateProgressGraphData ---");
        const graphData = hp.generateProgressGraphData(history);
        console.log("Graph Data:", graphData);

        console.log("\n--- Testing updateTagSystem ---");
        const validationIdToTag = history[0].id; // Utiliser l'ID du premier résultat
        await hp.updateTagSystem(validationIdToTag, "Accepted");
        const updatedHistory = await hp.getValidationHistory();
        console.log(`Validation ${validationIdToTag} tagged as Accepted:`, updatedHistory.find(item => item.id === validationIdToTag));
    }
}

testHistoryProgress().catch(console.error);



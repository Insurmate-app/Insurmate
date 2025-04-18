function calculateLevenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  // Fill first row and column
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  // Fill rest of the matrix
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

async function findWordsInMixedCase(text) {
  const WORD_FINDER = /([A-Z][a-z]+|[A-Z]+(?![a-z])|[a-z]+)/g;
  return text.match(WORD_FINDER) || [];
}

async function splitAndProcess(input) {
  let modifiedInput = input.replace(/_/g, " ");
  let trimmedInput = modifiedInput.trim();
  let squeezedInput = trimmedInput.replace(/\s+/g, " ");
  let cleanedInput = squeezedInput.replace(/[,\[\]]/g, "");
  let words = cleanedInput.split(" ");
  let finalWords = [];
  let containsOneLetterWord = false;

  for (let word of words) {
    let splitWords = await findWordsInMixedCase(word);
    for (let splitWord of splitWords) {
      if (splitWord.length === 1) {
        containsOneLetterWord = true;
      }
    }
    finalWords.push(...splitWords);
  }

  return (
    containsOneLetterWord ? words.join(" ") : finalWords.join(" ")
  ).toUpperCase();
}

function calculateJaccardSimilarity(str1, str2) {
  const set1 = new Set(str1.toLowerCase().split(""));
  const set2 = new Set(str2.toLowerCase().split(""));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

async function checkSimilarCompanyName(
  existingCompanyNames,
  enteredCompanyName
) {
  const proceeded_enteredCompanyName = await splitAndProcess(
    enteredCompanyName
  );

  let smallestDistance = Infinity;
  let highestJaccard = 0;
  let mostSimilarCompany = enteredCompanyName;

  for (const company of existingCompanyNames) {
    const processedExistingName = await splitAndProcess(company);
    const distance = calculateLevenshteinDistance(
      processedExistingName,
      proceeded_enteredCompanyName
    );
    const jaccardSim = calculateJaccardSimilarity(
      processedExistingName,
      proceeded_enteredCompanyName
    );

    if (distance < smallestDistance) {
      console.log(`New smallest distance: ${distance}, Jaccard: ${jaccardSim}`);
      smallestDistance = distance;
      highestJaccard = jaccardSim;
      mostSimilarCompany = company;
    }
  }

  // Return most similar company if either Levenshtein distance is less than 4
  // or Jaccard similarity is greater than 0.85
  return smallestDistance < 4 || highestJaccard >= 0.85
    ? mostSimilarCompany
    : proceeded_enteredCompanyName;
}

module.exports = {
  calculateLevenshteinDistance,
  findWordsInMixedCase,
  splitAndProcess,
  checkSimilarCompanyName,
  calculateJaccardSimilarity,
};

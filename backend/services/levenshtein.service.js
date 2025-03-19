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

async function checkSimilarCompanyName(
  existingCompanyNames,
  enteredCompanyName
) {
  const proceeded_enteredCompanyName = await splitAndProcess(
    enteredCompanyName
  );

  let smallestDistance = Infinity;
  let mostSimilarCompany = enteredCompanyName;

  for (const company of existingCompanyNames) {
    const processedExistingName = await splitAndProcess(company);
    const distance = calculateLevenshteinDistance(
      processedExistingName,
      proceeded_enteredCompanyName
    );

    console.log(
      `Comparing: ${enteredCompanyName} vs ${company} Distance: ${distance}`
    );

    // Update if we find a smaller distance
    if (distance < smallestDistance) {
      console.log(`New smallest distance: ${distance}`);
      smallestDistance = distance;
      mostSimilarCompany = company;
    }
  }

  // Return the most similar company if the distance is less than threshold
  return smallestDistance < 4 ? mostSimilarCompany : enteredCompanyName;
}

module.exports = {
  calculateLevenshteinDistance,
  findWordsInMixedCase,
  splitAndProcess,
  checkSimilarCompanyName,
};

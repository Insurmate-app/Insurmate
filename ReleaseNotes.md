# Release Notes
# Code Milestone 1:



## Environment & Dev Set-Up Automation:
- Added detailed instructions and multiple automation scripts to streamline developer onboarding
- Scripts handle everything from package installation to blockchain network initialization and MongoDB connection setup
- Significantly reduces time needed for new developers and/or different machines to get up and running with the project

## User Schema Modifications:
- Enhanced the user model with additional fields:
  - `firstName`
  - `lastName`
  - `wallet`
- Required updating corresponding controller, route, and service components
- Modified the Sign Up page user interface to accommodate the new fields and verified correct functionality


## Unify Strings:
- Implemented solution to standardize business name formats across the system
- Evaluated multiple approaches:
  - Jaccard Similarity
  - Tokenization
  - Levenshtein Distance (Edit Distance)
  - NLP-based solutions
- Selected Levenshtein Distance for our solution
- System now prevents duplicate entries by detecting similar company names
- Returns appropriate error message when attempting to store company names too similar to existing entries


export interface Question {
  question: string
  answer: string | string[]
  category: string
  isAsterisked?: boolean
}

export const naturalizationQuestions: Question[] = [
  {
    question: "What is the supreme law of the land?",
    answer: "The Constitution",
    category: "Principles of American Democracy"
  },
  {
    question: "What does the Constitution do?",
    answer: [
      "Sets up the government",
      "Defines the government",
      "Protects basic rights of Americans"
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "The idea of self-government is in the first three words of the Constitution. What are these words?",
    answer: "We the People",
    category: "Principles of American Democracy"
  },
  {
    question: "What is an amendment?",
    answer: [
      "A change (to the Constitution)",
      "An addition (to the Constitution)"
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "What do we call the first ten amendments to the Constitution?",
    answer: "The Bill of Rights",
    category: "Principles of American Democracy"
  },
  {
    question: "What is one right or freedom from the First Amendment?",
    answer: [
      "Speech",
      "Religion",
      "Assembly",
      "Press",
      "Petition the government"
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "How many amendments does the Constitution have?",
    answer: "Twenty-seven",
    category: "Principles of American Democracy"
  },
  {
    question: "What did the Declaration of Independence do?",
    answer: [
      "Announced our independence (from Great Britain)",
      "Declared our independence (from Great Britain)",
      "Said that the United States is free (from Great Britain)"
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "What are two rights in the Declaration of Independence?",
    answer: [
      "Life",
      "Liberty",
      "Pursuit of happiness"
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "What is freedom of religion?",
    answer: "You can practice any religion, or not practice a religion.",
    category: "Principles of American Democracy"
  },
  {
    question: "What is the economic system in the United States?",
    answer: [
      "Capitalist economy",
      "Market economy"
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "What is the 'rule of law'?",
    answer: [
      "Everyone must follow the law.",
      "Leaders must obey the law.",
      "Government must obey the law.",
      "No one is above the law."
    ],
    category: "Principles of American Democracy"
  },
  {
    question: "Name one branch or part of the government.",
    answer: [
      "Congress",
      "Legislative",
      "President",
      "Executive",
      "The courts",
      "Judicial"
    ],
    category: "System of Government"
  },
  {
    question: "What stops one branch of government from becoming too powerful?",
    answer: [
      "Checks and balances",
      "Separation of powers"
    ],
    category: "System of Government"
  },
  {
    question: "Who is in charge of the executive branch?",
    answer: "The President",
    category: "System of Government"
  },
  {
    question: "Who makes federal laws?",
    answer: [
      "Congress",
      "Senate and House (of Representatives)",
      "(U.S. or national) legislature"
    ],
    category: "System of Government"
  },
  {
    question: "What are the two parts of the U.S. Congress?",
    answer: "The Senate and House (of Representatives)",
    category: "System of Government"
  },
  {
    question: "How many U.S. Senators are there?",
    answer: "One hundred",
    category: "System of Government"
  },
  {
    question: "We elect a U.S. Senator for how many years?",
    answer: "Six",
    category: "System of Government"
  },
  {
    question: "Who is one of your state's U.S. Senators now?",
    answer: [
      "Chuck Schumer",
      "Kirsten Gillibrand"
    ],
    category: "System of Government"
  },
  {
    question: "The House of Representatives has how many voting members?",
    answer: "Four hundred thirty-five",
    category: "System of Government"
  },
  {
    question: "We elect a U.S. Representative for how many years?",
    answer: "Two",
    category: "System of Government"
  },
  {
    question: "Who does a U.S. Senator represent?",
    answer: "All people of the state",
    category: "System of Government"
  },
  {
    question: "Why do some states have more Representatives than other states?",
    answer: [
      "Because of the state's population",
      "Because they have more people",
      "Because some states have more people"
    ],
    category: "System of Government"
  },
  {
    question: "We elect a President for how many years?",
    answer: "Four",
    category: "System of Government"
  },
  {
    question: "In what month do we vote for President?",
    answer: "November",
    category: "System of Government"
  },
  {
    question: "What is the name of the President of the United States now?",
    answer: "Donald J. Trump",
    category: "System of Government"
  },
  {
    question: "What is the name of the Vice President of the United States now?",
    answer: "JD Vance",
    category: "System of Government"
  },
  {
    question: "If the President can no longer serve, who becomes President?",
    answer: "The Vice President",
    category: "System of Government"
  },
  {
    question: "If both the President and the Vice President can no longer serve, who becomes President?",
    answer: "The Speaker of the House",
    category: "System of Government"
  },
  {
    question: "Who is the Commander in Chief of the military?",
    answer: "The President",
    category: "System of Government"
  },
  {
    question: "Who signs bills to become laws?",
    answer: "The President",
    category: "System of Government"
  },
  {
    question: "Who vetoes bills?",
    answer: "The President",
    category: "System of Government"
  },
  {
    question: "What does the President's Cabinet do?",
    answer: "Advises the President",
    category: "System of Government"
  },
  {
    question: "What are two Cabinet-level positions?",
    answer: [
      "Secretary of Agriculture",
      "Secretary of Commerce",
      "Secretary of Defense",
      "Secretary of Education",
      "Secretary of Energy",
      "Secretary of Health and Human Services",
      "Secretary of Homeland Security",
      "Secretary of Housing and Urban Development",
      "Secretary of the Interior",
      "Secretary of Labor",
      "Secretary of State",
      "Secretary of Transportation",
      "Secretary of the Treasury",
      "Secretary of Veterans Affairs",
      "Attorney General",
      "Vice President"
    ],
    category: "System of Government"
  },
  {
    question: "What does the judicial branch do?",
    answer: [
      "Reviews laws",
      "Explains laws",
      "Resolves disputes (disagreements)",
      "Decides if a law goes against the Constitution"
    ],
    category: "System of Government"
  },
  {
    question: "What is the highest court in the United States?",
    answer: "The Supreme Court",
    category: "System of Government"
  },
  {
    question: "How many justices are on the Supreme Court?",
    answer: "Nine",
    category: "System of Government"
  },
  {
    question: "Who is the Chief Justice of the United States now?",
    answer: "John G. Roberts, Jr.",
    category: "System of Government"
  },
  {
    question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
    answer: [
      "To print money",
      "To declare war",
      "To create an army",
      "To make treaties"
    ],
    category: "System of Government"
  },
  {
    question: "Under our Constitution, some powers belong to the states. What is one power of the states?",
    answer: [
      "Provide schooling and education",
      "Provide protection (police)",
      "Provide safety (fire departments)",
      "Give a driver's license",
      "Approve zoning and land use"
    ],
    category: "System of Government"
  },
  {
    question: "Who is the Governor of your state now?",
    answer: "Kathy Hochul",
    category: "System of Government"
  },
  {
    question: "What is the capital of your state?",
    answer: "Albany",
    category: "System of Government"
  },
  {
    question: "What are the two major political parties in the United States?",
    answer: "Democratic and Republican",
    category: "System of Government"
  },
  {
    question: "What is the political party of the President now?",
    answer: "Republican",
    category: "System of Government"
  },
  {
    question: "What is the name of the Speaker of the House of Representatives now?",
    answer: "Mike Johnson",
    category: "System of Government"
  },
  {
    question: "There are four amendments to the Constitution about who can vote. Describe one of them.",
    answer: [
      "Citizens eighteen (18) and older (can vote).",
      "You don't have to pay (a poll tax) to vote.",
      "Any citizen can vote. (Women and men can vote.)",
      "A male citizen of any race (can vote.)"
    ],
    category: "Rights and Responsibilities"
  },
  {
    question: "What is one responsibility that is only for United States citizens?",
    answer: [
      "Serve on a jury",
      "Vote in a federal election"
    ],
    category: "Rights and Responsibilities"
  },
  {
    question: "Name one right only for United States citizens.",
    answer: [
      "Vote in a federal election",
      "Run for federal office"
    ],
    category: "Rights and Responsibilities"
  },
  {
    question: "What are two rights of everyone living in the United States?",
    answer: [
      "Freedom of expression",
      "Freedom of speech",
      "Freedom of assembly",
      "Freedom to petition the government",
      "Freedom of religion",
      "The right to bear arms"
    ],
    category: "Rights and Responsibilities"
  },
  {
    question: "What do we show loyalty to when we say the Pledge of Allegiance?",
    answer: [
      "The United States",
      "The flag"
    ],
    category: "Rights and Responsibilities"
  },
  {
    question: "What is one promise you make when you become a United States citizen?",
    answer: [
      "Give up loyalty to other countries",
      "Defend the Constitution and laws of the United States",
      "Obey the laws of the United States",
      "Serve in the U.S. military (if needed)",
      "Serve (do important work for) the nation (if needed)",
      "Be loyal to the United States"
    ],
    category: "Rights and Responsibilities"
  },
  {
    question: "How old do citizens have to be to vote for President?",
    answer: "Eighteen and older",
    category: "Rights and Responsibilities"
  },
  {
    question: "When must all men register for the Selective Service?",
    answer: [
      "At age eighteen",
      "Between eighteen and twenty-six"
    ],
    category: "Rights and Responsibilities"
  }
];





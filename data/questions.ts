export interface Question {
  question: string
  answer: string | string[]
  category: string
  isAsterisked?: boolean
}

export const naturalizationQuestions: Question[] = [
  {
    question: "What are two rights of everyone living in the United States?",
    answer: ["Freedom of speech and freedom of worship", "Freedom to petition the government and freedom to disobey traffic laws", "Freedom of worship and freedom to make treaties with other countries", "Freedom of speech and freedom to run for president"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What is freedom of religion?",
    answer: ["You can practice any religion, or not practice a religion", "You can't choose the time you practice your religion", "You must choose a religion", "No one can practice a religion"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Who is in charge of the executive branch?",
    answer: ["The President", "The Speaker of the House", "The Prime Minister", "The Chief Justice"],
    category: "System of Government"
  },
  {
    question: "Name one branch or part of the government.",
    answer: ["Legislative", "State government", "Parliament", "United Nations"],
    category: "System of Government"
  },
  {
    question: "What do we call the first ten amendments to the Constitution?",
    answer: ["The Bill of Rights", "The Articles of Confederation", "The inalienable rights", "The Declaration of Independence"],
    category: "System of Government"
  },
  {
    question: "Under our Constitution, some powers belong to the states. What is one power of the states?",
    answer: ["Provide schooling and education", "Make treaties", "Create an army", "Coin or print money"],
    category: "System of Government"
  },
  {
    question: "Who is the Commander in Chief of the military?",
    answer: ["The President", "The Vice-President", "The Secretary of Defense", "The Attorney General"],
    category: "System of Government"
  },
  {
    question: "What is one reason colonists came to America?",
    answer: ["Freedom", "For the experience traveling across the ocean", "To join a civic group", "None of these answers"],
    category: "Colonial Period and Independence"
  },
  {
    question: "Who is the 'Father of Our Country'?",
    answer: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Patrick Henry"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What group of people was taken to America and sold as slaves?",
    answer: ["Africans", "English", "Canadians", "Dutch"],
    category: "Colonial Period and Independence"
  },
  {
    question: "We elect a U.S. Senator for how many years?",
    answer: ["Six (6)", "Ten (10)", "Four (4)", "Two (2)"],
    category: "System of Government"
  },
  {
    question: "What stops one branch of government from becoming too powerful?",
    answer: ["Checks and balances", "The President", "The people", "Freedom of speech"],
    category: "System of Government"
  },
  {
    question: "We elect a President for how many years?",
    answer: ["Four (4)", "Eight (8)", "Two (2)", "Ten (10)"],
    category: "System of Government"
  },
  {
    question: "The idea of self-government is in the first three words of the Constitution. What are these words?",
    answer: ["We the People", "Congress shall make", "We the British", "We the Colonists"],
    category: "System of Government"
  },
  {
    question: "Who makes federal laws?",
    answer: ["Congress", "The states", "The President", "The Supreme Court"],
    category: "System of Government"
  },
  {
    question: "What did Martin Luther King, Jr. do?",
    answer: ["Fought for civil rights", "Became a U.S. Senator", "Fought for women's suffrage", "Ran for President of the United States"],
    category: "Recent American History"
  },
  {
    question: "What is the 'rule of law'?",
    answer: ["Everyone must follow the law", "Everyone but the President must follow the law", "Government does not have to follow the law", "All laws must be the same in every state"],
    category: "System of Government"
  },
  {
    question: "What does the Constitution do?",
    answer: ["All of these answers", "Defines the government", "Sets up the government", "Protects basic rights of Americans"],
    category: "System of Government"
  },
  {
    question: "Who lived in America before the Europeans arrived?",
    answer: ["American Indians", "Floridians", "No one", "Canadians"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What did Susan B. Anthony do?",
    answer: ["Fought for women's rights", "Made the first flag of the United States", "Founded the Red Cross", "Was the first woman elected to the House of Representatives"],
    category: "1800s"
  },
  {
    question: "What are the two major political parties in the United States today?",
    answer: ["Democratic and Republican", "Reform and Green", "American and Bull-Moose", "Democratic-Republican and Whig"],
    category: "System of Government"
  },
  {
    question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
    answer: ["To make treaties", "To provide police departments", "To issue driver's licenses", "To provide schooling"],
    category: "System of Government"
  },
  {
    question: "Who does a U.S. Senator represent?",
    answer: ["All people of the state in which (s)he was elected", "All people of the state who belong to the Senator's political party", "The state legislatures", "Only the people in the state who voted for the Senator"],
    category: "System of Government"
  },
  {
    question: "How old do citizens have to be to vote for President?",
    answer: ["Eighteen (18) or older", "Thirty-five (35) or older", "Sixteen (16) or older", "Twenty-one (21) or older"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What happened at the Constitutional Convention?",
    answer: ["The Constitution was written", "The Declaration of Independence was written", "The Emancipation Proclamation was written", "The Virginia Declaration of Rights was written"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What is one thing Benjamin Franklin is famous for?",
    answer: ["U.S. diplomat", "Youngest member of the Constitutional Convention", "Inventor of the airplane", "Third President of the United States"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What major event happened on September 11, 2001, in the United States?",
    answer: ["Terrorists attacked the United States", "The accident at Three Mile Island Nuclear Power Plant occurred", "Hurricane Andrew struck the United States", "The Japanese attacked Pearl Harbor"],
    category: "Recent American History"
  },
  {
    question: "What does the judicial branch do?",
    answer: ["All of the above", "Decides if a law goes against the Constitution", "Reviews laws", "Resolves disputes"],
    category: "System of Government"
  },
  {
    question: "What do we show loyalty to when we say the Pledge of Allegiance?",
    answer: ["The United States", "The President", "Congress", "The state where you live"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Who wrote the Declaration of Independence?",
    answer: ["Thomas Jefferson", "Abraham Lincoln", "James Madison", "George Washington"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What are two ways that Americans can participate in their democracy?",
    answer: ["All of these answers", "Write to a newspaper and call Senators and Representatives", "Give an elected official your opinion on an issue and join a community group", "Vote and join a civic group"],
    category: "Rights and Responsibilities"
  },
  {
    question: "There are four amendments to the Constitution about who can vote. Select the response that accurately describes one of them:",
    answer: ["Citizens eighteen (18) and older can vote", "Citizens seventeen (17) and older can vote", "Citizens by birth only can vote", "Only citizens with a job can vote"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Who signs bills to become laws?",
    answer: ["The President", "The Chief Justice of the Supreme Court", "The Vice President", "The Secretary of State"],
    category: "System of Government"
  },
  {
    question: "The House of Representatives has how many voting members?",
    answer: ["Four hundred thirty-five (435)", "Four hundred forty-one (441)", "Two hundred (200)", "One hundred (100)"],
    category: "System of Government"
  },
  {
    question: "Why do some states have more Representatives than other states?",
    answer: ["Because of the state's population", "Because the state's Representatives have seniority in the House of Representatives", "Because of the geographical size of the state", "Because of the state's location"],
    category: "System of Government"
  },
  {
    question: "What is an amendment?",
    answer: ["An addition (to the Constitution)", "The Preamble to the Constitution", "An introduction", "The beginning of the Declaration of Independence"],
    category: "System of Government"
  },
  {
    question: "What is one responsibility that is only for United States citizens?",
    answer: ["Serve on a jury", "Pay taxes", "Obey the law", "Be respectful of others"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Why does the flag have 13 stripes?",
    answer: ["Because the stripes represent the original colonies", "Because the stripes represent the number of signatures on the U.S. Constitution", "Because it was considered lucky to have 13 stripes on the flag", "Because the stripes represent the members of the Second Continental Congress"],
    category: "Symbols"
  },
  {
    question: "What is the economic system in the United States?",
    answer: ["Capitalist economy", "Communist economy", "Socialist economy", "None of these answers"],
    category: "System of Government"
  },
  {
    question: "When do we celebrate Independence Day?",
    answer: ["July 4", "January 1", "June 30", "March 4"],
    category: "Holidays"
  },
  {
    question: "Name one right belonging only to United States citizens.",
    answer: ["Run for federal office", "Freedom of religion", "Attend public school", "Freedom of speech"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What are the two parts of the U.S. Congress?",
    answer: ["The Senate and House of Representatives", "The House of Representatives and the courts", "The House of Lords and the House of Commons", "The Senate and the courts"],
    category: "System of Government"
  },
  {
    question: "What is the supreme law of the land?",
    answer: ["The Constitution", "The Articles of Confederation", "The Emancipation Proclamation", "The Declaration of Independence"],
    category: "System of Government"
  },
  {
    question: "We elect a U.S. Representative for how many years?",
    answer: ["Two (2)", "Six (6)", "Four (4)", "Eight (8)"],
    category: "System of Government"
  },
  {
    question: "What are two rights in the Declaration of Independence?",
    answer: ["Life and pursuit of happiness", "Life and death", "Liberty and justice", "Life and the right to own a home"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What did the Declaration of Independence do?",
    answer: ["Declared our independence from Great Britain", "Declared our independence from France", "Gave women the right to vote", "Freed the slaves"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What is one right or freedom granted by the First Amendment?",
    answer: ["Speech", "Trial by jury", "To vote", "To bear arms"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What did the Emancipation Proclamation do?",
    answer: ["Freed slaves in most Southern states", "Gave the United States independence from Great Britain", "Ended World War I", "Gave women the right to vote"],
    category: "1800s"
  },
  {
    question: "How many U.S. senators are there?",
    answer: ["One hundred (100)", "Fifty-two (52)", "Four hundred thirty-five (435)", "Fifty (50)"],
    category: "System of Government"
  },
  {
    question: "Who was the first President?",
    answer: ["George Washington", "John Adams", "Thomas Jefferson", "Abraham Lincoln"],
    category: "Colonial Period and Independence"
  }
];





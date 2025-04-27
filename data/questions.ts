export interface Question {
  question: string
  answer: string | string[]
  category: string
  isAsterisked?: boolean
}

export const naturalizationQuestions: Question[] = [
  {
    question: "We elect a U.S. Representative for how many years?",
    answer: ["Two (2)", "Four (4)", "Six (6)", "Eight (8)"],
    category: "System of Government"
  },
  {
    question: "Who does a U.S. Senator represent?",
    answer: ["All people of the state", "Only people who voted for them", "State legislature", "The Governor"],
    category: "System of Government"
  },
  {
    question: "Why do some states have more Representatives than other states?",
    answer: ["Because of the state's population", "Because of the state's land area", "Because of the state's wealth", "Because of the state's location"],
    category: "System of Government"
  },
  {
    question: "We elect a President for how many years?",
    answer: ["Four (4)", "Two (2)", "Six (6)", "Eight (8)"],
    category: "System of Government"
  },
  {
    question: "In what month do we vote for President?",
    answer: ["November", "December", "January", "October"],
    category: "System of Government"
  },
  {
    question: "If the President can no longer serve, who becomes President?",
    answer: ["The Vice President", "The Speaker of the House", "The Secretary of State", "The Chief Justice"],
    category: "System of Government"
  },
  {
    question: "If both the President and the Vice President can no longer serve, who becomes President?",
    answer: ["The Speaker of the House", "The Secretary of Defense", "The Attorney General", "The Chief Justice"],
    category: "System of Government"
  },
  {
    question: "Who is the Commander in Chief of the military?",
    answer: ["The President", "The Vice President", "The Secretary of Defense", "The Speaker of the House"],
    category: "System of Government"
  },
  {
    question: "Who signs bills to become laws?",
    answer: ["The President", "The Vice President", "The Chief Justice", "The Speaker of the House"],
    category: "System of Government"
  },
  {
    question: "Who vetoes bills?",
    answer: ["The President", "The Vice President", "The Chief Justice", "The Speaker of the House"],
    category: "System of Government"
  },
  {
    question: "What does the President's Cabinet do?",
    answer: ["Advises the President", "Passes laws", "Leads the Senate", "Appoints Supreme Court Justices"],
    category: "System of Government"
  },
  {
    question: "What are two Cabinet-level positions?",
    answer: ["Secretary of State and Secretary of Labor", "Governor and Mayor", "Chief Justice and Speaker of the House", "Ambassador and General"],
    category: "System of Government"
  },
  {
    question: "What does the judicial branch do?",
    answer: ["Reviews laws", "Passes laws", "Enforces laws", "Writes new laws"],
    category: "System of Government"
  },
  {
    question: "What is the highest court in the United States?",
    answer: ["The Supreme Court", "The Federal Court", "The Court of Appeals", "The District Court"],
    category: "System of Government"
  },
  {
    question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
    answer: ["To print money", "To establish schools", "To issue driver's licenses", "To approve zoning and land use"],
    category: "System of Government"
  },
  {
    question: "Under our Constitution, some powers belong to the states. What is one power of the states?",
    answer: ["Provide schooling and education", "Print money", "Declare war", "Make treaties"],
    category: "System of Government"
  },
  {
    question: "What are the two major political parties in the United States?",
    answer: ["Democratic and Republican", "Democratic and Libertarian", "Republican and Green", "Libertarian and Constitution"],
    category: "System of Government"
  },
  {
    question: "What is the political party of the President now?",
    answer: ["Answers will vary", "Independent", "Libertarian", "Green Party"],
    category: "System of Government"
  },
  {
    question: "What is the name of the Speaker of the House of Representatives now?",
    answer: ["Answers will vary", "Vice President", "Attorney General", "Chief Justice"],
    category: "System of Government"
  },
  {
    question: "There are four amendments to the Constitution about who can vote. Describe one of them.",
    answer: ["Citizens 18 and older can vote", "Citizens 21 and older can vote", "Only landowners can vote", "Voting is required"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What is one responsibility that is only for United States citizens?",
    answer: ["Serve on a jury", "Pay taxes", "Attend school", "Serve in the military"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Name one right only for United States citizens.",
    answer: ["Vote in a federal election", "Freedom of religion", "Freedom of speech", "Right to privacy"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What are two rights of everyone living in the United States?",
    answer: ["Freedom of speech and freedom of religion", "Freedom to drive and freedom to travel", "Freedom of employment and freedom of healthcare", "Freedom of taxation and freedom of education"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What do we show loyalty to when we say the Pledge of Allegiance?",
    answer: ["The United States", "The President", "The Congress", "The Supreme Court"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What is one promise you make when you become a United States citizen?",
    answer: ["Give up loyalty to other countries", "Serve on the Supreme Court", "Travel outside the United States", "Run for President"],
    category: "Rights and Responsibilities"
  },
  {
    question: "How old do citizens have to be to vote for President?",
    answer: ["Eighteen (18) and older", "Sixteen (16) and older", "Twenty-one (21) and older", "Seventeen (17) and older"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What are two ways that Americans can participate in their democracy?",
    answer: ["Vote and join a civic group", "Work for the federal government and move to another country", "Travel abroad and attend college", "Pay taxes and serve in the military"],
    category: "Rights and Responsibilities"
  },
  {
    question: "When is the last day you can send in federal income tax forms?",
    answer: ["April 15", "March 1", "December 31", "January 15"],
    category: "Rights and Responsibilities"
  },
  {
    question: "When must all men register for the Selective Service?",
    answer: ["At age 18", "At age 21", "At age 16", "At age 25"],
    category: "Rights and Responsibilities"
  },
  {
    question: "What is one reason colonists came to America?",
    answer: ["Freedom", "To escape taxes", "To join the army", "To become kings"],
    category: "Colonial Period and Independence"
  },
  {
    question: "Who lived in America before the Europeans arrived?",
    answer: ["American Indians", "Spanish settlers", "Pilgrims", "French trappers"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What group of people was taken to America and sold as slaves?",
    answer: ["Africans", "Asians", "Europeans", "Native Americans"],
    category: "Colonial Period and Independence"
  },
  {
    question: "Why did the colonists fight the British?",
    answer: ["Because of high taxes", "Because of religious freedom", "Because of the gold rush", "Because of territorial expansion"],
    category: "Colonial Period and Independence"
  },
  {
    question: "Who wrote the Declaration of Independence?",
    answer: ["Thomas Jefferson", "George Washington", "James Madison", "John Adams"],
    category: "Colonial Period and Independence"
  },
  {
    question: "When was the Declaration of Independence adopted?",
    answer: ["July 4, 1776", "September 17, 1787", "December 25, 1776", "November 11, 1775"],
    category: "Colonial Period and Independence"
  },
  {
    question: "There were 13 original states. Name three.",
    answer: ["New York, Virginia, Georgia", "Ohio, Texas, Florida", "California, Nevada, Oregon", "Illinois, Michigan, Wisconsin"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What happened at the Constitutional Convention?",
    answer: ["The Constitution was written", "The Declaration of Independence was signed", "The Articles of Confederation were abolished", "The Louisiana Purchase was made"],
    category: "Colonial Period and Independence"
  },
  {
    question: "When was the Constitution written?",
    answer: ["1787", "1776", "1801", "1791"],
    category: "Colonial Period and Independence"
  },
  {
    question: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    answer: ["James Madison", "Thomas Jefferson", "George Washington", "Abraham Lincoln"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What is one thing Benjamin Franklin is famous for?",
    answer: ["U.S. diplomat", "First U.S. President", "First Secretary of State", "Author of the Constitution"],
    category: "Colonial Period and Independence"
  },
  {
    question: "Who is the 'Father of Our Country'?",
    answer: ["George Washington", "Thomas Jefferson", "James Madison", "Benjamin Franklin"],
    category: "Colonial Period and Independence"
  },
  {
    question: "Who was the first President?",
    answer: ["George Washington", "John Adams", "Thomas Jefferson", "James Monroe"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What territory did the United States buy from France in 1803?",
    answer: ["The Louisiana Territory", "Florida", "Texas", "California"],
    category: "1800s"
  },
  {
    question: "Name one war fought by the United States in the 1800s.",
    answer: ["Civil War", "World War I", "Korean War", "Vietnam War"],
    category: "1800s"
  },
  {
    question: "Name the U.S. war between the North and the South.",
    answer: ["The Civil War", "The Revolutionary War", "The Mexican-American War", "The Spanish-American War"],
    category: "1800s"
  },
  {
    question: "Name one problem that led to the Civil War.",
    answer: ["Slavery", "Trade with Europe", "Immigration", "States joining the Union"],
    category: "1800s"
  },
  {
    question: "What was one important thing that Abraham Lincoln did?",
    answer: ["Freed the slaves", "Discovered America", "Signed the Constitution", "Led the American Revolution"],
    category: "1800s"
  },
  {
    question: "What did the Emancipation Proclamation do?",
    answer: ["Freed the slaves", "Declared war on Britain", "Established the Supreme Court", "Created the first U.S. bank"],
    category: "1800s"
  },
  {
    question: "What did Susan B. Anthony do?",
    answer: ["Fought for women's rights", "Became the first female President", "Led troops in the Civil War", "Wrote the Federalist Papers"],
    category: "1800s"
  },
  {
    question: "Name one war fought by the United States in the 1900s.",
    answer: ["World War II", "Civil War", "Revolutionary War", "Mexican-American War"],
    category: "Recent American History"
  },
  {
    question: "Who was President during World War I?",
    answer: ["Woodrow Wilson", "Franklin Roosevelt", "Harry Truman", "Dwight Eisenhower"],
    category: "Recent American History"
  },
  {
    question: "Who was President during the Great Depression and World War II?",
    answer: ["Franklin Roosevelt", "Herbert Hoover", "Woodrow Wilson", "John F. Kennedy"],
    category: "Recent American History"
  },
  {
    question: "Who did the United States fight in World War II?",
    answer: ["Japan, Germany, and Italy", "China, Germany, and Russia", "Spain, Germany, and Italy", "Japan, Russia, and Italy"],
    category: "Recent American History"
  },
  {
    question: "Before he was President, Eisenhower was a general. What war was he in?",
    answer: ["World War II", "World War I", "Vietnam War", "Korean War"],
    category: "Recent American History"
  },
  {
    question: "During the Cold War, what was the main concern of the United States?",
    answer: ["Communism", "Fascism", "Monarchy", "Colonialism"],
    category: "Recent American History"
  },
  {
    question: "What movement tried to end racial discrimination?",
    answer: ["Civil Rights Movement", "Women's Suffrage Movement", "Temperance Movement", "Labor Movement"],
    category: "Recent American History"
  },
  {
    question: "What did Martin Luther King, Jr. do?",
    answer: ["Fought for civil rights", "Became a U.S. President", "Wrote the Constitution", "Fought in World War II"],
    category: "Recent American History"
  },
  {
    question: "What major event happened on September 11, 2001, in the United States?",
    answer: ["Terrorists attacked the United States", "The stock market crashed", "The Great Depression began", "The Civil Rights Act was signed"],
    category: "Recent American History"
  },
  {
    question: "Name one American Indian tribe in the United States.",
    answer: ["Cherokee", "Aztec", "Incan", "Mayan"],
    category: "Recent American History"
  },
  {
    question: "Name one of the two longest rivers in the United States.",
    answer: ["Mississippi River", "Colorado River", "Columbia River", "Snake River"],
    category: "Geography"
  },
  {
    question: "What ocean is on the West Coast of the United States?",
    answer: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    category: "Geography"
  },
  {
    question: "What ocean is on the East Coast of the United States?",
    answer: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    category: "Geography"
  },
  {
    question: "Name one U.S. territory.",
    answer: ["Puerto Rico", "Bermuda", "Bahamas", "Greenland"],
    category: "Geography"
  },
  {
    question: "Name one state that borders Canada.",
    answer: ["Michigan", "California", "Florida", "Nevada"],
    category: "Geography"
  },
  {
    question: "Name one state that borders Mexico.",
    answer: ["Texas", "Nevada", "Florida", "Arkansas"],
    category: "Geography"
  },
  {
    question: "What is the capital of the United States?",
    answer: ["Washington, D.C.", "New York City", "Philadelphia", "Boston"],
    category: "Geography"
  },
  {
    question: "Where is the Statue of Liberty?",
    answer: ["New York Harbor", "Boston Harbor", "San Francisco Bay", "Miami Beach"],
    category: "Geography"
  },
  {
    question: "Why does the flag have 13 stripes?",
    answer: ["Because there were 13 original colonies", "Because there are 13 states", "Because there are 13 branches of government", "Because of 13 presidents"],
    category: "Symbols"
  },
  {
    question: "Why does the flag have 50 stars?",
    answer: ["Because there is one star for each state", "Because there are 50 founding fathers", "Because there are 50 government departments", "Because of 50 amendments"],
    category: "Symbols"
  },
  {
    question: "What is the name of the national anthem?",
    answer: ["The Star-Spangled Banner", "America the Beautiful", "God Bless America", "Yankee Doodle"],
    category: "Symbols"
  },
  {
    question: "When do we celebrate Independence Day?",
    answer: ["July 4", "January 1", "September 17", "November 11"],
    category: "Holidays"
  },
  {
    question: "Name two national U.S. holidays.",
    answer: ["Thanksgiving and Independence Day", "Halloween and Flag Day", "Valentine's Day and Labor Day", "Mother's Day and Columbus Day"],
    category: "Holidays"
  },
  {
    question: "What is the name of the current President of the United States?",
    answer: ["Answers will vary", "Donald Trump", "Barack Obama", "George Bush"],
    category: "System of Government"
  },
  {
    question: "What is the name of the current Vice President of the United States?",
    answer: ["Answers will vary", "Mike Pence", "Kamala Harris", "Mitt Romney"],
    category: "System of Government"
  },
  {
    question: "What are two rights mentioned in the First Amendment?",
    answer: ["Freedom of speech and freedom of religion", "Right to bear arms and freedom of travel", "Freedom of employment and freedom of education", "Freedom to vote and freedom to own land"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Who is considered the principal author of the U.S. Constitution?",
    answer: ["James Madison", "George Washington", "Thomas Jefferson", "Benjamin Franklin"],
    category: "Colonial Period and Independence"
  },
  {
    question: "What does the Bill of Rights protect?",
    answer: ["Individual liberties and rights", "The government's power", "Military leadership", "State sovereignty only"],
    category: "Principles of American Democracy"
  },
  {
    question: "What is one thing the U.S. Constitution does?",
    answer: ["Sets up the government", "Declares war", "Collects taxes", "Prints money"],
    category: "Principles of American Democracy"
  },
  {
    question: "Who is one of your state's U.S. Senators now?",
    answer: ["Answers will vary", "Nancy Pelosi", "Mike Pence", "John Roberts"],
    category: "System of Government"
  },
  {
    question: "How many justices are currently on the Supreme Court?",
    answer: ["Nine (9)", "Seven (7)", "Eleven (11)", "Eight (8)"],
    category: "System of Government"
  },
  {
    question: "Name one responsibility of citizenship in the United States.",
    answer: ["Vote in elections", "Serve as President", "Travel internationally", "Buy property"],
    category: "Rights and Responsibilities"
  },
  {
    question: "Who is known as the \"Father of the Constitution\"?",
    answer: ["James Madison", "Thomas Jefferson", "George Washington", "Alexander Hamilton"],
    category: "Colonial Period and Independence"
  }
];





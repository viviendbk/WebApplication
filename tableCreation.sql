


CREATE TABLE "LearningPackage" (
    "learningPackageId" INT PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "targetAudience" VARCHAR(255) NOT NULL,
    "difficultyLevel" INT NOT NULL
);

CREATE TABLE "LearningFact" (
    "learningFactId" INT PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "nextStudyTime" TIMESTAMP NOT NULL,
    "learningPackageId" INT NOT NULL,
    FOREIGN KEY ("learningPackageId") REFERENCES "LearningPackage"("learningPackageId")
);


-- Insert data into LearningPackage table
INSERT INTO "LearningPackage" ("learningPackageId", "title", "description", "category", "targetAudience", "difficultyLevel")
VALUES
  (1, 'Java Basics', 'Introduction to Java programming language', 'Programming', 'Beginners', 1),
  (2, 'Web Development Fundamentals', 'Basic concepts of web development', 'Web Development', 'Beginners', 2),
  (3, 'Data Science Essentials', 'Foundations of data science and analytics', 'Data Science', 'Intermediate', 3),
  (4, 'Python Fundamentals', 'Introduction to Python programming', 'Programming', 'Beginners', 1),
  (5, 'JavaScript Basics', 'Introduction to JavaScript language', 'Programming', 'Beginners', 2),
  (6, 'Machine Learning Basics', 'Fundamentals of machine learning', 'Data Science', 'Intermediate', 3);

-- Insert data into LearningFact table
INSERT INTO "LearningFact" ("learningFactId", "title", "question", "answer", "nextStudyTime", "learningPackageId")
VALUES
  (1, 'Java Basics Fact 1', 'What is a variable?', 'A variable is a storage location with an associated symbolic name (an identifier) that contains some known or unknown quantity or information.', CURRENT_TIMESTAMP, 1),
  (2, 'Web Dev Fact 1', 'What is HTML?', 'HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser.', CURRENT_TIMESTAMP, 2),
  (3, 'Data Science Fact 1', 'What is data preprocessing?', 'Data preprocessing is a data mining technique that involves transforming raw data into an understandable format.', CURRENT_TIMESTAMP, 3),
  (4, 'Java Basics Fact 2', 'What is a loop?', 'A loop is a control structure that repeats a sequence of instructions until a specific condition is met.', CURRENT_TIMESTAMP, 1),
  (5, 'Web Dev Fact 2', 'What is CSS?', 'CSS (Cascading Style Sheets) is a style sheet language used for describing the look and formatting of a document written in HTML.', CURRENT_TIMESTAMP, 2),
  (6, 'Data Science Fact 2', 'What is regression analysis?', 'Regression analysis is a statistical method used for modeling the relationship between a dependent variable and one or more independent variables.', CURRENT_TIMESTAMP, 3),
  (7, 'Python Fact 1', 'What is a list?', 'A list is a data structure in Python that is mutable (changeable) and ordered. It can contain elements of different data types.', CURRENT_TIMESTAMP, 4),
  (8, 'JavaScript Fact 1', 'What is a closure?', 'A closure is a function defined within another function and has access to variables from the outer function, even after the outer function has finished executing.', CURRENT_TIMESTAMP, 5),
  (9, 'Machine Learning Fact 1', 'What is supervised learning?', 'Supervised learning is a type of machine learning where the algorithm is trained on a labeled dataset, and it learns the mapping from input data to the output.', CURRENT_TIMESTAMP, 6),
  (10, 'Python Fact 2', 'What is a dictionary?', 'A dictionary is a collection of key-value pairs in Python. It is unordered, changeable, and indexed.', CURRENT_TIMESTAMP, 4),
  (11, 'JavaScript Fact 2', 'What is the DOM?', 'The DOM (Document Object Model) is a programming interface for web documents. It represents the structure of a document as a tree of objects.', CURRENT_TIMESTAMP, 5),
  (12, 'Machine Learning Fact 2', 'What is unsupervised learning?', 'Unsupervised learning is a type of machine learning where the algorithm is trained on an unlabeled dataset, and it tries to find patterns or relationships in the data.', CURRENT_TIMESTAMP, 6),
  (13, 'Java Basics Fact 3', 'What is OOP?', 'Object-Oriented Programming (OOP) is a programming paradigm that uses objects (instances) that can contain data in the form of fields (attributes) and code in the form of procedures (methods).', CURRENT_TIMESTAMP, 1),
  (14, 'Web Dev Fact 3', 'What is responsive design?', 'Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes.', CURRENT_TIMESTAMP, 2),
  (15, 'Data Science Fact 3', 'What is clustering?', 'Clustering is a type of unsupervised learning where the algorithm tries to group similar data points based on certain features.', CURRENT_TIMESTAMP, 3),
  (16, 'Python Fact 3', 'What is a tuple?', 'A tuple is a collection of ordered and immutable elements in Python. It is similar to a list but cannot be changed after creation.', CURRENT_TIMESTAMP, 4),
  (17, 'JavaScript Fact 3', 'What is event delegation?', 'Event delegation is a technique in JavaScript where a single event listener is attached to a common ancestor rather than each individual element.', CURRENT_TIMESTAMP, 5),
  (18, 'Machine Learning Fact 3', 'What is overfitting?', 'Overfitting occurs when a machine learning model learns the training data too well, capturing noise or random fluctuations in the data.', CURRENT_TIMESTAMP, 6),
  (19, 'Java Basics Fact 4', 'What is inheritance?', 'Inheritance is a mechanism in OOP where a class inherits properties and behaviors from another class, promoting code reuse.', CURRENT_TIMESTAMP, 1),
  (20, 'Web Dev Fact 4', 'What is the box model in CSS?', 'The CSS box model describes the layout and rendering of elements in a web page. It consists of content, padding, border, and margin.', CURRENT_TIMESTAMP, 2),
  (21, 'Data Science Fact 4', 'What is feature scaling?', 'Feature scaling is a method used in data preprocessing to standardize the range of independent variables or features of the data.', CURRENT_TIMESTAMP, 3),
  (22, 'Python Fact 4', 'What is a set?', 'A set is an unordered collection of unique elements in Python. It is useful for tasks that require membership testing, deduplication, and mathematical operations.', CURRENT_TIMESTAMP, 4),
  (23, 'JavaScript Fact 4', 'What is AJAX?', 'AJAX (Asynchronous JavaScript and XML) is a technique used in web development to create asynchronous web applications by exchanging small amounts of data with the server behind the scenes.', CURRENT_TIMESTAMP, 5),
  (24, 'Machine Learning Fact 4', 'What is feature selection?', 'Feature selection is the process of selecting a subset of relevant features for use in model construction.', CURRENT_TIMESTAMP, 6);

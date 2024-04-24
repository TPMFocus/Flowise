import json

def generate_test_strategy_structure():
    test_strategy = {
        "id": "teststrategy_0",
        "position": {
            "x": 1984.801166623101,
            "y": 138.565889657576
        },
        "type": "customNode",
        "data": {
            "id": "teststrategy_0",
            "label": "Test Strategy",
            "version": 2,
            "name": "teststrategy",
            "type": "Test Strategy",
            "baseClasses": [
                "Test Strategy",
                "BaseChain",
                "Runnable"
            ],
            "category": "Main Nodes",
            "description": "La stratégie de test cherche à minimiser les erreurs et à optimiser l`efficacité pour garantir la qualité du produit logiciel",
            "inputParams": [
                {
                    "label": "Title",
                    "name": "titleId",
                    "type": "string",
                    "placeholder": "app11RobdGoX0YNsC",
                    "description": "If your table URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, app11RovdGoX0YNsC is the base id",
                    "id": "teststrategy_0-input-titleId-string"
                },
                {
                    "label": "Description",
                    "name": "descriptionId",
                    "type": "string",
                    "placeholder": "tblJdmvbrgizbYICO",
                    "description": "If your table URL looks like: https://airtable.com/app11RobdGoX0YNsC/tblJdmvbrgizbYICO/viw9UrP77Id0CE4ee, tblJdmvbrgizbYICO is the table id",
                    "id": "teststrategy_0-input-descriptionId-string"
                }
            ],
            "inputAnchors": [
                {
                    "label": "Cache",
                    "name": "cache",
                    "type": "BaseCache",
                    "optional": True,
                    "id": "teststrategy_0-input-cache-BaseCache"
                }
            ],
            "inputs": {
                "cache": "",
                "titleId": "",
                "descriptionId": ""
            },
            "outputAnchors": [
                {
                    "id": "teststrategy_0-output-teststrategy-Test Strategy|BaseChain|Runnable",
                    "name": "teststrategy",
                    "label": "Test Strategy",
                    "description": "La stratégie de test cherche à minimiser les erreurs et à optimiser l`efficacité pour garantir la qualité du produit logiciel",
                    "type": "Test Strategy | BaseChain | Runnable"
                }
            ],
            "outputs": {},
            "selected": False
        },
        "width": 300,
        "height": 427,
        "selected": False,
        "dragging": False,
        "positionAbsolute": {
            "x": 1984.801166623101,
            "y": 138.565889657576
        }
    }
    return test_strategy

def generate_test_plan_structure():
    test_plan = {
      "id": "testplan_0",
      "position": {
        "x": 1636.12729421742,
        "y": 799.3244009448848
      },
      "type": "customNode",
      "data": {
        "id": "testplan_0",
        "label": "Test Plan",
        "version": 1,
        "name": "testplan",
        "type": "Test Plan",
        "baseClasses": [
          "Test Plan"
        ],
        "category": "Main Nodes",
        "description": "Load data related to a test plan",
        "inputParams": [
          {
            "label": "Title",
            "name": "title",
            "type": "string",
            "description": "Name identifying the test plan.",
            "id": "testplan_0-input-title-string"
          },
          {
            "label": "Description",
            "name": "description",
            "type": "string",
            "description": "Overview of the test plan, detailing scope, resources, schedule, and testing phases.",
            "id": "testplan_0-input-description-string"
          },
          {
            "label": "Date of Execution",
            "name": "dateOfExecution",
            "type": "string",
            "description": "Date when the test case was last executed.",
            "id": "testplan_0-input-dateOfExecution-string"
          },
          {
            "label": "Estimation",
            "name": "estimation",
            "type": "string",
            "optional": True,
            "description": "Anticipated time required for test execution.",
            "id": "testplan_0-input-estimation-string"
          },
          {
            "label": "Risk Assessment",
            "name": "riskAssessment",
            "type": "string",
            "optional": True,
            "description": "Reference to a risk assessment document (optional).",
            "id": "testplan_0-input-riskAssessment-string"
          },
          {
            "label": "Data Requirements",
            "name": "dataRequirements",
            "type": "string",
            "optional": True,
            "description": "Specific data needed for each testing phase.",
            "id": "testplan_0-input-dataRequirements-string"
          }
        ],
        "inputAnchors": [],
        "inputs": {
          "title": "",
          "description": "",
          "dateOfExecution": "",
          "estimation": "",
          "riskAssessment": "",
          "dataRequirements": ""
        },
        "outputAnchors": [
          {
            "id": "testplan_0-output-testplan-Test Plan",
            "name": "testplan",
            "label": "Test Plan",
            "description": "Load data related to a test plan",
            "type": "Test Plan"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 772,
      "positionAbsolute": {
        "x": 1636.12729421742,
        "y": 799.3244009448848
      },
      "selected": False
    }
    return test_plan

def generate_manual_test_case_structure():
    manual_test_case = {
      "id": "ManualTest_0",
      "position": {
        "x": 809.641078144695,
        "y": 777.8013224013242
      },
      "type": "customNode",
      "data": {
        "id": "ManualTest_0",
        "label": "Manual Test",
        "version": 2,
        "name": "ManualTest",
        "type": "ManualTest",
        "baseClasses": [
          "ManualTest",
          "BaseChatModel",
          "BaseLanguageModel",
          "Runnable"
        ],
        "category": "Test Cases",
        "description": "Wrapper around Google MakerSuite PaLM large language models using the Chat endpoint",
        "inputParams": [
          {
            "label": "Title",
            "name": "title",
            "type": "string",
            "placeholder": "Brief description of the test case",
            "description": "Mandatory field. Provide a brief description of the test case.",
            "id": "ManualTest_0-input-title-string"
          },
          {
            "label": "Priority",
            "name": "priority",
            "type": "string",
            "placeholder": "High, Medium, Low",
            "description": "A field to prioritize test cases (e.g., High, Medium, Low).",
            "id": "ManualTest_0-input-priority-string"
          },
          {
            "label": "Tags",
            "name": "tags",
            "type": "string",
            "placeholder": "Keywords to categorize test cases",
            "description": "Keywords to categorize test cases (e.g., Smoke Test, Regression).",
            "id": "ManualTest_0-input-tags-string"
          },
          {
            "label": "Preconditions",
            "name": "preconditions",
            "type": "string",
            "placeholder": "State of the system required before test execution",
            "description": "Optional field. State of the system required before test execution.",
            "id": "ManualTest_0-input-preconditions-string"
          },
          {
            "label": "Postconditions",
            "name": "postconditions",
            "type": "string",
            "placeholder": "Expected state of the system after test execution",
            "description": "Optional field. Expected state of the system after test execution.",
            "id": "ManualTest_0-input-postconditions-string"
          },
          {
            "label": "Expected Results",
            "name": "expectedResults",
            "type": "string",
            "placeholder": "Overall anticipated outcome of the test case",
            "description": "Mandatory field. Overall anticipated outcome of the test case.",
            "id": "ManualTest_0-input-expectedResults-string"
          },
          {
            "label": "Actual Results",
            "name": "actualResults",
            "type": "string",
            "placeholder": "The actual results for the test",
            "description": "The actual results for the test.",
            "id": "ManualTest_0-input-actualResults-string"
          },
          {
            "label": "Test Data",
            "name": "testData",
            "type": "string",
            "placeholder": "Information or data needed to execute the test in general",
            "description": "Optional field. Information or data needed to execute the test in general.",
            "id": "ManualTest_0-input-testData-string"
          },
          {
            "label": "Assigned Testers",
            "name": "assignedTesters",
            "type": "string",
            "placeholder": "Team members responsible for executing the test",
            "description": "Optional field. Team members responsible for executing the test.",
            "id": "ManualTest_0-input-assignedTesters-string"
          }
        ],
        "inputAnchors": [
          {
            "label": "Cache",
            "name": "cache",
            "type": "BaseCache",
            "optional": True,
            "id": "ManualTest_0-input-cache-BaseCache"
          }
        ],
        "inputs": {
          "cache": "",
          "title": "",
          "priority": "",
          "tags": "",
          "preconditions": "",
          "postconditions": "",
          "expectedResults": "",
          "actualResults": "",
          "testData": "",
          "assignedTesters": ""
        },
        "outputAnchors": [
          {
            "id": "ManualTest_0-output-ManualTest-ManualTest|BaseChatModel|BaseLanguageModel|Runnable",
            "name": "ManualTest",
            "label": "ManualTest",
            "description": "Wrapper around Google MakerSuite PaLM large language models using the Chat endpoint",
            "type": "ManualTest | BaseChatModel | BaseLanguageModel | Runnable"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 1119,
      "positionAbsolute": {
        "x": 809.641078144695,
        "y": 777.8013224013242
      },
      "selected": False
    }
    return manual_test_case

def generate_automated_test_case_structure():
    automated_test_case = {
      "id": "AutomatedTest_0",
      "position": {
        "x": 1117.421101317611,
        "y": 700.3182396445063
      },
      "type": "customNode",
      "data": {
        "id": "AutomatedTest_0",
        "label": "Automated Test",
        "version": 2,
        "name": "AutomatedTest",
        "type": "AutomatedTest",
        "baseClasses": [
          "AutomatedTest",
          "Embeddings"
        ],
        "category": "Test Cases",
        "description": "Cohere API to generate embeddings for a given text",
        "inputParams": [
          {
            "label": "Title",
            "name": "title",
            "type": "string",
            "placeholder": "A brief description of the automated test",
            "description": "Mandatory field. A brief description of the automated test.",
            "id": "AutomatedTest_0-input-title-string"
          },
          {
            "label": "Model Name",
            "name": "modelName",
            "type": "options",
            "options": [
              {
                "label": "embed-english-v3.0",
                "name": "embed-english-v3.0",
                "description": "Embedding Dimensions: 1024"
              },
              {
                "label": "embed-english-light-v3.0",
                "name": "embed-english-light-v3.0",
                "description": "Embedding Dimensions: 384"
              },
              {
                "label": "embed-multilingual-v3.0",
                "name": "embed-multilingual-v3.0",
                "description": "Embedding Dimensions: 1024"
              },
              {
                "label": "embed-multilingual-light-v3.0",
                "name": "embed-multilingual-light-v3.0",
                "description": "Embedding Dimensions: 384"
              },
              {
                "label": "embed-english-v2.0",
                "name": "embed-english-v2.0",
                "description": "Embedding Dimensions: 4096"
              },
              {
                "label": "embed-english-light-v2.0",
                "name": "embed-english-light-v2.0",
                "description": "Embedding Dimensions: 1024"
              },
              {
                "label": "embed-multilingual-v2.0",
                "name": "embed-multilingual-v2.0",
                "description": "Embedding Dimensions: 768"
              }
            ],
            "default": "embed-english-v2.0",
            "optional": True,
            "id": "AutomatedTest_0-input-modelName-options"
          },
          {
            "label": "Priority",
            "name": "priority",
            "type": "string",
            "placeholder": "High, Medium, Low",
            "description": "A field to prioritize test cases (e.g., High, Medium, Low).",
            "id": "AutomatedTest_0-input-priority-string"
          },
          {
            "label": "Tags",
            "name": "tags",
            "type": "string",
            "placeholder": "Keywords to categorize test cases",
            "description": "Keywords to categorize test cases (e.g., Smoke Test, Regression).",
            "id": "AutomatedTest_0-input-tags-string"
          },
          {
            "label": "Preconditions",
            "name": "preconditions",
            "type": "string",
            "placeholder": "State of the system required before test execution",
            "description": "Optional field. State of the system required before test execution.",
            "id": "AutomatedTest_0-input-preconditions-string"
          },
          {
            "label": "Postconditions",
            "name": "postconditions",
            "type": "string",
            "placeholder": "Expected state of the system after test execution",
            "description": "Optional field. Expected state of the system after test execution.",
            "id": "AutomatedTest_0-input-postconditions-string"
          },
          {
            "label": "Expected Results",
            "name": "expectedResults",
            "type": "string",
            "placeholder": "Overall anticipated outcome of the test case",
            "description": "Mandatory field. Overall anticipated outcome of the test case.",
            "id": "AutomatedTest_0-input-expectedResults-string"
          },
          {
            "label": "Actual Results",
            "name": "actualResults",
            "type": "string",
            "placeholder": "The actual results for the test",
            "description": "The actual results for the test.",
            "id": "AutomatedTest_0-input-actualResults-string"
          },
          {
            "label": "Script Location",
            "name": "scriptLocation",
            "type": "string",
            "placeholder": "Location of the script file",
            "description": "Optional field. Location of the script file.",
            "id": "AutomatedTest_0-input-scriptLocation-string"
          },
          {
            "label": "Programming Language",
            "name": "programmingLanguage",
            "type": "string",
            "placeholder": "Language used for the script",
            "description": "Optional field. Language used for the script (e.g., Python, Java).",
            "id": "AutomatedTest_0-input-programmingLanguage-string"
          },
          {
            "label": "Framework",
            "name": "framework",
            "type": "string",
            "placeholder": "Testing framework used",
            "description": "Mandatory field. Testing framework used (e.g., Selenium).",
            "id": "AutomatedTest_0-input-framework-string"
          },
          {
            "label": "Maintenance Effort",
            "name": "maintenanceEffort",
            "type": "string",
            "placeholder": "Estimated effort for maintenance",
            "description": "Mandatory field. Estimated effort for maintenance (e.g., Low).",
            "id": "AutomatedTest_0-input-maintenanceEffort-string"
          },
          {
            "label": "Dependencies",
            "name": "dependencies",
            "type": "string",
            "placeholder": "Any external dependencies required",
            "description": "Mandatory field. Any external dependencies required.",
            "id": "AutomatedTest_0-input-dependencies-string"
          }
        ],
        "inputAnchors": [],
        "inputs": {
          "title": "",
          "modelName": "embed-english-v2.0",
          "priority": "",
          "tags": "",
          "preconditions": "",
          "postconditions": "",
          "expectedResults": "",
          "actualResults": "",
          "scriptLocation": "",
          "programmingLanguage": "",
          "framework": "",
          "maintenanceEffort": "",
          "dependencies": ""
        },
        "outputAnchors": [
          {
            "id": "AutomatedTest_0-output-AutomatedTest-AutomatedTest|Embeddings",
            "name": "AutomatedTest",
            "label": "AutomatedTest",
            "description": "Cohere API to generate embeddings for a given text",
            "type": "AutomatedTest | Embeddings"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 1461,
      "positionAbsolute": {
        "x": 1117.421101317611,
        "y": 700.3182396445063
      },
      "selected": False
    }
    return automated_test_case

def generate_bdd_test_case_structure():
    bdd_test_case = {
      "id": "BDDTest_0",
      "position": {
        "x": 2182.813489223858,
        "y": 642.2059275768928
      },
      "type": "customNode",
      "data": {
        "id": "BDDTest_0",
        "label": "BDD Test",
        "version": 1,
        "name": "BDDTest",
        "type": "BDDTest",
        "baseClasses": [
          "BDDTest"
        ],
        "category": "Test Cases",
        "description": "Load data from a Figma file",
        "inputParams": [
          {
            "label": "Title",
            "name": "title",
            "type": "string",
            "placeholder": "A brief description of the BDD scenario",
            "description": "Mandatory field. A brief description of the BDD scenario (e.g., \"Login with valid credentials\").",
            "id": "BDDTest_0-input-title-string"
          },
          {
            "label": "Priority",
            "name": "priority",
            "type": "string",
            "placeholder": "High, Medium, Low",
            "description": "A field to prioritize test cases (e.g., High, Medium, Low).",
            "id": "BDDTest_0-input-priority-string"
          },
          {
            "label": "Tags",
            "name": "tags",
            "type": "string",
            "placeholder": "Keywords to categorize test cases",
            "description": "Keywords to categorize test cases (e.g., Smoke Test, Regression).",
            "id": "BDDTest_0-input-tags-string"
          },
          {
            "label": "Given",
            "name": "given",
            "type": "string",
            "placeholder": "Capture the initial state or context before the action",
            "description": "Mandatory field. Capture the initial state or context before the action.",
            "id": "BDDTest_0-input-given-string"
          },
          {
            "label": "When",
            "name": "when",
            "type": "string",
            "placeholder": "Describe the user action or system event being tested",
            "description": "Mandatory field. Describe the user action or system event being tested.",
            "id": "BDDTest_0-input-when-string"
          },
          {
            "label": "Then",
            "name": "then",
            "type": "string",
            "placeholder": "Specify the expected outcome or verification after the action",
            "description": "Mandatory field. Specify the expected outcome or verification after the action.",
            "id": "BDDTest_0-input-then-string"
          },
          {
            "label": "And/But (Optional)",
            "name": "andBut",
            "type": "string",
            "placeholder": "Add additional steps using these keywords",
            "description": "Optional field. Add additional steps using \"And\" or \"But\" keywords.",
            "id": "BDDTest_0-input-andBut-string"
          }
        ],
        "inputAnchors": [],
        "inputs": {
          "title": "",
          "priority": "",
          "tags": "",
          "given": "",
          "when": "",
          "then": "",
          "andBut": ""
        },
        "outputAnchors": [
          {
            "id": "BDDTest_0-output-BDDTest-BDDTest",
            "name": "BDDTest",
            "label": "BDDTest",
            "description": "Load data from a Figma file",
            "type": "BDDTest"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 871,
      "positionAbsolute": {
        "x": 2182.813489223858,
        "y": 642.2059275768928
      },
      "selected": False
    }
    return bdd_test_case

def generate_execution_details_structure():
    execution_details = {
      "id": "ExecutionDetails_0",
      "position": {
        "x": -119.28962202859823,
        "y": 22.650885444318646
      },
      "type": "customNode",
      "data": {
        "id": "ExecutionDetails_0",
        "label": "Execution Details",
        "version": 1,
        "name": "ExecutionDetails",
        "type": "ExecutionDetails",
        "baseClasses": [
          "ExecutionDetails",
          "Tool",
          "StructuredTool",
          "Runnable"
        ],
        "category": "Additional Nodes",
        "description": "Real-time API for accessing Google Search data",
        "inputParams": [
          {
            "label": "Date of Execution",
            "name": "dateOfExecution",
            "type": "string",
            "description": "Manual field. Date when the test case was last executed.",
            "id": "ExecutionDetails_0-input-dateOfExecution-string"
          },
          {
            "label": "Estimation",
            "name": "estimation",
            "type": "string",
            "optional": True,
            "description": "Optional field. Anticipated time required for test execution.",
            "id": "ExecutionDetails_0-input-estimation-string"
          },
          {
            "label": "Real Execution Time",
            "name": "realExecutionTime",
            "type": "string",
            "description": "Manual field. Actual time spent executing the test.",
            "id": "ExecutionDetails_0-input-realExecutionTime-string"
          },
          {
            "label": "Status",
            "name": "passFailStatus",
            "type": "options",
            "options": [
              {
                "label": "Pass",
                "name": "Pass",
                "description": "Test case passed successfully."
              },
              {
                "label": "Fail",
                "name": "Fail",
                "description": "Test case failed."
              }
            ],
            "id": "ExecutionDetails_0-input-passFailStatus-options"
          }
        ],
        "inputAnchors": [],
        "inputs": {
          "dateOfExecution": "",
          "estimation": "",
          "realExecutionTime": "",
          "passFailStatus": ""
        },
        "outputAnchors": [
          {
            "id": "ExecutionDetails_0-output-ExecutionDetails-ExecutionDetails|Tool|StructuredTool|Runnable",
            "name": "ExecutionDetails",
            "label": "ExecutionDetails",
            "description": "Real-time API for accessing Google Search data",
            "type": "ExecutionDetails | Tool | StructuredTool | Runnable"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 571,
      "selected": False,
      "positionAbsolute": {
        "x": -119.28962202859823,
        "y": 22.650885444318646
      },
      "dragging": False
    }
    return execution_details

def generate_test_phase_structure():
    test_phase = {
      "id": "TestingPhase_0",
      "position": {
        "x": 218.84717203295486,
        "y": 44.89946303428121
      },
      "type": "customNode",
      "data": {
        "id": "TestingPhase_0",
        "label": "Testing Phase",
        "version": 2,
        "name": "TestingPhase",
        "type": "TestingPhase",
        "baseClasses": [
          "TestingPhase",
          "BaseChain",
          "Runnable"
        ],
        "category": "Additional Nodes",
        "description": "QA chain for Vectara",
        "inputParams": [
          {
            "label": "Title",
            "name": "title",
            "type": "string",
            "description": "Mandatory field. Name of the testing phase (e.g., v1; v2).",
            "id": "TestingPhase_0-input-title-string"
          },
          {
            "label": "Description",
            "name": "description",
            "type": "string",
            "optional": True,
            "description": "Optional field. Additional details about the specific testing phase.",
            "id": "TestingPhase_0-input-description-string"
          }
        ],
        "inputAnchors": [],
        "inputs": {
          "title": "",
          "description": ""
        },
        "outputAnchors": [
          {
            "id": "TestingPhase_0-output-TestingPhase-TestingPhase|BaseChain|Runnable",
            "name": "TestingPhase",
            "label": "TestingPhase",
            "description": "QA chain for Vectara",
            "type": "TestingPhase | BaseChain | Runnable"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 376,
      "selected": False,
      "positionAbsolute": {
        "x": 218.84717203295486,
        "y": 44.89946303428121
      },
      "dragging": False
    }
    return test_phase

def generate_test_environment_structure():
    test_environment = {
      "id": "TestEnvironment_0",
      "position": {
        "x": 689.1118383007561,
        "y": 233.26743524924242
      },
      "type": "customNode",
      "data": {
        "id": "TestEnvironment_0",
        "label": "Test Environment",
        "version": 2,
        "name": "TestEnvironment",
        "type": "Test Environment",
        "baseClasses": [
          "Test Environment"
        ],
        "category": "Design Nodes",
        "description": "Load data from Apify Website Content Crawler",
        "inputParams": [
          {
            "label": "Environment Name",
            "name": "environmentName",
            "type": "string",
            "description": "Name of the testing environment (e.g., Development).",
            "id": "TestEnvironment_0-input-environmentName-string"
          },
          {
            "label": "URL",
            "name": "urls",
            "type": "string",
            "description": "One or more URLs of pages where the crawler will start, separated by commas.",
            "placeholder": "https://js.langchain.com/docs/",
            "id": "TestEnvironment_0-input-urls-string"
          },
          {
            "label": "Database Connection Details",
            "name": "databaseConnection",
            "type": "string",
            "optional": True,
            "description": "Credentials for accessing the database.",
            "id": "TestEnvironment_0-input-databaseConnection-string"
          },
          {
            "label": "Credentials ",
            "name": "credentials",
            "type": "string",
            "optional": True,
            "description": "Authentication details for the environment.",
            "id": "TestEnvironment_0-input-credentials-string"
          }
        ],
        "inputAnchors": [
          {
            "label": "Cache",
            "name": "cache",
            "type": "Test Strategy",
            "optional": True,
            "description": "Cache connection details.",
            "id": "TestEnvironment_0-input-cache-Test Strategy"
          }
        ],
        "inputs": {
          "cache": "",
          "environmentName": "",
          "urls": "",
          "databaseConnection": "",
          "credentials": ""
        },
        "outputAnchors": [
          {
            "id": "TestEnvironment_0-output-TestEnvironment-Test Environment",
            "name": "TestEnvironment",
            "label": "Test Environment",
            "description": "Load data from Apify Website Content Crawler",
            "type": "Test Environment"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 625,
      "positionAbsolute": {
        "x": 689.1118383007561,
        "y": 233.26743524924242
      },
      "selected": False
    }
    return test_environment

def generate_test_suite_structure():
    test_suite = {
      "id": "TestSuite_0",
      "position": {
        "x": 1160.467258404732,
        "y": 188.06897030776528
      },
      "type": "customNode",
      "data": {
        "id": "TestSuite_0",
        "label": "Test Suite",
        "version": 1,
        "name": "TestSuite",
        "type": "TestSuite",
        "baseClasses": [
          "TestSuite",
          "Embeddings"
        ],
        "category": "Design Nodes",
        "description": "Google vertexAI API to generate embeddings for a given text",
        "inputParams": [
          {
            "label": "Title",
            "name": "title",
            "type": "string",
            "placeholder": "Descriptive name for the user flow or functionality",
            "description": "Mandatory field. Descriptive name for the user flow or functionality.",
            "id": "TestSuite_0-input-title-string"
          },
          {
            "label": "Description",
            "name": "description",
            "type": "string",
            "placeholder": "Additional details about the user flow",
            "description": "Optional field. Additional details about the user flow.",
            "id": "TestSuite_0-input-description-string"
          },
          {
            "label": "Exit criteria",
            "name": "exitCriteria",
            "type": "string",
            "placeholder": "List of items to be verified during testing",
            "description": "Mandatory field. List of items to be verified during testing.",
            "id": "TestSuite_0-input-exitCriteria-string"
          }
        ],
        "inputAnchors": [],
        "inputs": {
          "title": "",
          "description": "",
          "exitCriteria": ""
        },
        "outputAnchors": [
          {
            "id": "TestSuite_0-output-TestSuite-TestSuite|Embeddings",
            "name": "TestSuite",
            "label": "TestSuite",
            "description": "Google vertexAI API to generate embeddings for a given text",
            "type": "TestSuite | Embeddings"
          }
        ],
        "outputs": {},
        "selected": False
      },
      "width": 300,
      "height": 475,
      "positionAbsolute": {
        "x": 1160.467258404732,
        "y": 188.06897030776528
      },
      "selected": False
    }
    return test_suite

# Define more functions for other node types as needed

def generate_custom_structure(node_type):
    if node_type == "TestStrategyNode":
        return generate_test_strategy_structure()
    elif node_type == "TestPlanNode":
        return generate_test_plan_structure()
    elif node_type == "ManualTestCaseNode":
        return generate_manual_test_case_structure()
    elif node_type == "AutomatedTestCaseNode":
        return generate_automated_test_case_structure()
    elif node_type == "BDDTestCaseNode":
        return generate_bdd_test_case_structure()
    elif node_type == "ExecutionDetailsNode":
        return generate_execution_details_structure()
    elif node_type == "TestingPhaseNode":
        return generate_test_phase_structure()
    elif node_type == "TestEnvironmentNode":
        return generate_test_environment_structure()
    elif node_type == "TestSuiteNode":
        return generate_test_suite_structure()
    else:  
    # Default case if node type is not recognized
        return {"error": "Unknown node type"}

def extract_node_types_and_data(json_data_list):
    node_types_and_data = []
    for json_data in json_data_list:
        try:
            data = json_data
            node_type = data.get("node")
            node_data = data.get("data", {})
            node_types_and_data.append((node_type, node_data))
        except json.JSONDecodeError:
            node_types_and_data.append(("Invalid JSON format", {}))
    return node_types_and_data

def compile_json_nodes(node_types_and_data):
    compiled_json = {"nodes": []}
    for node_type, node_data in node_types_and_data:
        compiled_json["nodes"].append({"node": node_type, "data": node_data})
    return compiled_json

# Example JSON input list
json_input_list = [
    {
  "node": "BDDTestCaseNode",
  "data": {
    "title": "Login as a registered user with valid credentials.",
    "priority": "High",
    "tag": "Regression", 
    "gherkinSteps": [
      { "keyword": "Given", "text": "Adem is testing the current function" },
      { "keyword": "When", "text": "User enters username ""johndoe""." },
      { "keyword": "And", "text": "User enters password ""password123""." },
      { "keyword": "Then", "text": "Login is successful" },
      { "keyword": "And", "text": "Welcome, John Doe"" message is displayed on the home page." }
    ]
  },
  "next_node": [],
  },
    {
      "node": "TestPlanNode", 
      "data": {
        "title": "Sample Test Plan", 
        "description": "This is a sample test plan.",  
        "dateOfExecution": "2024-04-24",  
        "estimation": "2 hours",
        "assignedTesters": "John, Alice",
        "riskAssessment": "Low",  
        "dataConsiderations": "None"
      },
      "next_node": []
    },
    {
      "node": "TestStrategyNode", 
      "data": {
        "title": "Sample Test Strategy", 
        "description": "This is a sample test strategy.",  
        "dateOfExecution": "2024-04-24",  
        "estimation": "2 hours",
        "assignedTesters": "John, Alice",
        "riskAssessment": "Low",  
        "dataConsiderations": "None"
      },
      "next_node": []
    },
    {
      "node": "ManualTestCaseNode", 
      "data": {
        "title": "Sample Manual Test Case", 
        "description": "This is a sample manual test case.",  
        "priority": "High",  
        "tags": "Smoke Test, Regression",
        "preconditions": "System is running",
        "postconditions": "System is stable",
        "expectedResults": "System should respond within 5 seconds",
        "actualResults": "System responded within 3 seconds",
        "testData": "Sample data",
        "assignedTesters": "John, Alice"
      },
      "next_node": []
    },
    {
      "node": "ExecutionDetailsNode", 
      "data": {
        "dateOfExecution": "2024-04-24",  
        "estimation": "2 hours",
        "realExecutionTime": "1 hour",
        "passFailStatus": "Pass"
      },
      "next_node": []
    },
    {
      "node": "TestingPhaseNode", 
      "data": {
        "title": "Phase 1", 
        "description": "This is phase 1."
      },
      "next_node": []
    },
    {
      "node": "TestEnvironmentNode", 
      "data": {
        "environmentName": "Production", 
        "urls": "https://example.com",  
        "databaseConnection": "DB credentials",  
        "credentials": "Login credentials"
      },
      "next_node": []
    },
    {
      "node": "TestSuiteNode", 
      "data": {
        "title": "Sample Test Suite", 
        "description": "This is a sample test suite.",  
        "exitCriteria": "All test cases pass."
      },
      "next_node": []
    }
]

new_json_input_list = json.dumps(json_input_list, indent=2)
node_types_and_data = extract_node_types_and_data(json_input_list)
#node_types = [node_type for node_type, _ in node_types_and_data]
#node_datas = [node_data for _, node_data in node_types_and_data]
node_types, node_datas = [node_type for node_type, _ in node_types_and_data], [node_data for _, node_data in node_types_and_data]
print("Node types extracted from JSON input:", node_types)

# Example node types
#node_types = ["TestStrategyNode", "TestPlanNode", "TestPhaseNode"]

custom_structures = {}
for node_type in node_types:
    custom_structure = generate_custom_structure(node_type)
    custom_structure["data"]["inputs"] = node_datas[node_types.index(node_type)]
    custom_structures[node_type] = custom_structure




# Write custom structures to a file
    with open("custom_structures.json", "w") as outfile:
        # Store the custom structures in a "nodes" list
        json.dump({"nodes": list(custom_structures.values()), "edges": []}, outfile, indent=2)

print("Custom structures written to 'custom_structures.json'")

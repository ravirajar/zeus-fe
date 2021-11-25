import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getRepairDetails } from "../api/index";

const RepairQuestionComponent = () => {
  const [questionCount, setQuestionCount] = useState([
    true,
    false,
    false,
    false,
  ]);

  const history = useHistory();

  const [crackedScreen, setCrackedscreen] = useState();
  const [lcdReplacement, setLcdReplacement] = useState();
  const [battery, setBattery] = useState();
  const [chargingIssue, setChargingIssue] = useState();
  const [buttonIssue, setButtonIssue] = useState([]);
  const [audioIssue, setAudioIssue] = useState([]);
  const [housingDamage, setHousingDamage] = useState([]);
  const [cameraIssue, setCameraIssue] = useState([]);
  const [faceId, setFaceId] = useState();
  const [waterDamage, setWaterDamage] = useState();
  const [autoRestart, setAutoRestart] = useState();
  const [powerOnIssue, setPowerOnIssue] = useState();
  const [powerLeakage, setPowerLeakage] = useState();

  const [repairCostDetails, setRepairCostDetails] = useState();
  const [serviceQuestionHeading, setServiceQuestionHeading] = useState([]);
  const [finalEstimate, setFinalEstimate] = useState();
  const [mobileNumber, setMobileNumber] = useState(null);
  const [hideNext, setHideNext] = useState(true);

  const { device } = useParams();
  const { brand } = useParams();
  let { model } = useParams();
  model = decodeURIComponent(model);

  const changeQuestionValue = (position) => {
    let questionCount = [false, false, false, false];
    questionCount[position + 1] = true;

    return questionCount;
  };

  const optionSelected = (event, question) => {
    event.preventDefault();
    setQuestionCount(changeQuestionValue(question));
  };

  useEffect(() => {
    getRepairDetails(device + "&brandName=" + brand + "&model=" + model).then(
      (results) => {
        let tempHeading;
        tempHeading = Object.keys(results.data[0]);
        tempHeading.splice(tempHeading.indexOf("_id"), 1);
        tempHeading.splice(tempHeading.indexOf("type"), 1);
        tempHeading.splice(tempHeading.indexOf("model"), 1);
        tempHeading.splice(tempHeading.indexOf("brandName"), 1);
        tempHeading.splice(tempHeading.indexOf("binary"), 1);
        setRepairCostDetails(results.data[0]);
        setServiceQuestionHeading(tempHeading);
      }
    );
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;

    switch (target.name.toLowerCase()) {
      case "cracked screen": {
        target.checked ? setCrackedscreen(target.value) : setCrackedscreen();
        break;
      }
      case "lcd replacement": {
        setLcdReplacement(target.value);
        break;
      }
      case "battery": {
        setBattery(target.value);
        break;
      }
      case "charging issue": {
        target.checked ? setChargingIssue(true) : setChargingIssue(false);
        break;
      }
      case "faulty button": {
        let btnIssue = buttonIssue;
        if (!btnIssue.includes(target.value)) {
          btnIssue.push(target.value);
        } else {
          btnIssue.pop(target.value);
        }

        setButtonIssue(btnIssue);
        break;
      }
      case "audio malfunction": {
        let audIssue = audioIssue;
        if (!audIssue.includes(target.value)) {
          audIssue.push(target.value);
        } else {
          audIssue.pop(target.value);
        }

        setAudioIssue(audIssue);
        break;
      }

      case "housing/backglass": {
        let housingIssue = housingDamage;
        if (!housingIssue.includes(target.value)) {
          housingIssue.push(target.value);
        } else {
          housingIssue.pop(target.value);
        }

        setHousingDamage(housingIssue);
        break;
      }

      case "camera": {
        let cameraDefects = cameraIssue;
        if (!cameraDefects.includes(target.value)) {
          cameraDefects.push(target.value);
        } else {
          cameraDefects.pop(target.value);
        }

        setCameraIssue(cameraDefects);
        break;
      }

      case "face id": {
        target.checked ? setFaceId(true) : setFaceId(false);
        break;
      }

      case "water damage": {
        target.checked ? setWaterDamage(true) : setWaterDamage(false);
        break;
      }

      case "cant power on": {
        target.checked ? setPowerOnIssue(true) : setPowerOnIssue(false);
        break;
      }

      case "power leakage": {
        target.checked ? setPowerLeakage(true) : setPowerLeakage(false);
        break;
      }

      case "auto restart": {
        target.checked ? setAutoRestart(true) : setAutoRestart(false);
      }
      default:
        return;
    }
  };

  const calculatePricing = (event) => {
    let estimatedPrice = 0;
    optionSelected(event, 4);
    repairCostDetails["Audio Malfunction"].forEach((ele) => {
      audioIssue.forEach((element) => {
        if (element === Object.keys(ele)[0]) {
          estimatedPrice += ele[element];
        }
      });
    });

    repairCostDetails["Camera"].forEach((ele) => {
      cameraIssue.forEach((element) => {
        if (element === Object.keys(ele)[0]) {
          estimatedPrice += ele[element];
        }
      });
    });

    repairCostDetails["Faulty Button"].forEach((ele) => {
      buttonIssue.forEach((element) => {
        if (element === Object.keys(ele)[0]) {
          estimatedPrice += ele[element];
        }
      });
    });

    repairCostDetails["Housing/Backglass"].forEach((ele) => {
      housingDamage.forEach((element) => {
        if (element === Object.keys(ele)[0]) {
          estimatedPrice += ele[element];
        }
      });
    });

    repairCostDetails["Cracked Screen"].forEach((ele) => {
      if (crackedScreen === Object.keys(ele)[0]) {
        estimatedPrice += ele[crackedScreen];
      }
    });

    repairCostDetails["LCD Replacement"].forEach((ele) => {
      if (lcdReplacement === Object.keys(ele)[0]) {
        estimatedPrice += ele[lcdReplacement];
      }
    });

    repairCostDetails["Battery"].forEach((ele) => {
      if (battery === Object.keys(ele)[0]) {
        estimatedPrice += ele[battery];
      }
    });

    if (autoRestart) {
      estimatedPrice += repairCostDetails["Auto-Restart"];
    }

    if (chargingIssue) {
      estimatedPrice += repairCostDetails["Charging Issue"];
    }

    if (faceId) {
      estimatedPrice += repairCostDetails["Face Id"];
    }

    if (waterDamage) {
      estimatedPrice += repairCostDetails["Water Damage"];
    }

    if (powerLeakage) {
      estimatedPrice += repairCostDetails["Power Leakage"];
    }

    if (powerOnIssue) {
      estimatedPrice += repairCostDetails["Cant Power On"];
    }

    estimatedPrice > 0 ? setFinalEstimate(estimatedPrice) : setFinalEstimate(0);
  };

  const changeMobileNumber = (event) => {
    const validMobileNumber = new RegExp("^[0-9]{8,}$");

    if (validMobileNumber.test(event.target.value)) {
      setHideNext(false);
      setMobileNumber(event.target.value);
    } else {
      setHideNext(true);
    }
  };

  return (
    <div className="container repair-device-questionaire">
      <h2 style={{ marginTop: 25, fontFamily: "Work-Sans-Semibold" }}>
        Pick Your Repair Service
      </h2>
      <div className="row question-component-container">
        <div className="question-image-container col-md-4">
          {model === "11 pro max" || model === "12 pro max" ? (
            <img
              src={require("../assets/mobile/" + model + ".jpeg").default}
              alt="mobile"
            />
          ) : (
            <img
              src={require("../assets/mobile/11 pro max.jpeg").default}
              alt="mobile"
            />
          )}

          <p className="device-details">
            <span className="details-label">{model}</span>
          </p>
        </div>
        <div className="question-component container col-md-8">
          {/* Part 1 */}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[0] ? (
            <div className="col-md-12 question-tag">
              Display and Battery Issue
            </div>
          ) : null}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[0]
            ? serviceQuestionHeading.map((questionData, id) => {
                if (
                  questionData.toLowerCase() === "cracked screen" ||
                  questionData.toLowerCase() === "lcd replacement"
                ) {
                  return (
                    <div className="col-md-6 mb-10 mt-20" key={id}>
                      <p className="question-text">{questionData}</p>
                      <ul className="answer-list-wrapper flex-ds-rw mt-20">
                        {typeof repairCostDetails[questionData] === "object"
                          ? repairCostDetails[questionData].map((data, id) => (
                              <li className="answer-option col-md-12 mb-10">
                                <input
                                  type={
                                    questionData.toLowerCase() ===
                                    "cracked screen"
                                      ? "checkbox"
                                      : "radio"
                                  }
                                  name={questionData}
                                  onChange={handleInputChange}
                                  value={Object.keys(data)}
                                />
                                <span>{Object.keys(data)[0]}</span>
                              </li>
                            ))
                          : null}
                        {typeof repairCostDetails[questionData] === "number" ? (
                          <>
                            <li className="answer-option col-md-12 mb-10">
                              <input
                                type="checkbox"
                                name={questionData}
                                onChange={handleInputChange}
                                value={questionData}
                              />
                              <span>Yes</span>
                            </li>
                          </>
                        ) : null}
                      </ul>
                    </div>
                  );
                }
                if (
                  questionData.toLowerCase() === "battery" ||
                  questionData.toLowerCase() === "charging issue"
                ) {
                  return (
                    <div className="col-md-6 mb-10 mt-20" key={id}>
                      <p className="question-text">{questionData}</p>
                      <ul className="answer-list-wrapper flex-ds-rw mt-20">
                        {typeof repairCostDetails[questionData] === "object"
                          ? repairCostDetails[questionData].map((data, id) => (
                              <li className="answer-option col-md-12 mb-10">
                                <input
                                  type="radio"
                                  name={questionData}
                                  onChange={handleInputChange}
                                  value={Object.keys(data)}
                                />
                                <span>{Object.keys(data)[0]}</span>
                              </li>
                            ))
                          : null}
                        {typeof repairCostDetails[questionData] === "number" ? (
                          <>
                            <li className="answer-option col-md-12 mb-10">
                              <input
                                type="checkbox"
                                name={questionData}
                                onChange={handleInputChange}
                                value={questionData}
                              />
                              <span>Yes</span>
                            </li>
                          </>
                        ) : null}
                      </ul>
                    </div>
                  );
                }
              })
            : null}

          {questionCount[0] ? (
            <div className="col-md-12 prev-next-question flex-ds-rw">
              <a
                href="#"
                className="prev-question-wrapper"
                onClick={(event) => {
                  // optionSelected(event, 0);
                }}
              >
                <span className="append-before-symbol prev-question">
                  Previous
                </span>
              </a>
              <a
                href="#"
                className="next-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, 0);
                }}
              >
                <span className="next-question">Next</span>
              </a>
            </div>
          ) : null}

          {/* Part 2 */}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[1] ? (
            <div className="col-md-12 question-tag">
              Buttons and Audio Issue
            </div>
          ) : null}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[1]
            ? serviceQuestionHeading.map((questionData, id) => {
                if (
                  questionData.toLowerCase() === "faulty button" ||
                  questionData.toLowerCase() === "audio malfunction"
                ) {
                  return (
                    <div className="col-md-12 mb-10 mt-20" key={id}>
                      <p className="question-text">{questionData}</p>
                      <ul className="answer-list-wrapper flex-ds-rw mt-20">
                        {typeof repairCostDetails[questionData] === "object"
                          ? repairCostDetails[questionData].map((data, id) => (
                              <li className="answer-option col-md-12 mb-10">
                                <input
                                  type="checkbox"
                                  name={questionData}
                                  onChange={handleInputChange}
                                  value={Object.keys(data)}
                                />
                                <span>{Object.keys(data)[0]}</span>
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  );
                }
              })
            : null}

          {questionCount[1] ? (
            <div className="col-md-12 prev-next-question flex-ds-rw">
              <a
                href="#"
                className="prev-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, -1);
                }}
              >
                <span className="append-before-symbol prev-question">
                  Previous
                </span>
              </a>
              <a
                href="#"
                className="next-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, 1);
                }}
              >
                <span className="next-question">Next</span>
              </a>
            </div>
          ) : null}

          {/* Part 3 */}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[2] ? (
            <div className="col-md-12 question-tag">Body and Camera Issue</div>
          ) : null}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[2]
            ? serviceQuestionHeading.map((questionData, id) => {
                if (
                  questionData.toLowerCase() === "housing/backglass" ||
                  questionData.toLowerCase() === "camera"
                ) {
                  return (
                    <div className="col-md-12 mb-10 mt-20" key={id}>
                      <p className="question-text">{questionData}</p>
                      <ul className="answer-list-wrapper flex-ds-rw mt-20">
                        {typeof repairCostDetails[questionData] === "object"
                          ? repairCostDetails[questionData].map((data, id) => (
                              <li className="answer-option col-md-12 mb-10">
                                <input
                                  type="checkbox"
                                  name={questionData}
                                  onChange={handleInputChange}
                                  value={Object.keys(data)}
                                />
                                <span>{Object.keys(data)[0]}</span>
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  );
                }
              })
            : null}

          {questionCount[2] ? (
            <div className="col-md-12 prev-next-question flex-ds-rw">
              <a
                href="#"
                className="prev-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, 0);
                }}
              >
                <span className="append-before-symbol prev-question">
                  Previous
                </span>
              </a>
              <a
                href="#"
                className="next-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, 2);
                }}
              >
                <span className="next-question">Next</span>
              </a>
            </div>
          ) : null}

          {/* Part 4 */}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[3] ? (
            <div className="col-md-12 question-tag mb-10">Other Issues</div>
          ) : null}
          {repairCostDetails &&
          serviceQuestionHeading.length > 0 &&
          questionCount[3]
            ? serviceQuestionHeading.map((questionData, id) => {
                if (
                  questionData.toLowerCase() === "face id" ||
                  questionData.toLowerCase() === "water damage" ||
                  questionData.toLowerCase() === "auto-restart" ||
                  questionData.toLowerCase() === "cant power on" ||
                  questionData.toLowerCase() === "power leakage"
                ) {
                  return (
                    <div className="col-md-12" key={id}>
                      {/* <p className="question-text">{questionData}</p> */}
                      <ul className="answer-list-wrapper flex-ds-rw">
                        {typeof repairCostDetails[questionData] === "number" ? (
                          <>
                            <li className="answer-option col-md-6">
                              <input
                                type="checkbox"
                                name={questionData}
                                onChange={handleInputChange}
                                value={questionData}
                              />
                              <span>{questionData}</span>
                            </li>
                          </>
                        ) : null}
                      </ul>
                    </div>
                  );
                }
              })
            : null}

          {questionCount[3] ? (
            <div className="col-md-12 prev-next-question flex-ds-rw">
              <a
                href="#"
                className="prev-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, 1);
                }}
              >
                <span className="append-before-symbol prev-question">
                  Previous
                </span>
              </a>
              <a
                href="#"
                className="next-question-wrapper"
                onClick={(event) => {
                  optionSelected(event, 3);
                }}
              >
                <span className="next-question">Next</span>
              </a>
            </div>
          ) : null}

          {questionCount[4] ? (
            <>
              <p className="question-text">
                <span className="quote-text">One step! To get your quote.</span>
              </p>
              <p className="mobile-number-wrapper">
                <span>
                  Please provide your Whatsapp Number to get the quote.
                </span>

                <input
                  type="text"
                  className="mobile-number-field"
                  name="mobile-number"
                  // value={mobileNumber}
                  onChange={(event) => {
                    changeMobileNumber(event);
                  }}
                />
              </p>
              <div className="prev-next-question flex-ds-rw mt-30 col-md-12">
                <a
                  href="#"
                  className="prev-question-wrapper"
                  onClick={(event) => {
                    optionSelected(event, 2);
                  }}
                >
                  <span className="append-before-symbol prev-question">
                    Previous
                  </span>
                </a>

                {!hideNext ? (
                  <a
                    href="#"
                    className="next-question-wrapper"
                    onClick={(event) => {
                      calculatePricing(event);
                    }}
                  >
                    <span className="next-question">Next</span>
                  </a>
                ) : null}
              </div>
            </>
          ) : null}

          {questionCount[5] ? (
            <>
              <p className="question-text">
                {finalEstimate ? (
                  <span className="quote-text">
                    Service might cost upto{" "}
                    <span className="price-quote">S${finalEstimate}</span>.
                  </span>
                ) : null}
              </p>
              <p className="admin-contact-text">
                Our Customer Care will contact you for further details.
              </p>
              <div className="prev-next-question flex-ds-rw mt-30 col-md-12">
                <a
                  href="#"
                  className="next-question-wrapper"
                  onClick={() => {
                    history.push("/repair/" + device);
                  }}
                >
                  <span className="next-question">Get another quote</span>
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RepairQuestionComponent;

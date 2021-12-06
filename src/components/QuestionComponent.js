import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getPricing } from "../api/index";

const QuestionComponent = () => {
  const history = useHistory();
  const [questionCount, setQuestionCount] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [variant, setVariant] = useState();
  const [screenDamage, setScreenDamage] = useState();
  const [bodyDamage, setBodyDamage] = useState();
  const [localExport, setLocalExport] = useState();
  const [originalAccessories, setOriginalAccessories] = useState([]);
  const [otherIssues, setOtherIssues] = useState([]);
  const [pricingDetails, setPricingDetails] = useState();
  const [noPricing, setNoPricing] = useState(false);
  const [finalEstimate, setFinalEstimate] = useState(0);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [hideNext, setHideNext] = useState(true);

  const { device } = useParams();
  const { brand } = useParams();
  let { model } = useParams();
  model = decodeURIComponent(model);

  const changeQuestionValue = (position) => {
    let questionCount = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    questionCount[position + 1] = true;

    return questionCount;
  };

  const optionSelected = (event, question) => {
    event.preventDefault();
    setQuestionCount(changeQuestionValue(question));
  };

  useEffect(() => {
    getPricing(device + "&brandName=" + brand + "&model=" + model).then(
      (results) => {
        setPricingDetails(results.data[0]);
      }
    );
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;

    if (target.name === "originalAccessories") {
      let ogAccessories = originalAccessories;
      if (!ogAccessories.includes(target.value)) {
        ogAccessories.push(target.value);
      } else {
        ogAccessories.pop(target.value);
      }
      setOriginalAccessories(ogAccessories);
    }

    if (target.name === "otherIssues") {
      let otherIssue = otherIssues;
      if (!otherIssue.includes(target.value)) {
        otherIssue.push(target.value);
      } else {
        otherIssue.pop(target.value);
      }
      setOtherIssues(otherIssue);
    }
  };

  const calculatePricing = (event) => {
    optionSelected(event, 6);
    let estimatedPrice = 0;

    const { accessories, body, deviceType, other, screen, storage } =
      pricingDetails;

    storage.forEach((element) => {
      if (element[variant] !== undefined) {
        estimatedPrice = element[variant];
      }
    });

    screen.forEach((element) => {
      if (element[screenDamage] !== undefined) {
        estimatedPrice -= element[screenDamage];
      }
    });

    body.forEach((element) => {
      if (element[bodyDamage] !== undefined) {
        estimatedPrice -= element[bodyDamage];
      }
    });

    deviceType.forEach((element) => {
      if (element[localExport.toLowerCase()] !== undefined) {
        estimatedPrice -= element[localExport.toLowerCase()];
      }
    });

    accessories.forEach((element) => {
      if (!originalAccessories.includes(Object.keys(element)[0])) {
        estimatedPrice -= element[Object.keys(element)[0]];
      }
    });

    otherIssues.forEach((otherIssue) => {
      other.forEach((element) => {
        if (otherIssue === Object.keys(element)[0]) {
          if (element[otherIssue].toLowerCase === "wa") {
            setNoPricing(true);
            return;
          } else {
            estimatedPrice -= element[otherIssue];
          }
        }
      });
    });
    if (estimatedPrice > 0) {
      setFinalEstimate(estimatedPrice);
    }
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
    <div className="container sell-old-device__questionaire">
      <h2 style={{ marginTop: 25, fontFamily: "Work-Sans-Semibold" }}>
        Help us to evaluate your device
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

          {variant ? (
            <p className="device-details">
              <span className="details-label">Variant</span>
              <span>:</span>
              <span className="details-value">{variant} GB</span>
            </p>
          ) : null}

          {screenDamage ? (
            <p className="device-details">
              <span className="details-label">Screen</span>
              <span>:</span>
              <span className="details-value">{screenDamage}</span>
            </p>
          ) : null}

          {bodyDamage ? (
            <p className="device-details">
              <span className="details-label">Body</span>
              <span>:</span>
              <span className="details-value">{bodyDamage}</span>
            </p>
          ) : null}

          {localExport ? (
            <p className="device-details">
              <span className="details-label">Local/Export</span>
              <span>:</span>
              <span className="details-value">{localExport}</span>
            </p>
          ) : null}

          {originalAccessories && originalAccessories.length > 0 ? (
            <p className="device-details">
              <span className="details-label">Original Accessories</span>
              <span>:</span>
              <span className="details-value">
                {originalAccessories[0]}{" "}
                {originalAccessories.length > 1
                  ? "and " + (originalAccessories.length - 1) + " other"
                  : null}
              </span>
            </p>
          ) : null}

          {otherIssues && otherIssues.length ? (
            <p className="device-details">
              <span className="details-label">Any other issues</span>
              <span>:</span>
              <span className="details-value">
                {otherIssues[0]}{" "}
                {otherIssues.length > 1
                  ? "and " + (otherIssues.length - 1) + " other"
                  : null}
              </span>
            </p>
          ) : null}
        </div>

        <div className="question-component container col-md-8">
          {pricingDetails ? (
            <p className="device-name">
              {brand} {pricingDetails.model}
            </p>
          ) : null}
          {questionCount[0] ? (
            <>
              <p className="question-text">Choose a variant </p>
              <ul className="answer-list-wrapper flex-ds-rw mt-20">
                {pricingDetails
                  ? pricingDetails.storage.map((data, id) => {
                      return data[Object.keys(data)] !== 0 ? (
                        <li
                          key={id}
                          className="answer-option"
                          onClick={(event) => {
                            setVariant(Object.keys(data));
                            optionSelected(event, 0);
                          }}
                        >
                          <span> {Object.keys(data)} GB</span>
                        </li>
                      ) : null;
                    })
                  : null}
              </ul>
              <a
                href="#"
                onClick={(event) => {
                  history.goBack();
                }}
              >
                <span className="append-before-symbol">Select Device</span>
              </a>
            </>
          ) : null}
          {questionCount[1] ? (
            <>
              <p className="question-text">
                Select an option which suits your phone screen condition
              </p>
              <ul className="answer-list-wrapper flex-ds-cl mb-10">
                {pricingDetails.screen.map((data, id) => (
                  <li
                    key={id}
                    className="answer-option mt-20 mb-10"
                    id={Object.keys(data)}
                    onClick={(event) => {
                      setScreenDamage(Object.keys(data));
                      optionSelected(event, 1);
                    }}
                  >
                    <span>{Object.keys(data)}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                onClick={(event) => {
                  setVariant();
                  optionSelected(event, -1);
                }}
              >
                <span className="append-before-symbol">Previous</span>
              </a>
            </>
          ) : null}
          {questionCount[2] ? (
            <>
              <p className="question-text">
                Select an option which suits your phone body condition
              </p>
              <ul className="answer-list-wrapper flex-ds-cl mb-10">
                {pricingDetails
                  ? pricingDetails.body.map((data, id) => (
                      <li
                        key={id}
                        id={Object.keys(data)}
                        className="answer-option mt-20 mb-10"
                        onClick={(event) => {
                          setBodyDamage(Object.keys(data));
                          optionSelected(event, 2);
                        }}
                      >
                        <span> {Object.keys(data)} </span>
                      </li>
                    ))
                  : null}
              </ul>
              <a
                href="#"
                onClick={(event) => {
                  setScreenDamage();
                  optionSelected(event, 0);
                }}
              >
                <span className="append-before-symbol">Previous</span>
              </a>
            </>
          ) : null}
          {questionCount[3] ? (
            <>
              <p className="question-text">Singapore Set</p>
              <ul className="answer-list-wrapper flex-ds-cl mb-10">
                <li
                  className="answer-option mt-20 mb-10"
                  onClick={(event) => {
                    setLocalExport("Local");
                    optionSelected(event, 3);
                  }}
                >
                  <span>Yes</span>
                </li>
                <li
                  className="answer-option mb-10"
                  onClick={(event) => {
                    setLocalExport("Export");
                    optionSelected(event, 3);
                  }}
                >
                  <span>No</span>
                </li>
              </ul>
              <a
                href="#"
                onClick={(event) => {
                  optionSelected(event, 1);
                }}
              >
                <span className="append-before-symbol">Previous</span>
              </a>
            </>
          ) : null}

          {questionCount[4] ? (
            <>
              <p className="question-text">Available Orginal Accessories?</p>
              <ul className="answer-list-wrapper flex-ds-cl mb-10">
                {pricingDetails
                  ? pricingDetails.accessories.map((data, id) => (
                      <li className="answer-option mt-20 mb-10">
                        <input
                          type="checkbox"
                          name="originalAccessories"
                          onChange={handleInputChange}
                          value={Object.keys(data)}
                        />
                        <span>{Object.keys(data)}</span>
                      </li>
                    ))
                  : null}
              </ul>
              <div className="prev-next-question flex-ds-rw">
                <a
                  href="#"
                  className="prev-question-wrapper"
                  onClick={(event) => {
                    setLocalExport();
                    optionSelected(event, 2);
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
                    optionSelected(event, 4);
                  }}
                >
                  <span className="next-question">Next</span>
                </a>
              </div>
            </>
          ) : null}
          {questionCount[5] ? (
            <>
              <p className="question-text">Any other issues with the device?</p>
              <ul className="answer-list-wrapper flex-ds-cl mb-10">
                {pricingDetails
                  ? pricingDetails.other.map((data, id) => (
                      <li className="answer-option mt-20 mb-10">
                        <input
                          type="checkbox"
                          name="otherIssues"
                          onChange={handleInputChange}
                          value={Object.keys(data)}
                        />
                        <span>{Object.keys(data)}</span>
                      </li>
                    ))
                  : null}
              </ul>
              <div className="prev-next-question flex-ds-rw">
                <a
                  href="#"
                  className="prev-question-wrapper"
                  onClick={(event) => {
                    setOriginalAccessories([]);
                    optionSelected(event, 3);
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
                    optionSelected(event, 5);
                  }}
                >
                  <span className="next-question">Next</span>
                </a>
              </div>
            </>
          ) : null}
          {questionCount[6] ? (
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
              <div className="prev-next-question flex-ds-rw mt-30">
                <a
                  href="#"
                  className="prev-question-wrapper"
                  onClick={(event) => {
                    setOtherIssues([]);
                    optionSelected(event, 4);
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
          {questionCount[7] ? (
            <>
              <p className="question-text">
                {noPricing ? null : (
                  <span className="quote-text">
                    Get Upto{" "}
                    <span className="price-quote">S${finalEstimate}</span>{" "}
                    <span>
                      already <span className="device-count">30+</span> iPhones
                      sold on Zeus.
                    </span>
                  </span>
                )}
              </p>
              <p className="admin-contact-text">
                Our Customer Care will contact you for further details.
              </p>

              <a
                href="#"
                className="next-question-wrapper"
                onClick={() => {
                  history.push("/sell-device/" + device);
                }}
              >
                <span className="next-question">Get another quote</span>
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;

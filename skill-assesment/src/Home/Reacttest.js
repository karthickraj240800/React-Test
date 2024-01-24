import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "./style.css";

const SegmentPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [blueBoxSchemas, setBlueBoxSchemas] = useState([]);

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const showPopupHandler = () => {
    setShowPopup(true);
  };

  const closePopupHandler = () => {
    setShowPopup(false);
  };

  const addNewSchemaHandler = () => {
    if (selectedSchema) {
      if (!blueBoxSchemas.includes(selectedSchema)) {
        setBlueBoxSchemas((prevSchemas) => [...prevSchemas, selectedSchema]);
        setSelectedSchema("");
      }
    }
  };
  const handleBlueBoxSchemaChange = (index, event) => {
    const newSchemas = [...blueBoxSchemas];
    newSchemas[index] = event.target.value;
    setBlueBoxSchemas(newSchemas);
  };

  const handleSchemaChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  const saveSegmentHandler = async () => {
    try {
      const segmentData = {
        segment_name: segmentName,
        schema: blueBoxSchemas.map((schema) => ({ [schema]: schema })),
      };
      const deleteSchemaHandler = (index) => {
        const newSchemas = [...blueBoxSchemas];
        newSchemas.splice(index, 1);
        setBlueBoxSchemas(newSchemas);
      };

      console.log(segmentData);

      
      const requestOptions = {
        method: 'post',
        headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(segmentData)
    };
    console.log(requestOptions);
    const response = await fetch('https://webhook.site/cd99a7dc-f8ac-4549-a393-336f8eac3eef', requestOptions)
        .then(response => response.json())
        .catch  ((e) => {
         console.log(e);
        }
        )

      if (!response.ok) {
        throw new Error("Failed to save segment");
      }

      console.log("Segment saved successfully!");
      closePopupHandler();
    } catch (error) {
      console.error("Error saving segment:", error.message);
    }
    setSegmentName("");
  };

  return (
    <div className="hsection">
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="save-segment"
      >
        <button onClick={showPopupHandler} className="save-segment-button">
          Save Segment
        </button>

        {showPopup && (
          <div className="popup">
            <div className="popup-header">
              
              
             <p className="popup-header-text"><FaAngleLeft onClick={closePopupHandler} className="left-icon" /> Saving Segment</p> 
            </div>
            <label htmlFor="segmentName" className="input-label"> Enter the Name of the Segment</label>
            <input
              type="text"
              id="segmentName"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="input-text"
            />
            <br />
            <div className="blue-box">
              {blueBoxSchemas.map((schema, index) => (
                <select
               
                  key={index}
                  className="schema-dropdown input-text"
                  value={schema}
                  onChange={(event) => handleBlueBoxSchemaChange(index, event)}
                 
                >
                  {schemaOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={blueBoxSchemas.includes(option.value)}
                      className="dropdown-content"
                    >
                      {option.label}
                    </option>
                  ))}
                   
                </select>
                
              ))}
             
            </div>
          
            <select
              id="addSchema"
              value={selectedSchema}
              onChange={handleSchemaChange}
              className="input-text"
            >
              <option value="">Add schema to segment</option>
              {schemaOptions.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <p onClick={addNewSchemaHandler} className="add-new-sehema">
              
              <FaPlus />
              Add new schema
            </p>
            <div className="popup-footer">
              <button className="footer-button-1" onClick={saveSegmentHandler}>Save the Segment</button>
              <button className="footer-button-2" onClick={closePopupHandler}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SegmentPage;

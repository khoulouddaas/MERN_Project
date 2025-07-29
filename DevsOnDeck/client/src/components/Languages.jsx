import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import { useParams } from 'react-router-dom';

// Icons
import cssIcon from './icons/css.png';
import csharpIcon from './icons/csharp.jpg';
import goIcon from './icons/go.jpg';
import htmlIcon from './icons/html.jpg';
import javaIcon from './icons/java.png';
import jsIcon from './icons/js.png';
import pythonIcon from './icons/pyth.jpg';
import rubyIcon from './icons/ruby.jpg';
import sqlIcon from './icons/sql.png';
import swiftIcon from './icons/swift.png';
import phpIcon from './icons/php.png';
import cppIcon from './icons/c++.png';

const Languages = (props) => {
  const [languages, setLanguages] = useState([]);
  const [bio, setBio] = useState("");
  const [langImages, setLangImages] = useState([]);
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const { devId } = useParams();

  const navigate = useNavigate();

  const AddSkills = (e) => {
    e.preventDefault();
axios.post(`http://localhost:8000/api/skills/languages/${devId}`, {
      languages,
      bio
    })
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        const errorResponse = err.response?.data?.errors;
        const errorArr = [];
        if (errorResponse) {
          for (const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message);
          }
        } else {
          errorArr.push("An unexpected error occurred.");
        }
        setErrors(errorArr);
      });
  };

  const AddLang = (img, lang) => {
    if (count < 5 && !languages.includes(lang)) {
      setLanguages([...languages, lang]);
      setLangImages([...langImages, img]);
      setCount(count + 1);
    }
  };

  return (
    <Container className="contStyle">
      <h3 className="languages-heading">Pick Your Top 5 Languages</h3>
      <Row>
        <Col md={7}>
          <div className="langContainer mb-3">
            {langImages.map((img, index) => (
              <img key={index} src={img} alt={`lang-${index}`} className="iconStyle2" />
            ))}
          </div>
          <div className="iconcontainer">
            <table>
              <tbody>
                <tr>
                  <td><img src={csharpIcon} alt="csharp" className="iconStyle" onClick={() => AddLang(csharpIcon, "csharp")} /></td>
                  <td><img src={cssIcon} alt="css" className="iconStyle" onClick={() => AddLang(cssIcon, "css")} /></td>
                  <td><img src={goIcon} alt="go" className="iconStyle" onClick={() => AddLang(goIcon, "go")} /></td>
                  <td><img src={htmlIcon} alt="html" className="iconStyle" onClick={() => AddLang(htmlIcon, "html")} /></td>
                </tr>
                <tr>
                  <td><img src={javaIcon} alt="java" className="iconStyle" onClick={() => AddLang(javaIcon, "java")} /></td>
                  <td><img src={jsIcon} alt="js" className="iconStyle" onClick={() => AddLang(jsIcon, "js")} /></td>
                  <td><img src={pythonIcon} alt="python" className="iconStyle" onClick={() => AddLang(pythonIcon, "python")} /></td>
                  <td><img src={rubyIcon} alt="ruby" className="iconStyle" onClick={() => AddLang(rubyIcon, "ruby")} /></td>
                </tr>
                <tr>
                  <td><img src={sqlIcon} alt="sql" className="iconStyle" onClick={() => AddLang(sqlIcon, "sql")} /></td>
                  <td><img src={swiftIcon} alt="swift" className="iconStyle" onClick={() => AddLang(swiftIcon, "swift")} /></td>
                  <td><img src={phpIcon} alt="php" className="iconStyle" onClick={() => AddLang(phpIcon, "php")} /></td>
                  <td><img src={cppIcon} alt="c++" className="iconStyle" onClick={() => AddLang(cppIcon, "c++")} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>

        {/* Short Bio Textarea next to language icons */}
        <Col md={5}>
          <h4 className="bio-heading">Short Bio</h4>
          <Form.Control
            as="textarea"
            rows={14}
            className="bio-textarea"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            style={{ resize: 'none', width: '100%' }}
          />
        </Col>
      </Row>

      <div className="btncont mt-4">
        <button className="skipbtn" onClick={() => navigate("/devs/login")}>Skip This Step</button>
        <button onClick={AddSkills}>Finished?</button>
      </div>

      {errors.length > 0 && (
        <div className="error-messages" style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Languages;
